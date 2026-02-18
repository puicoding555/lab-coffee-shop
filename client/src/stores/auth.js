import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null
  }),

  actions: {
    async login (credentials) {
      const res = await axios.post('http://localhost:8081/login', credentials)
      this.user = res.data.user
      this.token = res.data.token
    },

    logout () {
      this.user = null
      this.token = null
    }
  }
})
