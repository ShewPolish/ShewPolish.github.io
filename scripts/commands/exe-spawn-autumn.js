define([
  "Utility", 
  "snap", 
  "perlin"], function(Utility) {
  "use strict";
  return function($q, treeService) {
    // $("body, .navbar-default").animate({
      // "background-color": "#E1DDD4"
    // }, 1000);
    
    // $("#main-footer").animate({
      // "background-color": "#9A9483",
      // "border-color": "#C1BAA6",
      // color: "#E1DDD4"
    // }, 1000);
    
    return $q(function(resolve, reject) {
      treeService.fallLeaves({
        leafFallSpeed: 4500,
        leafFallInterval: 500,
        clusterFallInterval: 9000,
        xOffset: 100,
        minYOffset: 50,
        maxYOffset: 100
      });
    });
  };
});