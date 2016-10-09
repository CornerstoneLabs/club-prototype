// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular
	.module('starter', [
		'ionic',
		'starter.controllers',
		'ngCookies',
		'app.config'
	])
	.run(function($ionicPlatform, ApplicationSettings, $rootScope) {
		$ionicPlatform.ready(function() {
			// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
			// for form inputs)
			if (window.cordova && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
				cordova.plugins.Keyboard.disableScroll(true);

			}
			if (window.StatusBar) {
				// org.apache.cordova.statusbar required
				StatusBar.styleDefault();
			}

			$rootScope.ApplicationSettings = ApplicationSettings;
		});
	})
	.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
		$httpProvider.defaults.xsrfCookieName = 'csrftoken';
		$httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

		$stateProvider
			.state('app', {
				url: '/app',
				abstract: true,
				templateUrl: 'templates/menu.html',
				controller: 'AppCtrl'
			})
			.state('app.search', {
				url: '/search',
				views: {
					'menuContent': {
						templateUrl: 'templates/search.html'
					}
				}
			})
			.state('app.classes', {
				url: '/classes/',
				views: {
					'menuContent': {
						templateUrl: 'templates/classes.html',
						controller: 'ClassesController'
					}
				}
			})
			.state('app.classes-detail', {
				url: '/classes/:id',
				views: {
					'menuContent': {
						templateUrl: 'templates/classes-detail.html',
						controller: 'ClassesDetailController'
					}
				}
			})
			.state('app.news', {
				url: '/news/',
				views: {
					'menuContent': {
						templateUrl: 'templates/news.html',
						controller: 'NewsController'
					}
				}
			})
			.state('app.news-detail', {
				url: '/news/:id',
				views: {
					'menuContent': {
						templateUrl: 'templates/news-detail.html',
						controller: 'NewsDetailController'
					}
				}
			})
			.state('app.news-detail-edit', {
				url: '/news/:id/edit',
				views: {
					'menuContent': {
						templateUrl: 'templates/forms/news/news-edit.html',
						controller: 'NewsDetailController'
					}
				}
			});

			// if none of the above states are matched, use this as the fallback
		$urlRouterProvider.otherwise('/app/news/');
	})
	.filter('numberFixedLen', function () {
		return function (n, len) {
			var num = parseInt(n, 10);
			len = parseInt(len, 10);
			if (isNaN(num) || isNaN(len)) {
				return n;
			}
			num = ''+num;
			while (num.length < len) {
				num = '0'+num;
			}
			return num;
		};
	});
