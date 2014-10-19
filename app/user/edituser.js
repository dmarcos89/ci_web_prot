'use strict';

angular.module('MainApp').controller('EditUserController', function($scope, $rootScope ,$routeParams, Users, $timeout){

	var userid = $routeParams.userid;



 $scope.editarPerfil = function(){
      alert("editar perfil usuario");

      var data = {id: 2, username:"username", first_name:"nombre", last_name:"apellido", email: "mail@mail.com" };
      // alert(JSON.stringify(data));
       Users.update(data, successPostCallback, errorCallback);

        function successPostCallback(data){
          alert("edicion de usuario correcto");
          var r = JSON.stringify(data);
          alert(r);
        }
      function errorCallback(getResponseHeaders){
          alert('edicion de usuario- error!!');
          var r = JSON.stringify(getResponseHeaders);
          alert(r);
        }

    };

    

});