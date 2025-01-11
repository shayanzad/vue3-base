/** @format */

import { useToast as Toastification } from 'vue-toastification/dist/index.mjs'

export default function useToast() {
  /**
   * @typedef {'default' | 'success' | 'info' | 'warning' | 'error'} ToastType
   */
  /**
   * @typedef {'top-right' | 'top' | 'top-left' | 'bottom-left' | 'bottom' | 'bottom-right'} ToastPositions
   */

  const validTypes = ['default', 'success', 'info', 'warning', 'error']
  const validPositions = [
    'top-right',
    'top-center',
    'top-left',
    'bottom-left',
    'bottom-center',
    'bottom-right',
  ]
  const defaultOptions = {
    timeout: 3000,
    position: 'top-right',
    padding: '10px 20px',
    className: 'my-toast-font',
  }

  /**
   * @typedef {Object} ToastOptions
   * @property {number} [timeout=3000] - Timeout for the toast message.
   * @property {ToastPositions} [position="bottom-center"] - Position of the toast.
   */

  /**
   * @param {string} text - The text content of the toast.
   * @param {ToastType} type - The type of the toast. Should be one of: 'default', 'success', 'info', 'warning', 'error'.
   * @param {ToastOptions} [options=defaultOptions] - Options for the toast.
   */
  function showToast(text, type, options = defaultOptions) {
    if (!validTypes.includes(type)) {
      console.error(`Invalid toast type: ${type}. Valid types are: ${validTypes.join(', ')}`)
      return
    }

    if (options.position && !validPositions.includes(options.position)) {
      console.error(
        `Invalid toast position: ${
          options.position
        }. Valid positions are: ${validPositions.join(', ')}`,
      )
      return
    }

    const toast = Toastification()
    toast[type](text, options)
  }

  return {
    showToast,
  }
}
