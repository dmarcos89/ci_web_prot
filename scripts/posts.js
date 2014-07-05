function Hello($scope, $http) {
    // $http.get('http://rest-service.guides.spring.io/greeting'). CON ESTE SERVICIO DE PRUEBA FUNCA. ...
    $http.get('http://ciudadinvisible.herokuapp.com/posts/1.json').
        success(function(data) {
            $scope.greeting = data;
        });

}
