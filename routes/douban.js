var express = require('express');
var router = express.Router();
var URL = require('url'); //解析操作url
var config= require('../config');
var apppath = config.G.APPPATH;
var fs = require('fs');
var fwcrawel = require('../selfmodules/fwcrawel');
/* GET home page. */
/* GET home page. */



 
router.route('/new.json')
.get(function(req,res){
	fs.readFile(apppath+'public/new.json', 'utf-8', function (err, da) {
			if (err) {
				ADTlogger.error(err);
				//fs.createReadStream(filebackuppath).pipe(fs.createWriteStream(filerealpath));
				
			} else {
				//ADTlogger.info(JSON.parse(da)[modelname]+JSON.parse(da).length);
				//console.log(JSON.parse(JSON.stringify(da)));
				//da=da.substr(1);
				var Obj = JSON.parse(da);
				
				res.setHeader('content-type','application/json;charset=UTF-8');
				res.send(Obj);
			}
	}
	);
})
.post(function(req, res) {
	
  });
  
  router.route('/edenRecomc.json')
.get(function(req,res){
	fs.readFile(apppath+'public/edenRecomc.json', 'utf-8', function (err, da) {
			if (err) {
				ADTlogger.error(err);
				//fs.createReadStream(filebackuppath).pipe(fs.createWriteStream(filerealpath));
				
			} else {
				//ADTlogger.info(JSON.parse(da)[modelname]+JSON.parse(da).length);
				//console.log(JSON.parse(JSON.stringify(da)));
				//da=da.substr(1);
				var Obj = JSON.parse(da);
                //expired time + random within 6 hours later   6:00 ->12:00 
				console.log(Obj.expires);
                Obj.expires += parseInt(Math.random()*43200);
                console.log(Obj.expires);
				res.setHeader('content-type','application/json;charset=UTF-8');
				res.send(Obj);
			}
	}
	);
})
.post(function(req, res) {
	
  });
  
  router.route('/fetch')
.get(function(req,res){
	fwcrawel.doubanfetch();
})
.post(function(req, res) {
	
  });
 
  
  
module.exports = router;
