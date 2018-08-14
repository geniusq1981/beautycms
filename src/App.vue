<template>
  <div id="app">
   <!-- <nav class="navbar is-info">
      <div class="navbar-menu">
        <div class="navbar-start">
        <router-link class="navbar-item" to="/">
          home
        </router-link>
        </div>
        <div class="navbar-end">
          <router-link class="navbar-item" to="/customers">
            Customer
          </router-link>
          <router-link class="navbar-item" to="/faq">
           FAQ
          </router-link>
          <router-link class="navbar-item" to="/blog">
           Blog Posts
          </router-link>
          <router-link class="navbar-item" to="/about">
           About
          </router-link>
        </div>
      </div>
    </nav>-->
     <span class="mobile btn-mobile-menu">        
      <div class="nav_container">
         <nav class="nav-menu-item" style = "float:right">
            <i class="nav-menu-item">
              <router-link class="blog-button" to="/blog/">  
              博客主页
              </router-link>     
            </i>           
                <i v-for="item in headnav" class="nav-menu-item">
                  <router-link v-bind:to="item.url" v-bind:title="item.des" class="btn-mobile-menu__icon">
                      {{item.title}}
                  </router-link>
                </i>

          </nav>
      </div>
    </span>
    <header class="panel-cover" v-bind:class="{ 'panel-cover--collapsed': this.$root.isHomePage }" style="background-image: url('../static/images/background-cover.jpg')">
  <div class="panel-main">

    <div class="panel-main__inner panel-inverted">
    <div class="panel-main__content">
        <!-- 头像效果-start -->
        <div class="ih-item circle effect right_to_left">            
            <router-link class="blog-button" to="/blog">          
                <div class="img"><img src="../static/images/avatar.jpg" alt="img"></div>
                <div class="info">
                    <div class="info-back">
                        <h2> 
                        {{site.avatarTitle}}
                        </h2>
                        <p>
                         {{site.avatarDesc}}
                           </p>
                    </div>
                </div>
           </router-link>
        </div>
        <!-- 头像效果-end -->
        <h1 class="panel-cover__title panel-title"><router-link to="/blog/" title="link to homepage for" class="blog-button">{{site.title}}</router-link></h1>
        <span class="panel-cover__subtitle panel-subtitle">{{site.subtile}}</span>
        <hr class="panel-cover__divider" />
        <p class="panel-cover__description">{{site.description}}</p>
        <hr class="panel-cover__divider panel-cover__divider--secondary" />
        <p v-if="site.welcome_message" class="panel-cover__description">{{site.welcome_message}}</p>       

        <div class="navigation-wrapper">
          <div>
            <nav class="cover-navigation cover-navigation--primary">
              <ul class="navigation">
                <li class="navigation__item"><router-link to="/blog/" title="test1" class="blog-button">博客主页</router-link></li>                
                  <li v-for="item in headnav" class="navigation__item">
                  <router-link v-bind:to="item.url" v-bind:title="item.des" class="blog-button">{{item.title}}</router-link>
                  </li>                
              </ul>
            </nav>
          </div>          
        </div>
        </div>
      </div>
    <div class="panel-cover--overlay" :class="this.$root.site.cover_color?'cover-clear':'cover-disable'"></div>
  </div>
</header>
 <div class="content-wrapper">
        <div class="content-wrapper__inner">
    <router-view/>
     
    <foot></foot>
    </div>
    </div>
   
  </div>
</template>

<script>
import foot from "@/components/foot"
export default {
  name: 'App',
  components: {
      foot
  },
  data () {
    return{
      site:this.$root.site,
      isHomePage:this.$root.isHomePage,
      headnav:this.$root.headnav
    }
  },
  watch:{
    $route (to,from) {
    }
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
    }
  }
}
</script>

<style>
#app {
 
}
footer.footer {
  margin-top: 10rem;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem
}
</style>
