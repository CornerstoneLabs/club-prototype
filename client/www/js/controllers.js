angular
	.module('starter.controllers', [])
	.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

		// With the new view caching in Ionic, Controllers are only called
		// when they are recreated or on app start, instead of every page change.
		// To listen for when this page is active (for example, to refresh data),
		// listen for the $ionicView.enter event:
		//$scope.$on('$ionicView.enter', function(e) {
		//});

		// Form data for the login modal
		$scope.loginData = {};

		// Create the login modal that we will use later
		$ionicModal.fromTemplateUrl('templates/login.html', {
			scope: $scope
		}).then(function(modal) {
			$scope.modal = modal;
		});

		// Triggered in the login modal to close it
		$scope.closeLogin = function() {
			$scope.modal.hide();
		};

		// Open the login modal
		$scope.login = function() {
			$scope.modal.show();
		};

		// Perform the login action when the user submits the login form
		$scope.doLogin = function() {
			console.log('Doing login', $scope.loginData);

			// Simulate a login delay. Remove this and replace with your login
			// code if using a login system
			$timeout(function() {
				$scope.closeLogin();
			}, 1000);
		};
	})
	.factory('News', [
		'$http',
		function($http) {

			var news = [];

			function refresh (cb) {
				var url = "http://0.0.0.0:8000/articles/";
				$http
					.get(url)
					.then(function (response) {
						angular.merge(news, response.data);
					}, function (error) {

					});
			}

			return {
				all: function() {
					refresh();

					return news;
				},
				remove: function(news) {
					news.splice(news.indexOf(news), 1);
				},
				get: function(newsId) {
					for (var i = 0; i < news.length; i++) {
						if (news[i].id === parseInt(newsId)) {
							return news[i];
						}
					}

					var holding = {
						id: newsId
					};
					news.push(holding);

					refresh();

					return holding;
				}
			};
		}
	])

	.controller('NewsController', function($scope, News) {
		$scope.news = News.all();

		$scope.$on('$ionicView.enter', function() {
			$scope.news = News.all();
		});
	})

	.controller('NewsDetailController', function($scope, $stateParams, News) {
		$scope.news = News.get($stateParams.id);
	})

	.factory('Classes', [
		'$http',
		function($http) {

			var classes = [];

			function refresh (cb) {
				var url = "http://0.0.0.0:8000/classes/";
				$http
					.get(url)
					.then(function (response) {
						angular.merge(classes, response.data);
					}, function (error) {

					});
			}

			return {
				all: function() {
					refresh();

					return classes;
				},

				remove: function(classes) {
					classes.splice(classes.indexOf(classes), 1);
				},

				get: function(classesId) {
					for (var i = 0; i < classes.length; i++) {
						if (classes[i].id === parseInt(classesId)) {
							return classes[i];
						}
					}

					var holding = {
						id: classesId
					};

					classes.push(holding);

					refresh();

					return holding;
				}
			};
		}
	])

	.controller('ClassesController', function($scope, Classes) {
		$scope.classes = Classes.all();

		$scope.$on('$ionicView.enter', function() {
			$scope.classes = Classes.all();
		});
	})

	.controller('ClassesDetailController', function($scope, $stateParams, Classes) {
		$scope.classes = Classes.get($stateParams.id);
	});

