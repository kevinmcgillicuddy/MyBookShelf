<template>
  <div>
    <div class="shelf" style="margin: 40px;">
      <h6>Here you can search a title of any book that is in the list</h6>
      <label for="fname">Search term:</label>
      <input type="text" id="fname" v-model="searchText">
      <ul class="collapsible popout">
        <h6 v-if="searchResults.length">Search results</h6>
        <li class="li" v-for="(book,index) in searchResults" :key="index">
          <div class="collapsible-header">
            <h5>
              {{ book.Title }}
            </h5>
          </div>
          <div class="collapsible-body">
            <p>Author: {{book.Author}}</p>
            <p>Category: {{book.Category}}</p>
            <div class="loan" v-if="book.Loan">on loan</div>
            <div class="owned" v-if="book.Owned">Owned</div>
               <router-link :to="{name:'EditBook', params:{id:book.id}}">
               <i class="material-icons">edit</i>
            </router-link>
          </div>
        </li>
      </ul>
    </div>
    <h5>Here is the list of avalaible books</h5>
    <ul class="collapsible popout" style="margin: 40px;">
      <li class="li" v-for="(book,index) in books" :key="index">
        <div class="collapsible-header">
          <h5>
             {{ book.Title }}
          </h5>
        </div>
        <div class="collapsible-body">
          <p>Author: {{book.Author}}</p>
          <p>Category: {{book.Category}}</p>
          <div class="loan" v-if="book.Loan">on loan</div>
          <div class="owned" v-if="book.Owned">Owned</div>
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
      books:[],
      searchText: ''
    }
  },
  mounted(){
       var DropDownElems = document.querySelectorAll('.dropdown-trigger');
        let options = {
          inDuration: 300,
          outDuration: 300,
          hover: true, // Activate on hover
          coverTrigger: false, // Displays dropdown below the button
          };
        M.Dropdown.init(DropDownElems,options);
        var ColapseElems = document.querySelectorAll('.collapsible');
       M.Collapsible.init(ColapseElems)

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
           if (!book.Title) return null;
          const stringTitle = book.Title.toString().toLowerCase()
          return stringTitle.match(this.searchText.toLowerCase())
      });
    }
  }
}
</script>
<style >
.loan{
  	background: #ccc;
    box-shadow: 4px 3px 8px 1px #969696;
  	-webkit-box-shadow: 4px 3px 8px 1px #969696;
    width: 150px;
    height: 150px;
}
.li{
  margin-left: 70px auto;
  margin-right: 70px auto;
 
}
.edit{
  left: 80%;
}
</style>