
/*
 * GET home page.
 */

var index = function(app){
  app.get('/', function(req, res){
    // res.render('index');
    res.sendfile(__dirname + '../index.html');
  });
};

module.exports = index;


// I wonder if this works?
// var index = function(app, mongoose){
//     var notdoing = require('./routes/notdoing')(app, mongoose);

//     // Home page
//     // app.get('/', routes.index);
//     app.get('/', function(req, res){
//       res.render('layout', {
//         title: 'Hello World'
//         });
//     });

//     // NotDoing List
//     app.get('/api/notdoing', notdoing.get);
//     app.post('/api/notdoing', notdoing.post);
//     app.put('/api/notdoing/:id', notdoing.update);
//     app.delete('/api/notdoing/:id', notdoing.remove);
// };

// module.exports = index;
