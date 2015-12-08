(function() {
  "use strict";
  requirejs.config({
    baseUrl: "scripts/vendor",
    paths: {
      Utility:  "../utility",
      /* vendors */
      angular:      "angular.min",
      d3:           "d3.min",
      jquery:       "jquery-1.11.3.min",
      jqueryColor:  "jquery.color",
      underscore:   "underscore-min",
      snap:         "snap.svg-min",
      uiBootstrap:  "ui-bootstrap-tpls-0.13.3.min",
      bootstrap:    "bootstrap.min",
      perlin:       "perlin",
      /* facades */
      DeveloperFacade:          "../facades/developer-facade",
      DeveloperLocationFacade:  "../facades/developer-location-facade",
      ExperienceFacade:         "../facades/experience-facade",
      ExperienceTypeFacade:     "../facades/experience-type-facade",
      LocationFacade:           "../facades/location-facade",
      RecognitionFacade:        "../facades/recognition-facade",
      RecognitionTypeFacade:    "../facades/recognition-type-facade",
      ReferenceFacade:          "../facades/reference-facade",
      SkillExperienceFacade:    "../facades/skill-experience-facade",
      SkillFacade:              "../facades/skill-facade",
      SkillTypeFacade:          "../facades/skill-type-facade",
      /* entities */
      Table:        "../entities/table",
      Resume:       "../entities/resume",
      Developer:    "../entities/developer",
      Recognition:  "../entities/recognition",
      Experience:   "../entities/experience",
      Skill:        "../entities/skill",
      Location:     "../entities/location",
      /* commands */
      exeDrawTree:      "../commands/exe-draw-tree",
      exeDrawMountains: "../commands/exe-draw-mountains",
      exeSpawnWinter:   "../commands/exe-spawn-winter",
      exeSpawnSpring:   "../commands/exe-spawn-spring",
      exeSpawnSummer:   "../commands/exe-spawn-summer",
      exeSpawnAutumn:   "../commands/exe-spawn-autumn",
      /* queries */
      getDeveloperLocations:  "../queries/get-developer-locations",
      getDevelopers:          "../queries/get-developers",
      getExperiences:         "../queries/get-experiences",
      getExperienceTypes:     "../queries/get-experience-types",
      getLocations:           "../queries/get-locations",
      getRecognitions:        "../queries/get-recognitions",
      getRecognitionTypes:    "../queries/get-recognition-types",
      getReferences:          "../queries/get-references",
      getSkillExperiences:    "../queries/get-skill-experiences",
      getSkills:              "../queries/get-skills",
      getSkillTypes:          "../queries/get-skill-types",
      /* AngularJS */
      app:                  "../app",
      resumeService:        "../services/resume-service",
      mountainsService:     "../services/mountains-service",
      treeService:          "../services/tree-service",
      seasonService:        "../services/season-service",
      resumeController:     "../controllers/resume-controller"
    },
    shim: {
      angular: { exports: "angular" },
      jquery: { exports: "$" },
      jqueryColor: { deps: ["jquery"], exports: "jqueryColor" },
      underscore: { exports: "_" },
      snap: { exports: "snap" },
      bootstrap: { exports: "bootstrap", deps: ["jquery"] },
      uiBootstrap: { deps: ["angular", "jquery"] },
      perlin: { exports: "perlin" }
    }
  });

  require(["angular", "app", "bootstrap"], function(angular, app) {
    angular.bootstrap(document, [app.name]);
    
      
    $('.navbar-nav li').click(function(e) {
      $(".navbar-nav li.active").removeClass("active");
      $(".tab-content > div.active").removeClass("active");
      
      var $this = $(this);
      var link = $this.find("a").attr("href");
      
      if (!$this.hasClass("active"))
        $this.addClass("active");
      
      if (!$(link).hasClass("active"))
        $(link).addClass("active");
      
      e.preventDefault();
    });
    
    $("#lightbulb").on("click", function() {
      if ($(".resume").is(":visible")) {
        $("#main-content").fadeOut(function() {
          $("body, .navbar-default").animate({
            "background-color": "#333"
          }, 2400);
          
          $(".navbar-brand, #lightbulb").animate({
            color: "#E7E7E7"
          }, 2400);
        });
      } else {
        $("#main-content").fadeIn(function() {
          $("body, .navbar-default").animate({
            "background-color": "#C5D4C2"
          }, 2400);
          
          $(".navbar-brand, #lightbulb").animate({
            color: "#333"
          }, 2400);
        });
      }
    });
  });
})();