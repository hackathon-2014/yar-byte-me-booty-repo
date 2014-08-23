var earlMod = angular.module('earlMod', ['bootyApp']);

earlMod.service('tmdbService', function($http) {
  this.byTitle = function(title) {
     return $http.get('//api.themoviedb.org/3/search/movie?api_key=39151834c95219c3cae772b4465079d7&query=' + title);
  } 
});

/* NOPE
earlMod.service('omdbService', function($http) {
  this.byTitle = function(title) {
    return $http.get('//www.omdbapi.com/?s=' + title);
  }
  this.byId = function(id) {
    return $http.get('//omdbapi.api.com/?i=' + id); 
  }
});

earlMod.service('imdbService', function($http) {
  this.byId = function(id) {
    return $http.get('proxy/?mode=raw&url=' + encodeURI('' + id));
  }
});
*/

earlMod.controller('InventoryAddController', function($scope, $http, tmdbService) {
  
  var error = function() {
    $scope.error = 'Error searching.';
  };
  
  var success = function(r) {
    console.log(r.data.results);
    $scope.results = r.data.results;
    for (var i = 0, j = $scope.results.length; i < j; i++) {
      if ($scope.results[i].poster_path) {
        $scope.results[i].poster_path = 'https://image.tmdb.org/t/p/w92' + $scope.results[i].poster_path;
      }
    }
  };

  $scope.byTitle = function(title) {
    $scope.isSearching = true;
    $scope.requestId = setTimeout(function() {
      $scope.results = $scope.error = '';
      tmdbService.byTitle(title).then(success, error).finally(function() {
        $scope.isSearching = false;
        $scope.$safeApply();
      });
    }, 0);
  }
  
  $scope.select = function(index) {
    $scope.selected = $scope.results[index];
  };
  
  $scope.unselect = function() {
    $scope.selected = ''; 
  }
  
  $scope.cancel = function() {
    clearTimeout($scope.requestId);
    $scope.isSearching = false;
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

