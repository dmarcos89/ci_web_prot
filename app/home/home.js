'use strict';

angular.module('MainApp').controller('HomeController', function($scope, PopularPosts, TopUsers, Posts2) {
  $scope.message = 'Esta es la home';
  $scope.dynMarkers = [];

  Posts2.query(function(data){
    $scope.todosposts = data;

    var mapOptions = {
        zoom: 14,
        center: new google.maps.LatLng(-34.901113, -56.164531),
        scrollwheel: false
      };

    $scope.map = new google.maps.Map(document.getElementById('map-view'), mapOptions);

    $scope.markers = [];
    
    var infoWindow = new google.maps.InfoWindow();
    
    var createMarker = function (info){
        
        var marker = new google.maps.Marker({
            map: $scope.map,
            position: new google.maps.LatLng(info.latitude, info.longitude),
            title: info.title,
            foto: info.assets[0].file_url.replace('original','small'),
            description : info.description,
            postid : info.id
          });

        // marker.content = '<div class="infoWindowContent">'
        //                   +info.title+
        //                   '</div>';
        
          google.maps.event.addListener(marker, 'click', function(){
            infoWindow.setContent('<div class="row"><div class="col-lg-12"><h3 style="text-align:center;">'+marker.title+'</h3></div><div class="col-lg-7"><img class="img-responsive" style="width:100%;" src="'+marker.foto+'"></div><div class="col-lg-5"><p>'+marker.description.substring(0,200)+'...<a href="#/post/'+marker.postid+'">Leer mas</a></p></div>');
            infoWindow.open($scope.map, marker);
          });
        
        $scope.markers.push(marker);
        
    } 
    
    for (var i = 0; i < $scope.todosposts.length; i++){
      if($scope.todosposts[i].latitude != null && $scope.todosposts[i].longitude != null){
      createMarker($scope.todosposts[i]);
      // console.log($scope.todosposts[i]);
      console.log($scope.todosposts[i].latitude + ' - ' + $scope.todosposts[i].longitude);
      }
    }


  
    $scope.openInfoWindow = function(e, selectedMarker){
        e.preventDefault();
        google.maps.event.trigger(selectedMarker, 'click');
      };





  });

  TopUsers.query( {n: 4},function(data){
    $scope.topusers = data;
  });

  PopularPosts.query( {n: 10},function(data){
    $scope.posts = data;



  });


});


