var app = angular.module('matt', ['ngRoute']);

app.config(function($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl: 'views/home.html',
		controller: 'home'
	})
	.when('/bio', {
		templateUrl: 'views/bio.html',
		controller: 'bio'
	})
	.when('/thoughts', {
		templateUrl: 'views/thoughts.html',
		controller: 'thoughts'
	})
	.when('/thoughts/:postid', {
		templateUrl: 'view/thought.html',
		controller: 'thought'
	});

})

app.controller('home', function($scope) {

});

app.controller('bio', function($scope) {
	$scope.back = function() {
		window.history.back();
	}
});

app.controller('thoughts', function($scope) {
	$scope.back = function() {
			window.history.back();
	}
});