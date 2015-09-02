define(function() {
  "use strict";
  function RecognitionFacade(id, name, recognitionTypeId, developerLocationId) {
    this.id = id;
    this.name = name;
    this.recognitionTypeId = recognitionTypeId;
    this.developerLocationId = developerLocationId;
  }
  
  RecognitionFacade.prototype = {
    constructor: RecognitionFacade
  }
  
  return RecognitionFacade;
});