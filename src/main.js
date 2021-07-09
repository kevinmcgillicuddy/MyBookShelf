import Vue from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import firebase from 'firebase';
import HighchartsVue from 'highcharts-vue';
import Highcharts from 'highcharts';

Highcharts.setOptions({lang: {thousandsSep: ','}});

Vue.config.productionTip = false
Vue.use(HighchartsVue)

firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
