module.exports = function() {  
  this.yo = function() {
    console.log("ehhhyys");
  }
  
  this.bar = function(args) { 
    this.yo();
  }
  
  this.foo = function(a,b,c) {
    this.bar.apply(this, [arguments]);
  };
}