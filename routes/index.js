
/*
 * GET home page.
 */

exports.index = function(req, res){
    res.sendfile(__dirname + '../index.html');
};


// app.get('/', function(req, res){
//   res.sendfile(__dirname + '/index.html');
// });

// app.get('/bootstrap', function(req, res){
//   res.sendfile(__dirname + '/testbootstrap.html');
// });
