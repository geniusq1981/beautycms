<template>
 <div>
 <div class="main-post-list">

  <ol class="post-list">
    <li v-for="post in cur_posts">
      <h2 class="post-list__post-title post-title">
      <router-link :to="{path:'/blog/' + post.title, query:{index:post.index}}" class="button">
          {{ post.title }} >
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
<Pagination v-bind:cur_page="cur_Page" v-bind:total_pages="total_Page" v-bind:pre_page="pre_page" v-bind:next_page="next_page" v-bind:next_page_path="next_page_path" v-bind:pre_page_path="pre_page_path"></Pagination>
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
      page_title: 'Blog',
      cur_posts:[],
      posts: [],
      categories: [],
      cur_Page:1,
      total_Page:10,
      pre_page:0,
      next_page:2,
      pre_page_path:"",
      next_page_path:""
    }
  },
  methods: {
    getPosts() {
      butter.post.list({
        page: 1,
        page_size: 10
      }).then((res) => {
        console.log(res.data)
        this.posts = res.data.data
        this.cur_Page=this.$route.query.page||1
        this.total_Page =this.posts.length/5
        this.pre_page = this.cur_Page-1 >0 ?this.cur_Page-1:""
        this.next_page = this.cur_Page+1 >this.total_Page? this.cur_Page+1:""
        this.cur_posts = this.posts.slice((this.cur_Page-1)*5,5*this.cur_Page)
        console.log(this.cur_posts)
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
    }
  },
  created() {
    this.getPosts()
    this.getCategories()
    this.getPostsByCategory()
  }
}
</script>

<style>
</style>
