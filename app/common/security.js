'use strict';

angular.module('Security',['facebook']);


angular.module('Security').config(['FacebookProvider', function(FacebookProvider) {
        FacebookProvider.init('494836457286098');
       
      }]);

angular.module('Security').controller('LoginController', ['$scope', '$rootScope', 'Facebook', 'Login_Common', 'Login_Facebook', 'Login_Twitter', 'Register_Common', '$cookies', '$location', 'toaster' ,function($scope, $rootScope, Facebook, Login_Common, Login_Facebook, Login_Twitter, Register_Common, $cookies, $location, toaster, $timeout){

  $rootScope.isAuthenticated = '';
  $rootScope.username = '';
  $rootScope.userid = '';
  $rootScope.userjson = '';
  $rootScope.userthumb = '';

  $scope.errormsg = '';

   $rootScope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };

    $rootScope.getLoggedUser = function(){
      return $rootScope.userid;
    };

  angular.element(document).ready(function () {
        $scope.checkLogin();

      });

  $scope.checkLogin = function(){
    
    //Primero chequeamos las cookies del navegador para ver si hay algun usuario logueado, y en caso positivo ver que tipo es
    var cookieLoginType = $cookies.loginType;
    var cookieUser = $cookies.username;
    var cookieId = $cookies.userid;
    var cookiejson = $cookies.userjson;
    var userthumb = $cookies.userthumb;


    if(cookieLoginType === 'COMMON'){
      updateLoginVars(true,'COMMON',cookieUser,cookieId, cookiejson, userthumb);
    }

    if(cookieLoginType === 'FB'){
      updateLoginVars(true,'FB',cookieUser,cookieId, cookiejson, userthumb);
    }

    if(cookieLoginType === 'TW'){
      updateLoginVars(true,'TW',cookieUser,cookieId, cookiejson, userthumb);
    }
  };

  $scope.doLoginCommon = function(){
      // console.log("probando login");


      if(!$scope.login_email){
          $scope.errorshow = true;
          $scope.errormsg = "Debes ingresar tu Email";
      }
      if(!$scope.login_password){
          $scope.errorshow = true;
          $scope.errormsg = "Debes ingresar tu Password";
      }
      if(!$scope.login_password && !$scope.login_email){
          $scope.errorshow = true;
          $scope.errormsg = "Debes ingresar tu Email y Password";
      }



      var data = {email: $scope.login_email, password: $scope.login_password};
      
      if($scope.login_password && $scope.login_password){
        Login_Common.save(data, successPostCallback, errorCallback);
      }
      

    function successPostCallback(data){
        // alert('login MANUAL ok');
        var r = JSON.stringify(data);
        // alert(r);
        var name = data['first_name'];
        var id = data['id'];
        updateLoginVars(true,'COMMON',name, id, r, data['file_url']);


        // Cerramos el login modal a mano
        $('#myModal').modal('hide');
        $('#myModal2').modal('hide');

          $scope.errorshow = false;
        // $location.path('/dashboard');

        toaster.pop('success', "Bienvenido a Ciudad Invisible", "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum quae quo minima neque, quam.");

      }
      function errorCallback(getResponseHeaders){
          $scope.errorshow = true;
          // $scope.errormsg = getResponseHeaders['data'];
          $scope.errormsg = "Email o Password incorrecta";

        }

    };




  $scope.doRegisterCommon = function(){
      $scope.errormsg2 = [];
      $scope.errorshow2 = true;

      if(!$scope.reg_first_name){
        $scope.errormsg2.push({text:'Debes completar tu Nombre de pila'});
      }
      if(!$scope.reg_last_name){
        $scope.errormsg2.push({text:'Debes completar tu Apellido'});
      }
      if(!$scope.reg_email){
        $scope.errormsg2.push({text:'Debes completar tu Email'});
      }
      if(!$scope.reg_password){
        $scope.errormsg2.push({text:'Debes completar tu Contraseña'});
      }
      if($scope.reg_password != $scope.reg_repeat_password){
        $scope.errormsg2.push({text:'No coinciden la Password y su verificacion'});
      }


      var data = {username: $scope.reg_first_name+" "+$scope.reg_last_name, email: $scope.reg_email, first_name: $scope.reg_first_name, last_name: $scope.reg_last_name, password: $scope.reg_password, city:"", country:""};
      
      if($scope.reg_first_name && $scope.reg_last_name && $scope.reg_email && $scope.reg_password && $scope.reg_repeat_password && $scope.reg_password === $scope.reg_repeat_password){
        Register_Common.save(data, successPostCallback, errorCallback);
      }


      function successPostCallback(data){
        // alert('registro MANUAL ok');
        var r = JSON.stringify(data);
        // alert(r);
        // alert(data['id'])
        var id = data['id'];
        updateLoginVars(true,'COMMON',$scope.reg_first_name,id, r, data['file_url']);

        // Cerramos el register modal a mano
        $('#myModal').modal('hide');
        $('#myModal2').modal('hide');

        // Luego de registrar al usuario, lo enviamos a su dashboard
        // $location.path('/ajustes');

        toaster.pop('success', "Bienvenido a Ciudad Invisible", "Ya estas registrado en Ciudad Invisible! Esperemos que la aplicacion sea de tu agrado.");
       
      }
      function errorCallback(getResponseHeaders){
        // alert('error al hacer registro MANUAL');
        // alert(getResponseHeaders['data']);
          toaster.pop('error', "Ha ocurrido un error al iniciar sesion", getResponseHeaders['data']);


      }

    };


  $scope.doLoginFacebook = function(){
    if(Facebook.isReady()){
      Facebook.login(function(response) {
      if (response.status === 'connected') {
        $scope.status = 'yes';
        // console.log(response);
        // alert('permisos aceptados por el usaurio...');
        // $scope.isAuthenticated = true;
        $scope.me();
      } else {
        $scope.status = 'no';
        // alert('el usuario no acepta los permisos de facebook...');
        toaster.pop('error', "Error al iniciar sesion", 'Debes aceptar los permisos para iniciar sesion con Facebook.');
      }

    }, {scope: 'email'} );
      
    
    }

  };

  $scope.me = function() {
    Facebook.api('/me', function(response) {
      $scope.$apply(function() {
        // Here you could re-check for user status (just in case)
        // console.log("entro al me");
        // console.log(response);
        $scope.user = response;
        $scope.facebookid = response.id;
        $scope.fullname = response.name;
        $scope.first_name = response.first_name;
        $scope.last_name = response.last_name;
        $scope.email = response.email;
        $scope.gender = response.gender;
        $scope.locale = response.locale;
        // alert('Good to see you, ' + response.name + ':' + response.email);
        var photoUrl = 'http://graph.facebook.com/';
        var data = {username: $scope.fullname, email: $scope.email, first_name: $scope.first_name, last_name: $scope.last_name, facebook_id: $scope.facebookid, avatar: photoUrl+$scope.facebookid+'/picture' };
        Login_Facebook.save(data, successPostCallback, errorCallback);

        function successPostCallback(data){
          // alert("login ok con fb");
          var r = JSON.stringify(data);
          // alert(r);
          var id = data['id'];
          updateLoginVars(true,'FB',$scope.fullname,id, r, data['file_url']);
          
          // Cerramos el register modal a mano
          $('#myModal').modal('hide');
          $('#myModal2').modal('hide');
          // $location.path('/dashboard');

          toaster.pop('success', "Bienvenido a Ciudad Invisible", "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum quae quo minima neque, quam.");

        }
        function errorCallback(getResponseHeaders){
          // alert("login error al login con fb");
          // var r = JSON.stringify(getResponseHeaders);
          // alert(r);
          toaster.pop('error', "Error al iniciar sesion", 'Ha ocurrido un error al iniciar sesion con Facebook, intentalo nuevamente');
        }

      });
    });
  };


  $scope.doLogoutFacebook = function(){
    Facebook.logout(function(response){
      updateLoginVars(false,'','','','','');
    });
  };



  $scope.doLogout = function(){
    if($scope.loginType==='FB'){
      $scope.doLogoutFacebook();
    }
    // if($scope.loginType="TW"){

    // }
    if($scope.loginType === 'COMMON'){
      //Actualizo variables
      updateLoginVars(false,'','','','','');
    }

    if($scope.loginType === 'TW'){
      
      updateLoginVars(false,'','','','','');
    }

    $location.path('/home');

  };


  function updateLoginVars(isAuthenticated, loginType, username, userid, json, thumburl){
      $rootScope.isAuthenticated = isAuthenticated;
      $rootScope.loginType = loginType;
      $rootScope.username = username;
      $rootScope.userid = userid;
      $rootScope.userjson = json;
      $rootScope.userthumb = thumburl;
      //Actualizo cookies
      $cookies.isAuthenticated = isAuthenticated;
      $cookies.loginType = loginType;
      $cookies.username = username;
      $cookies.userid = userid;
      $cookies.userjson = json;
      $cookies.userthumb = thumburl;
    }



  $scope.doLoginTwitter = function(){
   hello.login('twitter', {
        scope: 'email',
        display: 'popup'
      }, function(auth, status) {

          hello( 'twitter' ).api('me').success(function(json){

            // alert('Your name is '+ json.name);
            var r = JSON.stringify(json);
            // alert(r);
            // console.log(r);
            // console.log(json);
            var ubicacion = json.location.split(", ");

            var data = {username: json.screen_name, first_name: json.first_name, last_name: json.last_name, twitter_id: json.id, city: ubicacion[0] , country: ubicacion[1], avatar: json.profile_image_url  };
            console.log(data);
            Login_Twitter.save(data, successPostCallback, errorCallback);
            

            function successPostCallback(data){
                // alert('login MANUAL ok');
                var r = JSON.stringify(data);
                // alert(r);
                var name = data['first_name'];
                var id = data['id'];
                updateLoginVars(true,'TW',name, id, r, data['file_url']);

                
                // Cerramos el login modal a mano
                // $("#myModal").modal('toggle');

                // $location.path('/dashboard');

                $('#myModal').modal('hide');
                $('#myModal2').modal('hide');

                toaster.pop('success', "Bienvenido a Ciudad Invisible", "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum quae quo minima neque, quam.");


              }
            function errorCallback(getResponseHeaders){
                // alert('error al hacer login MANUAL');
                var r = JSON.stringify(getResponseHeaders);
                // alert(r);
                // alert(getResponseHeaders['data']);
                toaster.pop('error', "Error al iniciar sesion", getResponseHeaders['data']);
              }


          }).error(function(){
            // alert('Whoops! Error Login Twitter');
            toaster.pop('error', "Error al iniciar sesion", getResponseHeaders['data']);
          });

        });
  };


  $scope.buscar = function(){
    $location.path('/busqueda/'+$scope.searchtext);
    $scope.searchtext = "";
  };


  $scope.noaccount = function(){
    
    $('#myModal').modal('hide');

    $('#myModal2').modal('show');

    // $timeout(function(){
    //     $('#myModal2').modal('show');
    //   }, 1000);

    
  };


}]);






