var cheerio = require('cheerio');
var request = require('request');
var async = require('async');

request('https://www.visitseattle.org/things-to-do/neighborhoods/', function(error, response, body){
	var $ = cheerio.load(body);

	var neighborhoods = $('.info-window-content').map(
		function(index, element){
			return {
				name: $(element).find('h4').text(),
				link: $(element).find('a').attr('href')
			}
		}).get()
	fetchDescription(neighborhoods);
});

function fetchDescription(neighborhoodData) {
	async.concat(neighborhoodData, getNeighborhoodDescription, function(err, results){
		results.forEach(function(result){
	
		console.log(result.name);
		console.log(result.description);
		console.log('-------------');
	});
	});
}

function getNeighborhoodDescription(neighborhood, cb){
	request(neighborhood.link, function(error, response, body){
		var $ = cheerio.load(body);
		neighborhood.description = $('h2').first().text();
		cb(null, neighborhood);
	})
}
