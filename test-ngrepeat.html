<!doctype html>
<html ng-app="Demo" ng-controller="DemoController">
<head>
    <meta charset="utf-8" />
 
    <title>
        Using Controllers With ngRepeat In AngularJS
    </title>
 
    <style type="text/css">
 
        ul {
            list-style-type: none ;
            margin: 16px 0px 22px 0px ;
            padding: 0px 0px 0px 0px ;
        }
 
        ul:after {
            clear: both ;
            content: "" ;
            display: block ;
        }
 
        li {
            background-color: #F0F0F0 ;
            border: 1px solid #CCCCCC ;
            border-radius: 4px 4px 4px 4px ;
            cursor: pointer ;
            float: left ;
            height: 70px ;
            margin: 0px 16px 0px 0px ;
            text-align: center ;
            width: 160px ;
        }
 
        li.selected {
            border-color: #CC0000 ;
        }
 
        span.name {
            display: block ;
            font-size: 18px ;
            padding: 14px 0px 10px 0px ;
        }
 
        span.nickname {
            color: #666666 ;
            display: block ;
            font-size: 14px ;
        }
 
    </style>
</head>
<body>
 
    <h1>
        Using Controllers With ngRepeat In AngularJS
    </h1>
 
    <!--
        List of friend - each item in the ngRepeat directive gets
        its own instance of the ItemController.
    -->
    <ul>
 
        <li
            ng-repeat="friend in friends"
 
            ng-controller="ItemController"
            ng-click="toggleSelection()"
            ng-mouseenter="activate()"
            ng-mouseleave="deactivate()"
            ng-class="{ selected: isSelected }">
 
            <span class="name">
                {{ friend.name }}
            </span>
 
            <span ng-show="isShowingNickname" class="nickname">
                aka {{ friend.nickname }}
            </span>
 
        </li>
 
    </ul>
 
    <!-- List of selected friends. -->
    <p ng-show="selectedFriends.length">
 
        <strong>Selected Friends</strong>:
 
        <span
            ng-repeat="friend in selectedFriends">
 
            {{ friend.name }}
 
            <span ng-show=" ! $last ">-</span>
 
        </span>
 
    </p>
 
 
 
    <!-- Load jQuery and AngularJS from the CDN. -->
    <script
        type="text/javascript"
        src="//code.jquery.com/jquery-1.9.1.min.js">
    </script>
    <script
        type="text/javascript"
        src="//ajax.googleapis.com/ajax/libs/angularjs/1.0.4/angular.min.js">
    </script>
 
    <!-- Load the app module and its classes. -->
    <script type="text/javascript">
 
 
        // Define our AngularJS application module.
        var demo = angular.module( "Demo", [] );
 
 
        // -------------------------------------------------- //
        // -------------------------------------------------- //
 
 
        // I am the main controller for the application.
        demo.controller(
            "DemoController",
            function( $scope ) {
 
 
                // -- Define Scope Methods. ----------------- //
 
 
                // I remove the given friend from the list of
                // selected friends.
                $scope.deselectFriend = function( friend ) {
 
                    // NOTE: indexOf() works in IE 9+.
                    var index = $scope.selectedFriends.indexOf( friend );
 
                    if ( index >= 0 ) {
 
                        $scope.selectedFriends.splice( index, 1 );
 
                    }
 
                };
 
 
                // I add the given friend to the list of selected
                // friends.
                $scope.selectFriend = function( friend ) {
 
                    $scope.selectedFriends.push( friend );
 
                };
 
 
                // -- Define Scope Variables. --------------- //
 
 
                // I am the list of friends to show.
                $scope.friends = [
                    {
                        id: 1,
                        name: "Tricia",
                        nickname: "Sugar Pie"
                    },
                    {
                        id: 2,
                        name: "Joanna",
                        nickname: "Honey Dumpling"
                    },
                    {
                        id: 3,
                        name: "Kit",
                        nickname: "Sparky"
                    }
                ];
 
 
                // I am the list of friend that have been selected
                // by the current user.
                $scope.selectedFriends = [];
 
 
            }
        );
 
 
        // -------------------------------------------------- //
        // -------------------------------------------------- //
 
 
        // I am the controller for the list item in the ngRepeat.
        // Each instance of the LI in the list will bet its own
        // instance of the ItemController.
        demo.controller(
            "ItemController",
            function( $scope ) {
 
 
                // -- Define Scope Methods. ----------------- //
 
 
                // I deactivate the list item, if possible.
                $scope.deactivate = function() {
 
                    // If the list item is currently selected, then
                    // ignore any request to deactivate.
                    if ( $scope.isSelected ) {
 
                        return;
 
                    }
 
                    $scope.isShowingNickname = false;
 
                };
 
 
                // I activate the list item.
                $scope.activate = function() {
 
                    $scope.isShowingNickname = true;
 
                };
 
 
                // I toggle the selected-states of the current item.
                // Remember, since ngRepeat creates a new $scope for
                // each list item, we have a reference to our
                // contextual "friend" instance.
                $scope.toggleSelection = function() {
 
                    $scope.isSelected = ! $scope.isSelected;
 
                    // If the item has been selected, then we have to
                    // tell the parent controller to selected the
                    // relevant friend.
                    if ( $scope.isSelected ) {
 
                        $scope.selectFriend( $scope.friend );
 
                    // If the item has been unselected, then we have
                    // to tell the parent controller to DEselected the
                    // relevant friend.
                    } else {
 
                        $scope.deselectFriend( $scope.friend );
 
                    }
 
                };
 
 
                // -- Define Scope Variables. --------------- //
 
 
                // I determine if the nichkame is showing.
                $scope.isShowingNickname = false;
 
                // I determine if the list item has been selected.
                $scope.isSelected = false;
 
 
            }
        );
 
 
    </script>
 
</body>
</html>