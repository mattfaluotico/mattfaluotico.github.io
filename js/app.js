var app = angular.module('matt', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {

  $routeProvider
    .when('/', {
      templateUrl: 'views/home.html',
      controller: 'home'
    })
    .when('/bio', {
      templateUrl: 'views/bio.html',
      controller: 'bio'
    })
    .otherwise({redirectTo: '/'});
}]);


app.controller('home', function(){});
app.controller('bio', function(){});