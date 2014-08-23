var kingsburyMod = angular.module('kingsburyMod', ['bootyApp']);

kingsburyMod.run(function() {

});


kingsburyMod.service('userService', function($log, $http, $q) {


  this.GetUser = function(id) {
  
    var deferred = $q.defer();
    
    $http.post('backend.php', {
      'GetUser': id
    }).then(function(response) {
      if (response.data.id) {
        deferred.resolve(response.data);
      }
      else {
        deferred.reject('Didn\'t get expected response');
        $log.error('userService (GetUser): Didn\'t get expected response');
      }
    });
    
    return deferred.promise;
  }

  this.AddUser = function(email, pass) {
  
    console.log("asdf");
  
    var deferred = $q.defer();
 
    $http.post('backend.php', {
      'AddUser': {'email':email, 'pass':pass}
    }).then(function(response) {
      if (response.data.AddUser) {
        // Returns user ID
        deferred.resolve(response.data.AddUser);
      }
      else {
        deferred.reject('Failed to add user');
        $log.error('userService (AddUser): Failed to add user', email, pass);
      }
    });
    
    return deferred.promise;
  }

});


kingsburyMod.service('inventoryService', function($log) {
});

kingsburyMod.controller('backendTests', function($scope, userService) {

  $scope.findUser = function(id) {
    userService.GetUser(1).then(function(user) {
      $scope.foundUser = user;
      $scope.$safeApply();
    });
  
  }


});

kingsburyMod.controller('signUpController', function($scope, userService, $state) {

  $scope.errors = {};

  $scope.newUser = {
    email:'',
    pass:''
  };

  $scope.AddUser = function(user) {
  
    $scope.errors = {};
  
    if (!user.email) {
      $scope.errors.email = 'Please enter a valid email address.';
    }
    if (!user.pass) {
      $scope.errors.pass = 'Please enter a password.';
    }
    if ($scope.errors.length > 0) {
     return false;
    }
    
    $scope.processing = true;
   
    userService.AddUser(user.email, user.pass).then(function(id) {
      $scope.processing = false;
      $state.go('user', {'id': id});
    }, function(reason) {
      $scope.errors.pass = 'Failed to add user.';
      $scope.$safeApply();
    });
    
  }


});