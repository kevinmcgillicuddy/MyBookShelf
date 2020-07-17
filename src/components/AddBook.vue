<template>

<div class="add-book container">
  <h2 class="center-align indigo-text">New Book </h2>
  <form @submit.prevent="AddBook">
    <div class="field title">
      <label for="title">Title:</label>
      <input type="text" name="title" v-model="Title">
    </div>
    <div class="field author">
      <label for="author">Author:</label>
      <input type="text" name="author" v-model="Author">
    </div>
    <div class="row">
        <div class="col s6">
        <p>
            <label>
            <input class="with-gap" name="group1" type="radio" value="true" v-model="Owned" checked />
            <span>Owned</span>
            </label>
        </p>
        <p>
            <label>
            <input class="with-gap" name="group1" type="radio" value="false" v-model="Owned" />
            <span>Not Owned</span>
            </label>
        </p>
        </div>
     <div class="col s6">
      <p>
        <label>
          <input class="with-gap" name="group2" type="radio" value="true" v-model="ReadingNow" />
          <span>Reading Now</span>
        </label>
      </p>
      <p>
        <label>
          <input class="with-gap" name="group2" type="radio" value="false" v-model="ReadingNow" checked />
          <span>Not Reading Now</span>
        </label>
      </p>
      </div>
    </div>
    <div class="field center-align">
      <p v-if="feedback" class="red-text">{{ feedback }}</p>
      <button class="btn indigo">Add Book</button>
    </div>
    <div class="field center-align">
        <button class="btn indigo" @click="$router.push('Shelf')">Close</button>
    </div>
  </form>
</div>
</template>
<script>
import db from '@/firebase/init'
export default {
    name: 'AddBook',
    data(){
        return{
            Author:null,
            Loan:null,
            Owned: null,
            feedback:null,
            ReadingNow:null,
            Title:null
            }
    },
    methods: {
        AddBook(){
            if(this.Title && this.Author){
                db.collection('Bookshelf').add({
                    Author: this.Author,
                    Title: this.Title,
                    ReadingNow: this.ReadingNow,
                    Owned: this.Owned
                    })
                .then(()=>{
                    this.Author=null
                    this.Title=null
                })
                this.feedback = null
            }
            else{
                this.feedback = "You must enter all fields"
            }
        }
           
    }
}
</script>

<style>
.add-book{
    margin-top:60px;
    padding:20px;
    max-width:500px;
}
.add-book h2{
    margin:20px auto;
    font-size: 2em;
}
.add-book .field{
    margin:20px auto;
    position: relative;
}

</style>