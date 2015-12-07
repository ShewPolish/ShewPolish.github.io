define(function() {
  "use strict";
  function SkillFacade(id, name, skillTypeId) {
    this.id = id;
    this.name = name;
    this.skillTypeId = skillTypeId;
  }
  
  SkillFacade.prototype = {
    constructor: SkillFacade
  }
  
  return SkillFacade;
});