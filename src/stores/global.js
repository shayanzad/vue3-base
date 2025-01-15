import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'

export const useGlobalStore = defineStore('menu', {
  state: () => ({
    isMenuOpen: true, // وضعیت منو
    isDrawerSettingsOpen: false, // وضعیت منو
    textRole: '', // وضعیت منو
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
      console.log(role)
      switch (role) {
        case '0':
          return 'ادمین'

        case '1':
          return 'شرکت مسافری'

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
      localStorage.removeItem('token')
      localStorage.removeItem('role')
      localStorage.removeItem('user')
      router.replace('/auth/login')
      toats.info('شما از حساب کاربری خود با موفقیت خارج شدید .', { timeout: 5000 })
    },
  },
})
