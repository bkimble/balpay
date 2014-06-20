require('./test_helper.js');
var Balpay = require('../lib/balpay.js');
var scenario = require('gerbil').scenario;
var Replay = require("replay");
//Replay.mode = "record";
Replay.mode = "replay";

var good_test_cc_num = '4444444444444444';
var good_test_cc_exp_month = '12';
var good_test_cc_exp_year= '15';
var good_test_cc_cvv = '123';

scenario("Creating a card", {
  "should succeed if the card number, expiration, and cvv are all valid": function(g){
    balpay = new Balpay();    
    balpay.card(good_test_cc_num, good_test_cc_exp_month, good_test_cc_exp_year, good_test_cc_cvv).then(function(card) {
      
      try {
      // this is an async call. need to use promises here to capture return value
      g.assertEqual('/cards/CC4RXQ6eZ6E4lkboU8MJbPbk', card.href);
      g.assertEqual('fuck', card.link);
      console.log(3); 
      console.log(1);
      g.assertEqual('CC4RXQ6eZ6E4lkboU8MJbPbk', card.id);
      console.log(2);
      g.assertEqual(false, true);
      console.log(4);      
      console.log(card);      
      } catch(e) {
        console.log("shit");        
        raise(e);
      }
      }

    );
  }
});

// scenario("Charging a card", {
//   "should succeed if the card number, expiration, and cvv are all valid": function(g){
//     balpay = new Balpay('44444444444444444','12','15','123');
//     g.assertEqual(true, balpay.charge("34","test", "test description"));
//   }
// });
// 
