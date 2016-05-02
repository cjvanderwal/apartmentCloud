var apartmentCloudServices = angular.module('apartmentCloudServices', []);

apartmentCloudServices.factory('Apartments', function($http) {
  return {
    getDetails: function(id) {
      return $http.get('http://localhost:4000/api/apartment/'+id);
    },
    addSublease: function(obj) {
      return $http.post('http://localhost:4000/api/apartment/', obj);
    },
    modifyApt: function(obj) {
      return $http.put('http://localhost:4000/api/apartment/'+obj['_id'], obj);
    }
  }
});

apartmentCloudServices.factory('Comments', function($http) {
  return {
    getByApt: function(id) {
      return $http.get('http://localhost:4000/api/comment?where={"apartmentId": '+'"'+id+'"'+'}');
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

apartmentCloudServices.factory('Map', function() {
  return {
    initialize : function($scope) {
      var mapProp = {
        center:new google.maps.LatLng(40.1020, -88.2272),
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      var map=new google.maps.Map(document.getElementById("googleMap"), mapProp);

      var drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.POLYGON,
        drawingControl: true,
        drawingControlOptions: {
          position: google.maps.ControlPosition.TOP_CENTER,
          drawingModes: [
            google.maps.drawing.OverlayType.POLYGON,
            google.maps.drawing.OverlayType.RECTANGLE
          ]
        },
        rectangleOptions: {
          editable: true,
          draggable: true
        }
      });
      drawingManager.setMap(map);
      google.maps.event.addListener(drawingManager, 'polygoncomplete', function(polygon) {
        drawingManager.setDrawingMode(null);
        if ($scope.currPoly !== undefined) {
          $scope.currPoly.setMap(null);
        }
        if ($scope.currRect !== undefined) {
          $scope.currRect.setMap(null);
        }
        $scope.currPoly = polygon;
        $scope.$apply();
      });
      google.maps.event.addListener(drawingManager, 'rectanglecomplete', function(rectangle) {
        drawingManager.setDrawingMode(null);
        if ($scope.currPoly !== undefined) {
          $scope.currPoly.setMap(null);
        }
        if ($scope.currRect !== undefined) {
          $scope.currRect.setMap(null);
        }
        rectangle.addListener('bounds_changed', moveRect);
        $scope.currRect = rectangle;
        // Convert rectangle to polygon
        var ne = rectangle.getBounds().getNorthEast();
        var sw = rectangle.getBounds().getSouthWest();
        var polyCoords = [
          {lat: ne.lat(), lng: ne.lng()},
          {lat: sw.lat(), lng: ne.lng()},
          {lat: sw.lat(), lng: sw.lng()},
          {lat: ne.lat(), lng: sw.lng()}
        ];
        var rectPoly = new google.maps.Polygon({paths: polyCoords});
        $scope.currPoly = rectPoly;
        $scope.$apply();
      });
      function moveRect(event) {
        var ne = $scope.currRect.getBounds().getNorthEast();
        var sw = $scope.currRect.getBounds().getSouthWest();
        var polyCoords = [
          {lat: ne.lat(), lng: ne.lng()},
          {lat: sw.lat(), lng: ne.lng()},
          {lat: sw.lat(), lng: sw.lng()},
          {lat: ne.lat(), lng: sw.lng()}
        ];
        var rectPoly = new google.maps.Polygon({paths: polyCoords});
        $scope.currPoly = rectPoly;
        $scope.$apply();
      }
    }
  }
});

apartmentCloudServices.factory('Date', function() {
  return {
    formatDate : function(date) {
      var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
      ];
      var string = date.substring(0, date.indexOf('T'));
      var str = string.split("-");
      var res = monthNames[parseInt(str[1]-1)];
      return res + " " + str[2] + ", " + str[0];
    }
  }
});