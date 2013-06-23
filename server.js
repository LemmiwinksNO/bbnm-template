var application_root = __dirname,
  express = require("express"),
  path = require("path"),
  mongoose = require('mongoose');

var app = express();

app.configure(function(){
  app.use(express.bodyParser());  // parses request body according to content type in request.
  app.use(express.methodOverride());  // Lets you make HTTP methods other than GET and POST
  app.use(app.router);
  app.use(express.static(application_root));
  // app.use(express.static(path.join(application_root + "app")));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  //app.set('views', path.join(application_root, "views"));
  //app.set('view engine', 'jade')
});

// model
mongoose.connect('mongodb://localhost/my_database');

// Schemas
var notDoSchema = mongoose.Schema({
    title: String,
    description: String,
    status: Number
});
var NotDo = mongoose.model('NotDo', notDoSchema);

// Or all in one
var Todo = mongoose.model('Todo', new mongoose.Schema({
  text: String,
  done: Boolean,
  order: Number
}));

app.get('/', function(req, res){
  res.sendfile(application_root + '/index.html');
});

app.get('/bootstrap', function(req, res){
  res.sendfile(application_root + '/testbootstrap.html');
});


// Notdoing API
app.get('/api/notdoing', function(req, res) {
  return NotDo.find(function(err, notdos) {
    return res.send(notdos);
  });
});

app.post('/api/notdoing', function(req, res) {
  var notdo;
  notdo = new NotDo({
    title: req.body.title,
    description: req.body.description,
    status: req.body.status
  });
  notdo.save(function(err) {
    if (!err) {
      return console.log("created");
    }
  });
});


// Todos API
app.get('/api/todos', function(req, res){
  return Todo.find(function(err, todos) {
    return res.send(todos);
  });
});

app.get('/api/todos/:id', function(req, res){
  return Todo.findById(req.params.id, function(err, todo) {
    if (!err) {
      return res.send(todo);
    }
  });
});

app.put('/api/todos/:id', function(req, res){
  return Todo.findById(req.params.id, function(err, todo) {
    todo.text = req.body.text;
    todo.done = req.body.done;
    todo.order = req.body.order;
    return todo.save(function(err) {
      if (!err) {
        console.log("updated");
      }
      return res.send(todo);
    });
  });
});

app.post('/api/todos', function(req, res){
  var todo;
  todo = new Todo({
    text: req.body.text,
    done: req.body.done,
    order: req.body.order
  });
  todo.save(function(err) {
    if (!err) {
      return console.log("created");
    }
  });
  return res.send(todo);
});

app.delete('/api/todos/:id', function(req, res){
  return Todo.findById(req.params.id, function(err, todo) {
    return todo.remove(function(err) {
      if (!err) {
        console.log("removed");
        return res.send('');
      }
    });
  });
});

app.listen(3000);
