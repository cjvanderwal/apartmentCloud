var apartmentCloudControllers = angular.module('apartmentCloudControllers', []);

apartmentCloudControllers.controller('LoginSignupController', ['$scope', '$http', 'Users', function($scope, $http, Users) {
  $scope.newUser = true;
  $scope.username = "";
  $scope.password = "";
  $scope.registerStatus = "register status";
  $scope.loginStatus = "login status";

  // user is signing up/logging in
  $scope.signUp = function() {
    $scope.newUser = true;
  };
  $scope.signIn = function() {
    $scope.newUser = false;
  };

  // user is signing up, send POST request to backend
  $scope.register = function() {
    Users.addUser({username: $scope.username, password: $scope.password}).then(function(response) {
      $scope.status = "User created successfully!";
    },
    function(error) {
      $scope.status = error.data.message;
    });
  };

  // user is logging in, send GET request to backend
  $scope.login = function() {
    //?????
  };

}]);

apartmentCloudControllers.controller('ApartmentDetailsController', ['$scope', '$http', '$routeParams', 'Apartments', function($scope, $http, $routeParams, Apartments) {

  // get the current apartment object from the backend
  Apartments.getDetails($routeParams.aptID).success(function(response) {
    $scope.apartment = response.data;
  });

  // saves the current apartment to the users' favorite list
  $scope.saveApartment = function() {
    //?????
  };

}]);

apartmentCloudControllers.controller('UserDetailsController', ['$scope', '$http', '$routeParams', 'Users', function($scope, $http, $routeParams, Users) {
  $scope.changePassword = false;

  // get the curremt user object from the backend
  Users.getDetails($routeParams.userID).success(function(response) {
    $scope.user = response.data;
  });

  // updates the current users' password
  // $scope.changePassword = function() {
  //   //?????
  // };

}]);

apartmentCloudControllers.controller('FrontPageController', ['$scope', '$http', function($scope, $http) {
  $scope.init = function() {
    $(document).foundation();
  };
  $scope.init();
}]);
