'use strict';

angular.module('MainApp').controller("CreateController", function($scope, Posts, fileReader) {
  
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

    $scope.Create = function() {

      // json nueva version con varias imagenes
      data = {post:{title: $scope.title, author: $scope.author, description: $scope.description, image: "Foto vieja", date: $scope.date, location: $scope.markers[0].position, category: $scope.category}
        , assets_images:[
        {data: $scope.Base64_1, filename: "01.jpg", content_type: $scope.Type_1},
        {data: $scope.Base64_2, filename: "02.png", content_type: $scope.Type_2},
        {data: $scope.Base64_3, filename: "03.png", content_type: $scope.Type_3},
        {data: $scope.Base64_4, filename: "04.png", content_type: $scope.Type_4},
        {data: $scope.Base64_5, filename: "05.png", content_type: $scope.Type_5}
        ]};
      
      // json version vieja
      // data = {post:{title: $scope.title, author: $scope.author, description: $scope.description, image: $scope.imageSrc, date: $scope.date, location:$scope.location , category: $scope.category}};
      Posts.save(data, successPostCallback, errorCallback);

      function successPostCallback(){
        alert("ok");
      }
      function errorCallback(){
        alert("error");
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
    $scope.location = this.getPosition();
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