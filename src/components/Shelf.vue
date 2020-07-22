<template>
 <div class="shelf" style="margin-top: 40px;">
   <label for="fname">Search term:</label>
  <input type="text" id="fname" v-model="searchText">
  <h2> {{ searchResults }} </h2>

  <ul class="collapsible popout" >
      <li class = "li" v-for="(book,index) in books" :key="index"> 
        <div class="collapsible-header"><i class="material-icons">library_books</i>{{book.Title}}</div>
          <div class="collapsible-body">
            <span>Author: {{book.Author}}</span>
             <span>Category: {{book.Category}}</span>
              <div class="loan" v-if="book.Loan">on loan</div>
              <div class="owned" v-if="book.Owned">Owned</div>
                 <router-link :to="{name:'EditBook', params:{id:book.id}}">
                  <i class="material-icons">edit</i>
                  </router-link>
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
          //add in doc id to property
          b.id = book.id
          this.books.push(b)
          });
      })
    },
  Computed:{
    searchResults: function () {
      if (this.searchText.length === 0) return '';
      return this.books.filter(book => book.Title.match(this.searchText))
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
  width: 500px auto;
  
}
</style>
