<template>
  <v-container class="grey lighten-5">
<form @submit.prevent="login">
       <v-text-field v-model="email" label="Email" required></v-text-field>
        <v-text-field v-model="password" label="Password" required></v-text-field>
      <v-btn class="mr-4" type="submit" :disabled="invalid">Login</v-btn>
    </form>
    <br >
    <p v-if="feedback" class="red--text">{{feedback}}</p>
  </v-container>
</template>

<script>
import firebase from 'firebase'
export default {
 name: 'Login',
  data () {
    return {  
        feedback:null,
        password:null,
        email:null
    }
  },
  methods:{
      login(){
          if(this.email && this.password){
              firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                .then(()=>{
                    this.$router.push({name:'Shelf'})
                    this.feedback = null
            }).catch(err=> {this.feedback =  err.message})
          }
          else{
              this.feedback = "You must enter a email and password"
          }         
      }
  }
  }
</script>
<style>
</style>