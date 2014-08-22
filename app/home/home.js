'use strict';

angular.module('MainApp').controller('HomeController', function($scope) {
  $scope.message = 'Esta es la home';

  $scope.myInterval = 5000;
  $scope.slides = [{image: 'http://lorempixel.com/1200/400/nature', text: 'Primera imagen del slider'}, {image: 'http://lorempixel.com/1200/400/', text: 'Segunda imagen'}];
  

});

