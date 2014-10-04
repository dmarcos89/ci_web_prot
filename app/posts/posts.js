'use strict';

angular.module('MainApp').factory('Posts', function ($resource, CONFIG) {
    return $resource(
        // 'http://ciudadinvisible.herokuapp.com/posts/:Id.json',
        CONFIG.API_URL+'posts/:Id.json',
        // 'http://localhost:3000/posts/:Id.json',
        {Id: '@Id' },
        {
      'update': {method: 'PUT'}
      // "reviews": {'method': 'GET', 'params': {'reviews_only': "true"}, isArray: true}
 
    }
    );
  });

angular.module('MainApp').factory('Posts2', function ($resource, CONFIG) {
    return $resource(
        CONFIG.API_URL+'posts.json'
    );
  });


angular.module('MainApp').factory('PostsByUser', function ($resource, CONFIG) {
    return $resource(
        // 'http://ciudadinvisible.herokuapp.com/posts/:Id.json',
        CONFIG.API_URL+'posts_by_user/:Id.json',
        // 'http://localhost:3000/posts/:Id.json',
        {Id: '@Id' }
    );
  });


// controlador para cargar todos los posteos
angular.module('MainApp').controller('PostsController', function($scope, Posts, $timeout) {
      // ngProgress.complete();
      $scope.message = 'Listado de posteos';
      
      $timeout(function(){
        Posts.query(function(data) {
          // alert(data);
          $scope.posts = data;
        });
      }, 100);

    });




angular.module('MainApp').factory('Favorite', function ($resource, CONFIG) {
    return $resource(
        CONFIG.API_URL+'favorite/'
    );
  });