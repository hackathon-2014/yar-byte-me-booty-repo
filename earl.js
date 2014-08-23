var earlMod = angular.module('earlMod', ['bootyApp']);

earlMod.service('tmdbService', function($http) {
  this.byTitle = function(title) {
     return $http.get('//api.themoviedb.org/3/search/movie?api_key=39151834c95219c3cae772b4465079d7&query=' + title);
  } 
});

earlMod.controller('InventoryAddController', function($scope, $http, tmdbService, inventoryService) {
  
  // Change this to test how the interface handles delays
  var artificalDelay = 0;

  $scope.byTitle = function(title) {
    
    // Clear previous results and errors
    $scope.isSearching = true;
    $scope.results = $scope.error = '';
    
    // Really not necessary, just helped introduce a artifical delay
    $scope.requestId = setTimeout(function() {
      
      tmdbService.byTitle(title).success(function(data) {

        $scope.results = data.results;
        for (var i = 0, j = $scope.results.length; i < j; i++) {
          if ($scope.results[i].poster_path) {
            $scope.results[i].poster_path = 'https://image.tmdb.org/t/p/w92' + $scope.results[i].poster_path;
          }
        }
        
      }).error(function() {
        
        $scope.error = 'Error searching.';
        
      }).finally(function() {
        
          $scope.isSearching = false;
          $scope.$safeApply();
        
      });
      
    }, artificalDelay);
  }
  
  $scope.cancel = function() {
    clearTimeout($scope.requestId);
    $scope.isSearching = false;
  }
  
  $scope.select = function(index) {
    $scope.selected = $scope.results[index];
  };
  
  $scope.unselect = function() {
    $scope.selected = ''; 
  }
  
  $scope.add = function() {
    inventoryService.add($scope.selected.id, angular.toJson($scope.selected));
  }
  
});

// http://stackoverflow.com/questions/15417125/submit-form-on-pressing-enter-with-angularjs
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

