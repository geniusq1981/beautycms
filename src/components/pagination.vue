<template>
  <div id="Pagination">
   <nav class="pagination" role="navigation">

	<!-- 百度搜索 -->
        <router-link v-if="pre_page" class="newer-posts pagination__newer btn btn-small btn-tertiary" :to="pre_page_path">&larr; 最近</router-link>
        <span class="pagination__page-number">{{ cur_page }} / {{ total_pages }}</span>
        <router-link v-if="next_page" class="older-posts pagination__older btn btn-small btn-tertiary" :to="next_page_path">更早 &rarr;</router-link>
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
  props:['cur_page','total_pages','pre_page','next_page','pre_page_path','next_page_path'],
  methods: {
    getPaginator() {
    	console.log(this.paginator)
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
  created() {
    this.getPaginator()
    this.loabdcs()
  }
}
</script>

<style>
</style>
