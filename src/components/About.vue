<template>
  <div id="About">
    <div class="section">
        <h1 class="is-size-1">{{ page_title }}</h1>
        <hr>
        <div>
        <p>一个喜欢瞎鼓捣的技术人员，一直希望深入钻研技术，无奈还是学术不精，甚为惭愧。</p>
        <p>平时喜欢看看个人博客，逛逛技术论坛，看看电影，听听小歌，看看自己比较感兴趣的东西。</p>
        <p>Web 领域也算是一名老鸟，但是一直感觉自身知之甚少，终日惶恐。</p>
        <hr><hr>
        <p>偶然发现掘金网站，其中有个掘金翻译计划，追随者众，遂也混入其中。</p>
        <p>检验自己英语水平的同时，为开源世界贡献些力量，也接触些年轻的事物。</p>
        <p>也希望在这个过程中，把自己这些年的感悟好好思考下，为了未来继续前行。</p>
        <hr><hr>
        <h3> 我们的博客 </h3>
        <p>原本只是想用 Vue 写一个博客，但是发现 Vuejs 官方推荐的 buttercms,</p>
        <p>是基于 serverless api（而且要付费），想着弄一个博客后台，但使用独立的服务器又倍感浪费。</p>
        <hr><hr>
        <p>参考了 Hexo 和 Jekyll，虽然都很好，但是还是不想放弃初衷。</p>
        <p>参考 Github 上 leopardpan 的博客模板（Jekyll), 撸了这个。</p>
        <hr><hr>
        <p>全部使用静态数据进行页面加载，可以放置在 Github Page 上进行展示。</p>
        <p>改写的非常粗糙，暂时只有简单的浏览博客的功能，离完整的 CMS 还相去甚远</p>
        <hr><hr>
        <p>可以通过我的 <a target="_blank" href='https://github.com/geniusq1981/beautycms/'>Github</a> 下载源代码，测试使用。
        有问题和想法，可以在 github 上提给我。</p>
        <p>如果喜欢，请点赞，你的 Star 是作者更新的动力，谢谢~</p>
        <hr>
        <hr>
        <h3> 示例 </h3>
        <ul id="samplesite">
        <li><a href="http://gallery.geniusq.top" :class="{jump:true,gallery:true}"></a></li>
        <li><a href="https://translatetoolkit.github.io/MarkdownEditor/" :class="{jump:true,markdowneditor:true}"></a></li>
        <li><a href="https://tizentvwebapp.github.io/2048-Game/" :class="{jump:true,tzfe:true}"></a></li>
        <li><a href="http://132.232.57.112/youshuTV" :class="{jump:true,youshu:true}"></a></li>
        </ul>
        </div>
    </div>
  </div>
</template>

<script>
import { butter } from '@/lib/buttercms'
export default {
  name: 'AboutPage',
  data() {
    return {
      page_title: '关于我',
      faq_items: []
    }
  },
  methods: {
    getFaqs() {

    }
  },
  created() {
    this.getFaqs()
  }
}
</script>
<style>
#samplesite {
  display:block;
  overflow:hidden;
}
#samplesite li{
  list-style: none;  
  padding:10px 10px 10px 10px;
  float:left;
}
.jump{
  display:block;
  width:250px;
  height:150px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  border:2px solid;
}
.gallery{
  background-image:url(/static/images/gallery.jpg);
}
.markdowneditor{
  background-image:url(/static/images/MarkdownEditor.jpg);
}
.tzfe{
  background-image:url(/static/images/2048.jpg);
}
.youshu{
  background-image:url(/static/images/youshu.jpg);
}
</style>
