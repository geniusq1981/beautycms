'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'production'

const fs = require('fs');
const path = require("path");
const marked = require('marked');
const cheerio = require('cheerio'); //数据解析
const eventproxy = require('eventproxy')
const ora = require('ora')
const rm = require('rimraf')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')

const spinner = ora('transfer .md files to json...')
spinner.start();

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

//获取当前目录绝对路径，这里resolve()不传入参数
const filePath = path.resolve('','static/data/Post');
const pagePath = path.resolve('','static/data/Page');
const siteconfig = require('../src/config');
console.log(siteconfig);

//读取文件存储数组
let fileArr = [];
let origindata = {};
let finaldata = {};

//console.log(filePath);
//读取文件目录
fs.readFile(path.join(filePath,'post.json'),'utf-8',function(err,data){
  if(err) {
//console.log('It\'s failed!');        
}
  origindata = data;
  //console.log(JSON.stringify(origindata,null,4));
  readMDfiles();
})

const readMDfiles = function () {
  fs.readdir(filePath,function(err,files){
    if(err){
      //console.log(err);
      return;
    }
    var count = files.length;
    var results= JSON.stringify(origindata,null,4).length>0?JSON.parse(origindata)['data']:[];
    var len = files.length;
    files.forEach(function(filename,index){
      if(path.extname(filename)!='.md') {len--;return;}
      console.log(filename);
      if(JSON.stringify(origindata,null,4).match(filename)){len--;console.log('jump');return;}
      let fileinfo = {"title":filename,"date":"","slug":"","category":"","tag":"","des":""}
      fs.readFile(path.join(filePath,filename),'utf-8', function(err,data){
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
        console.log(results);
        results.push(fileinfo);
        len -= 1;
        //console.log(len);
        if(len==0){
          results = results.sort(function(x,y){
            if(Date.parse(x['date'])>Date.parse(y['date'])){
              return -1;
            }else if(Date.parse(x['date'])<Date.parse(y['date'])){
              return 1;
            }else{
              return 0;
            }
          });
          //console.log(results);
          var obj = {"count":results.length,"data":results};
          finaldata = results;
          fs.writeFile(path.join(filePath,'post.json'),JSON.stringify(obj,null,4),'utf8',function(err){
                if(err) {
          //console.log('It\'s failed!');        
          }
          else{
          console.log('It\'s saved!');  
           writeotherJson();      
              }
              });
         

        };
      });
      fs.stat(path.join(filePath,filename),function(err,stats){
          if(err) throw err;
          fileinfo.date = stats.mtime.toUTCString();      
      });
    });
    spinner.stop();
  });
}

const writeotherJson = function () {
    const data = chunk(finaldata , siteconfig.pagesetting.homepagecount);
    const len = data.length;
    const ep = new eventproxy();
    ep.after('writepage',function(){
      console.log('finished');
    });
    for(let i=0;i<len;i++){
      let name = 'page' + (i + 1) + '.json';
      let da = {data:data[i]}; 
      fs.writeFile(path.join(pagePath, name),JSON.stringify(da,null,4),function(err,data){
        if(err){

        }
        ep.emit('writepage');
        console.log(i);
      })
    }
}

function chunk(array,size) {
  const len = array.length;
  if(!len || len<size || size<1){return array;}
  let index =0;
  let resIndex =0;
  let result = new Array(Math.ceil(len/size));
  while( index < len){
    result[resIndex++] = array.slice(index,(index += size));
  }
  return result;
}
