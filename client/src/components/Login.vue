<template>
  <div>
    <h2>Login</h2>

    <form @submit.prevent="login">
      <div>
        <label>Email</label>
        <input v-model="email" type="email" required />
      </div>

      <div>
        <label>Password</label>
        <input v-model="password" type="password" required />
      </div>

      <button type="submit">Login</button>
    </form>

    <p v-if="error" style="color:red">
      {{ error }}
    </p>
  </div>
</template>

<script>
import { useAuthStore } from '../stores/auth'

export default {

  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login () {
      try {
        const auth = useAuthStore()

        await auth.login({
          email: this.email,
          password: this.password
        })

        this.$router.push('/coffees')
      } catch (err) {
        this.error = 'Login failed'
      }
    }
  }
}
</script>
