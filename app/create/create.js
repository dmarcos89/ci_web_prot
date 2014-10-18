'use strict';

angular.module('MainApp').controller('CreateController', function($scope, $rootScope, $location, Posts2, fileReader, Assets, ngProgress, Categories, toaster) {
  
  // var userid = Number($rootScope.userid);

  // $scope.categories = [ {
  //                         title:"Arte",
  //                         photo: "http://placeimg.com/300/350/arch"
  //                       },
  //                       {
  //                         title:"Musica",
  //                         photo: "http://placeimg.com/300/350/tech"
  //                       },
  //                       {
  //                         title:"Arquitectura",
  //                         photo: "http://placeimg.com/300/350/hist"
  //                       }
  //                     ];


  Categories.query(function(data){
    $scope.categories = data;
  });


  var fotos = [79];
  $scope.imageSrc = [];
  var posicion = '';

  $scope.Create = function() {

    var data = {post:{title: $scope.title, user_id: $rootScope.userid, description: $scope.description, date: '2014-09-20T00:38:23.000Z' ,latitude: posicion['k'], longitude: posicion['B'], category: $scope.category, images: fotos}};            

    // var r = JSON.stringify(data);
    // alert(r);

      Posts2.save(data, successPostCallback, errorCallback);

        function successPostCallback(data){
          alert("articulo creado correctamente");
          // var r = JSON.stringify(data);
          // alert(r);

        $location.path('/home');

        toaster.pop('success', "Genial, has creado tu primer post!", "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum quae quo minima neque, quam.");

        }
    function errorCallback(getResponseHeaders){
          // alert("error al crear articulo");
          var r = JSON.stringify(getResponseHeaders);
          // alert(r);
          toaster.pop('error','Ups, ha ocurrido un error',r);

          // toaster.pop('success', "title", 'Its address is https://google.com.', 15000, 'trustedHtml', 'goToLink');
          // toaster.pop('success', "title", '<ul><li>Render html</li></ul>', 5000, 'trustedHtml');
          // toaster.pop('error', "title", '<ul><li>Render html</li></ul>', null, 'trustedHtml');
          // toaster.pop('wait', "title", null, null, 'template');
          // toaster.pop('warning', "title", "myTemplate.html", null, 'template');
          // toaster.pop('note', "title", "text");
          
        }



    };


  $scope.category = "";
  $scope.catselect = function($var){
    $scope.category = $var;
  };


  $scope.dragEnd = function(){
    alert(this.getPosition());
    posicion = this.getPosition();
    // alert($scope.markers[0].position);
    // $scope.$parent.location = this.getPosition();
  };


$scope.getFile = function () {
        $scope.progress = 0;
        fileReader.readAsDataUrl($scope.file, $scope)
                      .then(function(result) {


                          ngProgress.start();

                          // Separo el string para obtener solo el base64
                          var splited = result.split(";base64,");

                          // $scope.imageSrc = result;
                          $scope.imageSrc.push(result);

                          // alert($scope.imageSrc);

                          $scope.Base64_1 = splited[1];

                          // Separa el string para quedarse unicamente con el tipo
                          var splitedType = splited[0].split("data:");
                          $scope.Type_1 = splitedType[1];

                          var foto = {assets_images:{data: $scope.Base64_1, filename: "foto", content_type: $scope.Type_1}};

                          // alert(foto);
                          Assets.save(foto, successPostCallback, errorCallback);

                              function successPostCallback(data){
                                // alert("se subio foto correctamente");
                                var r = JSON.stringify(data);
                                // alert(r);
                                // alert(data);
                                console.log(data);
                                // alert(data['0']);
                                var jsonfoto = data['id'];
                                // alert(jsonfoto);
                                fotos.push(jsonfoto);

                                ngProgress.complete();

                              }
                          function errorCallback(getResponseHeaders){
                                alert("error al subir foto");
                                var r = JSON.stringify(getResponseHeaders);
                                alert(r);

                                ngProgress.complete();

                              }


                      });
};



});

// END CONTROLLER




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



angular.module('MainApp').directive('backgroundImage', function(){
  return function(scope, element, attrs){
    restrict: 'A',
    attrs.$observe('backgroundImage', function(value) {
      element.css({
        'background': 'url(' + value +') no-repeat no-repeat center'
      });
    });
  };
});





// END DIRECTIVES