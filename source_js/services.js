var apartmentCloudServices = angular.module('apartmentCloudServices', []);

mp4Services.factory('Users', function($http, $window) {
  return {
    getAll : function() {
      var baseUrl = $window.sessionStorage.baseurl;
      return $http.get(baseUrl+'/api/users');
    },
    getById : function(id) {
      var baseUrl = $window.sessionStorage.baseurl;
      return $http.get(baseUrl+'/api/users/'+id);
    },
    remove : function(id) {
      var baseUrl = $window.sessionStorage.baseurl;
      return $http.delete(baseUrl+'/api/users/'+id);
    },
    add : function(obj) {
      var baseUrl = $window.sessionStorage.baseurl;
      return $http.post(baseUrl+'/api/users/', obj);
    },
    put : function(obj) {
      var baseUrl = $window.sessionStorage.baseurl;
      return $http.put(baseUrl+'/api/users/'+obj._id, obj);
    }
  }
});
