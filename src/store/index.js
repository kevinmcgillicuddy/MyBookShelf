import Vue from 'vue';
import Vuex from 'vuex';
import firestore from '@/firebase/init';

Vue.use(Vuex);
let books = [];

let years = [2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021];
let categories = [1,2,3];

let chartDataPagesPerYear = [];
let chartDataBooksPerYear = [];


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

// async function getPagesPerYear(year){
//   let pagesRead = 0;
//   for (const book of books){
//     console.log(book.pages)
//     if (book.date_read == year){
//       pagesRead += parseInt(book.pages)
//     }
//     return pagesRead;
//   }
// }

// async function getBooksPerYear(year){
//   let booksRead = 0;
//   for (const book of books){
//     if (book.year == year){
//       booksRead += parseInt(book.id)
//     }
//     return booksRead;
//   }
// }


async function populateData(years) {

  await getAllBooks();
  let pagesRead = 0;
  let booksRead = 0;
  const addArrayItems = (accumulator, currentValue) => accumulator + currentValue;

  for (const year of years) {
    let BooksPerYearResponse = books.filter(book => book.year_read == parseInt(year));
    // console.log(BooksPerYearResponse)
    chartDataBooksPerYear.push(BooksPerYearResponse.length)


    let result = books.flatMap(a => parseInt(a.year_read));
    console.log(result)
    let PagesPerYearResponse = books.filter(book => book.year_read == parseInt(year));
    // console.log(PagesPerYearResponse)
    // console.log(PagesPerYearResponse.reduce(addArrayItems))
    chartDataPagesPerYear.push(PagesPerYearResponse.reduce(addArrayItems))

    // console.log(chartDataPagesPerYear)
    // PagesPerYearResponse = books.filter(book=>)
    // let PagesPerYearResponse = await getPagesPerYear(parseInt(year))
    // chartDataPagesPerYear.push(PagesPerYearResponse)
    // let BooksPerYearResponse = await getBooksPerYear(parseInt(year))
    // chartDataBooksPerYear.push(BooksPerYearResponse)
  }
}

populateData(years).then(d=>console.log(d))
// getAllBooks()



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
