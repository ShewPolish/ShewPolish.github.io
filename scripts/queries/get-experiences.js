define(["d3", "underscore", "Table", "ExperienceFacade"], function(d3, _, Table, ExperienceFacade) {
  "use strict";
  return function($q) {
    return $q(function(resolve, reject) {
      d3.csv("data/Experience.csv", function(error, data) {
        if (error) reject(error);
        else resolve(new Table("Experience", _.map(data, function(d) {
            return new ExperienceFacade(parseInt(d.Id), d.Description, new Date(Date.parse(d.StartDate)), new Date(Date.parse(d.EndDate)), parseInt(d.ExperienceTypeId), parseInt(d.DeveloperLocationId));
        })));
      });
    });
  };
});