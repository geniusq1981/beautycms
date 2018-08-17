<template>
 <div>
 <div class="main-post-list">
  <ol class="post-list">
    <li v-for="(post,index) in cur_posts">
      <h2 class="post-list__post-title post-title">
      <router-link :to="{path:'/blog/' + post.title, query:{index:index}}" class="button">
          {{ post.slug }} >
        </router-link>
        </h2>
      <p class="excerpt">{{ post.des}}</p>
      <div class="post-list__meta">        
        <time :datetime="post.date" class="post-list__meta--date date">
          <img src="../../static/images/calendar.png" width="20px" /> 
          {{ post.date}}</time> 
        <div class = "tag-img-icon">
          <img src="../../static/images/tag-icon.svg" width="20px" /> 
        </div>
          <router-link :to="{path:'/tags'}">
          <div class = "post-list-icon-mate">
            <span class="post-list__meta--tags-right">{{ post.tags }}</span>
          </div>
          </router-link>
          <div class = "post-list-small-mate">
           <router-link :to="{path:'/blog/' + post.title, query:{index:post.index}}" class="btn-border-small">
          阅读全文 »
        </router-link>
          </div>
      </div>
      <hr class="post-list__divider" />
    </li>
  </ol>
</div>
<Pagination v-bind:pg="pagination"></Pagination>
</div>
</template>

<script>
import { butter } from '@/lib/buttercms'
import Pagination from '@/components/pagination'
export default {
  name: 'blog-home',
  components: {
      Pagination
  },
  data() {
    return {
      pagination:{
        cur_page:this.$route.query.index||1,
        total_page:10,
        next_page:2,
        pre_page:0,
        pre_page_path:"",
        next_page_path:""
      },
      pagesize:this.$root.pagesetting.homepagecount,
      page_title: 'Blog',
      cur_posts:[],
      posts: this.$root.posts,
      categories: []
    }
  },
  methods: {
    getPosts() {
      butter.post.list({
        page: 1,
        page_size: 10
      }).then((res) => {
        //console.log(res.data)
        this.posts = res.data.data
        this.getPogination()
      })
    },
    getCategories() {
      butter.category.list()
        .then((res) => {
          console.log('List of Categories:')
          console.log(res.data.data)
        })
    },
    getPostsByCategory() {
      butter.category.retrieve('example-category', {
        include: 'recent_posts'
      })
        .then((res) => {
          console.log('Posts with specific category:')
          console.log(res)
        })
    },
    getPogination (){
        this.pagination.cur_page=this.$route.query.index||1
        this.pagination.total_page =Math.ceil(this.posts.length/this.pagesize)
        this.pagination.pre_page = this.pagination.cur_page-1 >0 ?this.pagination.cur_page-1:""
        this.pagination.next_page = this.pagination.cur_page+1 <=this.pagination.total_page? this.pagination.cur_page+1:""
        this.cur_posts = this.posts.slice((this.pagination.cur_page-1)*this.pagesize,this.pagesize*this.pagination.cur_page)
    }
  },
  computed:{
  },
  watch:{
   '$route' (to, from) {
       this.getPogination()
      }
  },
  created() {
  },
  mounted() {
    //console.log(this.posts)
    if(!this.posts.length) {
      this.getPosts()
    }else {
      this.getPogination()
    }
    //this.getCategories()
    //this.getPostsByCategory()
  }
}
</script>

<style>
</style>
