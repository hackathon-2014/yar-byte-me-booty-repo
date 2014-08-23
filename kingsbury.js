var kingsburyMod = angular.module('kingsburyMod', ['bootyApp']);

kingsburyMod.run(function() {

});


kingsburyMod.service('userService', function($log, $http, $q) {

  var backendUrl = 'http://192.168.8.34:8080/yar-byte-me-booty-repo/backend.php';

  this.GetUser = function(id) {
  
    var deferred = $q.defer();
    
    $http.post(backendUrl, {
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

<<<<<<< HEAD
  this.CheckEmail = function(email) {
  
    var deferred = $q.defer();
    
    $http.post(backendUrl, {
      'CheckEmail': email
    }).then(function(response) {
      if (response.data.hasOwnProperty('CheckEmail')) {
        deferred.resolve(response.data.CheckEmail);
      }
      else {
        deferred.reject('Didn\'t get expected response');
        $log.error('userService (CheckEmail): Didn\'t get expected response');
      }
    });
    
    return deferred.promise;
  }

  this.AuthUser = function(email, pass) {
  
    var deferred = $q.defer();
    
    $http.post(backendUrl, {
      'AuthUser': {'email':email, 'pass':pass}
    }).then(function(response) {
      if (response.data.AuthUser) {
        deferred.resolve(response.data.AuthUser);
      }
      else {
        deferred.reject('Failed to authenticate user');
        $log.error('userService (AuthUser): Failed to authenticate user', email, pass);
      }
    });
    
    return deferred.promise;
  }

=======
>>>>>>> origin/master
  this.AddUser = function(email, pass) {
    
    var deferred = $q.defer();
 
    $http.post(backendUrl, {
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
  
  this.GetUserMovies = function(userId) {
  
    var deferred = $q.defer();
 
    $http.post(backendUrl, {
      'userId': userId
    }).then(function(response) {
      if (response.data.GetUserMovies) {
        deferred.resolve(response.data.GetUserMovies);
      }
      else {
        deferred.reject('Failed to get movies');
        $log.error('userService (GetUserMovies): Failed to get movies', userId);
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
      $state.go('user', {'userId': id});
    }, function(reason) {
      $scope.errors.pass = 'Failed to add user.';
      $scope.$safeApply();
    });
    
  }


});