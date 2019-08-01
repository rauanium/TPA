import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebase from "firebase"
import VCalendar from 'v-calendar'
import Bars from 'vuebars'
import VueGoogleCharts from 'vue-google-charts'
import JsonExcel from 'vue-json-excel'

// import 'v-calendar/lib/v-calendar.min.css'
Vue.use(Bars)
Vue.use(VueGoogleCharts)

Vue.component('downloadExcel', JsonExcel)


Vue.config.productionTip = false
let app = ''

Vue.use(VCalendar, {
  firstDayOfWeek: 2,
  formats: {
    title: 'MMMM YYYY',
    weekdays: 'W',
    navMonths: 'MMM',
    input: [ 'DD-MM-YYYY', 'YYYY/MM/DD'],
    dayPopover: 'L', 
    data: [ 'YYYY-MM-DD', 'YYYY/MM/DD'] 
  },
})

var config = {
  apiKey: "AIzaSyBqZGzURz0Koc4OxVz5jS51_hUglGAkdvk",
  authDomain: "tpa-project-51920.firebaseapp.com",
  databaseURL: "https://tpa-project-51920.firebaseio.com",
  projectId: "tpa-project-51920",
  storageBucket: "tpa-project-51920.appspot.com",
  messagingSenderId: "901449627227"
};
firebase.initializeApp(config);
export const store = firebase.database()


firebase.auth().onAuthStateChanged(() =>{
  if(!app){
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
  }
})