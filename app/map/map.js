'use strict';

angular.module('MainApp').controller('MapController', function($scope, $rootScope, Tour) {
	  
      $scope.dragEnd = function(){
	    // alert(this.getPosition());
	    var posicion = this.getPosition();
	    var latitude = posicion['k'];
	    var longitude = posicion['B'];

	    alert(latitude);
	    alert(longitude);

	    var consulta = {'latitude':latitude, 'longitude':longitude, 'user_id': $rootScope.userid };
	    alert(JSON.stringify(consulta));

	    Tour.save(consulta, successPostCallback, errorCallback);

      function successPostCallback(data){
        var r = JSON.stringify(data);
        alert(r);
      }
  		function errorCallback(getResponseHeaders){
        var r = JSON.stringify(getResponseHeaders);
        alert(r);
      }
	    


	  };

	});






angular.module('MainApp').factory('Tour', function ($resource, CONFIG) {
    return $resource(
        // 'http://ciudadinvisible.herokuapp.com/users/:Id.json',
        // 'http://localhost:3000/users/:Id.json',
        CONFIG.API_URL+'random_tour.json'
        
    );
  });