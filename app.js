'use strict';

var bootyApp = angular.module('bootyApp', ['ngAnimate', 'ui.router', 'Scope.safeApply', 'earlMod', 'robinsMod', 'kingsburyMod']);

/************************************************
* CONFIG
*************************************************/
bootyApp.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/home');

	$stateProvider.state('home', {
		templateUrl: 'partials/home.html',
		url: '/home'
	});
	
	$stateProvider.state('login', {
		templateUrl: 'partials/login.html',
		url: '/login'
	});
	
	$stateProvider.state('account', {
		templateUrl: 'partials/account.html',
		url: '/account'
	});

  $stateProvider.state('inventory', {
    templateUrl: 'partials/inventory.html',
    url: '/inventory'
  });

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
    url: '/signUp'
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