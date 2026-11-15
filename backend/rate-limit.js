const { rateLimit, ipKeyGenerator } = require('express-rate-limit')

const MIN = 60 * 1000
const QUARTER = 15 * MIN

const make = (limit, windowMs, opts = {}) => rateLimit({
  windowMs,
  limit,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests, slow down.' },
  ...opts
})

// Key by user ID when logged in, otherwise fall back to the IP
const byUser = {
  keyGenerator: (req) => req.session?.user?.id ?? ipKeyGenerator(req.ip)
}

// app.all() matches the exact path, so /api/pagecount does not also catch
// /api/pagecount/groups. Each call builds its own limiter, so counters
// are never shared between endpoints.
function apply(app, paths, limit, windowMs, opts) {
  for (const p of paths) app.all(p, make(limit, windowMs, opts))
}

// Mount BEFORE session. These are all IP-keyed.
function applyPublicLimits(app) {
  app.use('/api', make(100, MIN)) // global backstop

  apply(app, [
    '/api/ping', '/api/taglist', '/api/cratelist', '/api/countprices',
    '/api/pagecount', '/api/recents/:serverid'
  ], 10, MIN)

  apply(app, [
    '/api/spawners', '/api/itemset', '/api/purchaseplan/presets',
    '/api/purchaseplan/view/:id'
  ], 6, MIN)

  apply(app, ['/api/mod/itemset/:server'], 10, MIN)

  apply(app, ['/api/allitems'], 60, QUARTER)
  app.use('/api/search', make(75, QUARTER)) // combined simple and advanced search

  apply(app, [
    '/api/item/:serverid/:itemid',
    '/api/itemhistory/:serverid/:itemid',
    '/api/itemorder/:direction'
  ], 150, QUARTER)

  apply(app, ['/api/auth/callback', '/api/auth/logout'], 10, QUARTER)
}

//run AFTER session is initialized
function applyUserLimits(app) {
  apply(app, [
    '/api/auth/me',
    '/api/checkpending/:serverid/:itemid',
    '/api/adminpanel/updatestatus',
    '/api/updatestatus/groups'
  ], 150, QUARTER, byUser)

  apply(app, ['/api/recommend', '/api/group-recommend'], 100, QUARTER, byUser)
  apply(app, ['/api/purchaseplan/edit/:id'], 60, QUARTER, byUser)
  apply(app, ['/api/purchaseplan/new'], 10, QUARTER, byUser)
  apply(app, ['/api/requestprice/:itemid/:serverid'], 20, QUARTER, byUser)
  apply(app, ['/api/forceupdate', '/api/notify-top-requested'], 3, QUARTER, byUser)

  apply(app, [
    '/api/myrecoms/listrecoms/:page', '/api/myrecoms/pagecount',
    '/api/adminpanel/recoms/:page', '/api/adminpanel/pagecount',
    '/api/groups/:page', '/api/pagecount/groups', '/api/viewgroup/:id',
    '/api/purchaseplan/my-plans'
  ], 60, QUARTER, byUser)
}

module.exports = { applyPublicLimits, applyUserLimits }