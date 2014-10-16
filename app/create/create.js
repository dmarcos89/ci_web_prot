'use strict';

angular.module('MainApp').controller("CreateController", function($scope, Posts2, fileReader, Assets, ngProgress) {
  
  $scope.message = "Crear un nuevo post";
  $scope.categories = [ {
                          title:"Arte",
                          photo: "http://placeimg.com/300/350/arch"
                        },
                        {
                          title:"Musica",
                          photo: "http://placeimg.com/300/350/tech"
                        },
                        {
                          title:"Arquitectura",
                          photo: "http://placeimg.com/300/350/hist"
                        }
                      ];


var fotos = [];
$scope.imageSrc = [];
var posicion = "";

    $scope.Create = function() {



    var data = {post:{title: $scope.title, user_id: "1", description: $scope.description, date: "2014-09-20T00:38:23.000Z" ,latitude: posicion['k'], longitude: posicion['B'], category: $scope.category, images: fotos}};            



      // json nueva version con varias imagenes
      // var data = {post:{title: $scope.title, user_id: "1", description: $scope.description, date: "2014-09-20T00:38:23.000Z" ,latitude: "-34.9087458", longitude:"-56.1614022137041", category: $scope.category}
      //   , assets_images:[
      //   {data: $scope.Base64_1, filename: "01.jpg", content_type: $scope.Type_1},
      //   {data: $scope.Base64_2, filename: "02.jpg", content_type: $scope.Type_2},
      //   {data: $scope.Base64_3, filename: "03.jpg", content_type: $scope.Type_3},
      //   {data: $scope.Base64_4, filename: "04.jpg", content_type: $scope.Type_4},
      //   {data: $scope.Base64_5, filename: "05.jpg", content_type: $scope.Type_5}
      //   ]};
      
      // json version vieja
      // data = {post:{title: $scope.title, author: $scope.author, description: $scope.description, image: $scope.imageSrc, date: $scope.date, location:$scope.location , category: $scope.category}};
      Posts2.save(data, successPostCallback, errorCallback);

        var r = JSON.stringify(data);
          alert(r);

          
        function successPostCallback(data){
          alert("articulo creado correctamente");
          var r = JSON.stringify(data);
          alert(r);
        }
    function errorCallback(getResponseHeaders){
          alert("error al crear articulo");
          var r = JSON.stringify(getResponseHeaders);
          alert(r);
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