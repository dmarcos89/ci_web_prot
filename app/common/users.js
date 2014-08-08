'use strict';

angular.module('MainApp').factory('Users', function ($resource) {
    return $resource(
        // 'http://ciudadinvisible.herokuapp.com/users/:Id.json',
        'http://localhost:3000/users/:Id.json',
        {Id: '@Id' }
        // {'update': {method: 'PUT'}
      // "reviews": {'method': 'GET', 'params': {'reviews_only': "true"}, isArray: true}
 
    // }
    );
  });