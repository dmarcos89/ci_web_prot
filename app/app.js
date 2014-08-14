'use strict';

//Define the main angular module for our app
angular.module('MainApp',
  [
    'ngRoute',
    'ngResource',
    'ngCookies',
    'ngMap',
    'Security',
    'ui.bootstrap',
    'app.config'
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
      when('/user/:userid', {
        templateUrl: 'user/profile.tpl.html',
        controller: 'ViewUser'
      }).
      otherwise({
        redirectTo: '/home'
      });
  } ]);






// ---------- START LOCAL VARIABLESS -----------
angular.module('app.config', [])
.constant('CONFIG', {
  'GOOGLE_ANALYTICS_ID' : '',
  'BASE_URL' : '',
  'API_URL' : 'http://localhost:3000/',
  'FACEBOOK_ID' : '494836457286098'
});
// ------------- END LOCAL VARIABLES --------




// ---------- START PRODUCTION VARIABLES -----------
// angular.module('app.config', [])
// .constant('CONFIG', {
//   'GOOGLE_ANALYTICS_ID' : '',
//   'BASE_URL' : '',
//   'API_URL' : 'http://ciudadinvisible.herokuapp.com/',
//   'FACEBOOK_ID' : '494836457286098'
// });

// ------------- END PRODUCTION VARIABLES --------
