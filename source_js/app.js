var app = angular.module('apartmentCloud', ['ngRoute', 'apartmentCloudControllers', 'apartmentCloudServices']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  when('/login', {
    templateUrl: 'partials/loginSignup.html',
    controller: 'LoginSignupController'
  }).
  when('/apartment/:aptID', {
    templateUrl: 'partials/aptDetails.html',
    controller: 'ApartmentDetailsController'
  }).
  when('/user/:userID', {
    templateUrl: 'partials/userDetails.html',
    controller: 'UserDetailsController'
  }).
  when('/sublease', {
    templateUrl: 'partials/sublease.html',
    controller: 'SubleaseController'
  }).
  when('/frontpage', {
    templateUrl: 'partials/frontpage.html',
    controller: 'FrontPageController'
  }).
  otherwise({
    redirectTo: '/frontpage'
  });
}]);
