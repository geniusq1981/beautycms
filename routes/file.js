/**
 * FileName:
 *
 * Author:siqian
 * Date:2015-12-22 14:50
 * Version:V1.0.0.0
 * Email:qian.si@samsung.com
 * Describe:   文件上传类
 * 
 *
 */

var fs = require('fs');
var utils = require('../utils/fileUtils');
var promise = require('promise');
var CryptoJS = require('crypto-js');
var URL = require('url'); //解析操作url

//App Self-diagnose Tool uploader
function adtuploader(req, res) {
	console.log(typeof(req.body));
	if(JSON.stringify(req.body)=='{}'){
	var resObj = {
                        code: -101,
                        des: "上传数据为空"
                    };
                    res.send(resObj);
	}
    else {
        
        utils.mkDir(10,req.body.user).then(function (path) {
			console.log(req.body+"!!!~~~mkDir"+req.body);
			var result = CryptoJS.AES.decrypt(req.body.data,'123').toString(CryptoJS.enc.Utf8);
			console.log("descrypt result= "+result);
			var filename =req.body.token+".json"; 
			var filefullpath = path + filename;
			console.log(filefullpath);
			fs.exists(filefullpath,function(exists){
				console.log(exists);
			});
			fs.writeFile(filefullpath,JSON.stringify(req.body,null,4),function(err){
				if(err) {
				console.log('It\'s failed!');
				var resObj = {
                        code: -102,
                        des: "服务器保存数据失败"
                    };
                    res.send(resObj);
				}
				else{
				console.log('It\'s saved!');
				var resObj = {
                        code: 1,
                        des: '上传成功'
                    };
                    res.send(resObj);
			}});
        });

    }
}

// 文件上传
function fileuploader(req, res) {
	console.log("fileuploader");
	//console.log(req.files);	
	if (req.files != 'undifined') {
        
        utils.mkDir(0).then(function (path) {
			console.dir(req.files+"!!!~~~mkDir"+req.files.length);
            uploadFile(req, res, path, 0);
        });

    }
}

function uploadFile(req, res, path, index) {
	console.log("uploadFile"+path+index);
    var tempPath = req.files[index].path;
    var name = req.files[index].originalname;
	console.log(tempPath+"~~~"+name);
    if (tempPath) {
        var rename = promise.denodeify(fs.rename);
        rename(tempPath, path + name).then(function () {
            var unlink = promise.denodeify(fs.unlink);
            unlink(tempPath);
        }).then(function () {
                if (index == req.files.length - 1) {
                    var resObj = {
                        code: 1,
                        des: '上传成功'
                    };
                    res.send(resObj);
                } else {
                    uploadFile(req, res, path, index + 1);
                }
            });
    }
}
//数据上传
function datauploader(req, res) {
	console.log("datauploader");
	console.log(req.headers);
	
	/*for(var a in req){
	console.log(a);
	}*/
    if (req.body != 'undifined') {
        
        utils.mkDir(1).then(function (path) {
			console.dir(req.body+"!!!~~~mkDir"+req.body);
			var filename =req.body.user+"_"+ Date.now()+".json"; 
			var filefullpath = path + filename;
			fs.writeFile(filefullpath,JSON.stringify(req.header,null,4),function(err){
				if(err) throw err;
				console.log('It\'s saved!');});
			//var data = JSON.req.body
            //saveFile(, res, path, 0);
        });

    }
}

function saveFile(req, res) {
	console.log("datauploader");
	console.log(req.body);	
	/*for(var a in req){
	console.log(a);
	}*/
    if (req.body != 'undifined') {
        
        utils.mkDir().then(function (path) {
			console.dir(req.body+"!!!~~~mkDir"+req.body);
            saveFile(req, res, path, 0);
        });

    }
}

function sendUploadSuccess(res) {
    res.send('{code:1,des:"上传成功"}');
}

function sendUploadFailed(res) {
    res.send('{code:0,des:"上传失败"}');
}

function index(req, res) {
    res.render('file');
}
function epopuploader(req, res) {
	console.log(req.files);
	console.log("fileuploader");
	//console.log(req.files);	
	var arg = URL.parse(req.url, true).query; //返回json 样式=》{a:'001',b:'002'}
	console.log(arg.type);
	var folder;
	var filename="";
	switch(arg.type){
		case "promotion":
		folder=12;
		filename ="seller";
		break;
		case "appad":
		folder=11;
		break;
		default:
		folder =11;
		break;
	}
	console.log(filename+folder);
	if (req.files != 'undifined') {
        utils.mkDir(folder).then(function (path) {
			console.dir(req.files+"!!!~~~mkDir"+req.files.length);
			var fileindex = parseInt(req.body.file_id)+1;
			req.files[0].originalname = filename+fileindex+"."+req.files[0].originalname.split(".")[1];
            uploadFile(req, res, path, 0);
        });

    }
}


exports.file = fileuploader;
exports.jsondata = datauploader;
exports.index = index;
exports.ADT = adtuploader;
exports.EPOP = epopuploader;

