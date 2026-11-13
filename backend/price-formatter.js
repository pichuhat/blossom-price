function formatPrice(unformatted) {
        return Number(unformatted).toLocaleString()
    }

function formatStringPriceRange(row) {
    if (row.price === null) return null
    if (row.max_price === null) return `$${formatPrice(row.price)}`
    return `$${formatPrice(row.price)} to $${formatPrice(row.max_price)}`
}

module.exports = {
    formatPrice,
    formatStringPriceRange
}