var myApp = angular.module('myApp', []);

myApp.controller('PostsController', function($scope, $http) {
      $scope.posts = [];
      return $http.get('http://ciudadinvisible.herokuapp.com/posts.json').success(function(data) {
        return $scope.posts = data;
      });
    });

/*myApp.factory('restservice', function ($resource) {
    var source = $resource(
        "http://ciudadinvisible.herokuapp.com/posts.json/");
            // "http://rest-service.guides.spring.io/greeting/");
    var data =source.get({},function(){
      //this log shows the data
     // console.log(data); 
    });

    return data;
});

function AvengersCtrl($scope, $resource, restservice) {
    $scope.servicedata = [restservice];
    //this log shows the promise
    console.log($scope.servicedata);*/
