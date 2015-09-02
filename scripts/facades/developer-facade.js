define(function() {
  "use strict";
  function DeveloperFacade(id, name, nickname) {
    this.id = id;
    this.name = name;
    this.nickname = nickname;
  }
  
  DeveloperFacade.prototype = {
    constructor: DeveloperFacade
  }
  
  return DeveloperFacade;
});