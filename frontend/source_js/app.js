var app = angular.module('apartmentCloud', ['ngRoute', 'slickCarousel', 'apartmentCloudControllers', 'apartmentCloudServices']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  when('/login', {
    templateUrl: 'partials/loginsignup.html',
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

var passportApp = angular.module('passportApp', []);

passportApp.controller('profileController', ['$scope', '$http', function($scope, $http) {
   $scope.profile = false;
   $http.get('/profile').success(function(data) {
    console.log(data);
    if(!data.error) {
      $scope.profile = true;
      $scope.user = data.user;
    }

   });
 }]);
