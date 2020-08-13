<template>
  <div>
    <ul class="collapsible popout" style="margin: 40px;">
      <li class="li" v-for="(book,index) in VuexBooks" :key="index">
        <div class="row">
        <div class="collapsible-header ">
            <div class="col s6">
                <div v-if="!book.Loan" ><i class="material-icons">book</i>{{book.Title}}</div>
                <div v-else><i class="material-icons">people_outline</i>{{book.Title}}</div>
            </div>
            <div class="col s6">
                <div class="info" v-if="book.Owned"><span class= "new badge blue" data-badge-caption="Owned"></span></div>
                <div class="info" v-else><span class= "new badge cyan" data-badge-caption="Read"></span></div></div>
                <div class="info" v-if="book.Loan"><span class= "new badge red" data-badge-caption="OnLoan"></span></div>
                
            </div>        
        </div>
        <div class="collapsible-body">
          <p><b>Author:</b> {{book.Author}}</p>
          <p><b>Category:</b> {{book.Category}}</p>
          <p v-if="user"><router-link :to="{name:'EditBook', params:{id:book.id}}"><i class="material-icons">edit</i></router-link></p>
          <br>
        </div>
      </li>
    </ul>
    </div>
</template>
<script>
import db from '@/firebase/init'
import firebase from 'firebase'
import M from 'materialize-css'
export default {
  name: 'Shelf',
  data () {
    return {
      user:null
    }
  },
  mounted(){  
      var ColapseElems = document.querySelectorAll('.collapsible');
      M.Collapsible.init(ColapseElems)
    },
  created(){
    this.user = firebase.auth().onAuthStateChanged(user=>{
            if (user){this.user = user}
            else{this.user = null}
        }) 
    },
    computed: {
    VuexBooks(){
       return this.$store.state.books;
     }
  }
}
</script>
<style >
.loan{
  border: 1px solid red
}
.li{
  margin-left: 70px auto;
  margin-right: 70px auto;
 
}
.edit{
  left: 80%;
}
.info{
  float:right;
  display: flex; 
  justify-content: flex-end
}
</style>