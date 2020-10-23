<template>
  <div class="edit-book container">
    <h2 class="center-align indigo-text">Edit Book </h2>
    <form @submit.prevent="editBook">
      <div class="field title">
        <label for="title">Title:</label>
        <input type="text" name="title" v-model="Book.Title">
      </div>
      <div class="field author">
        <label for="author">Author:</label>
        <input type="text" name="author" v-model="Book.Author">
      </div>
      <div class="field category">
        <label for="author">Category:</label>
        <input type="text" name="Novel, Theology, Non Fiction" v-model="Book.Category">
      </div>   
      <div class="row">
          <div class="col s6">
            <p>
              <label>
                <input class="with-gap" type="checkbox"  id="checkbox" v-model="Book.Loan" />
                <span>Loaned Out</span>
              </label>
            </p>
            <p>
              <label>
                <input class="with-gap" type="checkbox"  id="checkbox" v-model="Book.ReadingNow" />
                <span>Reading Now</span>
              </label>
            </p>
          </div>
      <div class="col s6">
        <p>
          <label>
              <input class="with-gap" type="checkbox"  id="checkbox" v-model="Book.Owned" />
              <span>Owned</span>
          </label>
        </p>
        </div>
      </div>
      <div class="field center-align ">
        <p v-if="feedback" class="red-text">{{ feedback }}</p>
        <button class="btn indigo">Update Book</button>
      </div>
      
  </form>
  <div class="field center-align">
          <button class="btn indigo" @click="$router.push('/')">Close</button>
    </div>
  <div class="divider"></div>
    <div class="field center-align">
          <button class="btn red" @click="deleteBook"><i class="material-icons right">delete</i>Delete</button>
    </div>
  <div>
   </div>
 </div>
</template>
<script>
import db from '@/firebase/init'
import firebase from 'firebase'
export default {
    Name: 'EditBook',
    data(){
        return{
            feedback:null,
            Book:null
        }
    },
    created(){
       let ref= db.collection('Bookshelf').doc(this.$route.params.id)
       ref.get().then(doc =>{
           this.Book = doc.data()
        })
    },
    methods:{
      editBook(){
        if (this.Book.Title && this.Book.Author ){
                this.feedback = null
                db.collection('Bookshelf').doc(this.$route.params.id).update({
                    Title: this.Book.Title,
                    Author: this.Book.Author,
                    Loan: this.Book.Loan,
                    ReadingNow: this.Book.ReadingNow,
                    Owned: this.Book.Owned,
                    Category: this.Book.Category
                   })
                   .then(()=> this.$router.push({name:'Shelf'}))
                   .catch((err)=> console.log(err))
            }
            else{
                this.feedback = "You must enter a title and author"
            }
        },
        deleteBook(){
      db.collection('Bookshelf').doc(this.$route.params.id).delete().then(()=> this.$router.push({name:'Shelf'}))
      }
    }

}
</script>
<style>
.edit-book{
    margin-top:60px;
    padding:20px;
    max-width:500px;
}
.edit-book h2{
    margin:20px auto;
    font-size: 2em;
}
.edit-book .field{
    margin:20px auto;
    position: relative;
}

</style>