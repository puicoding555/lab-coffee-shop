<template>
  <section class="page-shell">
    <article class="auth-card">
      <h1>Admin Login</h1>
      <p class="hint-text">เข้าสู่ระบบเพื่อเพิ่ม แก้ไข และลบข้อมูล</p>

      <form class="form-layout" @submit.prevent="onLogin">
        <div class="field-stack">
          <label for="email">Email</label>
          <input id="email" v-model="email" type="email" placeholder="admin@coffee.com" />
        </div>

        <div class="field-stack">
          <label for="password">Password</label>
          <input id="password" v-model="password" type="password" placeholder="Enter password" />
        </div>

        <button type="submit">Login</button>

        <div class="error-message" v-if="error">{{ error }}</div>
        <div class="status-banner">
          <div>
            <strong>Default admin</strong>
            <p>admin@coffee.com / admin1234</p>
          </div>
        </div>
      </form>
    </article>
  </section>
</template>

<script>
import AuthenService from '../services/AuthenService'
import { useAuthenStore } from '../stores/authen'

export default {
  data() {
    return {
      email: '',
      password: '',
      error: null,
    }
  },
  methods: {
    async onLogin() {
      try {
        const response = await AuthenService.login({
          email: this.email,
          password: this.password,
        })

        const authenStore = useAuthenStore()
        authenStore.setToken(response.data.token)
        authenStore.setUser(response.data.user)

        this.$router.push({ name: 'menus' })
      } catch (error) {
        this.error = error?.response?.data?.error || 'Login failed'
      }
    },
  },
}
</script>

<style scoped>
.auth-card {
  display: grid;
  gap: 1rem;
}

.status-banner strong {
  color: var(--accent-dark);
}
</style>
