define(function() {
  "use strict";
  function SkillTypeFacade(id, name) {
    this.id = id;
    this.name = name;
  }
  
  SkillTypeFacade.prototype = {
    constructor: SkillTypeFacade
  }
  
  return SkillTypeFacade;
});