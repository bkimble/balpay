# Balance Payments:

My attempt to start a better, cleaner version of the common Balanced Payments module.


### Usage
--------

#### Add to package.json:

      "balpay": "bkimble/balpay"  
  
####  Creating a card:

  note:  A card must first be created before you can charge it. 
  
    var Balpay = require('balpay');
    var balpay = new Balpay
    var card = balpay.card(cc_num, exp_month, exp_year, cvv)

  Returns: a promise containing the card that was created.
    
####  Debiting(charging) cards:

  After you have a card:
  
    var response = balpay.debit(card, amount, appears_as, description)

  Returns: a promise containing the response of the charge.
  
#### Testing

  Balpay makes use of Gerbil, Smoking, and Nodeunit. The Makefile is also configured to allow you to run tests easily. Just do:
  
    make test