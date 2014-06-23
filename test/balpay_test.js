var Balpay = require('../lib/balpay.js');
var Card = require('../lib/card.js');
var scenario = require('gerbil').scenario;
var Replay = require("replay");
var smoking = require('smoking');

var good_test_cc_num = '4111111111111111';
var good_test_cc_exp_month = '12';
var good_test_cc_exp_year= '15';
var good_test_cc_cvv = '123';

scenario("nameOfTemplateDirectory", {
  "should return the name of the api call directory": function(g) {
    balpay = new Balpay();
    g.assertEqual('./api_calls/test', balpay.nameOfTemplateDirectory("test"));
  }
});

scenario("getApiCall", {
  "should fail if name is not passed in": function(g) {
    balpay = new Balpay();
    g.assertThrow(Error, balpay.getApiCall);
  },
  "should succeed if name is passed in" : function(g) {
    balpay = new Balpay();
    g.pending("Need to figure out a way to mock out the require that is being done in this function. We dont care that it actually requires something - just that it tries to require a file by the name that is passed in.")
  }
})

scenario("debit", {
  "should call getApicall for debit": function(g) {
    balpay = new Balpay();
    g.pending("Need to find out how to mock the getApicall and .send methods. We dont care to actually call them, only that they were going to be called.")
  },
})

scenario("card", {
  "should call getApicall for card": function(g) {
    balpay = new Balpay();
    g.pending("Need to find out how to mock the getApicall and .send methods. We dont care to actually call them, only that they were going to be called.")
  },
})

