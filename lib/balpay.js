var request = require('request');

module.exports = function() {
  
  this.nameOfTemplateDirectory = function(api_call) {
    return("./api_calls/" + api_call + "");
  }

  this.getApiCall= function(name) {
    // name is required so we know what method we're operating on here.
    if(name === undefined) { 
      throw new Error("Args missing 'name' property.");
      return false;
    }
    
    // Load logic for the API call
    var api_call = require(this.nameOfTemplateDirectory(name));    
    return(api_call);    
  };

  this.debit = function(card, amount, appears_as, description) {
    var api_call = this.getApiCall('debit');    
    return api_call.send(card, amount, appears_as, description);  
  } 
  
  this.card = function(cc_num, exp_month, exp_year, cvv) {    
    // support 2 or 4 digit years.
    exp_year = parseInt(exp_year);
    if(exp_year<1900) {  exp_year = exp_year+1900; }
    var api_call = this.getApiCall('card');              
    return api_call.send(cc_num, exp_year, exp_year, cvv);
  };
  
};