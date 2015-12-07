define(function() {
  "use strict";
  function LocationFacade(id, name, abbreviation) {
    this.id = id;
    this.name = name;
    this.abbreviation = abbreviation;
  }
  
  LocationFacade.prototype = {
    constructor: LocationFacade
  }
  
  return LocationFacade;
});