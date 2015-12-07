define(["d3", "underscore", "Table", "ExperienceTypeFacade"], function(d3, _, Table, ExperienceTypeFacade) {
  "use strict";
  return function($q) {
    return $q(function(resolve, reject) {
      d3.csv("data/ExperienceType.csv", function(error, data) {
        if (error) reject(error);
        else resolve(new Table("ExperienceType", _.map(data, function(d) {
            return new ExperienceTypeFacade(parseInt(d.Id), d.Name);
        })));
      });
    });
  };
});