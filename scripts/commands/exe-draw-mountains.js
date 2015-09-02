define([
  "Utility",
  "snap",
  "perlin"], function(Utility) {
  "use strict";
  return function($q) {
    return $q(function(resolve, reject) {
      noise.seed(Math.random());
      
      var snapDim = { width: 600, height: 300 };
      
      var snap = Snap("#background-svg").attr({
        viewBox: "0 0 " + snapDim.width + " " + snapDim.height,
        preserveAspectRatio: "xMidYMid slice"
      });
      
      (function(config) {
        var startingPoint = {
          x: 0,
          y: config.startHeight
        };
        
        function generateMountains(index, initialPath, startingPoint) {
          if (startingPoint.x < snap.attr("viewBox").width) {
            var x = startingPoint.x + Math.floor(Utility.map(noise.simplex2(index, 0), -1, 1, Math.abs(config.minXOffset), Math.abs(config.maxXOffset)));
            var y = startingPoint.y + Math.floor(Utility.map(noise.simplex2(index, 0), 0, 1, Math.abs(config.minYOffset), Math.abs(config.maxYOffset))) * (Math.round(Math.random()) * 2 - 1);
            
            return generateMountains(index + 1, initialPath + x + "," + y + " ", { x: x, y: y });
          } else {
            initialPath += snap.attr("viewBox").width + " " + snap.attr("viewBox").height + " ";
            initialPath += 0 + " " + snap.attr("viewBox").height + " ";
            return initialPath;
          }
        }
        
        var path = snap.path(generateMountains(1, "M" + startingPoint.x + "," + startingPoint.y + "L", startingPoint)).attr({ strokeWidth: 1, stroke: "#666", fill: "#999", opacity: 0.5 });
      })({
        startHeight: 150,
        minXOffset: 15,
        maxXOffset: 75,
        minYOffset: 15,
        maxYOffset: 45
      });
    });
  };
});