'use strict';

angular.module('MainApp').factory('Notifications', function ($resource, CONFIG) {
    return $resource(
        // 'http://ciudadinvisible.herokuapp.com/posts/:Id.json',
        CONFIG.API_URL+'notifications_by_user/:user_id.json',
        // 'http://localhost:3000/posts/:Id.json',
        {user_id: '@user_id' },
        {
      'update': {method: 'PUT'}
      // "reviews": {'method': 'GET', 'params': {'reviews_only': "true"}, isArray: true}
 
    }
    );
  });