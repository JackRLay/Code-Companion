var express = require('express');
var routes = require('./routes');
//var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app=express();

app.set('port', process.env.PORT || 9000);

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
  });

app.get('/', routes.index);
//app.get('/users', user.list);