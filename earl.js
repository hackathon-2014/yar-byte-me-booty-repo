var earlMod = angular.module('earlMod', ['bootyApp']);

earlMod.factory('imdbSearch', function($http) {

  return {
    byTitle : function(title) {
      return $http.get('//www.omdbapi.com/?i=&t=' + title);
    }
  }
  
});

earlMod.controller('EarlController', function($scope, $http, imdbSearch) {
  
  $scope.imdbSearchByTitle = function(title) {
    imdbSearch.byTitle(title).success(function(data) {
      $scope.imdbSearchResponse = data;
    }).error(function() {
      $scope.imdbSearchError = 'Error searching';
    });
  }
  
});

earlMod.run(function($rootScope) {
});
