var scenario = require('gerbil').scenario, Q = require('q');

var Myclass = function() {  
  this.testit = function() {
    var deferred = Q.defer();  
    deferred.resolve("Hello");
    return deferred.promise;    
  }

}

scenario("I am a monkey", {
  "should not be true if I am a tube steak": function(g){
    g.assertEqual('tubesteak', 'monkey');      
  }
});

// Prints to console:
// == Running I am a monkey ==
//    x should not be true if I am a tube steak - assertion number 2 failed - Error: Not equal tubesteak != monkey
//     at Function.GerbilError [as Error] (projects/balpay/node_modules/gerbil/lib/gerbil.js:164:15)
//     at GerbilTest.Gerbil.Test.assertEqual (projects/balpay/node_modules/gerbil/lib/gerbil.js:313:24)
//     at Object.scenario.should not be true if I am a tube steak (projects/balpay/myclass_test.js:28:7)
//     at Gerbil.execute (projects/balpay/node_modules/gerbil/lib/gerbil.js:22:15)
//     at Gerbil.run (projects/balpay/node_modules/gerbil/lib/gerbil.js:99:16)
//     at scenario (projects/balpay/node_modules/gerbil/lib/gerbil.js:372:41)
//     at Object.<anonymous> (projects/balpay/myclass_test.js:26:1)
//     at Module._compile (module.js:456:26)
//     at Object.Module._extensions..js (module.js:474:10)
//     at Module.load (module.js:356:32)
// All tests completed for I am a monkey: 0 passed, 1 failed, 0 pending, of 1 tests (1 assertions) in 0.0009999275207519531 s


scenario("I am a potato", {
  "should not be true if I am a carrot": function(g){
    myclass = new Myclass
    myclass.testit().then(function() {
      // Is a carrot a potato?
      g.assertEqual('carrot', 'potato');      
      // Is an apple a potato?
      g.assertEqual('apple', 'potato');      
      // Is a potato a potato?
      g.assertEqual('potato', 'potato');
    })
  }
});

// Does not print to console like the monkey scenario does:
// == Running I am a potato ==
//    * should not be true if I am a carrot (1 assertions)
// All tests completed for I am a potato: 1 passed, 0 failed, 0 pending, of 1 tests (1 assertions) in 0.0009999275207519531 s


//In A  Gerbil scenario, When I try to assert a failing case whilst inside of a Q Promise .then() block, it appears Gerbil gobbles up my exceptions. How can I fix this so that the assertions behave the same way inside or outside of a .then() ? Pastebin up at http://pastebin.com/Xp2UwmMP