define(["d3", "underscore", "Table", "LocationFacade"], function(d3, _, Table, LocationFacade) {
  "use strict";
  return function($q) {
    return $q(function(resolve, reject) {
      d3.csv("data/Location.csv", function(error, data) {
        if (error) reject(error);
        else resolve(new Table("Location", _.map(data, function(d) {
            return new LocationFacade(parseInt(d.Id), d.Name, d.Abbreviation);
        })));
      });
    });
  };
});