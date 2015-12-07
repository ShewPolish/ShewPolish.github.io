define([
  "angular", 
  "resumeService", 
  "mountainsService",
  "treeService", 
  "seasonService", 
  "resumeController",
  'uiBootstrap'], 
  function(
    angular, 
    resumeService,
    mountainsService,
    treeService, 
    seasonService, 
    resumeController) {
  "use strict";
  return angular.module("app", ['ui.bootstrap'])
    .service("ResumeSvc", ["$q", resumeService])
    .service("MountainsSvc", ["$q", mountainsService])
    .service("TreeSvc", ["$q", treeService])
    .service("SeasonSvc", ["$q", "TreeSvc", seasonService])
    .controller("ResumeCtrl", ["$scope", "ResumeSvc", "MountainsSvc", "TreeSvc", "SeasonSvc", resumeController]);
});