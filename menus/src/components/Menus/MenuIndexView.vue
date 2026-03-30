<template>
  <section class="page-shell">
    <article class="page-card">
      <h1>Menus</h1>
      <div class="top-actions">
        <button v-if="isAdminLoggedIn" @click="navigateTo('/menu/create')">Create menu</button>
        <button v-else class="button-secondary" @click="navigateTo('/login')">Login</button>
        <button v-if="isAdminLoggedIn" class="button-secondary" @click="onLogout">Logout</button>
      </div>
    </article>

    <section class="page-card">
      <h2>All menus</h2>

      <div v-if="menus.length" class="entity-grid">
        <article v-for="menu in menus" :key="menu.id" class="entity-card menu-card">
          <div class="entity-media">
            <div class="menu-media-copy">
              <span class="eyebrow">Menu #{{ menu.id }}</span>
              <h3>{{ menu.name }}</h3>
              <p>{{ menu.origin || 'Origin coming soon' }}</p>
            </div>
          </div>

          <div class="entity-body">
            <div class="meta-row">
              <span class="meta-pill">{{ menu.type || 'Signature' }}</span>
              <span class="meta-pill">{{ menu.origin || 'Unknown origin' }}</span>
            </div>

            <span class="price-chip">{{ formatPrice(menu.price) }}</span>

            <p class="body-copy">{{ summarize(menu.description) }}</p>

            <div class="inline-actions">
              <button @click="navigateTo('/menu/' + menu.id)">View details</button>
              <button
                v-if="isAdminLoggedIn"
                class="button-secondary"
                @click="navigateTo('/menu/edit/' + menu.id)"
              >
                Edit
              </button>
              <button
                v-if="isAdminLoggedIn"
                class="button-danger"
                @click="deleteMenu(menu.id)"
              >
                Delete
              </button>
            </div>
          </div>
        </article>
      </div>

      <div v-else class="empty-state">
        <h3>No menus yet</h3>
        <p>No data</p>
      </div>
    </section>
  </section>
</template>

<script>
import MenusService from '../../services/MenusService'
import { useAuthenStore } from '../../stores/authen'

export default {
  data() {
    return {
      menus: [],
    }
  },
  computed: {
    isAdminLoggedIn() {
      const authenStore = useAuthenStore()
      return authenStore.isAdminLoggedIn
    },
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route)
    },
    formatPrice(price) {
      return `THB ${Number(price || 0).toLocaleString()}`
    },
    summarize(description) {
      if (!description) {
        return 'A polished placeholder description for your next signature menu item.'
      }

      return description.length > 120 ? `${description.slice(0, 117)}...` : description
    },
    async deleteMenu(menuId) {
      if (!confirm('Want to delete this menu item?')) return

      try {
        await MenusService.delete(menuId)
        await this.refreshData()
      } catch (err) {
        alert(err?.response?.data?.error || 'Delete failed')
      }
    },
    async refreshData() {
      const res = await MenusService.index()
      this.menus = res.data.data || res.data
    },
    onLogout() {
      const authenStore = useAuthenStore()
      authenStore.logout()
      this.$router.push({ name: 'login' })
    },
  },
  async created() {
    await this.refreshData()
  },
}
</script>

<style scoped>
.menu-card {
  overflow: hidden;
}

.menu-media-copy {
  display: grid;
  gap: 0.6rem;
  padding: 1rem;
  text-align: center;
}

.menu-media-copy p {
  max-width: 18rem;
}
</style>
