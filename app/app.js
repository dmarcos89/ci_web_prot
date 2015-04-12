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
    'toaster',
    'angular-parallax',
    'monospaced.elastic',
    '720kb.socialshare',
    'bm.bsTour',
    'app.config'
  ]
);
 
angular.module('MainApp').config(['$routeProvider', function($routeProvider) {


    $routeProvider.
      when('/home', {
        templateUrl: 'home/home.tpl.html',
        controller: 'HomeController',
        title: 'Inicio'
      }).
      when('/explorar/populares', {
        templateUrl: 'posts/posts_populares.tpl.html',
        controller: 'PopularesController',
        title: 'Posteos Populares'
      }).
      when('/explorar/seguidores', {
        templateUrl: 'posts/posts_seguidores.tpl.html',
        controller: 'FollowersPostsController',
        title: 'Posteos de seguidores'
      }).
      when('/explorar/mapa/', {
        templateUrl: 'map/map.tpl.html',
        controller: 'MapController',
        title: 'Arma tu ruta'
      }).
      when('/explorar/turuta/', {
        templateUrl: 'map/route.tpl.html',
        controller: 'MapController',
        title: 'Arma tu ruta'
      }).
      when('/crear', {
        templateUrl: 'create/create2.tpl.html',
        controller: 'CreateController'
      }).
      when('/editar', {
        templateUrl: 'create/editar.tpl.html',
        controller: 'EditController'
      }).
      when('/post/:postid', {
        templateUrl: 'detail/detail.tpl.html',
        controller: 'PostById',
        title: 'Ciudad invisible'
      }).
      when('/user/:userid', {
        templateUrl: 'user/user.tpl.html',
        controller: 'ViewUser',
        title: 'Detalle de usuario'
      }).
      when('/user/:userid/seguidores', {
        templateUrl: 'user/seguidores.tpl.html',
        controller: 'ViewUser',
        title: 'Perfil de usuario'
      }).
      when('/user/:userid/siguiendo', {
        templateUrl: 'user/siguiendo.tpl.html',
        controller: 'ViewUser',
        title: 'Perfil de usuario'
      }).
      when('/user/:userid/favoritos', {
        templateUrl: 'user/favoritos.tpl.html',
        controller: 'ViewUser',
        title: 'Perfil de usuario'
      }).
      when('/perfil/editar', {
        templateUrl: 'user/editar.tpl.html',
        controller: 'ViewUser',
        title: 'Editar perfil'
      }).
      when('/dashboard/', {
        templateUrl: 'user/dashboard.tpl.html',
        controller: 'EditUserController',
        title: 'Ciudad invisible'
      }).
      when('/notificaciones/:userid', {
        templateUrl: 'user/notificaciones.tpl.html',
        controller: 'NotificationsController',
        title: 'Ciudad invisible'
      }).
      when('/acerca/', {
        templateUrl: 'statics/about.tpl.html',
        controller: 'StaticPagesController',
        title: 'Acerca del proyecto'
      }).
      when('/ayuda/', {
        templateUrl: 'statics/help.tpl.html',
        controller: 'StaticPagesController',
        title: 'Ayuda'
      }).
      when('/equipo/', {
        templateUrl: 'statics/team.tpl.html',
        controller: 'StaticPagesController',
        title: 'El equipo'
      }).
      when('/contacto/', {
        templateUrl: 'statics/contact.tpl.html',
        controller: 'StaticPagesController',
        title: 'Contacto'
      }).
      when('/busqueda/:s', {
        templateUrl: 'posts/busqueda.tpl.html',
        controller: 'SearchController',
        title: 'Busqueda'
      }).
      when('/recuperarpassword/paso1', {
        templateUrl: 'password/passwordrecover.tpl.html',
        controller: 'PasswordrecoverStep1',
        title: 'Recuperar contraseña'
      }).
      when('/recuperarpassword/paso2/:token', {
        templateUrl: 'password/recoverstep2.tpl.html',
        controller: 'PasswordrecoverStep2',
        title: 'Recuperar contraseña'
      }).
      otherwise({
        redirectTo: '/home'
      });


      // use the HTML5 History API
    // $locationProvider.html5Mode(true);


  } ]);



angular.module('MainApp').run(['$rootScope', 'ngProgress', function($rootScope, ngProgress) {
    // You can customize progress bar here.
    // ngProgress.color('#F1C40F');

    // When route started to change.
    $rootScope.$on('$routeChangeStart', function() {
        ngProgress.reset(); // Required to handle all edge cases.
        ngProgress.start();
      });

    // When route successfully changed.
    $rootScope.$on('$routeChangeSuccess', function(event, currentRoute, previousRoute) {
        $rootScope.title = currentRoute.title;
        ngProgress.complete();
      });

    // When some error occured.
    $rootScope.$on('$routeChangeError', function() {
        ngProgress.reset();
        ngProgress.complete();
      });
  }]);




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
