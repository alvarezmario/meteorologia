var request = require('request');
var parseString = require('xml2js').parseString;
var url = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20%28select%20woeid%20from%20geo.places%281%29%20where%20text%3D%22Madrid%2C%20ES%22%29&format=xml&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys'

$(function() {
    var loadData = function(){
        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                parseString(body, function (err, result) {
                    var description = result.query.results[0].channel[0].item[0].description;
                    $('#code').html(description);
                });
            }
        });
    };

    loadData();
    setInterval(loadData, 60000);
});
