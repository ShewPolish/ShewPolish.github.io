define(["d3", "underscore", "Table", "RecognitionFacade"], function(d3, _, Table, RecognitionFacade) {
  "use strict";
  return function($q) {
    return $q(function(resolve, reject) {
      d3.csv("data/Recognition.csv", function(error, data) {
        if (error) reject(error);
        else resolve(new Table("Recognition", _.map(data, function(d) {
            return new RecognitionFacade(parseInt(d.Id), d.Name, parseInt(d.RecognitionTypeId), parseInt(d.DeveloperLocationId));
        })));
      });
    });
  };
});