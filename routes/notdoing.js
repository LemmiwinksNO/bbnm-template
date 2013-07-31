
var notdoing = function(app, mongoose) {

  // Schema

  var notDoSchema = mongoose.Schema({
    title: String,
    description: String,
    status: String
  });
  var NotDo = mongoose.model('NotDo', notDoSchema);

  // URL Handlers
  app.get('/api/notdoing', function(req, res){
    NotDo.find(function(err, notdos) {
      res.send(notdos);
    });
  });

  app.post('/api/notdoing', function(req, res){
    var notdo = new NotDo({
      title: req.body.title,
      description: req.body.description,
      status: req.body.status
    });
    notdo.save(function(err) {
      if (!err) {
        console.log("created");
      }
    });
  });

  app.put('/api/notdoing/:id', function(req, res){
    NotDo.findById(req.params.id, function(err, notdo) {
      notdo.title = req.body.title;
      notdo.description = req.body.description;
      notdo.save(function(err) {
        if (!err) {
          console.log("updated");
          res.send(notdo);
        }
      });
    });
  });

  app.delete('/api/notdoing/:id', function(req, res){
    NotDo.findById(req.params.id, function(err, notdo) {
      notdo.remove(function(err) {
        if (!err) {
          console.log("removed");
          res.send('');
        }
      });
    });
  });

};

module.exports = notdoing;


// // Schema
// var notDoSchema = mongoose.Schema({
//   title: String,
//   description: String,
//   status: Number
// });
// var NotDo = mongoose.model('NotDo', notDoSchema);


// // Notdoing API
// exports.get = function(req, res){
//   return NotDo.find(function(err, notdos) {
//     return res.send(notdos);
//   });
// };

// exports.post = function(req, res){
//   var notdo;
//   notdo = new NotDo({
//     title: req.body.title,
//     description: req.body.description,
//     status: req.body.status
//   });
//   notdo.save(function(err) {
//     if (!err) {
//       return console.log("created");
//     }
//   });
// };

// exports.update = function(req, res){
//   return NotDo.findById(req.params.id, function(err, notdo) {
//     notdo.title = req.body.title;
//     notdo.description = req.body.description;
//     return notdo.save(function(err) {
//       if (!err) {
//         console.log("updated");
//         return res.send(notdo);
//       }
//     });
//   });
// };

// exports.remove = function(req, res){
//   return NotDo.findById(req.params.id, function(err, notdo) {
//     return notdo.remove(function(err) {
//       if (!err) {
//         console.log("removed");
//         return res.send('');
//       }
//     });
//   });
// };
