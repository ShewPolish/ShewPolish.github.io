define(["d3", "underscore", "Table", "SkillTypeFacade"], function(d3, _, Table, SkillTypeFacade) {
  "use strict";
  return function($q) {
    return $q(function(resolve, reject) {
      d3.csv("data/SkillType.csv", function(error, data) {
        if (error) reject(error);
        else resolve(new Table("SkillType", _.map(data, function(d) {
            return new SkillTypeFacade(parseInt(d.Id), d.Name);
        })));
      });
    });
  };
});