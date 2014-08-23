'use strict';

var bootyApp = angular.module('bootyApp', ['ngAnimate', 'ui.router', 'Scope.safeApply', 'earlMod', 'robinsMod', 'kingsburyMod']);

/************************************************
* CONFIG
*************************************************/
bootyApp.config(function($stateProvider) {
	
	$stateProvider.state('asdf', {
		template: '<h3>the ASDF template</h3><div class="alert alert-success" ui-view></div>',
		url: '/asdf'
	});
	
	$stateProvider.state('asdf.blah', {
		template: '<h4>ummm i\'m blah</h4>',
		url: '/blah'
	});
	
	$stateProvider.state('wert', {
		template: '<h3>the WERT template</h3>',
		url: '/wwwwwwww'
	});
	
});

/************************************************
* RUN
*************************************************/
bootyApp.run(function($rootScope, $state) {

	
});

bootyApp.controller('exampleController', function($scope, $http) {

	
});

bootyApp.directive('coolType', function() { return { link: function($scope, $iElement, $iAttrs) {


}}});