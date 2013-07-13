
/*
 * GET home page.
 */

var index = function(app){
  app.get('/', function(req, res){
    res.render('layout', {
      title: 'Hello World'
    });
  });
};

module.exports = index;


// I bet this will work now that I send in app and mongoose.
// Couldn't get this to work.
// var notdoing = require('./routes/notdoing')(app, mongoose),
//     todo = require('./routes/todo')(app, mongoose);

// // Home page
// // app.get('/', routes.index);
// app.get('/', function(req, res){
//   res.sendfile(__dirname + '/index.html');
// });
// app.get('/bootstrap', function(req, res){
//   res.sendfile(__dirname + '/testbootstrap.html');
// });

// // NotDoing List
// app.get('/api/notdoing', notdoing.get);
// app.post('/api/notdoing', notdoing.post);
// app.put('/api/notdoing/:id', notdoing.update);
// app.delete('/api/notdoing/:id', notdoing.remove);

// // Todo list
// app.get('/api/todos', todo.getAll);
// app.get('/api/todos/:id', todo.getOne);
// app.post('/api/todos', todo.post);
// app.put('/api/todos/:id', todo.update);
// app.delete('/api/todos/:id', todo.remove);