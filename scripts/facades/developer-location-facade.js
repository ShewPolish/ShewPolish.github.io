define(function() {
  "use strict";
  
  function DeveloperLocationFacade(id, developerId, locationId) {
    this.id = id;
    this.developerId = developerId;
    this.locationId = locationId;
  }
  
  DeveloperLocationFacade.prototype = {
    constructor: DeveloperLocationFacade
  };
  
  return DeveloperLocationFacade;
});