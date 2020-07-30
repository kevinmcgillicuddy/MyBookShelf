<template>
<nav class="nav-extended indigo">
    <div class="nav-wrapper">
      <a href="/" class="brand-logo nb"><i class="material-icons"></i>My Bookshelf</a>
      <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li v-if="!user"><router-link :to="{name:'Login'}">Log In</router-link></li>
        <li v-if="user"><router-link :to="{name:'AddBook'}">Add Book</router-link></li>
        <li v-if="user"><a @click="logout">Log Out</a></li>
      </ul>
    </div>
      <ul class="sidenav" id="mobile-demo">
        <li v-if="!user"><router-link :to="{name:'Login'}">Log In</router-link></li>
        <li v-if="user"><router-link :to="{name:'AddBook'}">Add Book</router-link></li>
        <li v-if="user"><a @click="logout">Log Out</a></li>
    </ul>
  </nav>
</template>

<script>
import M from 'materialize-css'
import firebase from 'firebase'
export default {
    name: 'Navbar',
    data(){
        return {
          user:null
        }
    },
     methods:{
        logout(){
            firebase.auth().signOut().then(()=>{
               this.$router.push({name:'/'}) 
            })
        }
     },
     created(){
        firebase.auth().onAuthStateChanged(user=>{
            if (user){this.user = user}
            else{this.user = null}
        })
     },
     mounted(){
       M.AutoInit()
     }
}
</script>

<style>
.nb{
  left:50px
}
</style>