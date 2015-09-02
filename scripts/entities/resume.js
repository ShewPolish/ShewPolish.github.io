define(function() {
  "use strict";
  function Resume(developer, recognitions, experiences) {
    this.developer = developer;
    this.recognitions = recognitions;
    this.experiences = experiences;
  }
  
  Resume.prototype = {
    constructor: Resume
  }
  
  return Resume;
});