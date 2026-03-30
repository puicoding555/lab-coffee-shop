<template>
  <section class="page-shell">
    <article class="page-card">
      <h1>Coffee Shop System</h1>
      <p>เลือกใช้งานฟังก์ชันที่มีในระบบ</p>

      <div class="hero-actions">
        <router-link class="button-link" :to="{ name: 'menus' }">Menus</router-link>
        <router-link class="button-link button-secondary" :to="{ name: 'coffees' }">Coffees</router-link>
        <router-link class="button-link button-secondary" :to="{ name: 'login' }">Login</router-link>
      </div>
    </article>
  </section>
</template>

<script>
export default {}
</script>

<style scoped>
.page-card {
  display: grid;
  gap: 1rem;
}
</style>
