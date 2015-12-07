define([
  "angular",
  "underscore",
  "Resume",
  "Developer",
  "Recognition",
  "Experience",
  "Skill",
  "Location",
  "getDeveloperLocations",
  "getDevelopers",
  "getExperiences",
  "getExperienceTypes",
  "getLocations",
  "getRecognitions",
  "getRecognitionTypes",
  "getReferences",
  "getSkillExperiences",
  "getSkills",
  "getSkillTypes"], function(
    angular,
    _,
    Resume,
    Developer,
    Recognition,
    Experience,
    Skill,
    Location,
    getDeveloperLocations,
    getDevelopers,
    getExperiences,
    getExperienceTypes,
    getLocations,
    getRecognitions,
    getRecognitionTypes,
    getReferences,
    getSkillExperiences,
    getSkills,
    getSkillTypes) {
  "use strict";
  return function($q) {
    this.getResume = function(developerId) {
      return $q
        .all([getDeveloperLocations($q), getDevelopers($q), getExperiences($q), getExperienceTypes($q), getLocations($q), getRecognitions($q), getRecognitionTypes($q), getReferences($q), getSkillExperiences($q), getSkills($q), getSkillTypes($q)])
        .then(function(data) {
          /* Parse tables from data. */
          var developerTable = _.where(data, { name: "Developer" })[0].data;
          var developerLocationTable = _.where(data, { name: "DeveloperLocation" })[0].data;
          var experienceTable = _.where(data, { name: "Experience" })[0].data;
          var experienceTypeLkpTable = _.where(data, { name: "ExperienceType" })[0].data;
          var locationLkpTable = _.where(data, { name: "Location" })[0].data;
          var recognitionTable = _.where(data, { name: "Recognition" })[0].data;
          var recognitionTypeLkpTable = _.where(data, { name: "RecognitionType" })[0].data;
          var referenceTable = _.where(data, { name: "Reference" })[0].data;
          var skillExperienceTable = _.where(data, { name: "SkillExperience" })[0].data;
          var skillLkpTable = _.where(data, { name: "Skill" })[0].data;
          var skillTypeLkpTable = _.where(data, { name: "SkillType" })[0].data;
        
          /* Filter tables to particular developer. */
          var developer = _.where(developerTable, { id: developerId })[0];
          var developerLocations = _.where(developerLocationTable, { developerId: developer.id });
          var experiences = _.filter(experienceTable, function(experience) {
            return _.where(developerLocations, { id: experience.developerLocationId });
          });
          var recognitions = _.filter(recognitionTable, function(recognition) {
            return _.where(developerLocations, { id: recognition.developerLocationId });
          });
          var references = _.where(referenceTable, { developerId: developer.id });
          var skillExperiences = _.filter(skillExperienceTable, function(skillExperience) {
            return _.where(experiences, { id: skillExperience.experienceId });
          });
          
          /* Construct and return resume. */
          return new Resume(
            new Developer(developer.name, developer.nickname),
            _.map(recognitions, function(recognition) {
              var location = _.where(locationLkpTable, { id: _.where(developerLocations, { id: recognition.developerLocationId })[0].locationId })[0];
            
              return new Recognition(
                recognition.name,
                _.where(recognitionTypeLkpTable, { id: recognition.recognitionTypeId })[0].name,
                new Location(location.name, location.abbreviation)
              );
            }),
            _.map(experiences, function(experience) {
              var location = _.where(locationLkpTable, { id: _.where(developerLocations, { id: experience.developerLocationId })[0].locationId })[0];
            
              return new Experience(
                experience.description,
                _.map(_.where(skillExperiences, { experienceId: experience.id }), function(skillExperience) {
                  var skill = _.where(skillLkpTable, { id: skillExperience.skillId })[0];
                  
                  return new Skill(skill.name, _.where(skillTypeLkpTable, { id: skill.skillTypeId }));
                }),
                new Location(location.name, location.abbreviation),
                experience.startDate, 
                experience.endDate,
                _.where(experienceTypeLkpTable, { id: experience.experienceTypeId })[0].name
              );
            })
          );
        });
    };
  };
});