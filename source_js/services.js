var apartmentCloudServices = angular.module('apartmentCloudServices', []);

apartmentCloudServices.factory('Apartments', function($http) {
  return {
    getDetails: function(id) {
      return $http.get('localhost:4000/api/apartments/'+id);
    },
    addSublease: function(obj) {
      return $http.post('localhost:4000/api/apartments');
    }
  }
});

apartmentCloudServices.factory('Users', function($http) {
  return {
    getDetails : function(id) {
      return $http.get('localhost:4000/api/users/'+id);
    },
    addUser: function(newUser_obj) {
      return $http.post('localhost:4000/api/users');
    }
  }
});
