var express = require('express');
var server = express();
var hbs = require('hbs');
var i18n = require('i18n');
var cookieparser = require('cookie-parser');
var bodyparser = require('body-parser');
var langcookie = "lang";
var mail = require(__dirname + '/util/mail.js');

i18n.configure(
  {
    locales: ['en','es'],
    cookie: langcookie,
    directory: __dirname + "/locales"
  }
);

hbs.registerPartials(__dirname + '/views');
server.set('view engine', 'hbs');
server.engine('hbs', hbs.__express);

server.use(express.static('public'));
server.use(cookieparser());
server.use(bodyparser.urlencoded({
    extended: true
}));
server.use(bodyparser.json());
server.use(i18n.init);

hbs.registerHelper('__', function(){
  return i18n.__.apply(this, arguments);
});

hbs.registerHelper('__n', function(){
  return i18n.__n.apply(this, arguments);
});

hbs.registerHelper('__selected', function(){
  if(this['locale'] == arguments['0']){
    return "selected";
  }
  return ""; 
});

server.get('/', function (req, res) {
  res.render('index');
});

server.get('/lang/:newlang', function(req, res){
  res.cookie(langcookie, req.params.newlang, { maxAge: 900000, httpOnly: true });
  res.send();
});

server.post('/', function (req, res) {
  if(!req.body.repeatemail){
    mail.send(req.body.name, req.body.email, req.body.phone, req.body.message, function(sent){
      res.render('index', { post: true, sent: sent });
    });
  }
});

server.use(function(req, res) {
  res.status(400);
  res.render('404');
});

server.listen(3001);