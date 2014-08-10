'use strict';

angular.module('MainApp').factory('Login_Common', function ($resource) {
    return $resource(
        'http://ciudadinvisible.herokuapp.com/login_common/'
        // 'http://localhost:3000/login_common/'
        // {'update': {method: 'PUT'}
      // "reviews": {'method': 'GET', 'params': {'reviews_only': "true"}, isArray: true}
 
    // }
    );
  });


angular.module('MainApp').factory('Login_Facebook', function ($resource) {
    return $resource(
        'http://ciudadinvisible.herokuapp.com/login_facebook/'
        // 'http://localhost:3000/login_facebook/'
        // {'update': {method: 'PUT'}
      // "reviews": {'method': 'GET', 'params': {'reviews_only': "true"}, isArray: true}
 
    // }
    );
  });


angular.module('MainApp').factory('Login_Twitter', function ($resource) {
    return $resource(
        'http://ciudadinvisible.herokuapp.com/login_twitter/'
        // 'http://localhost:3000/login_twitter/'
        // {'update': {method: 'PUT'}
      // "reviews": {'method': 'GET', 'params': {'reviews_only': "true"}, isArray: true}
 
    // }
    );
  });
