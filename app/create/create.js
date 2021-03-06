'use strict';

angular.module('MainApp').controller('CreateController', function($scope, $rootScope, $location, Posts2, fileReader, Assets, ngProgress, Categories, toaster, $filter) {
  

  // Draft.get({ Id: 1 },success1,error1);

  // function success1(data){
  //   alert('1');
  //   console.log(JSON.stringify(data));
  // };

  // function error1(getResponseHeaders){
  //   alert('2');
  //   console.log(JSON.stringify(getResponseHeaders));
  // };


  $scope.categories2 = [];  
  $scope.selectCategorie = function () {

        // alert("a");

        $scope.categories = $filter('filter')($scope.selectedCategories, {checked: true});
        $scope.categories2 = [];  
        
        

        for (var i = 0; i < $scope.categories.length; i++) {
          $scope.categories2.push($scope.categories[i].name);
        };

        // alert(JSON.stringify($scope.categories2));
  };


  Categories.query(function(data){
    $scope.categories = [];
    $scope.selectedCategories = data;
  });


  var fotos = [];
  $scope.imageSrc = [];
  var posicion = '';
  var latitud2 = '';
  var longitude2 = '';

  $scope.Create = function() {

    var data = {post:{title: $scope.title, user_id: $rootScope.userid, description: $scope.description, date: '2014-09-20T00:38:23.000Z' ,latitude: latitud2, longitude: longitude2, category: $scope.categories2, images: fotos, draft: false}};            

    console.log('data:')
    var r = JSON.stringify(data);
    console.log(r);
    // alert(r);

      Posts2.save(data, successPostCallback, errorCallback);

        function successPostCallback(data){
          // alert("articulo creado correctamente");
          var r = JSON.stringify(data);
          console.log(r);

        $location.path('/home');

        toaster.pop('success', "Genial, has creado tu post!", "Compartelo con tus amigos!");

        }
    function errorCallback(getResponseHeaders){
          // alert("error al crear articulo");
          var r = JSON.stringify(getResponseHeaders);
          // alert(r);
          toaster.pop('error','Ups, ha ocurrido un error al crear el articulo',r);

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
    // alert(this.getPosition());
    var posicion = this.getPosition();
    console.log(posicion['D']);
    console.log(posicion['k']);
    latitud2 = posicion['k'];
    longitude2 = posicion['D'];
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


                          // $('#coverimg').show();

                          // alert(foto);
                          Assets.save(foto, successPostCallback, errorCallback);

                              function successPostCallback(data){
                                // alert("se subio foto correctamente");
                                var r = JSON.stringify(data);
                                // alert(r);
                                // alert(data);
                                // console.log(data);
                                // alert(data['0']);
                                // alert(data['id']);
                                var jsonfoto = data['id'];
                                // alert(jsonfoto);
                                fotos.push(jsonfoto);

                                ngProgress.complete();
                                // console.log(r);

                              }
                          function errorCallback(getResponseHeaders){
                                alert("error al subir foto");
                                var r = JSON.stringify(getResponseHeaders);
                                // alert(r);

                                ngProgress.complete();
                                console.log(r);
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


angular.module('MainApp').filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});





// END DIRECTIVES