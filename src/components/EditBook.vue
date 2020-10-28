<template>
  <v-container class="grey lighten-5">
    <h2 class="center-align indigo-text">Edit Book</h2>
    <form @submit.prevent="editBook">
      <v-text-field v-model="Book.Title" label="Title:" required></v-text-field>
      <v-text-field
        v-model="Book.Author"
        type="Author"
        label="Author"
        required
      ></v-text-field>
      <v-text-field
        v-model="Book.Category"
        type="Category"
        label="Category [Novels, Non Fiction, Theology]:"
        required
      ></v-text-field>
      <v-checkbox v-model="Book.Owned" :label="`Owned`"></v-checkbox>
      <v-checkbox v-model="Book.Loan" :label="`Loaned Out`"></v-checkbox>
      <v-checkbox v-model="Book.ReadingNow" :label="`ReadingNow`"></v-checkbox>
      <v-btn class="mr-4" type="submit">Edit</v-btn>
    </form>
    <br />
    <p v-if="feedback" class="red--text">{{ feedback }}</p>
    <v-btn class="mr-4 red" @click="deleteBook">Delete</v-btn>
  </v-container>
</template>
<script>
import firestore from "@/firebase/init";
export default {
  Name: "EditBook",
  data() {
    return {
      feedback: null,
      Book: null,
      Author: null,
      Category: null,
      Loan: false,
      Owned: false,
      feedback: null,
      ReadingNow: false,
      Title: null,
    };
  },
  created() {
    let ref = firestore.collection("Bookshelf").doc(this.$route.params.id);
    ref.get().then((doc) => {
      this.Book = doc.data();
    });
  },
  methods: {
    editBook() {
      if (this.Book.Title && this.Book.Author) {
        this.feedback = null;
        firestore.collection("Bookshelf")
          .doc(this.$route.params.id)
          .update({
            Title: this.Book.Title,
            Author: this.Book.Author,
            Loan: this.Book.Loan,
            ReadingNow: this.Book.ReadingNow,
            Owned: this.Book.Owned,
            Category: this.Book.Category,
          })
          .then(() => this.$router.push({ name: "Shelf" }))
          .catch((err) => console.log(err));
      } else {
        this.feedback = "You must enter a title and author";
      }
    },
    deleteBook() {
      firestore.collection("Bookshelf")
        .doc(this.$route.params.id)
        .delete()
        .then(() => this.$router.push({ name: "Shelf" }));
    },
  }
}
</script>
<style>

</style>