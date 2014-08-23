var robinsMod = angular.module('robinsMod', ['bootyApp']);

robinsMod.controller('homeCtrl', function($scope){

  $scope.titlesFound = [
    {
      title: 'Jurassic Park',
      icon: '../assets/sample-movie-poster.jpg',
      description: 'During a preview tour, a theme park suffers a major power breakdown that allows its cloned dinosaur exhibits to run amok.',
      condition: 'good',
      type: 'VHS'
    }
  ];

  $scope.checkInventoryCount = function(title){
    return 5;
  };

});

robinsMod.controller('userCtrl', function($scope, userService, $stateParams, inventoryService){

  $scope.user = undefined;
  $scope.movies = [{},{},{},{},{},{},{}];
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    userService.GetUser($stateParams.userId).then(function(user){
      $scope.user = user;
      $scope.user.followers = 10;
      $scope.user.rating = '80%';
      $scope.$safeApply();
//      inventoryService.GetUserInventory(user).then(function(movies) {
//        $scope.movies = movies;
//        $scope.$safeApply();
//      });
    });

  });

  $scope.getUsersMovies = function(){
  };


});