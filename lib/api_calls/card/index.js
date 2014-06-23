var request = require('request');
var Q = require('q');
var Card = require('../../card.js');

module.exports.default_options = require('../default_options.js');

module.exports.url = function() {  return "https://api.balancedpayments.com/cards"; }

module.exports.response_handler = function(response, body) {
  return Card.from_json(JSON.parse(body).cards[0]);
}

module.exports.send = function(number, expiration_month, expiration_year, security_code) {
  // support 2 digit years
  expiration_year = parseInt(expiration_year);
  if(expiration_year<2000) {  expiration_year = expiration_year+2000; }

  var deferred = Q.defer();  
  var options = this.request_options(number, expiration_month, expiration_year, security_code);
  var handler = this.response_handler;
  request.post(options, function(err, response, body) {    
    if (err) {
      deferred.reject(new Error(err));
    } else {
      deferred.resolve(handler(response, body));
    }
  })
  return deferred.promise;
};

module.exports.request_options = function(number, expiration_month, expiration_year, security_code) {
  var options = this.default_options;
  options.url = this.url();
  options.form = {
    expiration_month: expiration_month,
    expiration_year: expiration_year,
    security_code: security_code,
    number: number
  }
  return(options);
}
