import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'

//Coffee
import CoffeeIndex from '../components/Coffees/Index.vue'
import CoffeeCreate from '../components/Coffees/CreateCoffee.vue'
import CoffeeEdit from '../components/Coffees/EditCoffee.vue'
import CoffeeShow from '../components/Coffees/ShowCoffee.vue'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    //coffee
    {
      path: '/coffees',
      name: 'coffees',
      component: CoffeeIndex
    },
    {
      path: '/coffee/create',
      name: 'coffee-create',
      component: CoffeeCreate
    },
    {
      path: '/coffee/edit/:coffeeId',
      name: 'coffee-edit',
      component: CoffeeEdit
    },
    {
      path: '/coffee/:coffeeId',
      name: 'coffee-show',
      component: CoffeeShow
    }
  ]
})

export default router
