var express = require('express');
var app = express();
var exphbs = require('express-handlebars');

// app.listen(3000, function() {
//   console.log('GIF Search listening in port localhost:3000!');
// });

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static('public'));

// app.get('/', function (req, res) {
//   var gifUrl = 'http://media2.giphy.com/media/gYBVM1igrlzH2/giphy.gif'
//   res.render('hello-gif', {gifUrl: gifUrl});
// });
//
// app.listen(3000, function () {
//   console.log('Example app listening on port 3000!');
// });

// Require HTTP Module
var http = require('http');

app.get('/', function (req, res) {
  console.log(req.query.term)
  var queryString = req.query.term;
  // Encode the query to remove white spaces and restricted characters
  var term = encodeURIComponent(queryString);
  // Put the search term into the Giphy API search URL
  var url = 'http://api.giphy.com/v1/gifs/search?q=' + term + '&api_key=dc6zaTOxFJmzC'

  http.get(url, function(response) {
    // Set encoding response to UTF8
    response.setEncoding('utf8');

    var body = '';

    response.on('data', function(d) {
      // Continuously update stream with data from Giphy
      body += d;
    });

    response.on('end', function() {
      // When data is fully received parse into JSON
      var parsed = JSON.parse(body);
      // Render the home template and pass the gif data into the template
      res.render('home', {gifs: parsed.data})
    });
  });
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

// I can't get the REFACTORED VERSION to work! //

// // Initialize the Giphy-API library
// var giphy = require('giphy-api')();
//
// app.get('/', function (req, res) {
//   giphy.search(req.query.term, function (err, response) {
//     res.render('home', {gifs: response.data})
//   })
//
//   giphy.get(url, function(response) {
//     // Set encoding response to UTF8
//     response.setEncoding('utf8');
//
//     var body = '';
//
//     response.on('data', function(d) {
//       // Continuously update stream with data from Giphy
//       body += d;
//     });
//
//     response.on('end', function() {
//       // When data is fully received parse into JSON
//       var parsed = JSON.parse(body);
//       // Render the home template and pass the gif data into the template
//       res.render('home', {gifs: parsed.data})
//     });
//   });
// })
//
// app.listen(3000, function () {
//   console.log('Example app listening on port 3000!');
// });
