define(["jquery", "jqueryColor"], function($) {
  "use strict";
  return function($q, treeService) {
    // $("body, .navbar-default").animate({
      // "background-color": "#D4E1D7"
    // }, 1000);
    
    // $("#main-footer").animate({
      // "background-color": "#839A89",
      // "border-color": "#A6C1AD",
      // color: "#D4E1D7"
    // }, 1000);
    
    return $q(function(resolve, reject) {
      treeService.recycleLeaves({
        leafFadeDuration: 1000,
        clusterCount: 3
      });
    });
  };
});