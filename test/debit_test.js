var Balpay = require('../lib/balpay.js');
var Card = require('../lib/card.js');
var scenario = require('gerbil').scenario;
var Replay = require("replay");
var smoking = require('smoking');

scenario("Charging a card", {
  "should succeed if the account has funds": function(g){
    balpay = new Balpay();  
    // Mock the card. No need to create one every time.
    var card = smoking(Card, { id: 'CC55eeXXeeXXeeXXeeXXeeXX' });	    
    balpay.debit(card, "100", "test", "test description").done(function(output) {    
      g.assertEqual(1, output.debits.length);
      var debit = output.debits[0];
      g.assertEqual(100, debit.amount);
      g.assertEqual("test", debit.appears_on_statement_as);
      g.assertEqual("USD", debit.currency);
      g.assertEqual("/debits/CC55eeXXeeXXeeXXeeXXeeXX", debit.href);
      g.assertEqual("CC55eeXXeeXXeeXXeeXXeeXX", debit.id);
      g.assertEqual("succeeded", debit.status);
    });
  },
  "should fail if the card doesnt have access to be debited": function(g){
      balpay = new Balpay();    
      // Mock the card. No need to create one every time.
      var card = smoking(Card, { id: 'CC4ncj7AibujfeoROHhlOJNg' });	    
        balpay.debit(card, "1.00", "test", "test description").then(function(output) {
          g.assert(output.errors);
          g.assert(1, output.errors.length)
          var error = output.errors[0];
          g.assertEqual("Unauthorized", error.status);
          g.assertEqual("Not permitted to perform create on debits. Your request id is OHM8fd92348fa4611e3b7da06429171ffad.", error.description);
          g.assertEqual("'authentication-required", error.category_code);
          g.assertEqual(401, error.status_code);
          g.assertEqual("permission", error.category_type);
          g.assertEqual("OHM8fd92348fa4611e3b7da06429171ffad", error.request_id);
      });
    },
    "should fail when account does not have funds": function(g) {
        // Need to find out from BalncedPayments what a denied transaction looks like. 
        // The test credit card they give to us does not have the ability to actually
        // debit.
        g.pending();
    }
});
