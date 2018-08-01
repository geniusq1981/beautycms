import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import CustomersHome from '@/components/CustomersHome'
import CustomerPage from '@/components/CustomerPage'
import FAQ from '@/components/FAQ'
import BlogHome from '@/components/BlogHome'
import BlogPost from '@/components/BlogPost'
import RssAtomSitemap from '@/components/RssAtomSitemap'
import AboutPage from '@/components/About'
import ArchivePage from '@/components/Archive'
import TagsPage from '@/components/Tags'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: window.location.pathName,
  routes: [
    { path: '*',
      component: HelloWorld 
    },
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/customers',
      name: 'customers-home',
      component: CustomersHome
    },
    {
      path: '/customers/:slug/:index',
      name: 'customer-page',
      component: CustomerPage
    },
    {
      path: '/faq',
      name: 'faq',
      component: FAQ
    },
    {
      path: '/blog',
      name: 'blog-home',
      component: BlogHome
    },
    {
      path: '/blog/:slug',
      name: 'blog-post',
      component: BlogPost
    },
    {
      path: '/rss',
      name: 'rss',
      component: RssAtomSitemap
    },
     {
      path: '/about',
      name: 'about',
      component: AboutPage
    },
    {
      path: '/archive',
      name: 'archive',
      component: ArchivePage
    },
    {
      path: '/tags',
      name: 'tags',
      component: TagsPage
    }
  ]
})
