var earlMod = angular.module('earlMod', ['bootyApp']);

earlMod.service('omdbService', function($http) {
  this.byTitle = function(title) {
    return $http.get('//www.omdbapi.com/?tomatoes=false&s=' + title);
  }
});

earlMod.service('imdbService', function($http) {
  this.byId = function(id) {
    return $http.get('proxy/?mode=raw&url=' + encodeURI('' + id));
  }
});

earlMod.controller('EarlController', function($scope, $http, omdbService) {
  
  $scope.omdbSearchByTitle = function(title) {
    
    $scope.response = $scope.error = '';
    
    imdbSearch.byTitle(title).success(function(data) {      
      
      if (typeof data.Error === 'string') {
        $scope.error = data.Error; 
      } else {
        $scope.response = data;
      }
      
      $scope.$safeApply();
      
    }).error(function() {
      $scope.imdbSearchError = 'Error searching';
      $scope.$safeApply();
   });
  }
  
});

earlMod.directive('ngEnter', function() {
  return function(scope, element, attrs) {
    element.bind("keydown keypress", function(event) {
      if(event.which === 13) {
        scope.$apply(function(){
          scope.$eval(attrs.ngEnter, {'event': event});
        });

        event.preventDefault();
      }
    });
  };
});

