<template>
 <v-container class="grey lighten-5">
<v-app-bar class="grey lighten-5" flat app >
          <v-app-bar-nav-icon @click="drawer = !drawer" class="grey--text"></v-app-bar-nav-icon>
        <v-toolbar-title class="text-uppercase">
          <span class="font-weight-light">Kevin's </span>
          <span>Bookshelf</span>
        </v-toolbar-title>
               <!-- <span class="text-uppercase">Total Books: <b>{{ searchResults.length }}</b></span> -->
        <v-spacer></v-spacer>
        <v-text-field v-model="searchText" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
        <v-spacer></v-spacer>
        
      </v-app-bar>
          <v-navigation-drawer app v-model="drawer" class="primary">
      <v-list>
              </v-list>
    </v-navigation-drawer>
 </v-container>
</template>

<script>

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
     }
}
</script>

<style>
</style>