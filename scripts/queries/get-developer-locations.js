define(["d3", "underscore", "Table", "DeveloperLocationFacade"], function(d3, _, Table, DeveloperLocationFacade) {
  "use strict";
  return function($q) {
    return $q(function(resolve, reject) {
      d3.csv("data/DeveloperLocation.csv", function(error, data) {
        if (error) reject(error);
        else resolve(new Table("DeveloperLocation", _.map(data, function(d) {
          return new DeveloperLocationFacade(parseInt(d.Id), parseInt(d.DeveloperId), parseInt(d.LocationId));
        })));
      });
    });
  };
});