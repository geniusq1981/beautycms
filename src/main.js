// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
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
    site:{
    	title:"司骞",
    	subtitle:"个人站",
    	description:"欢迎来到我的个人站",
    	avatarTitle:"elang",
    	avatarDesc:"Web Tech Lover",
    	url:"",
		social:{
   			weibo: "18554323665",
    		github: "geniusq1981",
   			mail: "sdudatebro@gmail.com"
		},
		cover_color:true
    },
    headnav:[
    {title:'所有文章',url:'/archive',des:'archive'},
    {title:'标签',url:'/tags',des:'tags'},
    {title:'关于我',url:'/about',des:'about'}
    ]
  },
  method: {
  	updatedata () {
  		console.log(this.router)
  		if(this.router){

  		}
  	}	
  },
  created () {
  	console.log("create~")
  },
  watch: {
  	//console.log("watch")
  	'$route' (to, from) {
  		console.log(to)
  		console.log(from)
    const toDepth = to.path.split('/').length
    const fromDepth = from.path.split('/').length
    this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    console.log(this.$route)
    console.log(this)
    this.isHomePage = this.$route.path == '/' ? false : true

  }
  },
  computed: {
  	//console.log("comopute")
  },

  components: { App },
  template: '<App/>'
})
