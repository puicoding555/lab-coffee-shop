<template>
  <div class="app-shell">
    <CoffeeHeader />
    <main class="app-main">
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
/* ใช้สไตล์หลักจาก src/style.css */
.app-shell {
  position: relative;
  min-height: 100vh;
}

.app-main {
  position: relative;
  z-index: 1;
}
</style>
