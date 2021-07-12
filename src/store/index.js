import Vue from 'vue';
import Vuex from 'vuex';
import firestore from '@/firebase/init';

Vue.use(Vuex);
let books = [];

let years = [2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021];
let categories = [1,2,3];

let chartDataPages = [];
let chartDataBooks = [];


async function getAllBooks(){
 await  firestore.collection('Bookshelf').get()
  .then(snapshot => {
    snapshot.forEach(book => {
      let b = book.data()
      b.id = book.id
      books.push(b)
    });
  })
}

async function getPagesPerYear(year){
  let pagesRead = 0;
  await getAllBooks()
  for (const book of books){
    if (book.year == year){
      pagesRead += parseInt(book.pages)
    }
    return pagesRead;
  }
}

async function getBooksPerYear(year){
  let booksRead = 0;
  for (const book of books){
    if (book.year == year){
      booksRead += parseInt(book.id)
    }
    return booksRead;
  }
}
// async function getPages(year) {
//   let pagesRead = 0;

//   let firestoreRef = firestore.collection('Bookshelf').where("year_read", "==", year);
//   let allBooks = await firestoreRef.get();

//   let numBooks = allBooks.docs.length
//   chartDataBooks.push(numBooks)

//   for (const doc of allBooks.docs) {
//     pagesRead += parseInt(doc.data().pages)
//   }
//   return pagesRead;
// }

async function populateData(years) {

  for (const elem of years) {
    let insertResponse = await getPages(parseInt(elem))
    chartDataPages.push(insertResponse)
  }
  return chartDataPages;
}

// populateData(years)
getPagesPerYear(2006).then(res => console.log(res));




export default new Vuex.Store({
  state: {
    books,
    chartDataPages,
    chartDataBooks,
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
