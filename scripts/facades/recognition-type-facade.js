define(function() {
  "use strict";
  function RecognitionTypeFacade(id, name) {
    this.id = id;
    this.name = name;
  }
  
  RecognitionTypeFacade.prototype = {
    constructor: RecognitionTypeFacade
  }
  
  return RecognitionTypeFacade;
});