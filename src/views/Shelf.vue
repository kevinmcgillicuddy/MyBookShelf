<template>
    <v-container>
    <center>
    <div style="width:350px; margin-bottom:20px;">
    <v-text-field
            v-model="searchText"
            placeholder="Enter Author or Title"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          </div>
          </center>
           <v-spacer></v-spacer>
    <v-row>
      <v-col v-for="book in searchResults" :key="book.id" col="4">
        
        <v-card class="mx-auto" height="170" width="300" outlined  elevation="5">
           <v-card-title><div style="width: 225px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">{{ book.Title }}</div></v-card-title>
           <v-card-text>{{ book.Author }}</v-card-text>
          <v-spacer></v-spacer>

          <v-card-actions>
       
            <v-chip color="blue" v-if="book.Owned" text-color="white" class="chip">Owned</v-chip>
            <v-chip color="green" v-else text-color="white" class="chip">Read</v-chip>
            <v-chip color="red" v-if="book.Loan" text-color="white" class="chip">On Loan</v-chip>
       
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
                :to="{ name: 'EditBook', params: { id: book.id } }"
                ><v-icon>mdi-pencil</v-icon></v-btn>
            </v-fab-transition>
          </v-card-actions>

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
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
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({ name: "/" });
        });
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
<style>
.chip{
  margin-right:7px;
}


</style>