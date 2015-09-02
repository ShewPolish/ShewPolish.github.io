define(function() {
  "use strict";
  function Location(name, abbreviation) {
    this.name = name;
    this.abbreviation = abbreviation;
  }
  
  Location.prototype = {
    constructor: Location
  }
  
  return Location;
});