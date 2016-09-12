var express = require('express');
var mongo = require('mongodb');
var bodyParser = require('body-parser');

var mongoUri = "mongodb://heroku_89f3mp4g:gqpmijhv6on16unqg2i040rg3@ds047305.mongolab.com:47305/heroku_89f3mp4g";

mongo.MongoClient.connect(mongoUri, function(err, db) {

    if(err){
        throw err;
    }

    var app = express();
    
    app.set('port', (process.env.PORT || 5000));

    app.use(express.static(__dirname + '/public'));
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.get('/', function(request, response) {
      response.render('public/index.html');
    });

    app.get('/api/posts', function(request, response) {
      db.collection('posts').find({}, { _id: 0 }).toArray(function(err, results){
          if(err) {
              throw err;
          }
          response.json(results);
      });
    });

    app.get('/api/posts/*', function(request, response) {
        var id = request.path.slice(11);
        db.collection('posts').find({ id: id }).toArray(function(err, results){
            if(err) {
                throw err;
            }
            response.json(results);
        });
    });

    app.get('/notes/post/*', function(request, response) {
        var id = request.path.slice(12);
        db.collection('posts').find({ id: id }).toArray(function(err, results){
            if(err) {
                throw err;
            }
            else if (!results.length){
              response.redirect('/notfound');
            }
            else{
              response.redirect('/notes/post.html?id=' + request.path.slice(12));
            }
        });
    });
    
    /* DISABLED UNTIL SECURITY IS IMPLEMENTED
    app.post('/api/posts/', function(request, response) {
        db.collection('posts').distinct('id', function(err, results){
            var max = 0;
            for (var i = 0; i < results.length; i++) {
                var result = parseInt(results[i]);
                if (result > max) {
                    max = result;
                }
            }
            var id = '' + (max + 1);
            var document = {
                id: id
            };
            for (var field in request.body) {
                if (request.body.hasOwnProperty(field)) {
                    if(field === "tags"){
                        document[field] = JSON.parse(request.body[field]);
                    }
                    else{
                        document[field] = request.body[field];
                    }
                }
            }
            db.collection('posts').insert(document, function(err) {
                if (err) {
                    console.log(err);
                }
                response.json({ success: !err });
            });
        });
    });
    */

    // Catch 404 and forward to error handler
  	app.use(function(req, res, next) {
  	  var err = new Error('Not Found');
  	  err.status = 404;
  	  next(err);
  	});

    app.use(function(err, req, res, next) {
    	if (!err.status) {
    		console.error(err);
    		throw err;
    	}
    	res.status(err.status || 500);
      console.log(err.status);
      if(err.status == 404){
        res.redirect("/404.html");
      }
      else{
          res.send('<b>' + err.status + ':</b> ' + err.message);
      }
    });

    app.listen(app.get('port'), function() {
      console.log('Node app is running on port', app.get('port'));
    });

});
