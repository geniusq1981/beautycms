'use strict';

var fs = require('fs')
var path = require("path");
var marked = require('marked');
var cheerio = require('cheerio'); //数据解析
var eventproxy = require('eventproxy');

marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: false,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false
  });

var fileprocess =function(){

}

// 从post.json中删除一条记录
// destfile: 目标文件
// mdfile: 要删除的文件名
fileprocess.removelist = function(destfile,mdfile){
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
}

fileprocess.processMDfile=function(filepath,callback){
    var filename = filepath.split('/');
    filename = filename[filename.length-1];
    if(path.extname(filename)!='.md') {return;}
    let fileinfo = {"title":filename,"date":"","slug":"","category":"","tag":"","des":""}
    fs.readFile(filepath,'utf-8', function(err,data){
      if(err) throw err;
      //console.log(data);
      //console.log(marked(data));
      var $ = cheerio.load(marked(data),{decodeEntities: false});
      function foundFirstH(){
        var head = "";
        var re ="";
        for(var i=1;i<7;i++){
          head = 'h'+i.toString();
          re = $(head)
          if(re.length) {
            break;
          }
        } 
        return re[0].children[0].data;
      };
      var headline = foundFirstH();
     //var headline = $('h1')[0].children[0].data;
      //console.log(headline);
      fileinfo.slug = headline;
      var content =$('p').text().slice(0,200)+"……";
      //console.log(content);
      fileinfo.des = content;
      //console.log(fileinfo);
      callback(fileinfo); 
    });
    fs.stat(filepath,function(err,stats){
        if(err) throw err;
        fileinfo.date = stats.mtime.toUTCString();      
    });
}

module.exports = fileprocess;
