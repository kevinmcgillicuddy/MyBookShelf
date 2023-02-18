import Vue from 'vue';
import Vuex from 'vuex';
import firestore from '@/firebase/init';

Vue.use(Vuex);
let books = [];
let years = [2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023];
let chartDataPagesPerYear = [];
let chartDataBooksPerYear = [];

async function getAllBooks() {
  await firestore.collection('Bookshelf').get()
    .then(snapshot => {
      snapshot.forEach(book => {
        let b = book.data()
        b.id = book.id
        books.push(b)
      });
    })
}

async function populateData(years) {

  await getAllBooks();
  const addArrayItems = (total, amount) => total + amount;

  for (const year of years) {
    let BooksPerYearResponse = books.filter(book => parseInt(book.year_read) == year);
    chartDataBooksPerYear.push(BooksPerYearResponse.length)


    let PagesPerYearFilter = books.filter(book => parseInt(book.year_read) == year)
    let PagesPerYearMap = PagesPerYearFilter.map(book => parseInt(book.pages))
    chartDataPagesPerYear.push(PagesPerYearMap.reduce(addArrayItems))
  }
}

populateData(years).then(d => console.log(d))

export default new Vuex.Store({
  state: {
    books,
    chartDataPagesPerYear,
    chartDataBooksPerYear,
    user: {
      loggedIn: false,
      data: null
    }
  },
  getters: {
    user(state) {
      return state.user
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
