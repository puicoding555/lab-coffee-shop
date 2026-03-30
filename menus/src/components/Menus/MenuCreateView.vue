<template>
  <section class="page-shell">
    <article class="form-card">
      <h1>Create Menu</h1>

      <form class="form-layout" @submit.prevent="createMenu">
        <div class="field-grid">
          <div class="field-stack">
            <label for="menu-name">Name</label>
            <input id="menu-name" v-model="menu.name" type="text" placeholder="House blend" required />
          </div>

          <div class="field-stack">
            <label for="menu-type">Type</label>
            <input id="menu-type" v-model="menu.type" type="text" placeholder="Espresso, seasonal, iced" />
          </div>

          <div class="field-stack">
            <label for="menu-origin">Origin</label>
            <input id="menu-origin" v-model="menu.origin" type="text" placeholder="Chiang Rai, Colombia" />
          </div>

          <div class="field-stack">
            <label for="menu-price">Price</label>
            <input id="menu-price" v-model.number="menu.price" type="number" min="0" placeholder="95" required />
          </div>
        </div>

        <div class="field-stack">
          <label for="menu-description">Description</label>
          <textarea
            id="menu-description"
            v-model="menu.description"
            placeholder="Describe flavor, mood, or what makes this menu item special."
          />
        </div>

        <div class="form-actions">
          <button type="submit">Create</button>
          <button type="button" class="button-secondary" @click="navigateTo('/menus')">Cancel</button>
        </div>
      </form>
    </article>
  </section>
</template>

<script>
import MenusService from '../../services/MenusService'

export default {
  data() {
    return {
      menu: {
        name: '',
        type: '',
        origin: '',
        price: 0,
        description: '',
      },
    }
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route)
    },
    async createMenu() {
      try {
        await MenusService.post(this.menu)
        this.$router.push({ name: 'menus' })
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script>
