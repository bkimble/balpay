Balance Payments:

Usage:

Add to package.json:
    "balpay": "bkimble/balpay"  
  
A card must fist be created before you can charge it. 
  
Creating a card:  
  var Balpay = require('balpay');
  var balpay = new Balpay
  var card = balpay.card(cc_num, exp_month, exp_year, cvv)
    
Debiting(charging) cards:
  After you have a card:
  var response = balpay.debit(card, amount, appears_as, description)
  
