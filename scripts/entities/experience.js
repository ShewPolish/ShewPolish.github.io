define(function() {
  "use strict";
  function Experience(description, skills, location, startDate, endDate) {
    this.description = description;
    this.skills = skills;
    this.location = location;
    this.startDate = startDate;
    this.endDate = endDate;
  }
  
  Experience.prototype = {
    constructor: Experience
  }
  
  return Experience;
});