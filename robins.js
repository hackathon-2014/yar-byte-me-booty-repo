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