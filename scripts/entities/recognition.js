define(function() {
  "use strict";
  function Recognition(name, type, location) {
    this.name = name;
    this.type = type;
    this.location = location;
  }
  
  Recognition.prototype = {
    constructor: Recognition
  }
  
  return Recognition;
});