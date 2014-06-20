var request = require('request');
var Q = require('q');
var Card = require('../../card.js');

module.exports.default_options = require('../default_options.js');
module.exports.url = "https://api.balancedpayments.com/cards";

module.exports.translate = function(args) {
  return {
    number: args[0],
    expiration_month: args[1],
    expiration_year: args[2],
    security_code: args[3]  
  };
}

module.exports.response_handler = function(response, body) {
  return Card.from_json(JSON.parse(body).cards[0]);
}

module.exports.send = function(args) {
  var deferred = Q.defer();  
  var options = this.request_options(args);
  var handler = this.response_handler;
  request.post(options, function(err, response, body) {    
    if (err) {
      console.log(err);
      deferred.reject(new Error(err));
    } else {
      deferred.resolve(handler(response, body));
    }
  })
  return deferred.promise;
};

module.exports.request_options = function(args) {
  var options = this.default_options;
  options.url = this.url;
  options.form = this.translate(args);
  return(options);
}

