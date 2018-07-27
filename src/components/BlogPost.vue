<template>
  <!--<div class="section" id="blog-post">
    <div class="container center">
      <div class="has-text-centered">
        <router-link v-if="post.data.previous_post" :to="{path:'/blog/' + post.data.previous_post.title, query:{index:post.meta.index-1}}" class="button">
         {{ post.data.previous_post.title }}
        </router-link>
        <router-link v-if="post.data.next_post" :to="{path:'/blog/' + post.data.next_post.title, query:{index:post.meta.index+1}}" class="button">
          {{ post.data.next_post.title }} >
        </router-link>
      </div>
      <hr>
      <h1 class="is-size-2">{{ post.data.title }}</h1>-->
      <!--<h4>{{ post.data.author.first_name }} {{ post.data.author.last_name }}</h4>-->
      <!--<div class="content" v-html="html"></div>
    </div>
  </div>-->
  <article class="post-container post-container--single" itemscope itemtype="http://schema.org/BlogPosting">
  <header class="post-header">
    <div class="post-meta">
      <time :datetime="post.data.date" itemprop="datePublished" class="post-meta__date date">{{post.data.date }}</time>
      <span class="post-meta__tags tags"></span>
    </div>
    <h1 class="post-title">{{ post.data.title }}</h1>
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
      post: {"meta":{"index":""},"data":{"title":"","slug":"","previous_post":"","next_post":"","date":""}},
      html: ""
    }
  },
  methods: {
    markdown () {
      
    },
    getPost () {
      console.log(this.$route.query.index)
      this.post.data.title = this.$route.params.slug
      this.post.meta.index =this.$route.query.index
      this.post.data.slug = this.$route.params.slug
      this.post.data.next_post = butter.post.getPostTitleByIndex(this.$route.query.index+1)||""
      this.post.data.previous_post = butter.post.getPostTitleByIndex(this.$route.query.index-1)||""
      console.log(this.post)
    },
    getContent () {
      /*console.log(this.$route.params)
      console.log(this.$route.query)*/
      butter.post.getContentByTitle(this.$route.params.slug)
        .then((res) => {
          //console.log(res.data)
          this.content = res.data
          this.html = marked(this.content)
        }).catch((res) => {
          console.log(res)
          this.html = "加载失败"
        })
    }     
  },
  computed: {
    compiledMarkdown () {
      console.log(this.content)
      this.content = "nihao"
      console.log(this.post)
      return marked(this.content)
    }
  },
  watch: {
    $route (to, from) {
      this.getPost()
      this.getContent()
    }
  },
  created () {
    this.getPost()
    this.getContent()
    this.markdown()
  },
  mounted () {
  },
}
</script>
<style>
</style>
