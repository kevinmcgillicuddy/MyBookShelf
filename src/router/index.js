import Vue from 'vue'
import Router from 'vue-router'
import Shelf from '@/components/Shelf'
import Login from '@/components/Login'
import AddBook from '@/components/AddBook'

Vue.use(Router)

export default new Router({
  routes: [
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
      component: AddBook
    }
  ]
})
