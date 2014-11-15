'use strict';

angular.module('MainApp').controller('HomeController', function($scope, PopularPosts, TopUsers) {
  $scope.message = 'Esta es la home';
  $scope.dynMarkers = [];

  TopUsers.query( {n: 4},function(data){
    $scope.topusers = data;
  });

  PopularPosts.query( {n: 10},function(data){
    $scope.posts = data;




	  // for (var i = 0; i <= $scope.posts.length; i++) {
	  //   $scope.dynMarkers[i] = new google.maps.Marker({
   //      title: 'Titulo post'
   //    });
   //    var lat = $scope.posts[i].latitude;
   //    var lng = $scope.posts[i].longitude;
		 //  var loc = new google.maps.LatLng(lat, lng);

   //    var infoWindow = new google.maps.InfoWindow({
   //      content:'Hi<br/>I am an infowindow'
   //    });
   //        // alert(loc);
   //    $scope.dynMarkers[i].setPosition(loc);
   //    $scope.dynMarkers[i].setMap($scope.map);

   //    $scope.showInfoWindow = function() {
   //      infoWindow.open($scope.map, $scope.dynMarkers[i]);
   //    };
   //  }



    var mapOptions = {
        zoom: 14,
        center: new google.maps.LatLng(-34.901113, -56.164531),
        // mapTypeId: google.maps.MapTypeId.TERRAIN
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
    
    for (var i = 0; i < $scope.posts.length; i++){
      createMarker($scope.posts[i]);
      console.log($scope.posts[i]);
    }


  
    $scope.openInfoWindow = function(e, selectedMarker){
        e.preventDefault();
        google.maps.event.trigger(selectedMarker, 'click');
      };





  });


});


