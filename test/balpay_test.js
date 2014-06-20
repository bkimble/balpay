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
      // this is an async call. need to use promises here to capture return value
      g.assertEqual('/cards/CC4RXQ6eZ6E4lkboU8MJbPbk', card.href);
      g.assertEqual('CC4RXQ6eZ6E4lkboU8MJbPbk', card.id);
      g.assertEqual({}, card.links); 
      g.assertEqual({a:1}, card.links); // trying to get gerbil to fail
      g.assertEqual(false, true); // trying to get gerbil to fail      
      console.log("werwer");
      }
    ).catch(function(error) {
      raise(error);
    });
  }
});

scenario("Charging a card", {
    "should succeed if the card number, expiration, and cvv are all valid": function(g){
      balpay = new Balpay();    
      balpay.card(good_test_cc_num, good_test_cc_exp_month, good_test_cc_exp_year, good_test_cc_cvv).then(function(card) {        
        balpay.charge(card, "1.00", "test", "test description").then(function(output) {
          console.log(output);
        });
        }
      ).catch(function(error) {
        raise(error);
      });
    }
  });
