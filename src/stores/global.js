import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'

export const useGlobalStore = defineStore('menu', {
  state: () => ({
    isMenuOpen: true, // وضعیت منو
    isDrawerSettingsOpen: false, // وضعیت منو
    textRole: '', // وضعیت منو
    token: '', // وضعیت منو
  }),
  actions: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
    },
    openMenu() {
      this.isMenuOpen = true
    },
    closeMenu() {
      this.isMenuOpen = false
    },

    openDrawerSettings() {
      this.isDrawerSettingsOpen = true
    },
    closeDrawerSettings() {
      this.isDrawerSettingsOpen = false
    },
    getRoleText() {
      let role = localStorage.getItem('role')
      switch (role) {
        case '0':
          return 'ادمین'

        case '1':
          return 'شرکت مسافری'
        case '2':
          return '  مسافر'
        case '3':
          return '  راننده'
        case '4':
          return 'شرکت مسافری'
        case '5':
          return '  مدیر ایستگاه'
        case '6':
          return 'بدون نقش'

        default:
          break
      }
    },
    logOut(router) {
      const toats = useToast()
      if (!router) {
        console.error('لطفا روتر را ارسال نمایید')
        return
      }
      this.token = null
      localStorage.removeItem('token')
      localStorage.removeItem('role')
      localStorage.removeItem('user')
      router.replace('/auth/login')
      toats.info('شما از حساب کاربری خود با موفقیت خارج شدید .', { timeout: 5000 })
    },
  },
})
