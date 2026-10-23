const toast = document.querySelector('wa-toast')

const DUPLICATE_WINDOW_MS = 5000
let lastMessage = null
let lastShownAt = null

export function createToast(message, options = {}) {
    const now = Date.now()

    if (String(message) === lastMessage && now - lastShownAt < DUPLICATE_WINDOW_MS) {
        console.log(`Toast creation DENIED: an exact copy was created less than ${DUPLICATE_WINDOW_MS/1000} seconds ago.`)
        return
    }

    lastMessage = message
    lastShownAt = now

    toast.placement = localStorage.getItem('toast-placement')
    toast?.create(message, options)
}