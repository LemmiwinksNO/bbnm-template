
/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes'),
    http = require('http'),
    path = require('path');
    mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/my_database');

var app = express();
app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    //app.set('views', __dirname + '/views');
    //app.set('view engine', 'jade')
    app.use(express.bodyParser());  // parses request body according to content type in request.
    app.use(express.methodOverride());  // Lets you make HTTP methods other than GET and POST
    app.use(app.router);
    app.use(express.static(__dirname));
    // app.use(express.static(path.join(__dirname + "app")));
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});


// Routes - Controller code and URL handlers
var notdoing = require('./routes/notdoing'),
    todo = require('./routes/todo');

// Home page
// app.get('/', routes.index);
app.get('/', function(req, res){
  res.sendfile(__dirname + '/index.html');
});
app.get('/bootstrap', function(req, res){
  res.sendfile(__dirname + '/testbootstrap.html');
});

// NotDoing List
app.get('/api/notdoing', notdoing.get);
app.post('/api/notdoing', notdoing.post);
app.put('/api/notdoing/:id', notdoing.update);
app.delete('/api/notdoing/:id', notdoing.remove);

// Todo list
app.get('/api/todos', todo.getAll);
app.get('/api/todos/:id', todo.getOne);
app.post('/api/todos', todo.post);
app.put('/api/todos/:id', todo.update);
app.delete('/api/todos/:id', todo.remove);

// app.listen(3000);
http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port %d in %s mode", app.get('port'), app.settings.env);
});
