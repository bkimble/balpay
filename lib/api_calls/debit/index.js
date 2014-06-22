var request = require('request');
var Q = require('q');
var Card = require('../../card.js');

module.exports.default_options = require('../default_options.js');

module.exports.url = function(card) { return "https://api.balancedpayments.com/cards/" + card.id + "/debits"; }

module.exports.response_handler = function(response, body) {
  return JSON.parse(body);
}

module.exports.send = function(card, amount, appears_as, description) {
  var deferred = Q.defer();  
  var options = this.request_options(card, amount, appears_as, description);
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

module.exports.request_options = function(card, amount, appears_as, description) {
  var options = this.default_options;
  options.url = this.url(card);
  options.form = {
    amount: amount,
    appears_as: appears_as,
    description: description
  }
  return(options);
}