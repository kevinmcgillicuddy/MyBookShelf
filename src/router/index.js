import Vue from 'vue'
import VueRouter from 'vue-router'
import Shelf from '../views/Shelf.vue'
import Login from '@/components/Login'
import AddBook from '@/components/AddBook'
import EditBook from '@/components/EditBook'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Shelf',
    component: Shelf
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
    {
    path: '/AddBook',
    name: 'AddBook',
    component: AddBook,
    meta:{
      requiresAuth: true
    }
  },
  {
    path: '/EditBook/:id',
    name: 'EditBook',
    component: EditBook,
    meta:{
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
