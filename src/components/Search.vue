<template>
    <div class="search" style="margin: 40px;">
<div class="container">
    <div class="row">
     
      <div class="col s6">
        <textarea id="icon_prefix2" class="materialize-textarea" v-model="searchText"></textarea>
        <label for="icon_prefix2">Search Author, Title or Category</label>
      </div>



      <div class="col s6"><blockquote style="border-left: 5px solid #01579b "><h5>{{searchResults.length}} out of {{VuexBooks.length}} Showing</h5></blockquote></div>
    </div>
</div>


<div class="index container">
    <div class="card" v-for="(book,index) in searchResults" :key="index">
      <div class="card-content indigo lighten-5">
        <h2 class="indigo-text card-title">{{ book.Title }}</h2>
        <ul class="card-content">
          <li>
            <p>
              <b>Author:</b>
              {{book.Author}}
            </p>
            <p>
              <b>Category:</b>
              {{book.Category}}
            </p>
            <p v-if="user">
              <router-link :to="{name:'EditBook', params:{id:book.id}}">
                <i class="material-icons">edit</i>
              </router-link>
            </p>
          </li>
        </ul>
      </div>
      <div class="card-action">
        <ul class="tag">
          <li>
            <div class="row">
              <div class="col s6 info" v-if="book.Owned">
                <span class="new badge blue" data-badge-caption="Owned"></span>
              </div>
              <div class="col s6 info" v-else>
                <span class="new badge cyan" data-badge-caption="Read"></span>
              </div>
              <div class="col s6 info" v-if="book.Loan">
                <span class="new badge red" data-badge-caption="OnLoan"></span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
import db from '@/firebase/init'
import firebase from 'firebase'
import M from 'materialize-css'
export default {
    name: 'Search',
    data(){
        return {
            searchText: '',
            user:null
        }
    },
    created(){
    this.user = firebase.auth().onAuthStateChanged(user=>{
            if (user){this.user = user}
            else{this.user = null}
        })
    },
     mounted(){  
      var ColapseElems = document.querySelectorAll('.collapsible');
      M.Collapsible.init(ColapseElems)
    },
     computed: {
     searchResults() {
     if (this.searchText.length === 0) return "";
      return this.$store.state.books.filter(book => {
          const string = JSON.stringify(book,['Author','Title','Category']).toLowerCase()
          return string.match(this.searchText.toLowerCase())
      });
     },
      VuexBooks(){
       return this.$store.state.books;
     } 
  }
}
</script>
<style>
</style>