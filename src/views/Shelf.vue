<template>
  <v-container class="grey lighten-5">
    <v-app-bar class="grey lighten-5" flat app>
      <!-- <v-app-bar-nav-icon @click="drawer = !drawer" class="grey--text"></v-app-bar-nav-icon> -->
      <v-toolbar-title class="text-uppercase">
        <span class="font-weight-light">Kevin's </span>
        <span>Bookshelf</span>
      </v-toolbar-title>
     
      <v-spacer></v-spacer>
      <v-text-field
        v-model="searchText"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      <v-spacer></v-spacer>
       <span class="text-uppercase">Total Books: <b>{{ searchResults.length }}</b></span>
    </v-app-bar>
    <v-navigation-drawer
      app
      v-model="drawer"
      class="primary"
      permanent
      expand-on-hover
    >
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
        <v-list-item v-if="!user.loggedIn" :to="'Login'">
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Login</v-list-item-title>
        </v-list-item>
        <v-list-item v-if="user.loggedIn" :to="'AddBook'">
          <v-list-item-icon>
            <v-icon>mdi-book-plus</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Add Book</v-list-item-title>
        </v-list-item>
        <v-list-item v-if="user.loggedIn">
          <v-list-item-icon>
            <v-icon>mdi-account-arrow-left</v-icon>
          </v-list-item-icon>
          <v-list-item-title link @click="logout">Logout</v-list-item-title>
        </v-list-item>
    </v-navigation-drawer>
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
            <v-chip color="blue" v-if="book.Owned" text-color="white"
              >Owned</v-chip
            >
            <v-chip color="green" v-else text-color="white">Read</v-chip>
            <v-chip color="red" v-if="book.Loan" text-color="white"
              >On Loan</v-chip
            >
            <v-spacer></v-spacer>
            <v-fab-transition>
              <v-btn
                v-if="user.loggedIn"
                fab
                small
                bottom
                left
                color="accent"
                outlined
                class="v-btn--example"
                :to="{name:'EditBook', params:{id:book.id}}"
                ><v-icon>mdi-pencil</v-icon></v-btn
              >
            </v-fab-transition>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
// import db from "@/firebase/init";
// import auth from "@/firebase/init.js";
import firebase from "firebase";
export default {
  name: "Shelf",
  data() {
    return {
      searchText: "",
      drawer: false,
    };
  },
  methods: {
    logout() {
      // firebase.auth().signOut().then(()=>{
      //    this.$router.push({name:'/'})
      // })
    },
  },
  mounted() {},
  created() {},
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
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: "user",
    }),
  },
};
</script>
<style >
</style>