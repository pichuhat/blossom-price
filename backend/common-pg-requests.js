// Shared SQL fragments for requests that return item and price submission data
// Keep as cjs

const EFFECTIVE_TIMESTAMP = 'COALESCE(p.effective_timestamp, p.timestamp)'

const PRICE_COLUMNS = `
        p.price AS price,
        ${EFFECTIVE_TIMESTAMP} AS recom_timestamp,
        p.timestamp AS real_timestamp,
        (p.effective_timestamp IS NOT NULL) AS is_historical,
        p.submission_id AS recommendation_id,
        p.submitted_by AS author_id,
        p.server_id AS server,
        p.status AS status,
        p.is_range AS is_range,
        p.max_price AS max_price`

const USER_COLUMNS = `
        u.username AS username,
        u.discord_avatar_hash AS avatar_hash`

const NO_SERVER = 'i.*'

const ITEM_DATA_REQUESTS = {
    SELECTED_COLUMNS: {
        NO_SERVER,
        WITH_SERVER: `${NO_SERVER},${PRICE_COLUMNS},${USER_COLUMNS}`
    },
    PRICE_COLUMNS,
    USER_COLUMNS
}

const PRICE_REQUESTS = {
    EFFECTIVE_TIMESTAMP,
    LATEST_PER_ITEM_ORDER: `i.id, ${EFFECTIVE_TIMESTAMP} DESC`,
    EFFECTIVE_TIMESTAMP_DESC: `${EFFECTIVE_TIMESTAMP} DESC`,
    SUBMISSION_TIMESTAMP_DESC: 'p.timestamp DESC, p.submission_id DESC',
    ACCEPTED_PRICE_JOIN: (serverParameter, itemAlias = 'i') => `LEFT JOIN price_submissions p ON ${itemAlias}.id = p.item_id AND p.status = 'accepted' AND p.server_id = ${serverParameter} LEFT JOIN users u ON p.submitted_by = u.discord_id`,
    ACCEPTED_PRICE_HISTORY_JOIN: (serverParameter) => `INNER JOIN items i ON i.id = p.item_id LEFT JOIN users u ON p.submitted_by = u.discord_id WHERE p.status = 'accepted' AND p.server_id = ${serverParameter}`
}

module.exports = {
    ITEM_DATA_REQUESTS,
    PRICE_REQUESTS
}
