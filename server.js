


// Initialize Express app
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// Require request and cheerio. This makes the scraping possible
var request = require('request');
var cheerio = require('cheerio');

// Database configuration
var mongojs = require('mongojs');
var databaseUrl = "gatorScraper"; //scraper
var collections = ["scrapedNews"]; //scrapedData

app.use(express.static('public'));

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on('error', function(err) {
  console.log('Database Error:', err);
});


// Main route (simple Hello World Message)
app.get('/', function(req, res) {
  res.render(index.html);
});




app.get('/all', function(req, res){

	db.scrapedNews.find({}, function(err, result){
//db.scrapedData
		if(err) throw(err);

		res.send(result);

		//res.json sends the json header so browsers don't try to interpret it

	});

});


// Route 2
// =======
// When you visit this route, the server will
// scrape data from the site of your choice, and save it to
// MongoDB.
// TIP: Think back to how you pushed website data  
// into an empty array in the last class. How do you
// push it into a MongoDB collection instead?

/* -/-/-/-/-/-/-/-/-/-/-/-/- */

app.get('/scrapedNews', function(req, res){
// /scraped
	request('https://www.seccountry.com/florida', function(err, response, html){

		var $ = cheerio.load(html);

		$('h2.cm-stream__headline').each(function(i, element){

			var headline = $(this).text();
      		var link = $(this).children().attr('href')
      //var text = $(this).text();

			db.scrapedNews.insert({
				"headline": headline,
				"link": link


			});
		});

		res.send("Scrape completed!");
	});
})


// listen on port 3000
app.listen(3000, function() {
  console.log('App running on port 3000!');
});
