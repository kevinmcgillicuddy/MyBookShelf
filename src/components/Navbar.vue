<template>
  <div>  
    <nav class="indigo">
      <ul id="dropdown" class="dropdown-content">
        <li v-if="!user"><router-link :to="{name:'Login'}">Log In</router-link></li>
        <li v-if="user"><router-link :to="{name:'Login'}">Log Out</router-link></li>
        <li v-if="user"><router-link :to="{name:'AddBook'}">Add Book</router-link></li>
        <li v-if="user"><a @click="logout">Log Out</a></li>
      </ul>
      <div class="nav-wrapper">
      <a href="#" class="brand-logo">My Bookshelf</a>
      <ul class="right hide-on-med-and-down">
          <li><router-link :to="{name:'AddBook'}">Add Book</router-link></li>
          <li><a class="dropdown-trigger" href="#!" data-target="dropdown">Account<i class="material-icons right">arrow_drop_down</i></a></li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import M from 'materialize-css'
import firebase from 'firebase'
export default {
    name: Navbar,
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
     }
}
</script>

<style>

</style>