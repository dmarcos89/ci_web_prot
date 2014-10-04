'use strict';

angular.module('MainApp').factory('Login_Common', function ($resource, CONFIG) {
    return $resource(
        CONFIG.API_URL+'/login_common'
    );
  });


angular.module('MainApp').factory('Login_Facebook', function ($resource, CONFIG) {
    return $resource(
        CONFIG.API_URL+'login_facebook/'
    );
  });


angular.module('MainApp').factory('Login_Twitter', function ($resource, CONFIG) {
    return $resource(
        CONFIG.API_URL+'login_twitter/'
    );
  });


angular.module('MainApp').factory('Register_Common', function ($resource, CONFIG) {
    return $resource(
        CONFIG.API_URL+'register_common/'
    );
  });
