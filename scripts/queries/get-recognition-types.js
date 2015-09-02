define(["d3", "underscore", "Table", "RecognitionTypeFacade"], function(d3, _, Table, RecognitionTypeFacade) {
  "use strict";
  return function($q) {
    return $q(function(resolve, reject) {
      d3.csv("data/RecognitionType.csv", function(error, data) {
        if (error) reject(error);
        else resolve(new Table("RecognitionType", _.map(data, function(d) {
            return new RecognitionTypeFacade(parseInt(d.Id), d.Name);
        })));
      });
    });
  };
});