'use strict';

angular.module('MainApp').controller("CreateController", function($scope, Posts2, fileReader, Assets) {
  
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

    $scope.Create = function() {



    var data = {post:{title: $scope.title, user_id: "1", description: $scope.description, date: "2014-09-20T00:38:23.000Z" ,latitude: "-34.9087458", longitude:"-56.1614022137041", category: $scope.category, images: fotos}};            



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


  // $scope.markerposition = $scope.markers[0].position;
  $scope.dragEnd = function(){
    // alert(this.getPosition());
    alert($scope.markers[0].position);
    $scope.$parent.location = this.getPosition();
  };

// $scope.markers

// $scope.$on('markersInitialized', function(event, map) {
//     alert($scope.markers[0].lat);
// });



$scope.getFile = function () {
        $scope.progress = 0;
        fileReader.readAsDataUrl($scope.file, $scope)
                      .then(function(result) {

                          // Separo el string para obtener solo el base64
                          var splited = result.split(";base64,");

                          $scope.imageSrc = result;
                          $scope.Base64_1 = splited[1];

                          // Separa el string para quedarse unicamente con el tipo
                          var splitedType = splited[0].split("data:");
                          $scope.Type_1 = splitedType[1];

                          var foto = {assets_images:{data: $scope.Base64_1, filename: "01.jpg", content_type: $scope.Type_1}};

                          Assets.save(foto, successPostCallback, errorCallback);

                              function successPostCallback(data){
                                alert("se subio foto correctamente");
                                var r = JSON.stringify(data);
                                alert(r);
                                // alert(data['0']);
                                var jsonfoto = data['0'];
                                // alert(jsonfoto);
                                fotos.push(jsonfoto);
                              }
                          function errorCallback(getResponseHeaders){
                                alert("error al subir foto");
                                var r = JSON.stringify(getResponseHeaders);
                                alert(r);
                              }


                      });
};


// SE REPITE 4 VECES PARA LAS 4 FOTOS EXTRA QUE SE AGREGAN. HAY QUE EMPROLIJAR ESTA CHANCHADA!!
$scope.getFile2 = function () {
        $scope.progress = 0;
        fileReader.readAsDataUrl($scope.file, $scope)
                      .then(function(result) {
                           // Separo el string para obtener solo el base64
                          var splited = result.split(";base64,");

                          $scope.imageSrc2 = result;
                          $scope.Base64_2 = splited[1];

                          // Separa el string para quedarse unicamente con el tipo
                          var splitedType = splited[0].split("data:");
                          $scope.Type_2 = splitedType[1];
                      });
};

$scope.getFile3 = function () {
        $scope.progress = 0;
        fileReader.readAsDataUrl($scope.file, $scope)
                      .then(function(result) {
                          var splited = result.split(";base64,");

                          $scope.imageSrc3 = result;
                          $scope.Base64_3 = splited[1];

                          // Separa el string para quedarse unicamente con el tipo
                          var splitedType = splited[0].split("data:");
                          $scope.Type_3 = splitedType[1];
                      });
};

$scope.getFile4 = function () {
        $scope.progress = 0;
        fileReader.readAsDataUrl($scope.file, $scope)
                      .then(function(result) {
                          var splited = result.split(";base64,");

                          $scope.imageSrc4 = result;
                          $scope.Base64_4 = splited[1];

                          // Separa el string para quedarse unicamente con el tipo
                          var splitedType = splited[0].split("data:");
                          $scope.Type_4 = splitedType[1];
                      });
};

$scope.getFile5 = function () {
        $scope.progress = 0;
        fileReader.readAsDataUrl($scope.file, $scope)
                      .then(function(result) {
                          var splited = result.split(";base64,");

                          $scope.imageSrc5 = result;
                          $scope.Base64_5 = splited[1];

                          // Separa el string para quedarse unicamente con el tipo
                          var splitedType = splited[0].split("data:");
                          $scope.Type_5 = splitedType[1];
                      });
};

// $scope.$on("fileProgress", function(e, progress) {
//         $scope.progress = progress.loaded / progress.total;
// });


// $scope.markers


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

// SE REPITE 4 VECES PARA LAS 4 FOTOS EXTRA QUE SE AGREGAN. HAY QUE EMPROLIJAR ESTA CHANCHADA!!
angular.module('MainApp').directive("ngFileSelect2",function(){
  return {
    link: function($scope,el){
      el.bind("change", function(e){
        $scope.file = (e.srcElement || e.target).files[0];
        $scope.getFile2();
      });
    }
  };
});

angular.module('MainApp').directive("ngFileSelect3",function(){
  return {
    link: function($scope,el){
      el.bind("change", function(e){
        $scope.file = (e.srcElement || e.target).files[0];
        $scope.getFile3();
      });
    }
  };
});

angular.module('MainApp').directive("ngFileSelect4",function(){
  return {
    link: function($scope,el){
      el.bind("change", function(e){
        $scope.file = (e.srcElement || e.target).files[0];
        $scope.getFile4();
      });
    }
  };
});

angular.module('MainApp').directive("ngFileSelect5",function(){
  return {
    link: function($scope,el){
      el.bind("change", function(e){
        $scope.file = (e.srcElement || e.target).files[0];
        $scope.getFile5();
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