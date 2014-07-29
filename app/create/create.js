'use strict';

angular.module('MainApp').controller("CreateController", function($scope, Posts, fileReader) {
  
  $scope.message = "Crear un nuevo post";
  $scope.categories = [ {
                          title:"Arte",
                          photo: "http://placeimg.com/300/350/arch"
                        },
                        {
                          title:"Musica",
                          photo: "http://placeimg.com/300/350/arch"
                        },
                        {
                          title:"Arquitectura",
                          photo: "http://placeimg.com/300/350/arch"
                        }
                      ];

    $scope.Create = function() {
      data = {post:{title: $scope.title, author: $scope.author, description: $scope.description, image: $scope.image, date: $scope.date, location: markerposition, category: $scope.category,"assets_images":[{"data": "DATA DE PRUEBA PARA DEBUGEAR", "filename": "01.png","content_type": "image/png"}]}};
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



$scope.getFile = function () {
        $scope.progress = 0;
        fileReader.readAsDataUrl($scope.file, $scope)
                      .then(function(result) {
                          $scope.imageSrc = result;
                      });
    };
 
    $scope.$on("fileProgress", function(e, progress) {
        $scope.progress = progress.loaded / progress.total;
    });




});



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