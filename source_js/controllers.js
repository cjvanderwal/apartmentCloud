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

apartmentCloudControllers.controller('ApartmentDetailsController', ['$scope', '$http', '$routeParams', 'Apartments', 'Comments', function($scope, $http, $routeParams, Apartments, Comments) {
  $scope.ratingsBreakdown = [0,0,0,0,0]

  // get the current apartment object from the backend
  Apartments.getDetails($routeParams.aptID).success(function(response) {
    $scope.apartment = response.data;

    $scope.startDate = $scope.apartment.startLease.split('T')[0];
    $scope.endDate = $scope.apartment.endLease.split('T')[0];
  });

  Comments.getByApt($routeParams.aptID).success(function(response) {
    $scope.commentList = response.data;

    for (var i = 0; i < $scope.commentList.length; i++) {
      var curr_rating = $scope.commentList[i].rating;
      if (curr_rating > 0 && curr_rating <= 5) {
        $scope.ratingsBreakdown[curr_rating-1] += 1
      }
    }
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

apartmentCloudControllers.controller('FrontPageController', ['$scope', '$http', 'Map', function($scope, $http, Map) {
  $http.get("http://localhost:4000/api/apartment/") // ./data/test.json http://localhost:4000/api/apartment/
      .then(function(apartments) {
        $scope.apartments = apartments.data;
        $scope.numBedrooms = "";
        $scope.numBathrooms = "";
      })
      .catch(function(err) {
        console.log("failure");
      });

  $scope.filterRange = function(string) {
    var nowhitespace = string.replace(/ /g,'');
    return nowhitespace.split("-");
  };
  $scope.filterBedrooms = function(apt) {
    if ($scope.numBedrooms === undefined || $scope.numBedrooms.length == 0) {
      return true;
    }
    var bedStrings = $scope.filterRange($scope.numBedrooms);
    if (bedStrings.length != 2) {
      return true; // TODO error message
    }
    return apt.noOfBedroom >= parseInt(bedStrings[0]) && apt.noOfBedroom <= parseInt(bedStrings[1]);
  };
  $scope.filterBathrooms = function(apt) {
    if ($scope.numBathrooms === undefined || $scope.numBathrooms.length == 0) {
      return true;
    }
    var bathStrings = $scope.filterRange($scope.numBathrooms);
    if (bathStrings.length != 2) {
      return true; // TODO error message
    }
    return apt.noOfBathRoom >= parseInt(bathStrings[0]) && apt.noOfBathRoom <= parseInt(bathStrings[1]);
  };
  $scope.filterPrice = function(apt) {
    if ($scope.priceLower === undefined || $scope.priceUpper === undefined) {
      return true; // TODO error message
    }
    return apt.price >= $scope.priceLower && apt.price <= $scope.priceUpper;
  };
  $scope.filterMap = function(apt) {
    if ($scope.currPoly === undefined) {
      return true;
    }
    return google.maps.geometry.poly.containsLocation(new google.maps.LatLng(apt.lat, apt.lon), $scope.currPoly);
  }
  $scope.init = function() {
    Map.initialize($scope);
    $(document).foundation();
  };
  $scope.init();
}]);
