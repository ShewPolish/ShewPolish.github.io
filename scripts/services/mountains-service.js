define([
  "Utility",
  "angular",
  "underscore",
  "snap",
  "exeDrawMountains"], function(
    Utility,
    angular,
    _,
    snap,
    exeDrawMountains) {
  "use strict";
  return function($q) {
    this.drawMountains = function() {
      return $q.all([exeDrawMountains($q)]);
    };
  };
});