'use strict';

//Define the main angular module for our app
angular.module('MainApp',
  [
    'ngRoute',
    'ngResource',
    'ngMap',
    'Security'
  ]
);
 
angular.module('MainApp').config(['$routeProvider', function($routeProvider) {
    
    $routeProvider.
      when('/home', {
        templateUrl: 'home/home.tpl.html',
        controller: 'HomeController'
      }).
      when('/about', {
        templateUrl: 'about/about.tpl.html',
        controller: 'AboutController'
      }).
      when('/listado', {
        templateUrl: 'posts/posts.tpl.html',
        controller: 'PostsController'
      }).
      when('/crear', {
        templateUrl: 'create/create.tpl.html',
        controller: 'CreateController'
      }).
      when('/post/:postid', {
        templateUrl: 'detail/detail.tpl.html',
        controller: 'PostById'
      }).
      otherwise({
        redirectTo: '/home'
      });
  } ]);

