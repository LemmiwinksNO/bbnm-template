
/**
 * Module dependencies.
 */

var express = require('express'),
  routes = require('./routes'),
  path = require('path'),
  mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/my_database');

var app = module.exports = express();  // export so we can use it for tests


// Configuration

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('env', process.env.NODE_ENV || process.argv[2] || 'development');  // Now you can set environment via command line.
  app.set('view engine', 'jade');
  app.set('view options', { layout: true });
  app.set('views', __dirname + '/views');  // development views
  app.use(express.bodyParser());  // parses request body according to content type in request.
  app.use(express.methodOverride());  // Lets you make HTTP methods other than GET and POST
  app.use(app.router);
  app.use(express.static(__dirname));  // lets you access everything rather than just /public or /app
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('test', function(){
  app.set('port', 3001);
});

app.configure('production', function(){
  app.set('views', __dirname + '/dist/release/views');  // production views
  app.use(express.static(path.join(__dirname + "/dist/release")));
  app.use(express.errorHandler());
});


// Routes - Controller code and URL handlers

require('./routes/index')(app);  // index
require('./routes/notdoing')(app, mongoose);  // not doing list
require('./routes/todo')(app, mongoose);  // todo list


// Start the app

app.listen(app.settings.port);
console.log("Express server listening on port %d in %s mode", app.settings.port, app.settings.env);
