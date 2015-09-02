define([
  "Utility", 
  "snap"], function(Utility) {
  "use strict";
  return function($q, treeService) {
    $("body, .navbar-default").animate({
      "background-color": "#DFE1D4"
    }, 1000);
    
    $("#main-footer").animate({
      "background-color": "#959A83",
      "border-color": "#BBC1A6",
      color: "#DFE1D4"
    }, 1000);
    
    return $q(function(resolve, reject) {
      treeService.matureLeaves({
        leafGrowthSpeed: 500,
        leafGrowthInterval: 15,
        clusterGrowthInterval: 0,
        angleOffset: 60,
        leafOffset: 6,
        leafWidth: 12,
        leafLength: 15
      });
    });
  };
});