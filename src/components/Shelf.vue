<template>
 <div class="shelf" style="margin-top: 40px;">
<!-- Dropdown Structure -->
<ul id="dropdown1" class="dropdown-content">
  <li><a href="#!">one</a></li>
  <li><a href="#!">two</a></li>
  <li class="divider"></li>
  <li><a href="#!">three</a></li>
</ul>
<nav>
  <div class="nav-wrapper">
    <a href="#!" class="brand-logo">Logo</a>
    <ul class="right hide-on-med-and-down">
      <li><a href="sass.html">Sass</a></li>
      <li><a href="badges.html">Components</a></li>
      <!-- Dropdown Trigger -->
      <li><a class="dropdown-trigger" href="#!" data-target="dropdown1">Dropdown<i class="material-icons right">arrow_drop_down</i></a></li>
    </ul>
  </div>
</nav>

    <!-- <nav class="nav-extended blue darken-3">
         <div class="nav-content">
           <span class="nav-title">Bookshelf</span>
        </div>
    </nav> -->
  <ul class="collapsible" >
      <li v-for="(book,index) in books" :key="index"> 
        <div class="collapsible-header header">{{book.Title}}</div>
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
      // M.AutoInit()
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
    }
  }
  
</script>


<style >
.header{
  margin-left: 40px auto;
  margin-right: 40px auto;
}
.loan{
  	background: #ccc;
    box-shadow: 4px 3px 8px 1px #969696;
  	-webkit-box-shadow: 4px 3px 8px 1px #969696;
    width: 150px;
    height: 150px;
}
</style>
