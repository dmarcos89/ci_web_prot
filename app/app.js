//Define an angular module for our app
var sampleApp = angular.module('sampleApp', ['ngRoute']);
 
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

sampleApp.controller('PostsController', function($scope, $http) {
      // ngProgress.complete();
      $scope.message = 'Listado de posteos';
      $scope.posts = [];
      return $http.get('http://ciudadinvisible.herokuapp.com/posts.json').
            success(function(data) {
              $scope.posts = data;
              return $scope.posts;
            }).
            error(function(data) {
            
            });

});


sampleApp.controller('CreateController', function($scope , $http) {
    // ngProgress.complete();
              $scope.message = 'Crear un nuevo post';

                $scope.errors = [];
                $scope.msgs = [];
 
                $scope.Create = function() {
                    // alert("envio de datos para crear post")
                    $scope.errors.splice(0, $scope.errors.length); // remove all error messages
                    $scope.msgs.splice(0, $scope.msgs.length);
 
                    $http.post('http://ciudadinvisible.herokuapp.com/posts/new', {'Title': $scope.title, 'Author': $scope.author, 'Description': $scope.description, 'Image': $scope.image, 'Date': $scope.date, 'Location': $scope.location, 'Category': $scope.category }
                    ).success(function(data, status, headers, config) {
                            $scope.msgs.push(data.msg);
                        
                    }).error(function(data, status) { // called asynchronously if an error occurs
// or server returns response with an error status.
                        $scope.errors.push(status);
                    });
                };



});