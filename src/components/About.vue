<template>
  <div id="About">
    <div class="section">
      <div class="container">
        <h1 class="is-size-1">{{ page_title }}</h1>
        <hr>
        <div>
          SDU的菜鸡一枚，喜欢尝试一些新技术。
<p>
平时喜欢整理个人博客，逛逛技术论坛，看看自己比较感兴趣的东西，最近想通过参加到掘金的翻译计划中，一方面锻炼一下自己的英语应用水平，一方面为开源世界贡献一份力量吧(其实我挺想用赚来的积分兑换那个GitHub手办的，感觉这样很有意义)。
<p>
了解一些 Android 基本概念和 Kotlin 的简单用法。

<p>

<h3> 我们的博客 </h3>

<p>

这个博客模板是我找的GitHub上觉得比较中意的一个，作者是leopard,如果想用这个模板可以去作者的项目那里下载并star，感谢作者对这个模板的分享,作者对大家使用他的模板感到高兴。

<p>

如果你想搭建一个跟我一样的博客，可以看我的<a href="/2016/10/jekyll_tutorials1/">Jekyll 搭建个人博客 </a>教程

博客源码在 <a target="_blank" href='https://github.com/leopardpan/leopardpan.github.io/'>Github</a> 上，你的 Star 是作者更新的动力，谢谢~

<p>

<p>

<p>
          <hr>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { butter } from '@/lib/buttercms'
export default {
  name: '关于我',
  data () {
    return {
      page_title: 'About',
      faq_items: []
    }
  },
  methods: {
    getFaqs () {
     
    }
  },
  created () {
    this.getFaqs()
  }
}
</script>

<style>

</style>
