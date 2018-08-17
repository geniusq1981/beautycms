<template>
  <article class="post-container post-container--single" itemscope itemtype="http://schema.org/BlogPosting">
  <header class="post-header">
    <div class="post-meta">
      <time :datetime="post.data.date" itemprop="datePublished" class="post-meta__date date">{{post.data.date}}</time>
      <span class="post-meta__tags tags"></span>
    </div>
    <h1 class="post-title">{{ post.data.slug }}</h1>
  </header>
  <section class="post">
    <div class="content" v-html="html"></div>
  </section>
</article>
</template>
<script>
import { butter } from '@/lib/buttercms'
import marked  from 'marked'
export default {
  name: 'blog-post',
  data () {
    return {
      posts: this.$root.posts,
      post: {"meta":{"index":""},"data":{"title":"","slug":"","previous_post":"","next_post":"","date":""}},
      html: ""
    }
  },
  methods: {
    markdown () {      
    },
    getPosts() {
      butter.post.list({
        page: 1,
        page_size: 10
      }).then((res) => {
        //console.log(res.data)
        this.posts = res.data.data
        this.getPost()
        this.getContent()
      })
    },
    getPost () {
      this.post.data.slug = butter.post.getPostInfoByTitle(this.$route.params.slug).slug
      this.post.meta.index =this.$route.query.index
      this.post.data.title = this.$route.params.slug
      //this.post.data.next_post = butter.post.getPostTitleByIndex(this.$route.query.index+1)||""
      //this.post.data.previous_post = butter.post.getPostTitleByIndex(this.$route.query.index-1)||""
      //console.log(this.post)
    },
    getContent () {
      butter.post.getContentByTitle(this.$route.params.slug)
        .then((res) => {
          //console.log(res.data)
          this.content = res.data
          this.html = marked(this.content)
        }).catch((err) => {
          this.html = "加载失败"
        })
    }     
  },
  computed: {
    formatDate (strTime) {
       var date = new Date(strTime)
       return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
    }
  },
  watch: {
    $route (to, from) {
      this.getPost()
      this.getContent()
    }
  },
  created () {
    
  },
  mounted () {
    if(!this.posts.length) {
      this.getPosts()
    }else {
      this.getPost()
      this.getContent()
    }
  },
}
</script>
<style>
</style>
