var application_root = __dirname,
  express = require("express"),
  path = require("path"),
  mongoose = require('mongoose');

var app = express();

// model
mongoose.connect('mongodb://localhost/my_database');

var todoSchema = mongoose.Schema({
  text: String,
  done: Boolean,
  order: Number
});

var Todo = mongoose.model('Todo', todoSchema);

// var Todo = mongoose.model('Todo', new mongoose.Schema({
//   text: String,
//   done: Boolean,
//   order: Number
// }));

app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(application_root));
  // app.use(express.static(path.join(application_root + "app")));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  //app.set('views', path.join(application_root, "views"));
  //app.set('view engine', 'jade')
});

app.get('/', function(req, res){
  res.sendfile(application_root + '/index.html');
});

app.get('/bootstrap', function(req, res){
  res.sendfile(application_root + '/testbootstrap.html');
});

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
        return res.send('')
      }
    });
  });
});

app.listen(3000);
