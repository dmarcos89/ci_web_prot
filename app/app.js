//Define an angular module for our app
var sampleApp = angular.module('sampleApp', []);
 
sampleApp.config(['$routeProvider',
  function($routeProvider) {
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
      otherwise({
        redirectTo: '/home'
      });
}]);
 
 
sampleApp.controller('HomeController', function($scope) {
    $scope.message = 'Homepage';
});
 
sampleApp.controller('AboutController', function($scope) {
    $scope.message = 'About page';
});

sampleApp.controller('PostsController', function($scope, $http) {
      
      $scope.message = 'Listado de posteos';
      $scope.posts = [];
      return $http.get('http://ciudadinvisible.herokuapp.com/posts.json').success(function(data) {
        $scope.posts = data;
        return $scope.posts;
      });

});