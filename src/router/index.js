import Vue from 'vue'
import Router from 'vue-router'
import Shelf from '@/components/Shelf'
import Login from '@/components/Login'
import AddBook from '@/components/AddBook'
import Search from '@/components/Search'
import EditBook from '@/components/EditBook'
import firebase from 'firebase'

Vue.use(Router)

const router = new Router({
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
      path: '/Search',
      name: 'Search',
      component: Search
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
})

router.beforeEach((to,from,next)=>{
  if(to.matched.some(rec=>rec.meta.requiresAuth)){
    let user = firebase.auth().currentUser
    if(user){
      next()
    } else{
      next({name:'Login'})
    }
  }
  else{
    next()
  }
})
export default router