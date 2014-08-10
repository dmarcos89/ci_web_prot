'use strict';

angular.module('MainApp').controller('ViewUser', function($scope, $routeParams, Users) {
	  
	  var userid = $routeParams.userid;

	  $scope.msg = 'Detalle de un usuario';
	

	  $scope.tabs = [
      { title:'Posteos', content:'Listado de Posteos creados por el usuario' },
      { title:'Comentarios', content:'Listado de comentarios hechos por el usuario' },
      { title:'Seguidores', content:'Listado de seguidores del usuario' },
      { title:'Siguiendo', content:'Listado de personas a quien sigue el usuario' }

      // { title:'Dynamic Title 2', content:'Dynamic content 2', disabled: true }
    ];

    // $scope.alertMe = function() {
    //   setTimeout(function() {
    //     alert('You\'ve selected the alert tab!');
    //   });
    // };

    Users.get({ Id: userid }, function(data) {
      $scope.user = data;
      // $scope.lat = data["location"];

	  });
    // Facebook.me(function(data){
	   //  $scope.fbuser = data;
    // });



  });



