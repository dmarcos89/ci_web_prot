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

angular.module('MainApp').factory('PopularPosts', function ($resource, CONFIG) {
    return $resource(
        // 'http://ciudadinvisible.herokuapp.com/posts/:Id.json',
        CONFIG.API_URL+'popular_posts/:n',
        // 'http://localhost:3000/posts/:Id.json',
        {n: '@n' }
    );
  });

angular.module('MainApp').factory('FollowersPosts', function ($resource, CONFIG) {
    return $resource(
        // 'http://ciudadinvisible.herokuapp.com/posts/:Id.json',
        CONFIG.API_URL+'followed_posts/:Id/:n',
        // 'http://localhost:3000/posts/:Id.json',
        {n: '@n', Id: '@Id'}
    );
  });






// controlador para cargar todos los posteos
angular.module('MainApp').controller('PostsController', function($scope, Posts, $timeout) {
      $scope.message = 'Listado de posteos';
      
      $timeout(function(){
        Posts.query(function(data) {
          $scope.posts = data;
        });
      }, 100);

    });



angular.module('MainApp').controller('PopularesController', function($scope, PopularPosts, $timeout) {
      $scope.message = 'Listado de posteos';
      $timeout(function(){
        PopularPosts.query({ n: 100 },function(data) {
          $scope.posts = data;
        });
      }, 100);
    });


// Este metodo levanta el userid desde las cookies. No está andando el rootScope
angular.module('MainApp').controller('FollowersPostsController', function($scope, $rootScope, $cookies, FollowersPosts, $timeout) {
      $scope.message = 'Listado de posteos';
      $timeout(function(){
        FollowersPosts.query({ n: 100, Id: $rootScope.userid },function(data) {
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