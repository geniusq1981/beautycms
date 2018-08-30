var express = require('express');
var fs = require('fs')
var URL = require('url'); //解析操作url
var router = express.Router();
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var fileprocess = require('./fileprocess');
console.log(fileprocess);

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
  });
});

router.post('/post/addlist', function(req, res, next) {
	console.log(req.body);
	console.log(req.body.title);
	fs.readFile(global.rootpath+'../'+'docs/static/data/Post/post.json','utf-8',function(err,data){
		var resObj = {};
		if(err){
			resObj.code = -10000;
			resObj.data = "请重新请求一次";
			res.send(resObj);
		}else{
			var content = JSON.parse(data);
			console.log(content);
			if(JSON.stringify(content,null,4).match(req.body.title)){
				resObj.code = -10000;
				resObj.data = "已经包含同名的md文件";
				res.send(resObj);
			}else{
				content.data.push(req.body);
				content.data.sort(function(x,y){
					if(Date.parse(x['date'])>Date.parse(y['date'])){
						return -1;
					}else if(Date.parse(x['date'])<Date.parse(y['date'])){
						return 1;
					}else{
						return 0;
					}
				});
				fs.writeFile(global.rootpath+'../'+'docs/static/data/Post/post.json',JSON.stringify(content,null,4),function(err){
					if(err) throw err
					fs.copyFile(global.rootpath+'../'+'docs/static/data/Post/post.json',global.rootpath+'../'+'static/data/Post/post.json', function(err){
						if(err){
							 console.log(err);
							 return;
						 }
						 resObj.code = 20000;
							resObj.data = "添加成功";
							//console.log(resObj);  		
							res.send(resObj);	
					});		
				});				
			}
		}
	})
});

router.post('/post/editlist', function(req, res, next) {
	console.log(req.body);
	console.log(req.body.title);
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
				if(item.title == req.body.title){
					content.data[index]=req.body
				}
			});
			fs.writeFile(global.rootpath+'../'+'docs/static/data/Post/post.json',JSON.stringify(content,null,4),function(){
				if(err) throw err
				fs.copyFile(global.rootpath+'../'+'docs/static/data/Post/post.json',global.rootpath+'../'+'static/data/Post/post.json', function(err){
					if(err){
						 console.log(err);
						 return;
					 }
					 resObj.code = 20000;
						resObj.data = "修改成功";
						//console.log(resObj);  		
						res.send(resObj);	
				});				
			});	
		}
	});
});


router.post('/post/uploadFile', multipartMiddleware, function(req, res, next) {
	console.log(req);
	console.log(req.files);
	var path = req.files.file.path;
	var source = fs.createReadStream(path);
	var dest = fs.createWriteStream(global.rootpath+'../'+'static/data/Post/'+req.files.file.name);
	source.pipe(dest);
	source.on('end',function(){
		console.log('success');
		fs.unlinkSync(path);
		fileprocess.processMDfile(global.rootpath+'../'+'static/data/Post/'+req.files.file.name,function(result){
			//console.log(result);
			res.send({code:20000,data:result});
		});
	});
	source.on('error',function(err){
		console.log(err);
		res.send(err);
	});
	
	
	
	
});
module.exports = router;
