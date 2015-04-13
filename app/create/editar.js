'use strict';

angular.module('MainApp').controller('EditController', function($scope, $rootScope, $location, Categories, toaster, $filter, Posts){
	
	toaster.pop('note', 'Editar Borrador', 'Termina de editar el post que comenzaste en el teléfono!');

	var draftaux = $rootScope.draft;
	$scope.title = draftaux.title;
	$scope.description = draftaux.description;

	// $scope.posicion = '[-34.912022928393,-56.1451336644043]';
	$scope.posicion = '[' + draftaux.latitude + ',' + draftaux.longitude + ']';
	// alert($scope.posicion);
	

	Categories.query(function(data){
	    $scope.categories = [];
	    $scope.selectedCategories = data;
	  });

	$scope.categories2 = [];  
  	$scope.selectCategorie = function () {

	        $scope.categories = $filter('filter')($scope.selectedCategories, {checked: true});
	        $scope.categories2 = [];  
	        
	        for (var i = 0; i < $scope.categories.length; i++) {
	          $scope.categories2.push($scope.categories[i].name);
	        };

	  };

	  $scope.category = "";
	  $scope.catselect = function($var){
	    $scope.category = $var;
	  };

	

	var latitud2;
	var longitude2;
	$scope.dragEnd = function(){
    var posicion = this.getPosition();
    // console.log(posicion['D']);
    // console.log(posicion['k']);
    latitud2 = posicion['k'];
    longitude2 = posicion['D'];
  };

	$scope.guardar = function (){
		var data = { Id: draftaux.id, title: $scope.title, description: $scope.description, latitude: latitud2, longitude: longitude2, category: $scope.categories2, draft: false }
		console.log(JSON.stringify(data));

		Posts.update(data, success, error);


		function success(data){
			console.log(JSON.stringify(data));
			$location.path('/post/'+draftaux.id);
			toaster.pop('success', 'Borrador actualizado', 'Excelente, tu post ya se se actualizó!!');
		};

		function error(getResponseHeaders){
			console.log(JSON.stringify(getResponseHeaders));
		};

	};


});
  