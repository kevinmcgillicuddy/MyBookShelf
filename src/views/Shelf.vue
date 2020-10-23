<template>
  <v-container class="grey lighten-5">
     <br />
    <v-row align-content:stretch>
      <v-col v-for="book in searchResults" :key="book.id" cols="12" sm="3">
        <v-card class="mx-auto" min-height="250" outlined shaped elevation="24">
          <v-card-text>
            <div>Title:</div>
            <p class="display-1 text--primary">{{ book.Title }}</p>
            <p>Author:</p>
            <div class="text--primary">
              <b>{{ book.Author }}</b>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-chip color="blue" v-if="book.Owned" text-color="white">Owned</v-chip>
            <v-chip color="green" v-else text-color="white">Read</v-chip>
            <v-chip color="red" v-if="book.Loan" text-color="white">On Loan</v-chip>
            <v-spacer></v-spacer>
             <v-fab-transition>
      <v-btn

        fab
        small
        bottom
        left
        color="accent"
        outlined
        class="v-btn--example"
      >
      <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </v-fab-transition>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import db from "@/firebase/init";
import auth from "@/firebase/init.js";
import firebase from "firebase";
export default {
  name: "Shelf",
  data() {
    return {
      user: null,
      searchText: "",
       drawer: false
    };
  },
  mounted() {
  },
  created() {
    // this.user = auth.onAuthStateChanged((user) => {
    //   if (user) {
    //     this.user = user;
    //   } else {
    //     this.user = null;
    //   }
    // });
  },
  computed: {
    searchResults() {
      if (this.searchText.length === 0) return this.$store.state.books;
      return this.$store.state.books.filter((book) => {
        const string = JSON.stringify(book, [
          "Author",
          "Title",
          "Category",
        ]).toLowerCase();
        return string.match(this.searchText.toLowerCase());
      });
    },
  },
};
</script>
<style >
</style>