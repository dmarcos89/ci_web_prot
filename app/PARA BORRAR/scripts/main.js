var myApp = angular.module('myApp', []);

myApp.controller('PostsController', function($scope, $http) {
      $scope.posts = [];
      return $http.get('http://ciudadinvisible.herokuapp.com/posts.json').success(function(data) {
        $scope.posts = data;
        return $scope.posts;
      });

 });


myApp.controller('NewPostController', function($scope, $http) {
      
                $scope.errors = [];
                $scope.msgs = [];
 
                $scope.Create = function() {
 
                    $scope.errors.splice(0, $scope.errors.length); // remove all error messages
                    $scope.msgs.splice(0, $scope.msgs.length);
 
                    $http.post('http://ciudadinvisible.herokuapp.com/posts/new', {'Title': $scope.title, 'Author': $scope.author, 'Description': $scope.description, 'Image': $scope.image, 'Date': $scope.date, 'Location': $scope.location, 'Category': $scope.category }
                    ).success(function(data, status, headers, config) {
                        if (data.msg !== '')
                        {
                            $scope.msgs.push(data.msg);
                        }
                        else
                        {
                            $scope.errors.push(data.error);
                        }
                    }).error(function(data, status) { // called asynchronously if an error occurs
// or server returns response with an error status.
                        $scope.errors.push(status);
                    });
                };
         

 });
