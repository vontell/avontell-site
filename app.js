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
    
        // route for the contact page
        .when('/awards', {
            templateUrl : 'pages/awards.html',
            controller  : 'awardsController'
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

app.controller('homeController', function($scope) {
    
    
});

app.controller('aboutController', function($scope) {

    
});

app.controller('projectsController', function($scope) {

    
});

app.controller('awardsController', function($scope) {

    
});