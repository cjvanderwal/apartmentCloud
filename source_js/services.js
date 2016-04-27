var apartmentCloudServices = angular.module('apartmentCloudServices', []);

apartmentCloudServices.factory('Apartments', function($http) {
  return {
    getDetails: function(id) {
      return $http.get('http://localhost:4000/api/apartment/'+id);
    },
    addSublease: function(obj) {
      return $http.post('http://localhost:4000/api/apartment/');
    }
  }
});

apartmentCloudServices.factory('Users', function($http) {
  return {
    getDetails : function(id) {
      return $http.get('http://localhost:4000/api/users/'+id);
    },
    addUser: function(obj) {
      return $http.post('http://localhost:4000/api/users/', obj);
    },
    modifyUser: function(obj) {
      return $http.put('http://localhost:4000/api/users/'+obj['_id'], obj);
    }
  }
});
