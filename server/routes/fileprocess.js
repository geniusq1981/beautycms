'use strict';

var fs = require('fs')

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

module.exports = fileprocess;
