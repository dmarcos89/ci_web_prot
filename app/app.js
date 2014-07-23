//Define an angular module for our app
var sampleApp = angular.module('sampleApp', ['ngRoute', 'ngResource', 'ngMap']);
 
sampleApp.config(['$routeProvider', function($routeProvider, $routeParams) {
    
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
      when('/post/:postid', {
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

sampleApp.controller("PostById", function($scope, Posts, $routeParams) {
  var postid = $routeParams.postid;
  Posts.get({ Id: postid }, function(data) {
    $scope.post = data;
  });
});


sampleApp.controller("CreateController", function($scope, Posts) {
  
  $scope.message = "Crear un nuevo post";
  $scope.categories = [ {
                          title:"Arte",
                          photo: "http://placeimg.com/300/350/arch"
                        },
                        {
                          title:"Musica",
                          photo: "http://placeimg.com/300/350/arch"
                        },
                        {
                          title:"Arquitectura",
                          photo: "http://placeimg.com/300/350/arch"
                        }
                      ];

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


  $scope.category = "";
  $scope.catselect = function($var){
    $scope.category = $var;
  };

  $scope.dragEnd = function(){
    alert(this.getPosition());
  };

});


