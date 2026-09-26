const toast = document.querySelector('wa-toast')

export function createToast(message, options = {}) {
    toast.placement = localStorage.getItem('toast-placement')
    toast?.create(message, options)
}