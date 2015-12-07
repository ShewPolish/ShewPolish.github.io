define(function() {
  "use strict";
  function SkillExperienceFacade(id, skillId, experienceId) {
    this.id = id;
    this.skillId = skillId;
    this.experienceId = experienceId;
  }
  
  SkillExperienceFacade.prototype = {
    constructor: SkillExperienceFacade
  }
  
  return SkillExperienceFacade;
});