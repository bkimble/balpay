var Balpay = require('../lib/balpay.js');
var Card = require('../lib/card.js');
var scenario = require('gerbil').scenario;
var Replay = require("replay");
var smoking = require('smoking');

var good_test_cc_num = '4111111111111111';
var good_test_cc_exp_month = '12';
var good_test_cc_exp_year= '15';
var good_test_cc_cvv = '123';

scenario("Creating a card", {
  "should succeed if the card number, expiration, and cvv are all valid": function(g){
    balpay = new Balpay();    
    balpay.card(good_test_cc_num, good_test_cc_exp_month, good_test_cc_exp_year, good_test_cc_cvv).done(function(card) {
      // this is an async call. need to use promises here to capture return value
      g.assertEqual('/cards/CC4ncj7AibujfeoROHhlOJNg', card.href);
      g.assertEqual('CC4ncj7AibujfeoROHhlOJNg', card.id);
      g.assertEqual(JSON.stringify(card.links),JSON.stringify({})); // Gerbil is stupid when it comes to JSON Assertions
    }
  );
  },
  "should fail if the card is invalid": function(g) {
    g.pending("Unsure what the API response to this looks like as it seems all test cards come back legit");
  }
});
