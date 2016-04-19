var app = angular.module('apartmentCloud', ['ngRoute', 'apartmentCloudControllers', 'apartmentCloudServices']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/loginsignup', {
    templateUrl: 'partials/loginsignup.html',
    controller: 'LoginSignupController'
  }).
  otherwise({
    redirectTo: '/loginsignup'
  });
}]);
