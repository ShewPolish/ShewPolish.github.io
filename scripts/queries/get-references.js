define(["d3", "underscore", "Table", "ReferenceFacade"], function(d3, _, Table, ReferenceFacade) {
  "use strict";
  return function($q) {
    return $q(function(resolve, reject) {
      d3.csv("data/Reference.csv", function(error, data) {
        if (error) reject(error);
        else resolve(new Table("Reference", _.map(data, function(d) {
            return new ReferenceFacade(parseInt(d.Id),d.Name,d.Source,parseInt(d.ReferenceTypeId),parseInt(d.DeveloperId));
        })));
      });
    });
  };
});