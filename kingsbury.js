var kingsburyMod = angular.module('kingsburyMod', ['bootyApp']);

kingsburyMod.run(function() {

  //git test

});

kingsburyMod.backendUrl = 'backend.php';

kingsburyMod.service('userService', function($log, $http, $q) {

  this.GetUser = function(id) {
  
    var deferred = $q.defer();
    
    $http.post(kingsburyMod.backendUrl, {
      'GetUser': id
    }).then(function(response) {
      if (response.data.GetUser) {
        deferred.resolve(response.data.GetUser);
      }
      else {
        deferred.reject('Didn\'t get expected response');
        $log.error('userService (GetUser): Didn\'t get expected response');
      }
    });
    
    return deferred.promise;
  }

  this.CheckEmail = function(email) {
  
    var deferred = $q.defer();
    
    $http.post(kingsburyMod.backendUrl, {
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
    
    $http.post(kingsburyMod.backendUrl, {
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

  this.AddUser = function(email, pass) {
    
    var deferred = $q.defer();
 
    $http.post(kingsburyMod.backendUrl, {
      'AddUser': {'email':email, 'pass':pass}
    }).then(function(response) {
      if (response.data.AddUser) {
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


kingsburyMod.service('inventoryService', function($log, $q, $http) {

  this.GetUserInventory = function(user) {
  
   var deferred = $q.defer();
 
    $http.post(kingsburyMod.backendUrl, {
      'GetUserMovies': {'userId':user.id}
    }).then(function(response) {
      if (response.data.GetUserMovies) {
        deferred.resolve(response.data.GetUserMovies);
      }
      else {
        deferred.reject('Failed to get movies');
        $log.error('inventoryService (GetUserMovies): Failed to get movies', user);
      }
    });
    
    return deferred.promise;
  }

  this.AddMovie = function(movie) {
  
    // // The Movie Object
    // {
      // info : JSON
      // condition : STRING
      // medium : STRING
      // userId : INT
    // }
  
    var deferred = $q.defer();

    $http.post(kingsburyMod.backendUrl, {
      'AddMovie': movie
    }).then(function(response) {
      if (response.data.AddMovie) {
        deferred.resolve(response.data.AddMovie);
      }
      else {
        deferred.reject('Failed to add movie');
        $log.error('inventoryService (AddMovie): Failed to add movie', movie);
      }
    });

    return deferred.promise;
  }

});

kingsburyMod.controller('backendTests', function($scope, userService, inventoryService) {

  $scope.findUser = function(id) {
    userService.GetUser(1).then(function(user) {
      $scope.foundUser = user;
      $scope.$safeApply();
    });
  }
  
  $scope.UserMovies = function(user) {
    inventoryService.GetUserInventory(user).then(function(movies) {
      $scope.movies = movies;
      $scope.$safeApply();
    });
  }
  
  $scope.testMovie = {
    info: '{"test":"asdf asdf"}',
    userId: 1,
    medium: 'VHS',
    condition: 'Bad'
  }

  $scope.testAddMovie = function(movie) {
    inventoryService.AddMovie(movie);
  }
  
});

kingsburyMod.controller('signUpController', function($scope, userService, $state, $rootScope) {

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
    if ($scope.errors.email || $scope.errors.pass ) {
     return false;
    }
    
    $scope.processing = true;
    
    userService.CheckEmail(user.email).then(function(result) {
    
      if (!result) {
     
        userService.AddUser(user.email, user.pass).then(function(newUser) {
          $scope.processing = false;
          $rootScope.authUser = newUser;
          localStorage.setItem('authUser', angular.toJson(newUser));
          $state.go('user', {'userId': newUser.id});
        }, function(reason) {
          $scope.processing = false;
          $scope.errors.general = 'Failed to add user.';
          $scope.$safeApply();
        });
      }
      else {
        $scope.processing = false;
        $scope.errors.general = 'There is already an account with this email';
      }
      
   }, function(reason) {
      $scope.processing = false;
      $scope.errors.general = 'Failed to add user.';
      $scope.$safeApply();
    });
   
    
  }


});

kingsburyMod.controller('loginController', function($scope, userService, $state, $rootScope) {

  $scope.errors = {};

  $scope.newUser = {
    email:'',
    pass:''
  };

  $scope.Login = function(user) {
  
    $scope.errors = {};
  
    if (!user.email) {
      $scope.errors.email = 'Please enter a valid email address.';
    }
    if (!user.pass) {
      $scope.errors.pass = 'Please enter a password.';
    }
    if ($scope.errors.email || $scope.errors.pass ) {
     return false;
    }
    
    $scope.processing = true;
   
    userService.AuthUser(user.email, user.pass).then(function(user) {
      $scope.processing = false;
      $rootScope.authUser = user;
      localStorage.setItem('authUser', angular.toJson(user));
      $state.go('user', {'userId': user.id});
    }, function(reason) {
      $scope.processing = false;
      $scope.errors.general = 'Failed to authenticate.';
      $scope.$safeApply();
    });
    
  }


});