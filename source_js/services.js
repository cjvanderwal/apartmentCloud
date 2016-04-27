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
