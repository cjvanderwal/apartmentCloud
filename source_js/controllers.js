var apartmentCloudControllers = angular.module('apartmentCloudControllers', []);

apartmentCloudControllers.controller('LoginSignupController', ['$scope', '$http', function($scope, $http) {

}]);

apartmentCloudControllers.controller('FrontPageController', ['$scope', '$http', function($scope, $http) {
    $scope.init = function() {
        $(document).foundation();
    };
    $scope.init();
}]);

