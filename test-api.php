<!DOCTYPE html>
<html>
<head>
  <title>AngularJS Tutorials</title>
  <!-- <link rel="stylesheet" href="vendor/foundation/foundation.min.css"> -->
</head>

<body>

  <div ng-app="myApp">
    <div ng-controller="AvengersCtrl">
      <input type="text" ng-model="search.$">
      <table>
        <tr ng-repeat="resource in servicedata | filter:search">
            <td>{{resource.id}}</td>
            <td>{{resource.title}}</td>
        </tr>
      </table>
    </div>
  </div>

  <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.3/angular.min.js"></script>
  <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.3/angular-resource.js"></script>
  <script type="text/javascript" src="scripts/main.js"></script>
</body>
</html>