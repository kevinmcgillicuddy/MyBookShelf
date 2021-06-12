import Vue from 'vue';
import Vuex from 'vuex';
import firestore from '@/firebase/init'


Vue.use(Vuex);
let books = [];
let YearBooks = [];

firestore.collection('Bookshelf').get().then(snapshot => {
  snapshot.forEach(book => {
      
      let b = book.data()
      b.id = book.id
      books.push(b)
   
      
      switch (b.date_read){
        case '2003':
          YearBooks[0]
          break
      }
    });
  })


  export default new Vuex.Store({
  state: {
    books,
    user: {
      loggedIn: false,
      data: null
    }
  },
  getters: {
    user(state){
      return state.user
    },
    book(){
      return this.book
    }
  },
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    SET_USER(state, data) {
      state.user.data = data;
    }
  },
  actions: {
    fetchUser({ commit }, user) {
      commit("SET_LOGGED_IN", user !== null);
      if (user) {
        commit("SET_USER", {
          displayName: user.displayName,
          email: user.email
        });
      } else {
        commit("SET_USER", null);
      }
    }
  }
})
