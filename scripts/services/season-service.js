define([
  "angular",
  "exeSpawnWinter",
  "exeSpawnSpring",
  "exeSpawnSummer",
  "exeSpawnAutumn"], function(
    angular,
    exeSpawnWinter,
    exeSpawnSpring,
    exeSpawnSummer,
    exeSpawnAutumn) {
  "use strict";
  return function($q, treeService) {
    var nextIndex = 0;
    var seasons = [
      exeSpawnWinter,
      exeSpawnSpring,
      exeSpawnSummer,
      exeSpawnAutumn
    ];
    
    this.spawnNextSeason = function() {
      if (nextIndex == seasons.length) nextIndex = 0;
      
      return $q.all([seasons[nextIndex++]($q, treeService)]);
    };
  };
});