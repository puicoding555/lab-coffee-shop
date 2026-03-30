<template>
  <section class="page-shell">
    <article v-if="coffee" class="detail-card">
      <div class="detail-layout">
        <div class="detail-image-wrap">
          <img v-if="mainImage" class="hero-image" :src="`${BASE_URL}${mainImage}`" :alt="coffee.name" />
        </div>

        <div class="detail-copy">
          <div class="badge-row">
            <span class="eyebrow">Coffee #{{ coffee.id }}</span>
            <span class="status-pill">{{ coffee.status || 'Unknown status' }}</span>
          </div>

          <div class="detail-grid">
            <div class="stats-card">
              <strong>Type</strong>
              <p>{{ coffee.type || 'Not set' }}</p>
            </div>
            <div class="stats-card">
              <strong>Price</strong>
              <p>{{ formatPrice(coffee.price) }}</p>
            </div>
            <div class="stats-card">
              <strong>Availability</strong>
              <p>{{ coffee.status || 'Not set' }}</p>
            </div>
          </div>

          <div class="page-card">
            <span class="section-kicker">Product story</span>
            <div class="detail-prose" v-html="coffee.content || '<p>No additional details yet.</p>'"></div>
          </div>

          <div class="detail-actions">
            <button @click="navigateTo('/coffees')">Back to coffees</button>
            <button class="button-secondary" @click="navigateTo('/coffee/edit/' + coffee.id)">Edit</button>
          </div>
        </div>
      </div>
    </article>

    <div v-else class="page-card empty-state">
      <h3>Loading coffee...</h3>
      <p>Please wait while the item details are being fetched.</p>
    </div>
  </section>
</template>

<script>
import CoffeeService from '../../services/CoffeeService'

export default {
  data() {
    return {
      coffee: null,
      mainImage: null,
      BASE_URL: 'http://localhost:8081/assets/uploads/',
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
      const res = await CoffeeService.show(this.$route.params.coffeeId)
      this.coffee = res.data.data || res.data
      this.mainImage = this.coffee.image
    } catch (err) {
      console.log(err)
      alert('Not found')
      this.$router.push({ name: 'coffees' })
    }
  },
}
</script>

<style scoped>
.hero-image {
  width: min(100%, 420px);
  border-radius: 24px;
  box-shadow: 0 22px 40px rgba(70, 44, 25, 0.14);
}
</style>
