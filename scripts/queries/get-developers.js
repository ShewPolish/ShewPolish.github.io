define(["d3", "underscore", "Table", "DeveloperFacade"], function(d3, _, Table, DeveloperFacade) {
  "use strict";
  return function($q) {
    return $q(function(resolve, reject) {
      d3.csv("data/Developer.csv", function(error, data) {
        if (error) reject(error);
        else resolve(new Table("Developer", _.map(data, function(d) {
            return new DeveloperFacade(parseInt(d.Id), d.Name, d.Nickname);
        })));
      });
    });
  };
});