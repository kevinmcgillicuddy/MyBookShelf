<template>
      
    <div class="shelf" style="margin: 40px;">
      <div class="row">
    <div class="col s12">
      <div class="row">
        <div class="input-field col s6">
          <i class="material-icons prefix">search</i>
          <textarea id="icon_prefix2" class="materialize-textarea" v-model="searchText"></textarea>
          <label for="icon_prefix2">Search Author, Title or Category</label>
        </div>
      </div>
    </div>
  </div>
    <ul class="collapsible popout" style="margin: 40px;">
    <h6 v-if="searchResults.length">Search results</h6>
      <li class="li" v-for="(book,index) in searchResults" :key="index">
        <div class="collapsible-header ">
          <div v-if="!book.Loan" ><i class="material-icons">book</i>{{book.Title}}</div>
          <div v-else><i class="material-icons">people_outline</i>{{book.Title}}</div>
          <span class= "new badge blue" data-badge-caption="Owned" v-if="book.Owned"></span>
        </div>
        <div class="collapsible-body">
          <p><b>Author:</b> {{book.Author}}</p>
          <p><b>Category:</b> {{book.Category}}</p>
          <p v-if="user"><router-link :to="{name:'EditBook', params:{id:book.id}}"><i class="material-icons">edit</i></router-link></p>
          <span class= "new badge red" data-badge-caption="On Loan" v-if="book.Loan"></span>
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
    
    name: 'Search',
    data(){
        return {
            searchText: '',
            books:[]
        }
    },
    created(){
     db.collection('Bookshelf').get()
      .then(snapshot=>{
        snapshot.forEach(book => {
          let b = book.data()
          b.id = book.id
          this.books.push(b)
             });
      })
    },
     computed: {
     searchResults() {
     if (this.searchText.length === 0) return "";
      return this.books.filter(book => {
          const string = JSON.stringify(book,['Author','Title','Category']).toLowerCase()
          return string.match(this.searchText.toLowerCase())
      });
    }
  }
}
</script>
<style>

</style>

