'use strict';
var poly;
var lat_lng;
var path;
var service;
var marcadores = new Array();
angular.module('MainApp').controller('MapController', function($scope, $rootScope, Tour) {
	  

      $scope.dragEnd = function(){

        if(poly){
            poly.setMap(null);
        }
	    // alert(this.getPosition());
	    var posicion = this.getPosition();
	    var latitude = posicion['k'];
	    var longitude = posicion['D'];

        var markers = [];

        // alert(latitude);
        // alert(longitude);

        var consulta = {'latitude':latitude, 'longitude':longitude, 'user_id': $rootScope.userid };
        // alert(JSON.stringify(consulta));

        Tour.save(consulta, successPostCallback, errorCallback);

      function successPostCallback(data){
        var r = JSON.stringify(data);
        // alert(r);
        // console.log(r);
        markers = data['posts'];
        console.log(markers);


//***********ROUTING****************//
 

        for (var i = 0; i < marcadores.length; i++) {
            marcadores[i].setMap(null);
        }

        lat_lng = new Array();
        

        var latlngbounds = new google.maps.LatLngBounds();
        for (i = 0; i < markers.length; i++) {
            var data = markers[i]
            var myLatlng = new google.maps.LatLng(data.latitude, data.longitude);
            lat_lng.push(myLatlng);
            var marker = new google.maps.Marker({
                position: myLatlng,
                map: $scope.map,
                title: data.title
            });
            marcadores.push(marker);
            latlngbounds.extend(marker.position);
        }

        // console.log(lat_lng);
        // Agregamos el punto en el que estoy parado para arrancar
        var myLatlng = new google.maps.LatLng(latitude, longitude);
        lat_lng.push(myLatlng);

        //Intialize the Path Array
        path = new google.maps.MVCArray();
        
        //Intialize the Direction Service
        service = new google.maps.DirectionsService();
 
        //Set the Path Stroke Color
        poly = new google.maps.Polyline({ map: $scope.map, strokeColor: '#4986E7' });
 
        //Loop and Draw Path Route between the Points on MAP
        for (var i = 0; i < lat_lng.length; i++) {
            // alert('a');
            if ((i + 1) < lat_lng.length) {
                var src = lat_lng[i];
                var des = lat_lng[i + 1];
                // path.push(src);
                poly.setPath(path);
                service.route({
                    origin: src,
                    destination: des,
                    travelMode: google.maps.DirectionsTravelMode.WALKING
                }, function (result, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        for (var i = 0, len = result.routes[0].overview_path.length; i < len; i++) {
                            path.push(result.routes[0].overview_path[i]);
                        }
                    }
                });
            }
        }

//***********END ROUTING****************//


      }
        function errorCallback(getResponseHeaders){
        var r = JSON.stringify(getResponseHeaders);
        alert(r);
      }


      function resetmarkers(array){

      }
    //   var markers = [
    //         {
    //             "title": 'Pune',
    //             "latitude": '-34.909619',
    //             "longitude": '-56.154428',
    //             "description": 'Pune is the seventh largest metropolis in India, the second largest in the state of Maharashtra after Mumbai.'
    //         }

    //         ,

    //         {
    //             "title": 'Mumbai',
    //             "latitude": '-34.906452',
    //             "longitude": '-56.150823',
    //             "description": 'Mumbai formerly Bombay, is the capital city of the Indian state of Maharashtra.'
    //         }
    //     ,

        
    //         {
    //             "title": 'Pune',
    //             "latitude": '-34.898709',
    //             "longitude": '-56.134214',
    //             "description": 'Pune is the seventh largest metropolis in India, the second largest in the state of Maharashtra after Mumbai.'
    //         }
    // ];



// for (var i = 0; i <= markers.length; i++) {
//   $scope.dynMarkers[i] = new google.maps.Marker({
//         title: 'Titulo post'
//       });
//       var lat = markers[i].lat;
//       var lng = markers[i].lng;
//       var loc = new google.maps.LatLng(lat, lng);
//       // alert(loc);
//       $scope.dynMarkers[i].setPosition(loc);
//       $scope.dynMarkers[i].setMap($scope.map);
//   };

// alert($scope.dynMarkers);






	    
	    


	  };


	});






angular.module('MainApp').factory('Tour', function ($resource, CONFIG) {
    return $resource(
        // 'http://ciudadinvisible.herokuapp.com/users/:Id.json',
        // 'http://localhost:3000/users/:Id.json',
        CONFIG.API_URL+'random_tour.json'
        
    );
  });