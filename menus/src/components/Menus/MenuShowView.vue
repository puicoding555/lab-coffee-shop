<template>
  <section class="page-shell">
    <article v-if="menu" class="detail-card">
      <div class="detail-layout">
        <div class="detail-image-wrap">
          <div class="menu-spotlight">
            <span class="eyebrow">Menu #{{ menu.id }}</span>
            <h2>{{ menu.name }}</h2>
            <p>{{ menu.origin || 'Origin not specified' }}</p>
            <span class="price-chip">{{ formatPrice(menu.price) }}</span>
          </div>
        </div>

        <div class="detail-copy">
          <div class="badge-row">
            <span class="status-pill">{{ menu.type || 'Signature' }}</span>
            <span class="status-pill">{{ menu.origin || 'Unknown origin' }}</span>
          </div>

          <div class="detail-grid">
            <div class="stats-card">
              <strong>Type</strong>
              <p>{{ menu.type || 'Not set' }}</p>
            </div>
            <div class="stats-card">
              <strong>Origin</strong>
              <p>{{ menu.origin || 'Not set' }}</p>
            </div>
            <div class="stats-card">
              <strong>Price</strong>
              <p>{{ formatPrice(menu.price) }}</p>
            </div>
          </div>

          <div class="page-card">
            <span class="section-kicker">Description</span>
            <p class="detail-prose">{{ menu.description || 'No description provided yet.' }}</p>
          </div>

          <div class="detail-actions">
            <button @click="navigateTo('/menus')">Back to menus</button>
            <button class="button-secondary" @click="navigateTo('/menu/edit/' + menu.id)">Edit</button>
          </div>
        </div>
      </div>
    </article>

    <div v-else class="page-card empty-state">
      <h3>Loading menu...</h3>
      <p>Please wait while the item details are being fetched.</p>
    </div>
  </section>
</template>

<script>
import MenusService from '../../services/MenusService'

export default {
  data() {
    return {
      menu: null,
    }
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route)
    },
    formatPrice(price) {
      return `THB ${Number(price || 0).toLocaleString()}`
    },
  },
  async created() {
    try {
      const menuId = this.$route.params.menuId
      const res = await MenusService.show(menuId)
      this.menu = res.data.data || res.data
    } catch (err) {
      console.log(err)
      this.menu = null
    }
  },
}
</script>

<style scoped>
.menu-spotlight {
  display: grid;
  justify-items: center;
  gap: 0.8rem;
  text-align: center;
}
</style>
