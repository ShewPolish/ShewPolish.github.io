define(function() {
  "use strict";
  function Developer(name, nickname) {
    this.name = name;
    this.nickname = nickname;
  }
  
  Developer.prototype = {
    constructor: Developer
  }
  
  return Developer;
});