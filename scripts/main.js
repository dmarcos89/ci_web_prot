var myApp = angular.module('myApp', ['ngResource']);

myApp.factory('restservice', function ($resource) {
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
    console.log($scope.servicedata);
}