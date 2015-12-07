define(function() {
  "use strict";
  function Experience(description, skills, location, startDate, endDate, type) {
    this.description = description;
    this.skills = skills;
    this.location = location;
    this.startDate = startDate;
    this.endDate = endDate;
    this.type = type;
  }
  
  Experience.prototype = {
    constructor: Experience
  }
  
  return Experience;
});