var earlMod = angular.module('earlMod', ['bootyApp']);

earlMod.service('tmdbService', function($http) {
  this.byTitle = function(title) {
     return $http.get('//api.themoviedb.org/3/search/movie?api_key=39151834c95219c3cae772b4465079d7&query=' + title);
  } 
});

earlMod.controller('HomeController', function($scope) {
  $scope.featured = [
    { url: 'assets/featured-movie-ferris-bueller.jpg' },
    { url: 'assets/featured-movie-ghostbusters.jpg' },
    { url: 'assets/featured-movie-star-wars-holiday-special.jpg' },
    { url: 'assets/featured-movie-the-goonies.jpg' },
    { url: 'assets/feature-movie-alf.jpg' },
    { url: 'assets/feature-movie-clambake.jpg' }
  ];
});

earlMod.controller('InventoryController', function($scope, $stateParams, inventoryService) {
  inventoryService.GetUserInventory($stateParams.userId).then(function(data) {
    $scope.inventory = data;
  }, function(error) {
    $scope.error = 'Error loading inventory';
  }).finally(function() {
    $scope.$safeApply();
  });
  
  $scope.confirm = function(index) {
    bootbox.confirm('Are you sure?', function(confirmed) {
      if (confirmed) {
        $scope.error = 'Removing from My Movies currently not implemented.  :-)';
        $scope.$safeApply();
      }
    });
  }
  
});

earlMod.controller('InventoryAddController', function($scope, $http, $state, tmdbService, inventoryService) {
  
  // Change this to test how the interface handles delays
  var artificalDelay = 0;
  
  $scope.conditionOptions = [
    { label: 'Mint', id: 'mint' },
    { label: 'Good', id: 'good' },
    { label: 'Eh', id: 'eh' },
    { label: 'Bad', id: 'bad' },
    { label: 'Horrible', id: 'horrible' }
  ];
  
  $scope.mediumOptions = [
    { label: 'BetaMax', id: 'betamax' },
    { label: 'Laserdisc', id: 'laserdisc' },
    { label: 'DVD', id: 'dvd' },
    { label: 'VHS', id: 'vhs' }
  ];

  $scope.byTitle = function(title) {
    
    // Clear previous results and errors
    $scope.isSearching = true;
    $scope.results = $scope.error = '';
    
    // Really not necessary, just helped introduce a artifical delay
    $scope.requestId = setTimeout(function() {
      
      tmdbService.byTitle(title).success(function(data) {
        $scope.results = data.results;
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
    $scope.selected = $scope.addError = $scope.addSuccess = ''; 
  }
  
  $scope.add = function(condition, medium) {
    
    $scope.addError = '';
    if (!condition) {
      
      $scope.addError = 'Condition is required';
      
    } else if (!medium) {
      
      $scope.addError = 'Medium is required'; 
      
    } else {
      
      inventoryService.AddMovie({
        userId: $scope.authUser.id, 
        info: angular.toJson($scope.selected),
        condition: condition,
        medium: medium
      }).then(function(data) {
        $scope.addSuccess = data;
      }, function(error) {
        console.log(error);
        $scope.addError = 'Error adding to My Movies';
      }).finally(function() {
        $scope.$safeApply();
      });
      
    }
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

