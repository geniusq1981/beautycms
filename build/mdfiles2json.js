'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'production'

const fs = require('fs');
const path = require("path");
var marked = require('marked');
var cheerio = require('cheerio'); //数据解析
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

const ora = require('ora')
const rm = require('rimraf')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')

const spinner = ora('building for production...')

//获取当前目录绝对路径，这里resolve()不传入参数
var filePath = path.resolve('','static/data/Post');

//读取文件存储数组
var fileArr = [];

//console.log(filePath);
//读取文件目录
fs.readdir(filePath,function(err,files){
  if(err){
    //console.log(err);
    return;
  }
  var count = files.length;
  var results=[];
  var len = files.length;
  files.forEach(function(filename,index){
    if(path.extname(filename)!='.md') {len--;return;}
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
        fs.writeFile(path.join(filePath,'post.json'),JSON.stringify(obj,null,4),'utf8',function(err){
              if(err) {
        //console.log('It\'s failed!');
        
        }
        else{
        //console.log('It\'s saved!');
        
            }
            });
      };
    });
    fs.stat(path.join(filePath,filename),function(err,stats){
        if(err) throw err;
        fileinfo.date = stats.mtime.toUTCString();      
    });
  });
});