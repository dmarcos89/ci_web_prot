'use strict';

angular.module('MainApp').factory('Users', function ($resource, CONFIG) {
    return $resource(
        // 'http://ciudadinvisible.herokuapp.com/users/:Id.json',
        // 'http://localhost:3000/users/:Id.json',
        CONFIG.API_URL+'users/:Id.json',
        {Id: '@Id' },
        {'update': {method: 'PUT'}
      // "reviews": {'method': 'GET', 'params': {'reviews_only': "true"}, isArray: true}
 
    }
    );
  });


angular.module('MainApp').factory('TopUsers', function ($resource, CONFIG) {
    return $resource(
        CONFIG.API_URL+'top_users/:n.json',
        {n: '@n' }
    );
  });

angular.module('MainApp').factory('Follow', function ($resource, CONFIG) {
    return $resource(
        CONFIG.API_URL+'follow_user/'
    );
  });



angular.module('MainApp').factory('UserFavorites', function ($resource, CONFIG) {
    return $resource(
        // 'http://ciudadinvisible.herokuapp.com/users/:Id.json',
        // 'http://localhost:3000/users/:Id.json',
        CONFIG.API_URL+'favorites/:Id.json',
        {Id: '@Id' }
    );
  });

angular.module('MainApp').factory('UserFollowers', function ($resource, CONFIG) {
    return $resource(
        // 'http://ciudadinvisible.herokuapp.com/users/:Id.json',
        // 'http://localhost:3000/users/:Id.json',
        CONFIG.API_URL+'followers/:Id.json',
        {Id: '@Id' }
    );
  });


angular.module('MainApp').factory('UserFollowed', function ($resource, CONFIG) {
    return $resource(
        // 'http://ciudadinvisible.herokuapp.com/users/:Id.json',
        // 'http://localhost:3000/users/:Id.json',
        CONFIG.API_URL+'followed/:Id.json',
        {Id: '@Id' }
    );
  });