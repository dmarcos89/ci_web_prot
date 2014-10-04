'use strict';

//Define the main angular module for our app
angular.module('MainApp',
  [
    'ngRoute',
    'ngResource',
    'ngCookies',
    'ngMap',
    'ngProgress',
    'Security',
    'ui.bootstrap',
    'ngAnimate',
    'app.config',
    'angular-google-analytics'
  ]
);
 
angular.module('MainApp').config(['$routeProvider', function($routeProvider, AnalyticsProvider) {
    
    AnalyticsProvider.setAccount('UA-55347762-1');
    AnalyticsProvider.trackPages(true);

    $routeProvider.
      when('/home', {
        templateUrl: 'home/home.tpl.html',
        controller: 'HomeController'
      }).
      when('/explorar/populares', {
        templateUrl: 'posts/posts_populares.tpl.html',
        controller: 'PostsController'
      }).
      when('/explorar/seguidores', {
        templateUrl: 'posts/posts_seguidores.tpl.html',
        controller: 'PostsController'
      }).
      when('/explorar/mapa/', {
        templateUrl: 'map/map.tpl.html',
        controller: 'MapController'
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
        templateUrl: 'user/user.tpl.html',
        controller: 'ViewUser'
      }).
      when('/user/:userid/seguidores', {
        templateUrl: 'user/seguidores.tpl.html',
        controller: 'ViewUser'
      }).
      when('/user/:userid/siguiendo', {
        templateUrl: 'user/siguiendo.tpl.html',
        controller: 'ViewUser'
      }).
      when('/user/:userid/favoritos', {
        templateUrl: 'user/favoritos.tpl.html',
        controller: 'ViewUser'
      }).
      when('/perfil/editar', {
        templateUrl: 'user/editar.tpl.html',
        controller: 'ViewUser'
      }).
      when('/dashboard/', {
        templateUrl: 'user/dashboard.tpl.html',
        controller: 'DashboardController'
      }).
      when('/about/', {
        templateUrl: 'statics/about.tpl.html',
        controller: 'StaticPagesController'
      }).
      otherwise({
        redirectTo: '/home'
      });
  } ]);



angular.module('MainApp').directive('script', function() {
    return {
      restrict: 'E',
      scope: false,
      link: function(scope, elem, attr) {
        if (attr.type=='text/javascript-lazy') {
          var code = elem.text();
          var f = new Function(code);
          f();
        }
      }
    };
  });


// ---------- START LOCAL VARIABLESS -----------
// angular.module('app.config', [])
// .constant('CONFIG', {
//   'GOOGLE_ANALYTICS_ID' : '',
//   'BASE_URL' : '',
//   'API_URL' : 'http://localhost:3000/',
//   'FACEBOOK_ID' : '494836457286098'
// });
// ------------- END LOCAL VARIABLES --------




// ---------- START PRODUCTION VARIABLES -----------
angular.module('app.config', [])
.constant('CONFIG', {
  'GOOGLE_ANALYTICS_ID' : '',
  'BASE_URL' : '',
  'API_URL' : 'https://ciudadinvisible.herokuapp.com/',
  'FACEBOOK_ID' : '494836457286098'
});

// ------------- END PRODUCTION VARIABLES --------
