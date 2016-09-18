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

	.factory('Brand', [
		'$http',
		function($http) {

			var brand = [];

			function refresh (cb) {
				var url = "http://0.0.0.0:8000/brand/";
				$http
					.get(url)
					.then(function (response) {
						angular.merge(brand, response.data);
					}, function (error) {

					});
			}

			return {
				all: function() {
					refresh();

					return brand;
				},
				remove: function(brand) {
					brand.splice(brand.indexOf(brand), 1);
				},
				get: function() {
					if (brand.length > 0) {
						return brand[0];
					}

					var holding = {
					};

					brand.push(holding);

					refresh();

					return holding;
				}
			};
		}
	])

	.controller('NewsController', function($scope, News, Brand) {
		$scope.news = News.all();
		$scope.brand = Brand.get();

		$scope.$on('$ionicView.enter', function() {
			$scope.news = News.all();
		});
	})

	.controller('NewsDetailController', function($scope, $stateParams, News) {
		$scope.article = News.get($stateParams.id);
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

	.factory('ClassSessions', [
		'$http',
		function($http) {

			var ClassSessions = [];

			function refresh (cb) {
				var url = "http://0.0.0.0:8000/class-session/";
				$http
					.get(url)
					.then(function (response) {
						angular.merge(ClassSessions, response.data);
					}, function (error) {

					});
			}

			return {
				all: function() {
					refresh();

					return ClassSessions;
				},

				remove: function(ClassSessions) {
					ClassSessions.splice(ClassSessions.indexOf(ClassSessions), 1);
				},

				get: function(ClassSessionsId) {
					for (var i = 0; i < ClassSessions.length; i++) {
						if (ClassSessions[i].id === parseInt(ClassSessionsId)) {
							return ClassSessions[i];
						}
					}

					var holding = {
						id: ClassSessionsId
					};

					ClassSessions.push(holding);

					refresh();

					return holding;
				},
				forClass: function (classId) {
					refresh();

					return ClassSessions.filter(function (item) {
						item.parent_class = classId;
					})
				}
			};
		}
	])

	.controller('ClassesController', function($scope, Classes) {
		function transformDays (classes) {
			var days = {}
			var dayName = [
				'Monday',
				'Tuesday',
				'Wednesday',
				'Thursday',
				'Friday',
				'Saturday',
				'Sunday'
			];

			classes
				.forEach(function (classItem) {
					if (angular.isUndefined(days['k' + classItem.day])) {
						days['k' + classItem.day] = {
							name: dayName[classItem.day]
						};
					}

					if (angular.isUndefined(days['k' + classItem.day].classes)) {
						days['k' + classItem.day].classes = [];
					}

					days['k' + classItem.day].classes.push(classItem);
				});

			return days;
		}

		function reload ($scope) {
			$scope.classes = Classes.all();
			$scope.days = transformDays($scope.classes);
		}

		$scope.$on('$ionicView.enter', function() {
			reload($scope);
		});

		$scope.tab = 'all';

		reload($scope);
	})

	.controller('ClassesDetailController', [
		'$q',
		'$scope',
		'$stateParams',
		'Classes',
		'$http',
		'$cookies',
		'$cookieStore',
		'ClassSessions',
		function ($q, $scope, $stateParams, Classes, $http, $cookies, $cookieStore, ClassSessions) {
			$scope.class = Classes.get($stateParams.id);
			$scope.tab = 'updates';
			$scope.currentUser = {};
			$scope.sessions = ClassSessions.all();
			$scope.classFilter = 'http://0.0.0.0:8000/classes/' + $stateParams.id + '/';

			$scope.isParticipating = function () {
				var result = false;

				angular.forEach($scope.class.participants, function (item) {
					if (item === 'http://0.0.0.0:8000/users/' + $scope.currentUser.id + '/') {
						result = true;
					}
				});

				return result;
			};

			$scope.isCheckedIn = function (session) {
				var result = false;

				angular.forEach(session.checked_in, function (item) {
					if (item === 'http://0.0.0.0:8000/users/' + $scope.currentUser.id + '/') {
						result = true;
					}
				});

				return result;
			};

			var token;

			function currentUser () {
				var deferred = $q.defer();

				var config = {
					method: 'GET',
					url: 'http://0.0.0.0:8000/actions/classes/current-user/',
					headers: {
						'X-CSRFToken': $cookies['djangotoken'],
						'Authorization': 'Bearer ' + token
					}
				};

				$http(config)
					.then(function (response) {
						deferred.resolve(response.data);
					}, function (error) {
						deferred.reject();
					});

				return deferred.promise;
			}

			function login () {
				var deferred = $q.defer();
				var user_data = {
					'username': 'adam',
					'password': 'm0nk3ym0nk3y',
				};

				$http
					.post('http://0.0.0.0:8000/' + 'api-token-auth/', user_data, {"Authorization": ""})
					.success(function(response) {
						$cookieStore.put('djangotoken', response.token);
						$http.defaults.headers.common['Authorization'] = 'Bearer ' + response.token;

						token = response.token;

						deferred.resolve(response.token);
				  });

				return deferred.promise;
			}

			function attend () {
				var config = {
					method: 'POST',
					url: 'http://0.0.0.0:8000/actions/classes/add-participant/',
					data: {
						class_id: $stateParams.id
					},
					headers: {
						'X-CSRFToken': $cookies['djangotoken'],
						'Authorization': 'Bearer ' + token
					}
				};

				$http.defaults.headers.common['X-CSRFToken']

				$http(config)
					.then(function (response) {
						$scope.class = response.data;
					}, function (error) {
						debugger;
					});
			}

			$scope.checkIn = function (classSession) {
				var classSessionId = classSession.id;
				var config = {
					method: 'POST',
					url: 'http://0.0.0.0:8000/actions/classes/check-in/',
					data: {
						class_session_id: classSessionId
					},
					headers: {
						'X-CSRFToken': $cookies['djangotoken'],
						'Authorization': 'Bearer ' + token
					}
				};

				$http.defaults.headers.common['X-CSRFToken']

				$http(config)
					.then(function (response) {
						angular.merge(classSession, response.data);
					}, function (error) {
						debugger;
					});
			}

			$scope.attend = function () {
				attend();
			};

			login()
				.then(function (response) {
					currentUser()
						.then(function (response) {
							$scope.currentUser = response;
						}, function (error) {
							debugger;
						});
				}, function (error) {
					debugger;
				});
		}
	]);

