define(["d3", "underscore", "Table", "SkillExperienceFacade"], function(d3, _, Table, SkillExperienceFacade) {
  "use strict";
  return function($q) {
    return $q(function(resolve, reject) {
      d3.csv("data/SkillExperience.csv", function(error, data) {
        if (error) reject(error);
        else resolve(new Table("SkillExperience", _.map(data, function(d) {
            return new SkillExperienceFacade(parseInt(d.Id), parseInt(d.SkillId), parseInt(d.ExperienceId));
        })));
      });
    });
  };
});