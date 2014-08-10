'use strict';

//Define the main angular module for our app
angular.module('MainApp',
  [
    'ngRoute',
    'ngResource',
    'ngMap',
    'Security',
    'ui.bootstrap'
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
      when('/user/:postid', {
        templateUrl: 'user/profile.tpl.html',
        controller: 'ViewUser'
      }).
      when('/user/', {
        templateUrl: 'user/profile.tpl.html',
        controller: 'ViewUser'
      }).
      when('/myuser/', {
        templateUrl: 'user/myuser.tpl.html',
        controller: 'MyUser'
      }).
      otherwise({
        redirectTo: '/home'
      });
  } ]);






// ---------- START LOCAL VARIABLES -----------
angular.module('MainApp').constant('API_URL', 'http://localhost:3000/posts/:Id.json');


// ------------- END LOCAL VARIABLES --------



// ---------- START PRODUCTION VARIABLES -----------


// ------------- END PRODUCTION VARIABLES --------
