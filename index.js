var express = require('express');
var cool = require('cool-ascii-faces');
var mongo = require('mongodb');

var mongoUri = "mongodb://heroku_89f3mp4g:gqpmijhv6on16unqg2i040rg3@ds047305.mongolab.com:47305/heroku_89f3mp4g";

mongo.MongoClient.connect(mongoUri, function(err, db) {
  
    if(err){
        throw err;
    }
    
    var app = express();
    
    app.set('port', (process.env.PORT || 5000));

    app.use(express.static(__dirname + '/public'));

    // views is directory for all template files
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    
    app.get('/', function(request, response) {
      response.render('public/index.html');
    });
    
    app.get('/sample_post', function(request, response) {
      db.collection('posts').find({}).toArray(function(err, results){
          if(err) {
              throw err;
          }
          response.json(results);
      });
    });

    app.listen(app.get('port'), function() {
      console.log('Node app is running on port', app.get('port'));
    });
    
});