<template>
 <div class="main-post-list">

  <ol class="post-list">
    <li v-for="post in posts">
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
</template>

<script>
import { butter } from '@/lib/buttercms'
export default {
  name: 'blog-home',
  data () {
    return {
      page_title: 'Blog',
      posts: [],
      categories: []
    }
  },
  methods: {
    getPosts () {
      butter.post.list({
        page: 1,
        page_size: 10
      }).then((res) => {
        console.log(res.data)
        this.posts = res.data.data
      })
    },
    getCategories () {
      butter.category.list()
        .then((res) => {
          console.log('List of Categories:')
          console.log(res.data.data)
        })
    },
    getPostsByCategory () {
      butter.category.retrieve('example-category', {
        include: 'recent_posts'
      })
        .then((res) => {
          console.log('Posts with specific category:')
          console.log(res)
        })
    }
  },
  created () {
    this.getPosts()
    this.getCategories()
    this.getPostsByCategory()
  }
}
</script>

<style>

</style>
