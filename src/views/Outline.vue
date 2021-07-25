<template>
    <v-container>
    <v-app-bar class="grey lighten-4" flat app>
      <v-row no-gutters style="margin-bottom: 5px; margin-top: 15px">
        <v-col cols="12" sm="6">
          <v-toolbar-title class="text-uppercase">
            <span class="font-weight-light">Kevin's </span><span>Bookshelf</span>
          </v-toolbar-title>
        </v-col>
      </v-row>
    </v-app-bar>
     
     <v-navigation-drawer
      app
      v-model="drawer"
      class="primary"
      permanent
      expand-on-hover
    >
      <v-list-item :to="'/'">
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

      <v-list-item :to="'Charts'">
        <v-list-item-icon>
          <v-icon>mdi-chart-bar</v-icon>
        </v-list-item-icon>
        <v-list-item-title >Charts</v-list-item-title>
      </v-list-item>

    </v-navigation-drawer>
      </v-container >
      </template>
      <script>
import { mapGetters } from "vuex";
export default {
  name: "outline",
  data() {
    return {
      drawer: false,
    };
  },
  method:{
     logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({ name: "/" });
        });
    }
  },
  computed: {
    totalBooks() {
      return this.$store.state.books;
    },
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: "user",
      book: "book"
    }),
  },
};
</script>
<style>
  a {
    color:black !important
  }
</style>