var express = require('express');
var router = express.Router();
var URL = require('url'); //解析操作url
//var EPOPlogger = require('../utils/logger').EPOPlogger('index.js');

/* GET home page. */
router.get('/test', function(req, res, next) {
	//EPOPlogger.info(req.session.islogin);
	
    res.send('api test');
});

 
module.exports = router;
