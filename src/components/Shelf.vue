<template>
  <div class="index container">
    <div class="card" v-for="(book,index) in VuexBooks" :key="index">
      <div class="card-content indigo lighten-5">
        <h2 class="indigo-text card-title">{{ book.Title }}</h2>
        <ul class="card-content">
          <li>
            <p>
              <b>Author:</b>
              {{book.Author}}
            </p>
            <p>
              <b>Category:</b>
              {{book.Category}}
            </p>
            <p v-if="user">
              <router-link :to="{name:'EditBook', params:{id:book.id}}">
                <i class="material-icons">edit</i>
              </router-link>
            </p>
          </li>
        </ul>
      </div>
      <div class="card-action">
        <ul class="tag">
          <li>
            <div class="row">
              <div class="col s6 info" v-if="book.Owned">
                <span class="new badge blue" data-badge-caption="Owned"></span>
              </div>
              <div class="col s6 info" v-else>
                <span class="new badge cyan" data-badge-caption="Read"></span>
              </div>
              <div class="col s6 info" v-if="book.Loan">
                <span class="new badge red" data-badge-caption="OnLoan"></span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import db from "@/firebase/init";
import firebase from "firebase";
import M from "materialize-css";
export default {
  name: "Shelf",
  data() {
    return {
      user: null,
    };
  },
  mounted() {
    var ColapseElems = document.querySelectorAll(".collapsible");
    M.Collapsible.init(ColapseElems);
  },
  created() {
    this.user = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  },
  computed: {
    VuexBooks() {
      return this.$store.state.books;
    },
  },
};
</script>
<style >
.loan {
  border: 1px solid red;
}
.tag li {

  display: inline;
}
.edit {
  left: 80%;
}
.info {
  /* float:right; */
  display: flex;
  /* justify-content: flex-end */
}

.index {
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 5px;
  margin-top: 60px;
}
.index h2 {
  font-size: 1.8em;
  text-align: center;
  margin-top: 0;
}

</style>