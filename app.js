'use strict';

var bootyApp = angular.module('bootyApp', ['ngAnimate', 'ui.router', 'Scope.safeApply', 'earlMod', 'robinsMod', 'kingsburyMod']);

/************************************************
* CONFIG
*************************************************/
bootyApp.config(function($stateProvider, $urlRouterProvider, $animateProvider) {

  $animateProvider.classNameFilter(/^((?!(fa-spin)).)*$/);

  //$urlRouterProvider.otherwise('/home');

  $stateProvider.state('home', {
      templateUrl: 'partials/home.html',
      url: '/home',
      controller: 'searchController'
  });

  $stateProvider.state('search', {
      templateUrl: 'partials/search.html',
      url: '/search',
      controller: 'searchController'
  });

  $stateProvider.state('login', {
      templateUrl: 'partials/login.html',
      url: '/login',
      controller: 'loginController'
  });

  $stateProvider.state('user', {
      templateUrl: 'partials/user.html',
      url: '/user/:userId'
  });

  $stateProvider.state('user-inventory', {
      templateUrl: 'partials/inventory.html',
      url: '/user/:userId/inventory'
  });

  $stateProvider.state('user-inventory-add', {
      templateUrl: 'partials/inventory-add.html',
      url: '/user/:userId/inventory/add'
  });
//
//	$stateProvider.state('user.inventory.delete', {
//		templateUrl: 'partials/inventory-delete.html',
//		url: '/delete'
//	});

  $stateProvider.state('request', {
    templateUrl: 'partials/request.html',
    url: '/request'
  });

  $stateProvider.state('signUp', {
    templateUrl: 'partials/signUp.html',
    url: '/signUp',
    controller: 'signUpController'
  });

});

/************************************************
* RUN
*************************************************/
bootyApp.run(function($rootScope, $state) {

  var savedUser = false;

  // fromJson fails bad if it gets a weird string
  try {
    savedUser = angular.fromJson(localStorage.getItem('authUser'));
  }
  catch(e) {}

  if (savedUser) {
    console.log('saved user found');
    $rootScope.authUser = savedUser;
    $state.go('user', {'userId':savedUser.id});
  }

  $rootScope.$state = $state;

  $rootScope.logout = function() {
    $rootScope.authUser = {};
    localStorage.setItem('authUser', '');
    $state.go('home');
  }

});

bootyApp.controller('exampleController', function($scope, $http) {

	
});

bootyApp.directive('coolType', function() { return { link: function($scope, $iElement, $iAttrs) {


}}});