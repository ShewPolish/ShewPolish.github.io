define(["jquery", "jqueryColor"], function($) {
  "use strict";
  return function($q, treeService) {
    $("body, .navbar-default").animate({
      "background-color": "#D8E1D4"
    }, 1000);
    
    $("#main-footer").animate({
      "background-color": "#899A83",
      "border-color": "#ADC1A6",
      color: "#D8E1D4"
    }, 1000);
    
    return $q(function(resolve, reject) {
      treeService.growLeaves({
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