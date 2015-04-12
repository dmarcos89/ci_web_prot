'use strict';
var poly;
var lat_lng;
var path;
var service;
var marcadores = new Array();

angular.module('MainApp').controller('MapController', function($scope, $rootScope, Tour, $timeout) {
	  
      $scope.puntos = '';

      $scope.dragEnd = function(){

        if(poly != null){
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

        // Tour.save(consulta, successPostCallback, errorCallback);
        // function successPostCallback(data){
        // var r = JSON.stringify(data['part_of_tours']);
        // markers = data['part_of_tours'];
        // $scope.puntos = data['part_of_tours'];
        // console.log(markers);


        markers = [
    {
        "id": 4029,
        "post_id": 18,
        "tour_id": 878,
        "created_at": "2015-04-12T17:44:48.589Z",
        "updated_at": "2015-04-12T17:44:48.589Z",
        "tour_order": 1,
        "post": {
            "id": 18,
            "title": "This is awesome!",
            "description": "Ingrese una breve descripción de su lugar invisible, por ejemplo la historia que usted considera que tiene o el significado que tiene para usted...",
            "image": null,
            "date": "2015-03-30T13:06:11.000Z",
            "location": "Roque Graseras 640, Montevideo 11300, Uruguay",
            "category": null,
            "created_at": "2015-03-30T13:06:12.067Z",
            "updated_at": "2015-03-30T13:06:12.067Z",
            "user_id": 2,
            "latitude": -34.9194508419583,
            "longitude": -56.1520251569106,
            "draft": true,
            "author": "Mathias Carignani",
            "author_avatar": "http://graph.facebook.com/10203586418117251/picture",
            "favorites_quantity": 1,
            "comments": [
                {
                    "text": "probando la demo",
                    "first_name": "Damián",
                    "last_name": "Marcos",
                    "username": "dmarcos89",
                    "avatar": "http://pbs.twimg.com/profile_images/378800000406941306/7a868cec8d020c25bd5589e78ff4e61c_normal.jpeg"
                },
                {
                    "text": "a ver si llega este comentario hdp!!",
                    "first_name": "Damian",
                    "last_name": "Marcos",
                    "username": "Damian Marcos",
                    "avatar": "http://s3-sa-east-1.amazonaws.com/ciudadinvisible/users/avatars/000/000/001/original/foto?1428170787"
                }
            ],
            "comments_quantity": 2,
            "first_image": "http://s3-sa-east-1.amazonaws.com/ciudadinvisible/assets/files/000/000/032/original/This_is_awesome!.png?1427720882",
            "assets": [
                {
                    "file_file_name": "This_is_awesome!.png",
                    "file_content_type": "image/png",
                    "file_url": "http://s3-sa-east-1.amazonaws.com/ciudadinvisible/assets/files/000/000/032/original/This_is_awesome!.png?1427720882"
                }
            ]
        }
    },
    {
        "id": 4030,
        "post_id": 28,
        "tour_id": 878,
        "created_at": "2015-04-12T17:44:48.600Z",
        "updated_at": "2015-04-12T17:44:48.600Z",
        "tour_order": 2,
        "post": {
            "id": 28,
            "title": "hshs",
            "description": "Ingrese una breve descripción de su lugar invisible, por ejemplo la historia que usted considera que tiene o el significado que tiene para usted...",
            "image": null,
            "date": "2015-04-11T17:23:21.000Z",
            "location": "Roque Graseras 640, Montevideo 11300, Uruguay",
            "category": null,
            "created_at": "2015-04-11T17:23:20.198Z",
            "updated_at": "2015-04-11T17:23:20.198Z",
            "user_id": 2,
            "latitude": -34.9196410168469,
            "longitude": -56.1522084496614,
            "draft": true,
            "author": "Mathias Carignani",
            "author_avatar": "http://graph.facebook.com/10203586418117251/picture",
            "favorites_quantity": 0,
            "comments": [],
            "comments_quantity": 0,
            "first_image": "http://s3-sa-east-1.amazonaws.com/ciudadinvisible/assets/files/000/000/050/original/hshs.png?1428773040",
            "assets": [
                {
                    "file_file_name": "hshs.png",
                    "file_content_type": "image/png",
                    "file_url": "http://s3-sa-east-1.amazonaws.com/ciudadinvisible/assets/files/000/000/050/original/hshs.png?1428773040"
                }
            ]
        }
    },
    {
        "id": 4031,
        "post_id": 26,
        "tour_id": 878,
        "created_at": "2015-04-12T17:44:48.610Z",
        "updated_at": "2015-04-12T17:44:48.610Z",
        "tour_order": 3,
        "post": {
            "id": 26,
            "title": "asdasdasdasdasd",
            "description": "asdasdasdasdasdasdasd",
            "image": null,
            "date": "2014-09-20T00:38:23.000Z",
            "location": "Rambla República del Perú 727, Montevideo 11300, Uruguay",
            "category": null,
            "created_at": "2015-04-08T07:16:45.759Z",
            "updated_at": "2015-04-08T07:16:45.759Z",
            "user_id": 1,
            "latitude": -34.912022928393,
            "longitude": -56.1451336644043,
            "draft": true,
            "author": "Damian Marcos",
            "author_avatar": "http://s3-sa-east-1.amazonaws.com/ciudadinvisible/users/avatars/000/000/001/original/foto?1428170787",
            "favorites_quantity": 1,
            "comments": [],
            "comments_quantity": 0,
            "first_image": "http://s3-sa-east-1.amazonaws.com/ciudadinvisible/assets/files/000/000/047/original/foto?1428477363",
            "assets": [
                {
                    "file_file_name": "foto",
                    "file_content_type": "image/png",
                    "file_url": "http://s3-sa-east-1.amazonaws.com/ciudadinvisible/assets/files/000/000/047/original/foto?1428477363"
                },
                {
                    "file_file_name": "foto",
                    "file_content_type": "image/png",
                    "file_url": "http://s3-sa-east-1.amazonaws.com/ciudadinvisible/assets/files/000/000/048/original/foto?1428477369"
                }
            ]
        }
    },
    {
        "id": 4032,
        "post_id": 16,
        "tour_id": 878,
        "created_at": "2015-04-12T17:44:48.618Z",
        "updated_at": "2015-04-12T17:44:48.618Z",
        "tour_order": 4,
        "post": {
            "id": 16,
            "title": "titulo",
            "description": "Descripcoon",
            "image": null,
            "date": "2015-03-04T13:46:10.000Z",
            "location": "Avenida Sarmiento, Montevideo 11300, Uruguay",
            "category": null,
            "created_at": "2015-03-04T13:46:10.935Z",
            "updated_at": "2015-03-04T13:46:10.935Z",
            "user_id": 2,
            "latitude": -34.9148449932865,
            "longitude": -56.1648008475492,
            "draft": true,
            "author": "Mathias Carignani",
            "author_avatar": "http://graph.facebook.com/10203586418117251/picture",
            "favorites_quantity": 1,
            "comments": [],
            "comments_quantity": 0,
            "first_image": "http://s3-sa-east-1.amazonaws.com/ciudadinvisible/assets/files/000/000/030/original/titulo.png?1425476829",
            "assets": [
                {
                    "file_file_name": "titulo.png",
                    "file_content_type": "image/png",
                    "file_url": "http://s3-sa-east-1.amazonaws.com/ciudadinvisible/assets/files/000/000/030/original/titulo.png?1425476829"
                }
            ]
        }
    },
    {
        "id": 4033,
        "post_id": 13,
        "tour_id": 878,
        "created_at": "2015-04-12T17:44:48.629Z",
        "updated_at": "2015-04-12T17:44:48.629Z",
        "tour_order": 5,
        "post": {
            "id": 13,
            "title": null,
            "description": null,
            "image": null,
            "date": "2014-09-20T00:38:23.000Z",
            "location": "Chana 2197, Montevideo 11200, Uruguay",
            "category": null,
            "created_at": "2014-12-08T04:16:09.119Z",
            "updated_at": "2014-12-08T04:16:09.119Z",
            "user_id": 11,
            "latitude": -34.9037788009335,
            "longitude": -56.1683615944733,
            "draft": true,
            "author": "asd asd",
            "author_avatar": "https://s3-sa-east-1.amazonaws.com/ciudadinvisible/users/avatars/000/000/no-avatar.png",
            "favorites_quantity": 0,
            "comments": [],
            "comments_quantity": 0,
            "first_image": "http://s3-sa-east-1.amazonaws.com/ciudadinvisible/assets/files/000/000/024/original/foto?1418012124",
            "assets": [
                {
                    "file_file_name": "foto",
                    "file_content_type": "image/png",
                    "file_url": "http://s3-sa-east-1.amazonaws.com/ciudadinvisible/assets/files/000/000/024/original/foto?1418012124"
                },
                {
                    "file_file_name": "foto",
                    "file_content_type": "image/png",
                    "file_url": "http://s3-sa-east-1.amazonaws.com/ciudadinvisible/assets/files/000/000/025/original/foto?1418012128"
                }
            ]
        }
    }
];
$scope.puntos = markers;

//***********ROUTING****************//
 

        for (var i = 0; i < marcadores.length; i++) {
            marcadores[i].setMap(null);
        }

        lat_lng = new Array();
        
        var infoWindow = new google.maps.InfoWindow();

        var latlngbounds = new google.maps.LatLngBounds();
        for (i = 0; i < markers.length; i++) {
            var data = markers[i]['post']
            var myLatlng = new google.maps.LatLng(data.latitude, data.longitude);
            lat_lng.push(myLatlng);
            var marker = new google.maps.Marker({
                position: myLatlng,
                map: $scope.map,
                title: data.title,
                posicion: data.id
            });

            google.maps.event.addListener(marker, 'click', function(){
                alert(this.posicion + ' - ' + this.title);
                // infoWindow.setContent('<div class="row"><div class="col-lg-12"><h3 style="text-align:center;">'+marker.title+'</h3></div><div class="col-lg-7"><img class="img-responsive" style="width:100%;" src="'+marker.foto+'"></div><div class="col-lg-5"><p>'+marker.description.substring(0,200)+'...<a href="#/post/'+marker.postid+'">Leer mas</a></p></div>');
                // infoWindow.open($scope.map, marker);
              });

            marcadores.push(marker);
            latlngbounds.extend(marker.position);
        }

        // console.log(lat_lng);
        // Agregamos el punto en el que estoy parado para arrancar
        var myLatlng = new google.maps.LatLng(latitude, longitude);
        lat_lng.push(myLatlng);

        // console.log('imprimiendo lat_lng')
        // console.log(lat_lng);
        // console.log('imprimiendo lat_lng')


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
                
                
                service.route({
                    origin: src,
                    destination: des,
                    travelMode: google.maps.DirectionsTravelMode.DRIVING
                }, function (result, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        for (var i = 0, len = result.routes[0].overview_path.length; i < len; i++) {
                            path.push(result.routes[0].overview_path[i]);
                            console.log(result.routes[0].overview_path[i]);
                        }
                        poly.setPath(path);
                        // console.log('dibujo linea');
                        // $timeout(x, 1000);
                    }
                    console.log(result);
                });

                
            }
        }

//***********END ROUTING****************//
        $scope.openInfoWindow = function(e, selectedMarker){
            e.preventDefault();
            google.maps.event.trigger(selectedMarker, 'click');
          };

      // }
        
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