var Card = function(href, id, links) {
  this.href= href;
  this.id = id;
  this.links = links;  
}

Card.from_json = function(json) {
  return new Card(json.href, json.id, json.links);
}

module.exports = Card;
