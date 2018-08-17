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
         <div v-for="(posts,index) in postbytags">
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
      <router-link :to="{path:'/blog/' + post.title}">{{ post.slug }}</router-link>
    </li>
      </ul>
      </div>
      </div>
      </div>
  </article> 

</template>

<script>
import { butter } from '@/lib/buttercms'
import Pagination from '@/components/pagination'
export default {
  name: 'TagsPage',
  data () {
    return {
      page_title: '标签分类',
      postbytags: {}
  }
  },
  methods: {
   getPosts () {
      butter.post.list({
        page: 1,
        page_size: 10
      }).then((res) => {
        this.posts = res.data.data
        this.processByTag(this.posts)
      })
    },
    processByTag (ins) {
        var that = this
        let p
        ins.forEach((post,index)=>{
            let tag = post.tags
            if(this.postbytags.hasOwnProperty(tag)){
              let data =this.postbytags[tag]
              data.push(post)
              this.$set(this.postbytags,tag,data)
            }else{
              let data = []
              data.push(post)
              this.$set(this.postbytags,tag,data)
            }
        })
    }
  },
  created () {
    this.getPosts()
  }
}
</script>

<style>

</style>
