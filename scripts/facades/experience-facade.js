define(function() {
  "use strict";
  function ExperienceFacade(id, description, startDate, endDate, experienceTypeId, developerLocationId) {
    this.id = id;
    this.description = description;
    this.startDate = startDate;
    this.endDate = endDate;
    this.experienceTypeId = experienceTypeId;
    this.developerLocationId = developerLocationId;
  }
  
  ExperienceFacade.prototype = {
    constructor: ExperienceFacade
  }
  
  return ExperienceFacade;
});