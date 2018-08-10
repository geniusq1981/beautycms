var express = require('express');


var path = require('path');
global.rootpath = __dirname+'\\';
//var favicon = require('serve-favicon');
//var cookieParser = require('cookie-parser');
//var multer = require('multer');
var bodyParser = require('body-parser');
var ejs = require('ejs');
//var session = require('express-session');


var apiroutes = require('./routes/api');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');

app.engine('.html', ejs.__express);
app.set('view engine', 'html');
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
/*app.use(bodyParser({
    uploadDir:__dirname+'/public/temp'
}));*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(multer({dest:__dirname+'/userdata'}).any());
app.use(express.static(path.join(__dirname, '../')));

//app.use('/', doubanrouotes);
//app.use('/ADT',adtroutes);
app.use('/api',apiroutes);


app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = app;
