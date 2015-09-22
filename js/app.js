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
	.when('/work', {
		templateUrl: 'views/work.html',
		controller: 'work'
	})
})

app.controller('home', function($scope) {

});

app.controller('bio', function($scope) {
	$scope.back = function() {
		window.history.back();
	}
});

app.controller('work', function($scope) {
	$scope.back = function() {
			window.history.back();
	}
});