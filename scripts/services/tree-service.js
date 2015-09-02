define([
  "Utility",
  "angular",
  "underscore",
  "snap",
  "exeDrawTree"], function(
    Utility,
    angular,
    _,
    snap,
    exeDrawTree) {
  "use strict";
  return function($q) {
    $q.all([exeDrawTree($q)]);
    
    var SEASON_WINTER = "WINTER";
    var SEASON_SPRING = "SPRING";
    var SEASON_SUMMER = "SUMMER";
    var SEASON_AUTUMN = "AUTUMN";
    var currentSeason;
    
    var treeSnap = Snap("#tree-svg");
    
    function generatePath(snap, index, initialPath, startingPoint, xOffset, minYOffset, maxYOffset) {
      if (startingPoint.y < snap.attr("viewBox").height) {
        var x = startingPoint.x + Math.floor(Utility.map(noise.simplex2(index, 0), -1, 1, 0, Math.abs(xOffset))) * (Math.round(Math.random()) * 2 - 1);
        var y = startingPoint.y + Math.floor(Utility.map(noise.simplex2(index, 0), -1, 1, Math.abs(minYOffset), Math.abs(maxYOffset)));
                      
        return generatePath(snap, index + 1, initialPath + x + "," + y + " ", { x: x, y: y }, xOffset, minYOffset, maxYOffset);
      } else {
        return initialPath;
      }
    }
    
    this.recycleLeaves = function(config) {
      currentSeason = SEASON_WINTER;
      
      var oldLeafGroup = treeSnap.select("#leaf-group");
      
      if (oldLeafGroup 
          && oldLeafGroup != null) {
        oldLeafGroup.attr({ id: "" });
        oldLeafGroup.animate({
          opacity: 0
        }, config.leafFadeDuration, function() {
          oldLeafGroup.remove();
        })
      } 
      
      var leafGroup = treeSnap.g().attr({ id: "leaf-group" });
      
      /* Select all branches other than the trunk. */
      var branches = treeSnap.selectAll(".branch");
      branches.splice(0, 1);
      
      /* For each branch, spawn a leaf-cluster. */
      _.each(branches, function(branch) {
        var leafCluster = treeSnap.g().attr({ "class": "leaf-cluster" });
        
        /* Spawn leaves for this leaf-cluster. */
        var pathSegList = branch.attr("d").split(" ");
        var topLft = {
          x: parseFloat(pathSegList[4]),
          y: parseFloat(pathSegList[5])
        };
        
        var topRgt = {
          x: parseFloat(pathSegList[7]),
          y: parseFloat(pathSegList[8])
        };
        
        var startingPoint = {
          x: (topLft.x + topRgt.x) / 2,
          y: (topLft.y + topRgt.y) / 2
        };
        
        for (var i = 0; i < config.clusterCount; i++) {
          var leaf = treeSnap.path("M " + startingPoint.x + " " + startingPoint.y).attr({ "class": "leaf" });
            
          leafCluster.add(leaf);
        }
        
        /* Add leaf-cluster to leaf-group. */
        leafGroup.add(leafCluster);
      });
    };
    
    this.growLeaves = function(config) {
      currentSeason = SEASON_SPRING;
      
      Utility.delayIterate(treeSnap.selectAll(".leaf-cluster:nth-child(even)"), function(leafCluster) {
        var angle = Utility.randomBetween(0, 360);
        var center = {
          x: leafCluster[0].attr("d").split(" ")[1],
          y: leafCluster[0].attr("d").split(" ")[2]
        };
        
        Utility.delayIterate(leafCluster.selectAll(".leaf"), function(leaf, index) {
          var currentAngle = angle + config.angleOffset * index;
          var startpoint = Utility.getCoordinate(center, config.leafOffset, Snap.rad(currentAngle));
          var midpoint = Utility.getCoordinate(startpoint, config.leafLength / 3, Snap.rad(currentAngle));
          var endpoint = Utility.getCoordinate(startpoint, config.leafLength, Snap.rad(currentAngle));
          var midLft = Utility.getCoordinate(midpoint, config.leafWidth / 2, Snap.rad(currentAngle - 90));
          var midRgt = Utility.getCoordinate(midpoint, config.leafWidth / 2, Snap.rad(currentAngle + 90));
        
          leaf.animate({
            d: "M " + startpoint.x + " " + startpoint.y +
               " S " + midLft.x + " " + midLft.y + " " + endpoint.x + " " + endpoint.y +
               " S " + midRgt.x + " " + midRgt.y + " " + startpoint.x + " " + startpoint.y
          }, config.leafGrowthSpeed);
        }, config.leafGrowthInterval);
      }, config.clusterGrowthInterval);
    };
    
    this.matureLeaves = function(config) {
      currentSeason = SEASON_SUMMER;
      
      Utility.delayIterate(treeSnap.selectAll(".leaf-cluster:nth-child(odd)"), function(leafCluster) {
        var angle = Utility.randomBetween(0, 360);
        var center = {
          x: leafCluster[0].attr("d").split(" ")[1],
          y: leafCluster[0].attr("d").split(" ")[2]
        };
        
        Utility.delayIterate(leafCluster.selectAll(".leaf"), function(leaf, index) {
          var currentAngle = angle + config.angleOffset * index;
          var startpoint = Utility.getCoordinate(center, config.leafOffset, Snap.rad(currentAngle));
          var midpoint = Utility.getCoordinate(startpoint, config.leafLength / 3, Snap.rad(currentAngle));
          var endpoint = Utility.getCoordinate(startpoint, config.leafLength, Snap.rad(currentAngle));
          var midLft = Utility.getCoordinate(midpoint, config.leafWidth / 2, Snap.rad(currentAngle - 90));
          var midRgt = Utility.getCoordinate(midpoint, config.leafWidth / 2, Snap.rad(currentAngle + 90));
        
          leaf.animate({
            d: "M " + startpoint.x + " " + startpoint.y +
               " S " + midLft.x + " " + midLft.y + " " + endpoint.x + " " + endpoint.y +
               " S " + midRgt.x + " " + midRgt.y + " " + startpoint.x + " " + startpoint.y
          }, config.leafGrowthSpeed);
        }, config.leafGrowthInterval);
      }, config.clusterGrowthInterval);
    };
    
    this.fallLeaves = function(config) {
      currentSeason = SEASON_AUTUMN;
      
      (function iterateLeafCluster(leafClusters, leafClusterIndex) {
        if (leafClusterIndex < leafClusters.length
            && currentSeason == SEASON_AUTUMN) {
          var leafCluster = leafClusters[leafClusterIndex];
          
          (function iterateLeaf(leaves, leafIndex) {
            if (leafIndex < leaves.length
                && currentSeason == SEASON_AUTUMN) {
              var leaf = leaves[leafIndex];    
              
              noise.seed(Math.random());
            
              var leafPath = leaf.attr("d");
              leafPath = leafPath.split("C");
              leafPath = leafPath[0].split(",");
              var startingPoint = {
                x: parseFloat(leafPath[0].slice(1, leafPath[0].length)),
                y: parseFloat(leafPath[1])
              };
              
              var path = treeSnap.path(generatePath(treeSnap, 1, "M " + startingPoint.x + " " + startingPoint.y + " S ", startingPoint, config.xOffset, config.minYOffset, config.maxYOffset)).attr({ fill: "none" });
              var leafWrapper = treeSnap.g(leaf);
              
              Snap.animate(0, path.getTotalLength(), function(value) {
                var movePoint = path.getPointAtLength(value);
                var leafPathData = leaf.attr("d");
                leafPathData = leafPathData.slice(1, leafPathData.length);
                var pathSegListOrigin = {
                  x: parseFloat(leafPathData.split(",")[0]),
                  y: parseFloat(leafPathData.split(",")[1])
                };
                
                leafWrapper.transform('t' + parseInt(movePoint.x - pathSegListOrigin.x) + ',' + parseInt(movePoint.y - pathSegListOrigin.y) + 'r' + (movePoint.alpha - 90));
                
                if (value > path.getTotalLength() * 2 / 3) {
                  leafWrapper.select("path").attr({
                    opacity: Utility.map(value, path.getTotalLength(), path.getTotalLength() * 2 / 3, 0, 1)
                  });
                }
              }, config.leafFallSpeed, function() {
                path.remove();
                leafWrapper.remove();
                
                setTimeout(function() {
                  iterateLeaf(leaves, leafIndex + 1);
                }, config.leafFallInterval);
              });
            }
          })(leafCluster.selectAll(".leaf"), 0);
          
          setTimeout(function() {
            iterateLeafCluster(leafClusters, leafClusterIndex + 1);
          }, config.clusterFallInterval);
        }
      })(treeSnap.selectAll(".leaf-cluster"), 0);
    };
  };
});