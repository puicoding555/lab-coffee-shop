<template>
  <section class="page-shell">
    <article class="form-card">
      <h1>Edit Menu</h1>

      <form class="form-layout" @submit.prevent="editMenu">
        <div class="field-grid">
          <div class="field-stack">
            <label for="menu-name">Name</label>
            <input id="menu-name" v-model="menu.name" type="text" required />
          </div>

          <div class="field-stack">
            <label for="menu-type">Type</label>
            <input id="menu-type" v-model="menu.type" type="text" />
          </div>

          <div class="field-stack">
            <label for="menu-origin">Origin</label>
            <input id="menu-origin" v-model="menu.origin" type="text" />
          </div>

          <div class="field-stack">
            <label for="menu-price">Price</label>
            <input id="menu-price" v-model.number="menu.price" type="number" min="0" required />
          </div>
        </div>

        <div class="field-stack">
          <label for="menu-description">Description</label>
          <textarea id="menu-description" v-model="menu.description" />
        </div>

        <div class="form-actions">
          <button type="submit">Update</button>
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
    async editMenu() {
      try {
        const menuId = this.$route.params.menuId
        await MenusService.put(menuId, this.menu)
        this.$router.push({ name: 'menus' })
      } catch (err) {
        console.log(err)
      }
    },
  },
  async created() {
    try {
      const menuId = this.$route.params.menuId
      const res = await MenusService.show(menuId)
      this.menu = res.data.data || res.data
    } catch (error) {
      console.log(error)
    }
  },
}
</script>
