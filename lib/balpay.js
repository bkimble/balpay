var request = require('request');

var api_key = 'ak-test-ZYkd84gwZ2yRDu1XP8oPJ0A0pgc8VXnV';

var Card = require('./card.js');

module.exports = function() {
  this.default_options = {
    headers: {"Accept": "application/vnd.api+json;revision=1.1"},
    auth : {'user': api_key,'pass': '','sendImmediately': false}
  };

  this.card = function(cc_num, exp_month, exp_year, cvv) {
    var url = "https://api.balancedpayments.com/cards"
    var options = this.default_options
    options.url = url
    
    // support 2 or 4 digit years.
    exp_year = parseInt(exp_year);
    if(exp_year<1900) {  exp_year = exp_year+1900; }
    
    options.form = {
      expiration_month: exp_month,
      expiration_year: exp_year,
      number: cc_num,
      security_code: cvv
    }
    

    request.post(options, function(err, response, body) {
      // this is async so return here is undefined until its ready
      return Card.from_json(JSON.parse(body).cards[0]);
    })
  };

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
