<template> 
    <article class="post-container post-container--single" itemscope="" itemtype="http://schema.org/BlogPosting">
         <div class="page card">
        <header class="post-header">
    <div class="post-meta">
      <time datetime="" itemprop="datePublished" class="post-meta__date date"></time>
      <span class="post-meta__tags tags"></span>
    </div>
    <h1 class="post-title">{{ page_title }}</h1>
        <hr></h1>
  </header>       
         <div v-for="(posts, index) in postbyyear">
         <div class="hat_title">
        <h3>{{index}}</h3>
      </div>
      <div class="post_list">
      <ul>  
    <li v-for="post in posts">
      <span>
        {{ post.date }}
      </span>
       &raquo; 
      <router-link :to="{path:'/blog/' + post.title}">{{ post.title }}</router-link>
    </li>
      </ul>
      </div>
      </div>
      </div>
  </article> 
</template>

<script>
import { butter } from '@/lib/buttercms'
export default {
  name: 'ArchivePage',
  data() {
    return {
      page_title: '所有文章',
      postbyyear: {}
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
        this.processByYear(this.posts)
      })
    },
    processByYear(ins) {
      var that = this
      let p
      ins.forEach((post, index) => {
        console.log(post)
        console.log(index)
        console.log(that)
        console.log(post.date)
        let year = new Date(post.date).getFullYear()
        console.log(year)
        if (this.postbyyear.hasOwnProperty(year)) {
          let data = this.postbyyear[year]
          data.push(post)
          this.$set(this.postbyyear, year, data)
        } else {
          let data = []
          data.push(post)
          this.$set(this.postbyyear, year, data)
        }
      })
    }
  },
  created() {
    this.getPosts()
  }
}
</script>

<style>
</style>
