'use strict';

angular.module('MainApp').factory('Posts', function ($resource) {
    return $resource(
        // 'http://ciudadinvisible.herokuapp.com/posts/:Id.json',
        'http://localhost:3000/posts/:Id.json',
        {Id: '@Id' },
        {
      'update': {method: 'PUT'}
      // "reviews": {'method': 'GET', 'params': {'reviews_only': "true"}, isArray: true}
 
    }
    );
  });


// controlador para cargar todos los posteos
angular.module('MainApp').controller('PostsController', function($scope, Posts) {
      // ngProgress.complete();
      $scope.message = 'Listado de posteos';
      Posts.query(function(data) {
        // alert(data);
        $scope.posts = data;
      });

    });

