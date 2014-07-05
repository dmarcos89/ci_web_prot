<!doctype html>
<html ng-app>
	<head>
		<title>Hello AngularJS</title>
		<script src="bower_components/angular/angular.js"></script>
	    <script src="scripts/posts.js"></script>
	</head>

	<body>
		<div ng-controller="Hello">
			<p>The ID is {{greeting.id}}</p>
			<p>The content is {{greeting.title}}</p>
		</div>
	</body>
</html>