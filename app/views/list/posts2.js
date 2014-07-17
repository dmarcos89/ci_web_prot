var myApp = angular.module('myApp', []);
 
myApp.config(function($routeProvider){
  $routeProvider.when('/listado',
    {
      templateUrl: 'views/list/posts2.html',
      controller: 'PostsController'
    }
  );
});


myApp.controller('HomeController', function($scope){
	$scope.model = {
		message : 'Esta es la home'
	};
});




