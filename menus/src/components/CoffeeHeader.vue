<template>
  <header class="coffee-header">
    <router-link class="brand-block" :to="{ name: 'menus' }">
      <span class="brand-mark">CS</span>
      <span>
        <strong>Coffee Shop</strong>
        <small>Menu Management</small>
      </span>
    </router-link>

    <nav class="header-nav">
      <router-link :to="{ name: 'coffees' }">Coffees</router-link>
      <router-link :to="{ name: 'menus' }">Menus</router-link>
      <router-link :to="{ name: 'login' }">Login</router-link>
    </nav>

    <div class="header-status">
      <div class="status-copy">
        <span class="status-label">{{ isAdminLoggedIn ? 'Admin' : 'User' }}</span>
        <strong>{{ userName }}</strong>
      </div>
      <button v-if="isAdminLoggedIn" class="header-logout" type="button" @click="logout">
        Logout
      </button>
    </div>
  </header>
</template>

<script>
import { useAuthenStore } from '../stores/authen'

export default {
  computed: {
    isAdminLoggedIn() {
      const authenStore = useAuthenStore()
      return authenStore.isAdminLoggedIn
    },
    userName() {
      const authenStore = useAuthenStore()
      return authenStore.user?.name || authenStore.user?.email || 'Not logged in'
    },
  },
  methods: {
    logout() {
      const authenStore = useAuthenStore()
      authenStore.logout()
      this.$router.push({ name: 'login' })
    },
  },
}
</script>
<style scoped>
/* ===== Earth Tone Pill Navbar ===== */
.nv-navbar {
  background: linear-gradient(90deg, #3f5f55, #4c6e62);
  width: fit-content;
  margin: 16px auto;
  padding: 8px 12px;
  border-radius: 999px;
  box-shadow: 0 6px 18px rgba(47, 79, 68, 0.35);
  position: sticky;
  top: 12px;
  z-index: 1000;
}

/* Nav list */
.nv-navbar .nav {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Nav item */
.nv-navbar .nav li {
  margin: 0;
}

/* Link (ปุ่มเมนู) */
.nv-navbar .nav li a {
  display: inline-block;
  padding: 8px 16px;
  text-decoration: none;
  color: #eef4f1;
  font-weight: 600;
  letter-spacing: 0.4px;
  border-radius: 999px;
  transition: all 0.25s ease;
}

/* Hover */
.nv-navbar .nav li a:hover {
  background-color: rgba(255, 255, 255, 0.18);
  color: #ffffff;
}

/* Active route */
.nv-navbar .nav li a.router-link-active {
  background-color: #dce7e2;
  /* accent-soft */
  color: #2f4f44;
  /* forest */
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
}

/* ไม่ต้องใช้ clearfix */
.clearfix {
  display: none;
}

/* Responsive */
@media (max-width: 600px) {
  .nv-navbar {
    padding: 6px 10px;
  }

  .nv-navbar .nav li a {
    padding: 6px 12px;
    font-size: 14px;
  }
}

.coffee-header {
  position: sticky;
  top: 16px;
  z-index: 10;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem 1.2rem;
  border: 1px solid rgba(93, 63, 36, 0.14);
  border-radius: 24px;
  background: rgba(255, 249, 242, 0.78);
  box-shadow: 0 18px 38px rgba(70, 44, 25, 0.12);
  backdrop-filter: blur(16px);
}

.brand-block {
  display: inline-flex;
  align-items: center;
  gap: 0.9rem;
}

.brand-block strong {
  display: block;
  color: var(--accent-dark);
  font-size: 1rem;
}

.brand-block small {
  color: var(--muted);
}

.brand-mark {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  border-radius: 16px;
  background: linear-gradient(135deg, var(--accent) 0%, var(--accent-dark) 100%);
  color: #fff8f0;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 1.1rem;
  font-weight: 700;
  box-shadow: 0 12px 24px rgba(92, 57, 34, 0.18);
}

.header-nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.65rem;
}

.header-nav a {
  border-radius: 999px;
  padding: 0.7rem 1rem;
  color: var(--accent-dark);
  font-weight: 700;
  transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;
}

.header-nav a:hover {
  background: rgba(140, 90, 54, 0.08);
  transform: translateY(-1px);
}

.header-nav a.router-link-active {
  background: linear-gradient(135deg, var(--accent) 0%, var(--accent-dark) 100%);
  color: #fff8f0;
  box-shadow: 0 10px 20px rgba(92, 57, 34, 0.16);
}

.header-status {
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
}

.status-copy {
  display: grid;
  gap: 0.2rem;
  text-align: right;
}

.status-label {
  color: var(--muted);
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.status-copy strong {
  color: var(--accent-dark);
  font-size: 0.95rem;
}

.header-logout {
  min-height: 40px;
  padding-inline: 1rem;
}

@media (max-width: 900px) {
  .coffee-header {
    grid-template-columns: 1fr;
    justify-items: start;
  }

  .header-nav {
    justify-content: start;
  }

  .header-status {
    width: 100%;
    justify-content: space-between;
  }

  .status-copy {
    text-align: left;
  }
}

@media (max-width: 720px) {
  .coffee-header {
    top: 10px;
    padding: 1rem;
  }

  .header-nav {
    width: 100%;
  }

  .header-nav a {
    flex: 1 1 calc(50% - 0.65rem);
    text-align: center;
  }

  .header-status {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
