// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//import stylesheet
require('./styles/application.css')
require('vue-material/dist/vue-material.css')
require('bootstrap/dist/css/bootstrap.min.css')

import Vue from 'vue'
import App from './App'
import router from './router'
import VueMaterial from 'vue-material'
import VueFire from 'vuefire'
import * as VueGoogleMaps from 'vue2-google-maps';
import VueSession from 'vue-session'

//include vue-material plug-in
Vue.use(VueMaterial)
//include vuefire plug-in
Vue.use(VueFire)
//include vue2-google-map
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBfKA94ZnVcppyzxqGeLYZAj4_k8IRSvTQ',
    v: '3.26',  // Google Maps API version 
    libraries: 'places'
  }
})

//Set flag comment
localStorage.setItem("comment_flag", false);

Vue.use(VueSession)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
