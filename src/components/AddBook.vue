<template>
  <v-container class="grey lighten-5">
    <h2 class="center-align indigo-text">Add Book</h2>
    <form @submit.prevent="addBook">
      <v-text-field 
      v-model="Title" 
      label="Title:" 
      required
      ></v-text-field>
      <v-text-field
        v-model="Author"
        type="Author"
        label="Author"
        required
      ></v-text-field>
      <v-text-field
        v-model="Category"
        type="Category"
        label="Category [Novels, Non Fiction, Theology]:"
        required
      ></v-text-field>
      <v-checkbox
      v-model="Owned"
      :label="`Owned`"
    ></v-checkbox>
    <v-checkbox
      v-model="Loan"
      :label="`Loaned Out`"
    ></v-checkbox>
    <v-checkbox
      v-model="ReadingNow"
      :label="`ReadingNow`"
    ></v-checkbox>
    <v-btn class="mr-4" type="submit">Add</v-btn>
    </form>
    <br />
    <p v-if="feedback" class="red--text">{{ feedback }}</p>
  </v-container>     
</template>
<script>
import firestore from "@/firebase/init";
export default {
  name: "AddBook",
  data() {
    return {
      Author: null,
      Category: null,
      Loan: false,
      Owned: false,
      feedback: null,
      ReadingNow: false,
      Title: null,
    };
  },
  methods: {
    addBook() {
      if (this.Title && this.Author) {
        firestore.collection("Bookshelf")
          .add({
            Author: this.Author,
            Title: this.Title,
            ReadingNow: this.ReadingNow,
            Owned: this.Owned,
            Loan: this.Loan,
            Category: this.Category,
          })
          .then(() => {
            this.Author = null;
            this.Title = null;
            this.Category = null;
            this.$router.push({ name: "Shelf" })
          });
        this.feedback = null;
      } else {
        this.feedback = "You must enter all fields";
      }
    },
  },
};
</script>

<style>
</style>