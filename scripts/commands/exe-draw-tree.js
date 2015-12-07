define([
  "Utility", 
  "snap"], function(Utility) {
  "use strict";
  return function($q) {
    return $q(function(resolve, reject) {
      var snapDim = { width: 600, height: 600 };
      
      var snap = Snap("#tree-svg").attr({
        viewBox: "0 0 " + snapDim.width + " " + snapDim.height,
        preserveAspectRatio: "xMaxYMax"
      });
      
      function Tree2D(girth) {
        this.girth = girth;
        
        this.grow = function(config) {
          var trunk = new Branch2D(this.girth, this.girth * Utility.randomBetween(config.minGirthWeight, config.maxGirthWeight), config.trunkHeight, config.trunkOffset);
          
          trunk.grow(config);
          
          return trunk;
        };
        
        this.draw = function(trunk, startingPosition) {
          trunk.draw(startingPosition, trunk.offsetAngle);
        };
      }
      
      var branchGroup = snap.g();
        branchGroup.attr({
          id: "branch-group"
        });
      
      function Branch2D(startingGirth, endingGirth, length, offsetAngle) {
        this.startingGirth = startingGirth;
        this.endingGirth = endingGirth;
        this.length = length;
        this.offsetAngle = offsetAngle;
        this.branches = [];
      
        this.grow = function(config) {
          if (this.endingGirth > config.minGirth) {
            var numChildren = Utility.randomBetween(config.minChildren, config.maxChildren);
            
            for (var i = 0; i < numChildren; i++) {
              var maxPotentialOffset = Math.abs(config.offsetAngle);
              var minTotalOffset = config.minTotalOffsetAngle;
              var maxTotalOffset = config.maxTotalOffsetAngle;
              
              var minOffsetAngle = (this.offsetAngle + -maxPotentialOffset) < minTotalOffset ? minTotalOffset : -maxPotentialOffset + this.offsetAngle;
              var maxOffsetAngle = (this.offsetAngle + maxPotentialOffset) > maxTotalOffset ? maxTotalOffset : maxPotentialOffset + this.offsetAngle;          
            
              var branch = new Branch2D(this.endingGirth, this.endingGirth * Utility.randomBetween(config.minGirthWeight, config.maxGirthWeight), this.length * Utility.randomBetween(config.minLengthWeight, config.maxLengthWeight), Utility.randomBetween(minOffsetAngle, maxOffsetAngle));
              
              config.offsetAngle *= config.offsetWeight;
              branch.grow(config);
              
              this.branches.push(branch);
            }
          }
        };
        
        this.draw = function(startingPosition, previousOffsetAngle) {
          var endingPosition = Utility.getCoordinate(startingPosition, this.length, Snap.rad(this.offsetAngle));
          
          var btmLft = Utility.getCoordinate(startingPosition, this.startingGirth / 2, Snap.rad(previousOffsetAngle - 90));
          var btmRgt = Utility.getCoordinate(startingPosition, this.startingGirth / 2, Snap.rad(previousOffsetAngle + 90));
          var topLft = Utility.getCoordinate(endingPosition, this.endingGirth / 2, Snap.rad(this.offsetAngle - 90));
          var topRgt = Utility.getCoordinate(endingPosition, this.endingGirth / 2, Snap.rad(this.offsetAngle + 90));
         
          branchGroup.add(snap.path("M " + btmLft.x + " " + btmLft.y +
                                      " L " + topLft.x + " " + topLft.y + 
                                      " L " + topRgt.x + " " + topRgt.y + 
                                      " L " + btmRgt.x + " " + btmRgt.y).attr({
                                        "class": "branch"
                                      }));
          
          var currentOffsetAngle = this.offsetAngle;
          
          _.each(this.branches, function(branch) {
            branch.draw({ x: endingPosition.x, y: endingPosition.y }, currentOffsetAngle);
          });
        };
      }
      
      var tree = new Tree2D(45);
      var trunk = tree.grow({
        trunkHeight:          snapDim.height / 3.5,
        trunkOffset:          90,
        minChildren:          1,
        maxChildren:          3,
        minGirth:             5,
        minGirthWeight:       0.55,
        maxGirthWeight:       0.65,
        minLengthWeight:      0.75,
        maxLengthWeight:      0.85,
        offsetAngle:          30,
        offsetWeight:         1,
        minTotalOffsetAngle: -15,
        maxTotalOffsetAngle:  195
      });
      
      tree.draw(trunk, { x: snapDim.width / 2, y: snapDim.height });
    });
  };
});