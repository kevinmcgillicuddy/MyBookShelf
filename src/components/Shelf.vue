<template>
 <div class="shelf" style="margin-top: 40px;">
   <label for="fname">Search term:</label>
  <input type="text" id="fname" v-model="term">
 <div v-for="(book, index) in foundedBooks" :key="index">
  {{ index+1 }}. {{ book.Title }}
</div>
  <ul class="collapsible popout" >
      <li class = "li" v-for="(book,index) in books" :key="index"> 
        <div class="collapsible-header flow-text"><i class="material-icons">library_books</i>{{book.Title}}</div>
          <div class="collapsible-body">
            <div class="container">
                <div class="row">
                  <div class="col s6 flow-text"><b>Author:</b> {{book.Author}}</div>
                  <div class="col s6 flow-text"><b>Category:</b> {{book.Category}}</div>
                  <div class="col s6">
                    <div class="loan flow-text" v-if="book.Loan"><i class="material-icons">check</i>On loan</div>
                    <div class="owned flow-text" v-if="book.Owned"><i class="material-icons">check</i>Owned</div></div>
                  <div class="col s6">
                    <router-link :to="{name:'EditBook', params:{id:book.id}}"><a class="btn-floating btn-small waves-effect waves-light indigo"><i class="material-icons">edit</i></a></router-link>
                  </div>
                </div>
            </div>
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
      term: ''
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
 computed: {
  filteredBooks() {
    const foundedBooks = this.books.filter(book => {  
        const regex = new RegExp(this.term.trim());
        return String(book.Title).match(regex)   
    });
  
    return foundedBooks;
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
