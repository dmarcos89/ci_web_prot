'use strict';

angular.module('MainApp').controller('PostById', function($scope, Posts, $routeParams) {
  var postid = $routeParams.postid;
  Posts.get({ Id: postid }, function(data) {
    $scope.post = data;
  });
});