const setting = {
    site:{
    	title:"司骞",
    	subtitle:"个人站",
    	description:"欢迎来到我的个人站",
    	avatarTitle:"elang",
    	avatarDesc:"Web Tech Lover",
    	url:"",
		social:{
   			weibo: "3873821673",
    		github: "geniusq1981",
   			mail: "geniusq1981@hotmail.com"
		},
		cover_color:true
    },
    headnav:[
    {title:'所有文章',url:'/archive',des:'archive'},
    {title:'标签',url:'/tags',des:'tags'},
    {title:'关于我',url:'/about',des:'about'}
    ],
    pagesetting:{
      tagspagecount:50,
      homepagecount:15,
      blogpagecount:50,
      postcount:1
    },
    pagestatus:{
      blogTotalPage:"",
      tagsTotalPage:"",
      currentblogpage:1,
      currenttagspage:"",
      previous_blogpage:{"name":"","path":""},
      next_blogpage:{"name":"","path":""},
      previous_tagpage:{"name":"","path":""},
      next_tagpage:{"name":"","path":""}
    }
}

module.exports = setting