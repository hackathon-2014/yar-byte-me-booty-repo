var kingsburyMod = angular.module('kingsburyMod', ['bootyApp']);

kingsburyMod.run(function(userService) {

  userService.GetUser(1).then(function(user) {
    console.log(user);
  });

});


kingsburyMod.service('userService', function($log, $http, $q) {


  this.GetUser = function(id) {
  
    var deferred = $q.defer();
    
    console.log('running getuser');
    
    $http.post('backend.php', {
      'getuser': id
    }).then(function(response) {
      if (response.data) {
        deferred.resolve(response.data);
      }
      else {
        deferred.reject('Didn\'t get expected response');
        $log.error('userService (getuser): Didn\'t get expected response');
      }
    });
    
    return deferred.promise;
  }

});


kingsburyMod.service('inventoryService', function($log) {
});