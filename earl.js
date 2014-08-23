var earlMod = angular.module('earlMod', ['bootyApp']);

earlMod.service('imdbSearch', function($http) {

  this.byTitle = function(title) {
    return $http.get('//www.omdbapi.com/?i=&s=' + title);
  }
  
});

earlMod.controller('EarlController', function($scope, $http, imdbSearch) {
  
  $scope.imdbSearchByTitle = function(title) {
    imdbSearch.byTitle(title).success(function(data) {
      $scope.imdbSearchResponse = data;
      $scope.$safeApply();
    }).error(function() {
      $scope.imdbSearchError = 'Error searching';
      $scope.$safeApply();
   });
  }
  
});

