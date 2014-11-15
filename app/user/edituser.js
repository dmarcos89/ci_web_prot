'use strict';

angular.module('MainApp').controller('EditUserController', function($scope, $rootScope ,$routeParams, Users, $timeout, $cookies, fileReader, ngProgress){

	var userid = $routeParams.userid;


  var logueduser = $cookies.userjson.split(',');
  
  var aux = ((logueduser[0].split(':'))[1]);
  $scope.idusuario = aux.substring(1, aux.length-1);

  var aux1 = ((logueduser[3].split(':'))[1]);
  $scope.nombre = aux1.substring(1, aux1.length-1);

  var aux2 = ((logueduser[4].split(':'))[1]);
  $scope.apellido = aux2.substring(1, aux2.length-1);

  var aux3 = ((logueduser[2].split(':'))[1]);
  $scope.mail = aux3.substring(1, aux3.length-1);

  var aux4 = ((logueduser[7].split(':'))[1]);
  $scope.ciudad = aux4.substring(1, aux4.length-1);

  var aux5 = ((logueduser[8].split(':'))[1]);
  $scope.pais = aux5.substring(1, aux5.length-1);

  var aux6 = ((logueduser[10].split(':'))[1]);
  $scope.biografia = aux6.substring(1, aux6.length-1);

  $scope.imageSrc = [];
  $scope.foto = null;


  $scope.password = "";
  $scope.fotoperfil = $cookies.userthumb; 
   

 $scope.editarPerfil = function(){
      alert("editar perfil usuario");

      if($scope.foto === null){
        if($scope.password === ""){
          var data = {Id: $scope.idusuario, first_name:$scope.nombre, last_name:$scope.apellido, email: $scope.mail, city: $scope.ciudad, country:$scope.pais, bio: $scope.biografia };
        }else{
          var data = {Id: $scope.idusuario, first_name:$scope.nombre, last_name:$scope.apellido, email: $scope.mail, city: $scope.ciudad, country:$scope.pais, bio: $scope.biografia, password: $scope.password };
        }
      }else{
        if($scope.password === ""){
          var data = {Id: $scope.idusuario, first_name:$scope.nombre, last_name:$scope.apellido, email: $scope.mail, city: $scope.ciudad, country:$scope.pais, bio: $scope.biografia, avatar64: $scope.foto };
        }else{
          var data = {Id: $scope.idusuario, first_name:$scope.nombre, last_name:$scope.apellido, email: $scope.mail, city: $scope.ciudad, country:$scope.pais, bio: $scope.biografia, avatar64: $scope.foto, password: $scope.password };
        }
        
      }


      alert(JSON.stringify(data));
      // console.log(data);
      
      Users.update(data, successPostCallback, errorCallback);

        function successPostCallback(data){
          alert("edicion de usuario correcto");
          var r = JSON.stringify(data);
          alert(r);

          $rootScope.username = $scope.nombre;
          $rootScope.userjson = json;
          $rootScope.userthumb = thumburl;
          //Actualizo cookies
          $cookies.username = username;
          $cookies.userjson = json;
          $cookies.userthumb = thumburl;

        }
      function errorCallback(getResponseHeaders){
          alert('edicion de usuario- error!!');
          var r = JSON.stringify(getResponseHeaders);
          alert(r);
        }

    };



$scope.getFile = function () {
        // $scope.progress = 0;
        // alert("cambio de foto");
        fileReader.readAsDataUrl($scope.file, $scope)
                      .then(function(result) {
                          // ngProgress.start();
                          var splited = result.split(";base64,");
                          $scope.imageSrc.push(result);
                          $scope.Base64_1 = splited[1];
                          var splitedType = splited[0].split("data:");
                          $scope.Type_1 = splitedType[1];
                          $scope.foto = {data: $scope.Base64_1, filename: "foto", content_type: $scope.Type_1};
                          $scope.fotoperfil = result;
                          // ngProgress.complete();
                      });
};





});



// START DIRECTIVES FOR IMAGES PREVIEW
angular.module('MainApp').directive("ngFileSelect",function(){
  return {
    link: function($scope,el){
      el.bind("change", function(e){
        $scope.file = (e.srcElement || e.target).files[0];
        $scope.getFile();
      });
    }
  };
});