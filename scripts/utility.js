define(function(_) {
  "use strict";
  return {
    delayIterate: function(set, callback, interval) {
      return (function delayIterateHelper(set, index, callback, interval) {
        if (index < set.length) {
          callback(set[index], index);
          
          return setTimeout(function() {
            delayIterateHelper(set, index + 1, callback, interval);
          }, interval);
        }
      })(set, 0, callback, interval);
    },
    randomBetween: function(min, max) {
      return Math.random() * (max - min) + min;
    },
    midpoint: function(coordinate1, coordinate2) {
      return {
        x: (coordinate1.x + coordinate2.x) / 2,
        y: (coordinate1.y + coordinate2.y) / 2
      };
    },
    distanceBetween: function(coordinate1, coordinate2) {
      return Math.sqrt(Math.pow((coordinate2.x - coordinate1.x), 2) + Math.pow((coordinate2.y - coordinate1.y), 2));
    },
    getCoordinate: function(coordinate, length, radians) {
      return {
        x: coordinate.x - length * Math.cos(radians),
        y: coordinate.y - length * Math.sin(radians)
      };
    },
    map: function(value, oldMin, oldMax, newMin, newMax) {
      return newMin + (value - oldMin) * (newMax - newMin) / (oldMax - oldMin);
    }
  };
});