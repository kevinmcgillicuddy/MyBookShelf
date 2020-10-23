import Vue from 'vue';
import Vuex from 'vuex';
import db from '@/firebase/init'


Vue.use(Vuex);
let books = []

db.collection('Bookshelf').get()
  .then(snapshot => {
    snapshot.forEach(book => {
      let b = book.data()
      b.id = book.id
      books.push(b)
    });
  })


  export default new Vuex.Store({
  state: {
    books
  }
})
