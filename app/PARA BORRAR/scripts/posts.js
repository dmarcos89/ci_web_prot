// function Hello($scope, $http) {
//     // $http.get('http://rest-service.guides.spring.io/greeting'). CON ESTE SERVICIO DE PRUEBA FUNCA. ...
//     $http.get('http://ciudadinvisible.herokuapp.com/posts.json').
//         success(function(data) {
//             $scope.posts = data;
//         });

// }

function MyController($scope, $http) {
        $scope.items = [];

        $scope.getItems = function() {
         $http({method : 'GET',url : 'http://ciudadinvisible.herokuapp.com/posts.json'})
            .success(function(data, status) {
                $scope.items = data;
             })
            .error(function(data, status) {
                alert("Error");
            });
        };
    }