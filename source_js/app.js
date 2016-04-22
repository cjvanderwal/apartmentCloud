var app = angular.module('apartmentCloud', ['ngRoute', 'apartmentCloudControllers', 'apartmentCloudServices']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/loginsignup', {
    templateUrl: 'partials/loginsignup.html',
    controller: 'LoginSignupController'
  }).
  when('/frontpage', {
    templateUrl: 'partials/frontpage.html',
    controller: 'FrontPageController'
  }).
  otherwise({
    redirectTo: '/frontpage'
  });
}]);
