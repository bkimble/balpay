var scenario = require('gerbil').scenario, Q = require('q');

var Myclass = function() {  
  this.testit = function() {
    var deferred = Q.defer();  
    deferred.resolve("Hello");
    return deferred.promise;    
  }

}

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

scenario("I am a monkey", {
  "should not be true if I am a tube steak": function(g){
    g.assertEqual('tubesteak', 'monkey');      
  }
});
