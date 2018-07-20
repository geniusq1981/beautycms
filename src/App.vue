<template>
  <div id="app">
    <nav class="navbar is-info">
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
          <router-link class="navbar-item" to="/rss">
           RSS, Atom &amp; Sitemap
          </router-link>
        </div>
      </div>
    </nav>
    <router-view/>
    <footer class="footer">
      <div class="container">
        <div class="content has-text-centered">
          <p>
            <strong>Tutorial</strong> by <a href="https://bryanrankin.com">Bryan Rankin</a>.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
footer.footer {
  margin-top: 10rem;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem
}
</style>
