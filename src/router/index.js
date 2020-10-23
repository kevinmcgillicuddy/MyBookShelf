import Vue from 'vue'
import VueRouter from 'vue-router'
import Shelf from '../views/Shelf.vue'
import Login from '@/components/Login'
import AddBook from '@/components/AddBook'
import EditBook from '@/components/EditBook'
import firebase from 'firebase'
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
  routes
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
