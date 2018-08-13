var express = require('express');
var fs = require('fs')
var URL = require('url'); //解析操作url
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', function(req, res, next) {
  let da = {
  	"code":20000,
	"data":{
		"roles":["admin"],
		"name":"admin",
		"avatar":"https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"
	}}
  res.send(da);
});

router.post('/logout', function(req, res, next) {
  let da = {
  	"code":20000,
	"data":{
		"roles":["admin"],
		"name":"admin",
		"avatar":"https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"
	}}
  res.send(da);
});


router.get('/userinfo', function(req, res, next) {
  let da = {
  	"code":20000,
	"data":{
		"roles":["admin"],
		"name":"admin",
		"avatar":"https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"
	}}
  res.send(da);
});

router.get('/post/list', function(req, res, next) {
  //res.send('respond with a post/list');
  console.log(global.rootpath+'../'+'docs/static/data/Post/post.json')
  fs.readFile(global.rootpath+'../'+'docs/static/data/Post/post.json','utf-8',function(err,data){
  		var resObj = {};
  		if(err){
  			resObj.code = -10000;
			resObj.data = "请重新请求一次";
			res.send(resObj);
			}else{
			var content = JSON.parse(data);
  		    console.log(content);
			resObj.code = 20000;
			resObj.data = content.data;
  		    console.log(resObj);  		
  		    res.send(resObj);	
			}
  })
});

router.get('/post/listpage', function(req, res, next) {
  res.send('respond with a post/listpage');
});

router.post('/post/removelist', function(req, res, next) {
	console.log(req.body);
	var filename = req.body.filename;

	 fs.readFile(global.rootpath+'../'+'docs/static/data/Post/post.json','utf-8',function(err,data){
  		var resObj = {};
  		if(err){
  			resObj.code = -10000;
			resObj.data = "请重新请求一次";
			res.send(resObj);
			}else{
			var content = JSON.parse(data);
					console.log(content);
			content.data.forEach((item,index) => {
				console.log(item.title);
				console.log(filename);
				if(item.title == filename){
					content.data.splice(index,1);
				}
			})
			console.log(content.data.length);
			fs.writeFile(global.rootpath+'../'+'docs/static/data/Post/post.json',JSON.stringify(content,null,4),function(err,data){
				if(err){
					resObj.code = -10000;
					resObj.data = "请重新请求一次";
					res.send(resObj);
				}else{
					resObj.code = 20000;
					resObj.data = content.data;
							//console.log(resObj);  		
							res.send(resObj);	
				}
			})
		
			}
  })
});

router.post('/post/addlist', function(req, res, next) {
	var arg = URL.parse(req.url, true).query; //返回json 样式=》{a:'001',b:'002'}
	console.log(arg);
  res.send('respond with a post/add'+JSON.stringify(arg));
});

router.post('/post/editlist', function(req, res, next) {
 var arg = URL.parse(req.url, true).query; //返回json 样式=》{a:'001',b:'002'}
	console.log(arg);
  res.send('respond with a post/edit'+JSON.stringify(arg));
});

module.exports = router;
