<template>
  <div id="Pagination">
   <nav class="pagination" role="navigation">

	<!-- 百度搜索 -->
        <router-link v-if="pg.pre_page" class="newer-posts pagination__newer btn btn-small btn-tertiary" :to="pg.pre_page_path">&larr; 最近</router-link>
        <span class="pagination__page-number">{{ pg.cur_page }} / {{ pg.total_page }}</span>
        <router-link v-if="pg.next_page" class="older-posts pagination__older btn btn-small btn-tertiary" :to="{path:'',query:{index:pg.next_page}}">更早 &rarr;</router-link>
	</nav>
  </div>
</template>

<script>
import { butter } from '@/lib/buttercms'

export default {
  name: 'Pagination',
  data() {
    return {
      
      }    
  },
  props:['pg'],
  methods: {
    getPaginator() {
    	 console.log(this)
    },
    loabdcs () {
   /*document.write(unescape('%3Cdiv id="bdcs"%3E%3C/div%3E'))
   var bdcs = document.createElement('script')
   bdcs.type = 'text/javascript';bdcs.async = true
   bdcs.src = 'http://znsv.baidu.com/customer_search/api/js?sid=12441349038163667913' + '&plate_url=' + encodeURIComponent(window.location.href) + '&t=' + Math.ceil(new Date()/3600000)
   var s = document.getElementsByTagName('script')[0]
   s.parentNode.insertBefore(bdcs, s)*/
    }
  },
  watch:{
    '$props':function(){
    	console.log(this.pg)
    },
  	'pre_page':function(){
  		console.log(this.pg.pre_page)
  	},
  	'cur_page':function(){
  		console.log(this.pg.cur_page)
  	},
  	'next_page':function(){
  		console.log(this.pg.next_page)
  	}
  },
  created() {
    this.getPaginator()
    this.loabdcs()
  }
}
</script>

<style>
</style>
