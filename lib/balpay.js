var request = require('request');

var api_key = 'ak-test-ZYkd84gwZ2yRDu1XP8oPJ0A0pgc8VXnV';
var balanced_url = "https://api.balancedpayments.com/cards/:card_id/debits";

module.exports = {
	// balanced JS sends directly to Balanced Payments after tokenization	
	
	
	card: function(cc_num, exp_month, exp_year, cvv) {
		// curl https://api.balancedpayments.com/cards \
		//      -H "Accept: application/vnd.api+json;revision=1.1" \
		//      -u ak-test-h7F8F3u41y6LzCK4nZeVd5BafaWOUuZL: \
		//      -d "expiration_month=12" \
		//      -d "security_code=123" \
		//      -d "number=5105105105105100" \
		//      -d "expiration_year=2020"
		
	}
	
	charge: function(cc_num, cc_exp, amount, appears_as, description) {
		
		// need to store a card id first
		// then pass that value as :card_id

		var options = {
			url: balanced_url,
			headers: {
				"Accept": "application/vnd.api+json;revision=1.1"
			},
			auth : {
				'user': api_key,
				'pass': 'p',
				'sendImmediately': false
			}
		};
		
		request.post(options, function(err, response, body) {
			console.log(response);
			console.log(body);
		});
		
		console.log(request);
		return(true);
	}
};