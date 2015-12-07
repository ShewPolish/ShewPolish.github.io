define(function() {
  "use strict";
  function ExperienceTypeFacade(id, name) {
    this.id = id;
    this.name = name;
  }
  
  ExperienceTypeFacade.prototype = {
    constructor: ExperienceTypeFacade
  };
  
  return ExperienceTypeFacade;
});