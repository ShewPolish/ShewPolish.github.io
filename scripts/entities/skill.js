define(function() {
  "use strict";
  function Skill(name, type) {
    this.name = name;
    this.type = type;
  }
  
  Skill.prototype = {
    constructor: Skill
  }
  
  return Skill;
});