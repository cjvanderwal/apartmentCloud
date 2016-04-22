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
  when('/frontpage', {
    templateUrl: 'partials/frontpage.html',
    controller: 'FrontPageController'
  }).
  otherwise({
    redirectTo: '/login'
  });
}]);
