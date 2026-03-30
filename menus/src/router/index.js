import { createRouter, createWebHistory } from 'vue-router'

// Import Components
import Login from '../components/Login.vue'
import MenuCreate from '../components/Menus/MenuCreateView.vue'
import MenuEdit from '../components/Menus/MenuEditView.vue'
import MenuIndex from '../components/Menus/MenuIndexView.vue'
import MenuShow from '../components/Menus/MenuShowView.vue'

import CoffeeCreate from '../components/Coffees/CoffeeCreateView.vue'
import CoffeeEdit from '../components/Coffees/CoffeeEditView.vue'
import CoffeeIndex from '../components/Coffees/CoffeeIndexView.vue'
import CoffeeShow from '../components/Coffees/CoffeeShowView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', name: 'login', component: Login },

    // ✅ Menu Routes
    { path: '/menus', name: 'menus', component: MenuIndex },
    { path: '/menu/create', name: 'menu-create', component: MenuCreate },
    { path: '/menu/edit/:menuId', name: 'menu-edit', component: MenuEdit },
    { path: '/menu/:menuId', name: 'menu-show', component: MenuShow },

    // ✅ Coffee Routes
    { path: '/coffees', name: 'coffees', component: CoffeeIndex },
    { path: '/coffee/create', name: 'coffee-create', component: CoffeeCreate },
    { path: '/coffee/edit/:coffeeId', name: 'coffee-edit', component: CoffeeEdit },
    { path: '/coffee/:coffeeId', name: 'coffee-show', component: CoffeeShow },

    { path: '/', name: 'home', component: () => import('../views/HomeView.vue') },
  ]
})

export default router
