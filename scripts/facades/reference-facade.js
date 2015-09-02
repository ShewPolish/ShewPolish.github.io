define(function() {
  "use strict";
  function ReferenceFacade(id, name, source, referenceTypeId, developerId) {
    this.id = id;
    this.name = name;
    this.source = source;
    this.referenceTypeId = referenceTypeId;
    this.developerId = developerId;
  }
  
  ReferenceFacade.prototype = {
    constructor: ReferenceFacade
  }
  
  return ReferenceFacade;
});