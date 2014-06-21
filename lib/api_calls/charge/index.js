var request = require('request');
var Q = require('q');
var Card = require('../../card.js');

module.exports.default_options = require('../default_options.js');

module.exports.url = function(args) { return "https://api.balancedpayments.com/cards/" + args.card.id + "/debits"; }

module.exports.translate = function(args) {
  return {
    card: args[0],
    amount: args[1],
    appears_as: args[2],
    description: args[3]  
  };
}

module.exports.params = function(args) {
  return {
    amount: args.amount,
    appears_as: args.appears_as,
    description: args.description
  }
}

module.exports.response_handler = function(response, body) {
  return JSON.parse(body);
}

module.exports.send = function(args) {
  var deferred = Q.defer();  
  var options = this.request_options(args);
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

module.exports.request_options = function(args) {
  var translated_args = this.translate(args);
  var options = this.default_options;
  options.url = this.url(translated_args);
  options.form = this.params(translated_args);
  return(options);
}