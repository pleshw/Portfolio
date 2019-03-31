var express = require('express'); // Require express request
var cors = require('cors'); // Requires cors platform
var fs = require('fs'); // Require file system
var url = require('url'); // Require the url handler

// Create the app that will handle with the express requests.
var app = express();

app.use(cors());

app.get('/:id', function (req, res, next) {

	let themeRequisition = "Templates/"+req.url+".json";
  	
  	if ( fs.existsSync(themeRequisition) )
		//  Read the file with the theme name then write the data as response.
		fs.readFile( themeRequisition, function(err, data){
			res.write(data);
			res.end();
		});
	else
	{
		res.write( req.url+" does not exist." );
		res.end();
	}
});

app.listen(80, function () {
  console.log('CORS-enabled web server listening on port 80');
});




// var http = require('http'); // Require the http handler


// http.createServer(function (req, res) {
// 	res.writeHead(200, {'Content-Type': 'application/javascript'});
// 	// Handle the queries
// 	
	


// 	// Make a variable to a possible theme requisition.
// 	




// }).listen(8080);