'use strict';

angular.module('MainApp').controller('MapController', function($scope, Posts, $timeout) {
	  
	  $scope.dynMarkers = [];

	  $timeout(function(){
        Posts.query(function(data) {
          $scope.posts = data;
		 	
		 	
		  	var arrayLength = $scope.posts.length;
			for (var i = 0; i < arrayLength; i++) {
			    var latitude = $scope.posts[i].latitude;
			    var longitude = $scope.posts[i].longitude;
			    alert(latitude);
			    var latLng = new google.maps.LatLng(latitude, longitude);
		        $scope.dynMarkers.push(new google.maps.Marker({position:latLng}));
			}
			$scope.markerClusterer = new MarkerClusterer(map, $scope.dynMarkers, {});
   //        angular.forEach(posts, function(value, key) {
			//   alert(value);
			//   // this.push(key + ': ' + value);
			// };

        });
      }, 100);

// 	  	var markers=[
// {"position":[-32.202924,-64.404945],"onClick":"markerClicked()","photo":"http://mw2.google.com/mw-panoramio/photos/medium/27932.jpg"},
// {"position":[47.867077,17.470493],"onClick":"markerClicked()","photo":"http://mw2.google.com/mw-panoramio/photos/medium/522084.jpg"},
// {"position":[-37.766372,145.141754],"onClick":"markerClicked()","photo":"http://mw2.google.com/mw-panoramio/photos/medium/1578881.jpg"},
// {"position":[46.639301,30.785408],"onClick":"markerClicked()","photo":"http://mw2.google.com/mw-panoramio/photos/medium/97671.jpg"},
// {"position":[10.479372,-84.693432],"onClick":"markerClicked()","photo":"http://mw2.google.com/mw-panoramio/photos/medium/25514.jpg"},
// {"position":[47.409968,12.900009],"onClick":"markerClicked()","photo":"http://mw2.google.com/mw-panoramio/photos/medium/57823.jpg"},
// {"position":[59.637472,11.272659],"onClick":"markerClicked()","photo":"http://mw2.google.com/mw-panoramio/photos/medium/532693.jpg"},
// {"position":[47.483221,13.189259],"onClick":"markerClicked()","photo":"http://mw2.google.com/mw-panoramio/photos/medium/57819.jpg"},
// {"position":[14.493688,-61.013432],"onClick":"markerClicked()","photo":"http://mw2.google.com/mw-panoramio/photos/medium/1282387.jpg"},
// {"position":[40.903783,0.490866],"onClick":"markerClicked()","photo":"http://mw2.google.com/mw-panoramio/photos/medium/945976.jpg"},
// {"position":[47.609519,12.852459],"onClick":"markerClicked()","photo":"http://mw2.google.com/mw-panoramio/photos/medium/73514.jpg"},
// {"position":[36.894037,-111.40789],"onClick":"markerClicked()","photo":"http://mw2.google.com/mw-panoramio/photos/medium/298967.jpg"}
// ];

//         var map;
// 		    $scope.dynMarkers = [];
// 		    $scope.$on('mapInitialized', function(event, evtMap) {
// 		      map = evtMap;
// 		      for (var i=0; i<1000; i++) {
// 		        var latLng = new google.maps.LatLng(markers[i].position[0], markers[i].position[1]);
// 		        $scope.dynMarkers.push(new google.maps.Marker({position:latLng}));
// 		      }
// 		      $scope.markerClusterer = new MarkerClusterer(map, $scope.dynMarkers, {});
// 		    });



	});