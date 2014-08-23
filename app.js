'use strict';

var bootyApp = angular.module('bootyApp', ['ngAnimate', 'ui.router', 'Scope.safeApply', 'earlMod', 'robinsMod', 'kingsburyMod']);

/************************************************
* CONFIG
*************************************************/
bootyApp.config(function($stateProvider, $urlRouterProvider) {
  //$urlRouterProvider.otherwise('/home');

  $stateProvider.state('home', {
      templateUrl: 'partials/home.html',
      url: '/home'
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

  $stateProvider.state('search', {
    templateUrl: 'partials/search.html',
    url: '/search'
  });

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

  $rootScope.$state = $state;
	
});

bootyApp.controller('exampleController', function($scope, $http) {

	
});

bootyApp.directive('coolType', function() { return { link: function($scope, $iElement, $iAttrs) {


}}});