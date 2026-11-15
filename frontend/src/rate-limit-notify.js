import { createToast } from './toast.js'

console.log("[Rate Limit Notifier] Loaded")
const originalFetch = window.fetch.bind(window)

window.fetch = async (...args) => {
  const response = await originalFetch(...args)

  if (response.status === 429) {
    const url = String(args[0]?.url ?? args[0])
    const isApi = url.startsWith('/api') || url.includes('/api/')
    const now = Date.now()

    if (isApi) {
      const retryAfter = Number(response.headers.get('Retry-After'))
      createToast(
        retryAfter
          ? `<strong>You're sending requests too quickly.</strong><br>Try again in ${retryAfter}s.`
          : `<strong>You're sending requests too quickly.</strong><br> Please slow down.`,
        {
          variant: 'danger',
          icon: 'triangle-exclamation',
          allowHtml: true,
          duration: 7500
        }
      )
    }
  }

  return response
}

console.log("[Rate Limit Notifier] Initialized")