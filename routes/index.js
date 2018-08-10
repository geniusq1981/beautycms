var express = require('express');
var router = express.Router();
var usr = require('../selfmodules/EPOP/dbconnect');
var URL = require('url'); //解析操作url
//var EPOPlogger = require('../utils/logger').EPOPlogger('index.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	//EPOPlogger.info(req.session.islogin);
	
    res.render('index');
});

 
module.exports = router;
