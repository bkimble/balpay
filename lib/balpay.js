var request = require('request');
var Q = require('q');
var api_key = 'ak-test-ZYkd84gwZ2yRDu1XP8oPJ0A0pgc8VXnV';
var Card = require('./card.js');

var Balpay = function() {

  this.charge = function(amount, appears_as, description) {
    var url = "https://api.balancedpayments.com/cards/:card_id/debits"
    var options = this.default_options
    options.url = url

    request.post(options, function(err, response, body) {
      console.log(response);
      console.log(body);
    });
    console.log(request);
    return(true);    
  }
};

Balpay.prototype.default_options = function() {
  return {
    headers: {"Accept": "application/vnd.api+json;revision=1.1"},
    auth : {'user': api_key,'pass': '','sendImmediately': false}
  };
};


Balpay.prototype.getApiParams = function(what,foo) {
  console.log(what,foo)
  var return_data = {}
  return_data.options = this.default_options
  return_data.options.url ="https://api.balancedpayments.com/cards";
  return(return_data);
};


Balpay.prototype.card = function(cc_num, exp_month, exp_year, cvv) {    
  var api_params = this.getApiParams('card');    
  var options = api_params.options

//  var foo = this.getApiParams.apply('card'); // doesn't work = when apply is called, it doesnt know about the other methods defined on the object

  var deferred = Q.defer();

  // support 2 or 4 digit years.
  exp_year = parseInt(exp_year);
  if(exp_year<1900) {  exp_year = exp_year+1900; }


  request.post(options, function(err, response, body) {
    if (err) {
      console.log(err);
      deferred.reject(new Error(err));
    } else {
      deferred.resolve(Card.from_json(JSON.parse(body).cards[0]));
    }
  })
  return deferred.promise;
};


module.exports = Balpay;