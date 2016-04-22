var app = angular.module('apartmentCloud', ['ngRoute', 'apartmentCloudControllers', 'apartmentCloudServices']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  when('/login', {
    templateUrl: 'partials/loginSignup.html',
    controller: 'LoginSignupController'
  }).
  when('/aptID', {
    templateUrl: 'partials/aptDetails.html',
    controller: 'ApartmentDetailsController'
  }).
  when('/userID', {
    templateUrl: 'partials/userDetails.html',
    controller: 'UserDetailsController'
  }).
  otherwise({
    redirectTo: '/login'
  });
}]);
