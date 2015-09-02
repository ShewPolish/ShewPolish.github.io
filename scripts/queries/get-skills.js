define(["d3", "underscore", "Table", "SkillFacade"], function(d3, _, Table, SkillFacade) {
  "use strict";
  return function($q) {
    return $q(function(resolve, reject) {
      d3.csv("data/Skill.csv", function(error, data) {
        if (error) reject(error);
        else resolve(new Table("Skill", _.map(data, function(d) {
          return new SkillFacade(parseInt(d.Id), d.Name, parseInt(d.SkillTypeId));
        })));
      });
    });
  };
});