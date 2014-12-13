'use strict';

angular.module('MainApp').controller('EditUserController', function($scope, $rootScope ,$routeParams, Users, $timeout, $cookies, fileReader, ngProgress, toaster){

	var userid = $routeParams.userid;


  var logueduser = $cookies.userjson.split(',');
  $scope.obj = jQuery.parseJSON($cookies.userjson);

  $scope.idusuario = $scope.obj.id;
  $scope.nombre = $scope.obj.first_name;
  $scope.apellido = $scope.obj.last_name;
  $scope.mail = $scope.obj.email;
  $scope.ciudad = $scope.obj.city;
  $scope.pais = $scope.obj.country;
  $scope.biografia = $scope.obj.bio;


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
          // alert("edicion de usuario correcto");
          var r = JSON.stringify(data);
          // alert(r);
          toaster.pop('success', "Perfil actualizado", "Muy bien, has actualizado tu perfil!");

          $rootScope.username = $scope.nombre;
          $rootScope.userjson = r;
          $rootScope.userthumb = data.file_url;
          //Actualizo cookies
          $cookies.username = $scope.nombre;
          $cookies.userjson = r;
          $cookies.userthumb = data.file_url;

          al
        }
      function errorCallback(getResponseHeaders){
          // alert('edicion de usuario- error!!');
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