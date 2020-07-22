<template>
 <div>  
    <ul id="dropdown" class="dropdown-content">
  <li><router-link :to="{name:'Login'}">Log In</router-link></li>
  <li><router-link :to="{name:'Login'}">Log Out</router-link></li>
</ul>
<nav class="indigo">
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

        }
    },
     methods:{
        logout(){
            firebase.auth().signOut().then(()=>{
               this.$router.push({name:'Login'}) 
            })
        }
     }
}
</script>

<style>

</style>