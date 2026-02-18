<template>
  <div>
    <div class="navbar">
      <router-link to="/coffees">Menu</router-link> |
      <router-link to="/orders">Order</router-link> |
      <router-link to="/login">Login</router-link>
    </div>
    <router-view />
  </div>
</template>

<style scoped>
.navbar {
  padding: 15px;
  background: #333;
}

a {
  color: white;
  margin-right: 15px;
  text-decoration: none;
}

a.router-link-active {
  font-weight: bold;
  color: yellow;
}
</style>
