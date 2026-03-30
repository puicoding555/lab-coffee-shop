<template>
  <section class="page-shell">
    <article class="page-card">
      <h1>Coffees</h1>
      <div class="top-actions">
        <button v-if="isAdminLoggedIn" @click="navigateTo('/coffee/create')">Create coffee</button>
        <button v-else class="button-secondary" @click="navigateTo('/login')">Login</button>
        <button v-if="isAdminLoggedIn" class="button-secondary" @click="onLogout">Logout</button>
      </div>
    </article>

    <section class="page-card">
      <h2>All coffees</h2>

      <div v-if="coffees.length" class="entity-grid">
        <article v-for="coffee in coffees" :key="coffee.id" class="entity-card">
          <div class="entity-media coffee-media">
            <img :src="getImage(coffee.image)" :alt="coffee.name" @error="onImgError" />
          </div>

          <div class="entity-body">
            <div class="badge-row">
              <span class="eyebrow">Coffee #{{ coffee.id }}</span>
              <span class="status-pill">{{ coffee.status || 'Unknown status' }}</span>
            </div>

            <div>
              <h3>{{ coffee.name }}</h3>
              <p>{{ coffee.type || 'Signature blend' }}</p>
            </div>

            <div class="meta-row">
              <span class="meta-pill">{{ coffee.type || 'Not set' }}</span>
              <span class="price-chip">{{ formatPrice(coffee.price) }}</span>
            </div>

            <p class="body-copy">{{ summarize(coffee.content) }}</p>

            <div class="inline-actions">
              <button @click="navigateTo('/coffee/' + coffee.id)">View details</button>
              <button
                v-if="isAdminLoggedIn"
                class="button-secondary"
                @click="navigateTo('/coffee/edit/' + coffee.id)"
              >
                Edit
              </button>
              <button
                v-if="isAdminLoggedIn"
                class="button-danger"
                @click="deleteCoffee(coffee.id)"
              >
                Delete
              </button>
            </div>
          </div>
        </article>
      </div>

      <div v-else class="empty-state">
        <h3>No coffee items yet</h3>
        <p>No data</p>
      </div>
    </section>
  </section>
</template>

<script>
import CoffeeService from '../../services/CoffeeService'
import { useAuthenStore } from '../../stores/authen'

export default {
  data() {
    return {
      coffees: [],
    }
  },
  computed: {
    isAdminLoggedIn() {
      const authenStore = useAuthenStore()
      return authenStore.isAdminLoggedIn
    },
  },
  methods: {
    getImage(filename) {
      if (!filename) {
        return 'https://via.placeholder.com/420x280/f3e2cf/7c4f2c?text=Coffee'
      }

      return `http://localhost:8081/assets/uploads/${filename}`
    },
    onImgError(event) {
      event.target.src = 'https://via.placeholder.com/420x280/f3e2cf/7c4f2c?text=Coffee'
    },
    navigateTo(route) {
      this.$router.push(route)
    },
    formatPrice(price) {
      return `THB ${Number(price || 0).toLocaleString()}`
    },
    summarize(content) {
      if (!content) return 'A fresh coffee story is waiting to be written here.'
      const plainText = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
      return plainText.length > 120 ? `${plainText.slice(0, 117)}...` : plainText
    },
    async deleteCoffee(id) {
      if (!confirm('Delete this coffee item?')) return
      await CoffeeService.delete(id)
      await this.refreshData()
    },
    async refreshData() {
      try {
        const res = await CoffeeService.index()

        if (Array.isArray(res.data)) {
          this.coffees = res.data
        } else if (res.data && res.data.data) {
          this.coffees = res.data.data
        } else {
          this.coffees = []
        }
      } catch (err) {
        console.error('Failed to load coffees:', err)
        this.coffees = []
      }
    },
    onLogout() {
      const authenStore = useAuthenStore()
      authenStore.logout()
      this.$router.push({ name: 'login' })
    },
  },
  created() {
    this.refreshData()
  },
}
</script>

<style scoped>
.coffee-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
