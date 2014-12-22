'use strict';
angular.module('MainApp').controller('PasswordrecoverStep1', function($scope, $rootScope ,$routeParams, Reset){
	$scope.mostrarform = true;
	$scope.texto1 = 'No te preocupes. Ingresa tu mail para poder reestablecerla.';
// $scope.mail;
	$scope.recuperar = function(){
		var data = {email: $scope.mail};
	    Reset.save(data, successPostCallback, errorCallback);

	    function successPostCallback(data){
	    	var r = JSON.stringify(data);
	        // alert(r);
	    }
	    function errorCallback(getResponseHeaders){
	    	alert(getResponseHeaders['data']);
	    }


		$scope.texto1 =  'Hemos enviado un email a tu casilla de correo con los pasos a seguir.';
		$scope.mostrarform = false;
	};

});


angular.module('MainApp').controller('PasswordrecoverStep2', function($scope, $routeParams, Accounts, $location){
	$scope.mostrar1 = true;
	$scope.mostrar2 = false;


	var init = function () {
		$scope.token = $routeParams.token;
		var data = {token : $scope.token};
		Accounts.get(data, successPostCallback, errorCallback);

		function successPostCallback(data){
	    	var r = JSON.stringify(data);
	    	// console.log(data);
	    	$scope.obj = data;

	    }
	    function errorCallback(getResponseHeaders){
	    	alert('error');
	    	console.log('error');
	    }

	};

	init();



	$scope.restablecer = function(){
		if($scope.pass != '' && $scope.pass === $scope.repeat){
			var data = { token: $scope.token, password: $scope.pass, repeat: $scope.repeat };
			Accounts.save(data, successPostCallback, errorCallback);
			
			function successPostCallback(data){
			    var r = JSON.stringify(data);
			   	console.log(data);
			   	$scope.obj2 = data;
	    		$scope.mostrar1 = false;
				$scope.mostrar2 = true;
		    }
		    function errorCallback(getResponseHeaders){
		    	alert(getResponseHeaders['data']);
		    }

	};

	
	$scope.loginagain = function(){
		$location.path('/home');
		$('#myModal').modal('show');
	};


});







// Factorys

angular.module('MainApp').factory('Reset', function ($resource, CONFIG) {
    return $resource(
        CONFIG.API_URL+'reset_password'
    );
  });

angular.module('MainApp').factory('Accounts', function ($resource, CONFIG) {
    return $resource(
        CONFIG.API_URL+'accounts/:token',
        {token: '@token'}
    );
  });
