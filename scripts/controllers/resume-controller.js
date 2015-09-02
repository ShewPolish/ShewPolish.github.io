define(["angular", "underscore"], function(angular, _) {
  "use strict";
  function experiencesController($scope, resumeSvc, mountainsService, treeSvc, seasonSvc) {
    $scope.resume = {};
    
    $scope.transitionSpring = function() {
      seasonSvc.spawnNextSeason();
    }
    
    $scope.transitionSummer = function() {
      seasonSvc.spawnNextSeason();
    }
    
    resumeSvc.getResume(1).then(function(data) {
      $scope.resume = data;
      
      _.each($scope.resume.experiences, function(exp, index) {
        exp.skills = _.map(exp.skills, function(skill) {
          return skill.name;
        }).join(", ");
        
        exp.active == index == 0;
        exp.image = "images/logo.svg";
      });
    });
    
    mountainsService.drawMountains();
    seasonSvc.spawnNextSeason();
  }

  return experiencesController;
});