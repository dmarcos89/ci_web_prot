var myApp = angular.module('myApp', [])



.controller('PostsController', function($scope, $http) {
      $scope.posts = [];
      return $http.get('http://ciudadinvisible.herokuapp.com/posts.json').success(function(data) {
        $scope.posts = data;
        return $scope.posts;
		});
})

.controller('HomeController', function($scope){
	$scope.model = {
		message : 'Esta es la home'
	};
});



myApp.config(function($routeProvider){
  $routeProvider.when("/",
    {
      templateUrl: "app.html",
      controller: "AppCtrl"
    }
  );
});
