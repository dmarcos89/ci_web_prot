//Define an angular module for our app
var sampleApp = angular.module('sampleApp', ['ngRoute', 'ngResource']);
 
sampleApp.config(['$routeProvider', function($routeProvider) {
    
    $routeProvider.
      when('/home', {
        templateUrl: 'views/home/home.html',
        controller: 'HomeController'
      }).
      when('/about', {
        templateUrl: 'views/about/about.html',
        controller: 'AboutController'
      }).
      when('/listado', {
        templateUrl: 'views/list/posts2.html',
        controller: 'PostsController'
      }).
      when('/crear', {
        templateUrl: 'views/create/create.html',
        controller: 'CreateController'
      }).
      when('/post', {
        templateUrl: 'views/detail/detail.html',
        controller: 'PostById'
      }).
      otherwise({
        redirectTo: '/home'
      });

      

}]);
 
 
sampleApp.controller('HomeController', function($scope) {
    // ngProgress.complete();
    $scope.message = 'Homepage';
});
 
sampleApp.controller('AboutController', function($scope) {
    // ngProgress.complete();
    $scope.message = 'About page';
});





sampleApp.factory("Posts", function ($resource) {
    return $resource(
        "http://ciudadinvisible.herokuapp.com/posts/:Id.json",
        {Id: "@Id" },
        {
            "update": {method: "PUT"}
            // "reviews": {'method': 'GET', 'params': {'reviews_only': "true"}, isArray: true}
 
        }
    );
});


// controlador para cargar todos los posteos
sampleApp.controller('PostsController', function($scope, Posts) {
      // ngProgress.complete();
      $scope.message = 'Listado de posteos';
      Posts.query(function(data) {
        // alert(data);
        $scope.posts = data;
      });

});

// controlador para cargar un post a partir de un id. Se hardcodea id=1
sampleApp.controller("PostById", function($scope, Posts) {
  Posts.get({ Id: 2 }, function(data) {
    $scope.post = data;
  });
});


sampleApp.controller("CreateController", function($scope, Posts) {
  
  $scope.message = "Crear un nuevo post";

  $scope.Create = function() {
    data = {post:{title: $scope.title, author: $scope.author, description: $scope.description, image: $scope.image, date: $scope.date, location: $scope.location, category: $scope.category }};
    Posts.save(data, successPostCallback, errorCallback);

    function successPostCallback(){
      alert("ok");
    }
    function errorCallback(){
      alert("error");
    }

  };
});




// esta era la forma desprolija, usando http... hay que borrarlo despues
// sampleApp.controller('CreateController', function($scope , $http) {
//     // ngProgress.complete();
//               $scope.message = 'Crear un nuevo post';

//                 $scope.errors = [];
//                 $scope.msgs = [];
 
//                 $scope.Create = function() {
//                     // alert("envio de datos para crear post");
//                     $scope.errors.splice(0, $scope.errors.length); // remove all error messages
//                     $scope.msgs.splice(0, $scope.msgs.length);
 
//                     $http.post('http://ciudadinvisible.herokuapp.com/posts/create/', {title: $scope.title, author: $scope.author, description: $scope.description, image: $scope.image, date: $scope.date, location: $scope.location, category: $scope.category }
//                     ).success(function(data, status, headers, config) {
//                         $scope.msgs.push(data.msg);
//                         alert(status);
//                     }).error(function(data, status) { // called asynchronously if an error occurs
// // or server returns response with an error status.
//                         $scope.errors.push(data);
//                         alert(status);
//                     });
//                 };
// });