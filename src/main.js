// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import config from './config'
import 'font-awesome/css/font-awesome.min.css'
import '../static/css/main.css'  

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  data: {
    // declare message with an empty value
    message: 'hello',
    isHomePage: false,
    site:config.site,
    headnav:config.headnav,
    pagesetting:config.pagesetting,
    pagestatus:config.pagestatus,
    posts:{}
  },
  method: {
  	updatedata () {
  		if(this.router){
  		}
  	}	
  },
  created () {
  	this.isHomePage = this.$route.path == '/' ? false : true
  },
  watch: {
  	//console.log("watch")
  	'$route' (to, from) {
  	  //console.log(to)
  	  //console.log(from)
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
      this.isHomePage = this.$route.path == '/' ? false : true
  }
  },
  computed: {
  	//console.log("comopute")
  },
  components: { App },
  template: '<App/>'
})
