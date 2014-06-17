require('./test_helper.js');
var balpay = require('../lib/balpay.js');
var scenario = require('gerbil').scenario;

var good_test_cc_num = '4444444444444444';
var good_test_cc_exp = '12/15';

var Nipple = require('nipple');

scenario("Charging a card", {
  "should succeed if the card number, expiration, and cvv are all valid": function(g){
	g.assertEqual(true, balpay.charge(good_test_cc_num, good_test_cc_exp));
  }
});
