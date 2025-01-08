import { defineStore } from 'pinia'

export const useMenuStore = defineStore('menu', {
  state: () => ({
    isMenuOpen: false, // وضعیت منو
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
  },
})
