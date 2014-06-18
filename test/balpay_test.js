require('./test_helper.js');
var Balpay = require('../lib/balpay.js');
var scenario = require('gerbil').scenario;

var good_test_cc_num = '4444444444444444';
var good_test_cc_exp_month = '12';
var good_test_cc_exp_year= '15';
var good_test_cc_cvv = '123';

scenario("Creating a card", {
  "should succeed if the card number, expiration, and cvv are all valid": function(g){
    balpay = new Balpay();
    var response = balpay.card(good_test_cc_num, good_test_cc_exp_month, good_test_cc_exp_year, good_test_cc_cvv);
    // this is an async call. need to use promises here to capture return value
    g.assertEqual(true, response);
  }
});

// scenario("Charging a card", {
//   "should succeed if the card number, expiration, and cvv are all valid": function(g){
//     balpay = new Balpay('44444444444444444','12','15','123');
//     g.assertEqual(true, balpay.charge("34","test", "test description"));
//   }
// });
// 
