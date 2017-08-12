var app = angular.module('avontellApp', ['ngRoute']);

// Configure routing
app.config(function($routeProvider) {
    $routeProvider

        // route for the home page
        .when('/', {
            templateUrl : 'pages/home.html',
            controller  : 'homeController'
        })

        // route for the about page
        .when('/about', {
            templateUrl : 'pages/about.html',
            controller  : 'aboutController'
        })

        // route for the contact page
        .when('/projects', {
            templateUrl : 'pages/projects.html',
            controller  : 'projectsController'
        })
    
        // route for the blog page
        .when('/blog', {
            templateUrl : 'pages/blog.html',
            controller  : 'blogController'
        })
    
        // route for the resume page
        .when('/resume', {
            templateUrl : 'pages/resume.html',
            controller  : 'resumeController'
        })
    
        // route for the awards page
        .when('/awards', {
            templateUrl : 'pages/awards.html',
            controller  : 'awardsController'
        })
    
        // route for the reviews page
        .when('/reviews', {
            templateUrl : 'pages/reviews.html',
            controller  : 'reviewsController'
        })
    
        // route for the blog page
        .when('/gallery', {
            templateUrl : 'pages/gallery.html',
            controller  : 'galleryController'
        })
    
        // route for the papers page
        .when('/papers', {
            templateUrl : 'pages/papers.html',
            controller  : 'papersController'
        });
});

app.factory('PanelService', function() {
    return {
        open: function() {
            document.getElementById("panel").style.left = "0px";
        },
        close: function() {
            document.getElementById("panel").style.left = "-180px";
        }
    };
});

app.controller('panelController', function($scope, PanelService) {
    
    $scope.close = function() {
        PanelService.close();
    };
    
});

app.controller('baseController', function($scope, PanelService) {
    
    $scope.open = function() {
        PanelService.open();
    }
    
});

app.controller('homeController', function($scope, $location, $anchorScroll) {
    
    $scope.jumpTo = function(element, path) {

        $location.path(path);
        $location.hash(element);
        $anchorScroll($location.hash(element));
        
    }
    
});

app.controller('aboutController', function($scope) {

    
});

app.controller('projectsController', function($scope) {

    
});

app.controller('galleryController', function($scope) {

    
});

app.controller('reviewsController', function($scope, $location, $anchorScroll) {
    
    $scope.jumpTo = function(element) {

        $location.hash(element);
        $anchorScroll($location.hash(element));
        
    }
    
});

app.controller('blogController', function($scope, $location, $anchorScroll) {

    $scope.scrollTo = function(element) {
        
        $location.hash(element);
        $anchorScroll($location.hash(element));

    };

});

app.controller('awardsController', function($scope) {

    
});

app.controller('resumeController', function($scope) {

    
});

app.controller('papersController', function($scope) {

    
});