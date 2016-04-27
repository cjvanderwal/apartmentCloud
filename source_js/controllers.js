var apartmentCloudControllers = angular.module('apartmentCloudControllers', []);

apartmentCloudControllers.controller('LoginSignupController', ['$scope', '$http', 'Users', function($scope, $http, Users) {
  $scope.newUser = true;
  $scope.username = "";
  $scope.email = "";
  $scope.bcrypt_pass = "";
  $scope.name = "";
  $scope.registerStatus = "";
  $scope.loginStatus = "";

  // user is signing up/logging in
  $scope.signUp = function() {
    $scope.newUser = true;
  };
  $scope.signIn = function() {
    $scope.newUser = false;
  };

  // user is signing up, send POST request to backend
  $scope.register = function() {
    Users.addUser({name: $scope.name, username: $scope.username, bcrypt_pass: $scope.password, email: $scope.email}).then(function(response) {
      $scope.registerStatus = response.data.message;
    },
    function(error) {
      $scope.registerStatus = error.data.message;
    });
  };

  // // user is logging in, send GET request to backend
  // $scope.login = function() {
  //   //?????
  // };

}]);

apartmentCloudControllers.controller('ApartmentDetailsController', ['$scope', '$http', '$routeParams', 'Apartments', function($scope, $http, $routeParams, Apartments) {

  // get the current apartment object from the backend
  Apartments.getDetails($routeParams.aptID).success(function(response) {
    $scope.apartment = response.data;

    $scope.startDate = $scope.apartment.startLease.split('T')[0];
    $scope.endDate = $scope.apartment.endLease.split('T')[0];
  });


  // // saves the current apartment to the users' favorite list
  // $scope.saveApartment = function() {
  //   //?????
  // };

}]);

apartmentCloudControllers.controller('UserDetailsController', ['$scope', '$http', '$routeParams', 'Users', function($scope, $http, $routeParams, Users) {
  $scope.changePassword = false;
  $scope.changePicture = false;
  $scope.newPassword = "";
  $scope.newPicture = "";
  $scope.passStatus = "";
  $scope.picStatus = "";

  // get the curremt user object from the backend
  Users.getDetails($routeParams.userID).success(function(response) {
    $scope.user = response.data;
  });

  // updates the current users' password
  $scope.updatePassword = function() {
    $scope.user.bcrypt_pass = $scope.newPassword;
    Users.modifyUser($scope.user).success(function(response) {
      $scope.passStatus = "password updated!";
    });
  };
  // updates the current users' password
  $scope.updatePicture = function() {
    $scope.user.picture_url = $scope.newPicture;
    Users.modifyUser($scope.user).success(function(response) {
      $scope.picStatu = "picture updated!";
    });
  };

}]);

apartmentCloudControllers.controller('SubleaseController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
  // $scope.name = "";
  // $scope.address = "";
  // $scope.price = "";
  // $scope.bedrooms = 0;
  // $scope.bathrooms = 0;
  // $scope.startDate = Date.now();
  // $scope.endDate = Date.now();

  // $scope.addSublease = function() {
  //   Apartments.createSublease(obj...)
  // };
}]);

apartmentCloudControllers.controller('FrontPageController', ['$scope', '$http', function($scope, $http) {
  $scope.init = function() {
    $(document).foundation();
  };
  $scope.init();
}]);
