<template>
   <footer class="footer">
      <div class = "footer_div">  
        <nav class="cover-navigation navigation--social">
          <ul class="navigation">
          <!-- Weibo -->
          <li v-if="this.$root.site.social.weibo" class="navigation__item_social">
            <a v-bind:href="weburl" v-bind:title="webname" target="_blank">
              <i class='social fa fa-weibo fa-2x'></i>
              <span class="label">Weibo</span>
            </a>
          </li>
          <!-- Github -->
          <li v-if="this.$root.site.social.github" class="navigation__item_social">
            <a v-bind:href="githuburl" v-bind:title="githubname" target="_blank">
              <i class='social fa fa-github fa-2x'></i>
              <span class="label">Github</span>
            </a>
          </li>
          <!-- Twitter -->
          <li v-if="this.$root.site.social.twitter" class="navigation__item_social">
            <a href="http://twitter.com/"+this.$root.site.social.twitter  title=this.$root.site.social.twitter target="_blank">
              <i class='social fa fa-twitter fa-2x'></i>
              <span class="label">Twitter</span>
            </a>
          </li>
          <!-- Google Plus -->
          <li v-if="this.$root.site.social.gplus" class="navigation__item_social">
            <a href="https://plus.google.com/"+this.$root.site.social.gplus rel="author" title="Google+" target="_blank">
              <i class='social fa fa-google-plus-square fa-2x'></i>
              <span class="label">Google Plus</span>
            </a>
          </li>
          <li v-if="this.$root.site.social.feed" class="navigation__item_social">
            <a href="/feed.xml" rel="author" title="RSS" target="_blank">
              <i class='social fa fa-rss fa-2x'></i>
              <span class="label">RSS</span>
            </a>
          </li>
          <li v-if="this.$root.site.social.mail" class="navigation__item_social">
            <a v-bind:href="email" rel="author" title="Contact me" target="_blank">
              <i class='social fa fa-envelope fa-2x'></i>
              <span class="label">Email</span>
            </a>
          </li>
          </ul>
        </nav>
        </div>
      <div class="container">
        <div class="content has-text-centered">
          <p>
            <strong>Copyright </strong> by <a href="https://github.com/geniusq1981">geniusq1981 </a> with <a href="https://github.com/geniusq1981/beautycms">beautycms</a> in 2018. |
            <iframe
                style="margin-left: 2px; margin-bottom:-5px;"
                frameborder="0" scrolling="0" width="91px" height="20px"
                src="https://ghbtns.com/github-btn.html?user=geniusq1981&repo=beautycms&type=star&count=true" >
            </iframe>
          </p>
        </div>
      </div>
    </footer>
</template>
<script>
export default {
  name: 'Foot',
  data() {
  return{

  }
  },
  methods: {
  },  
  computed:{
    weburl () {
      return "http://weibo.com/"+this.$root.site.social.weibo
    },
    webname () {
      return this.$root.site.social.weibo+"的微博"
    },
    githuburl () {
      return "https://github.com/"+this.$root.site.social.github
    },
    githubname () {
      return this.$root.site.social.weibo+"的 Github"
    },
    email () {
      return "mailto:"+this.$root.site.social.mail
    }
  }
}
</script>

<style>
</style>
