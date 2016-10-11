angular
	.module('controllers.app.controller', [])
	.factory('login', [
		'$cookieStore',
		'$http',
		'$q',
		'$window',
		'$rootScope',
		'ApplicationSettings',
		function ($cookieStore, $http, $q, $window, $rootScope, ApplicationSettings) {
			return function login (username, password) {
				var deferred = $q.defer();
				var user_data = {
					'username': username,
					'password': password
				};

				$window.localStorage['AUTHENTICATION_CREDENTIALS'] = JSON.stringify(user_data);

				$http
					.post(ApplicationSettings.SERVER_URL + '/' + 'api-token-auth/', user_data, {"Authorization": ""})
					.then(function(response) {
						$cookieStore.put('djangotoken', response.data.token);
						$http.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;

						$rootScope.token = response.data.token;
						$window.localStorage['AUTHENTICATION_TOKEN'] = response.data.token;

						$rootScope.$broadcast('reload');

						deferred.resolve(response.data.token);
					}, function () {
						$rootScope.$broadcast('authentication:unauthorized:currentuser');
					});

				return deferred.promise;
			};
		}
	])
	.factory('currentUser', [
		'$cookies',
		'$cookieStore',
		'$http',
		'$q',
		'$rootScope',
		'ApplicationSettings',
		function (
			$cookies,
			$cookieStore,
			$http,
			$q,
			$rootScope,
			ApplicationSettings
		) {
			return function currentUser () {
				var deferred = $q.defer();

				var config = {
					method: 'GET',
					url: ApplicationSettings.SERVER_URL + '/actions/classes/current-user/',
					headers: {
						'X-CSRFToken': $cookies['djangotoken'],
						'Authorization': 'Bearer ' + $rootScope.token
					}
				};

				$http(config)
					.then(function (response) {
						deferred.resolve(response.data);
					}, function (error) {
						deferred.reject(error);
					});

				return deferred.promise;
			};
		}
	])
	.controller('AppCtrl', [
		'$cookieStore',
		'$scope',
		'$ionicModal',
		'$rootScope',
		'$state',
		'$window',
		'login',
		'currentUser',
		'News',
		'Classes',
		'Location',
		'UserProfile',
		function(
			$cookieStore,
			$scope,
			$ionicModal,
			$rootScope,
			$state,
			$window,
			login,
			currentUser,
			News,
			Classes,
			Location,
			UserProfile
		) {
			$scope.clickFocus = function (cssElement) {
				document.querySelector(cssElement).focus();
			};

			// With the new view caching in Ionic, Controllers are only called
			// when they are recreated or on app start, instead of every page change.
			// To listen for when this page is active (for example, to refresh data),
			// listen for the $ionicView.enter event:
			//$scope.$on('$ionicView.enter', function(e) {
			//});

			// Form data for the login modal
			$scope.loginData = {};

			// Create the login modal that we will use later
			$ionicModal
				.fromTemplateUrl('templates/login.html', {
					scope: $scope
				})
				.then(function(modal) {
					$scope.modal = modal;
				});

			$ionicModal
				.fromTemplateUrl('templates/forms/news/news-add.html', {
					scope: $scope
				})
				.then(function(modal) {
					$scope.newsAdd = modal;
				});

			$ionicModal
				.fromTemplateUrl('templates/forms/class/class-add.html', {
					scope: $scope
				})
				.then(function(modal) {
					$scope.classAdd = modal;
				});

			// Triggered in the login modal to close it
			$scope.closeLogin = function() {
				$scope.modal.hide();
			};

			// Open the login modal
			$scope.login = function() {
				$scope.modal.show();
			};

			$scope.logout = function () {
				$scope.token = null;
				$scope.currentUser = null;
			};

			// news
			$scope.newsAddData = {};
			$scope.newsAddClick = function () {
				$scope.newsAddData.title = '';
				$scope.newsAddData.content = '';
				$scope.newsAddData.date_published = null;
				$scope.newsAddData.published = false;

				$scope.newsAdd.show();
			};

			$scope.newsCloseClick = function () {
				$scope.newsAdd.hide();
			};

			$scope.newsDraftClick = function () {
				var data = {
					title: $scope.newsAddData.title,
					content: $scope.newsAddData.content,
					date_published: $scope.newsAddData.date_published,
					published: $scope.newsAddData.published
				};

				$scope.$evalAsync(function () {
					News.draft(data);
					$scope.newsAdd.hide();
				});
			};

			// class
			$scope.classAddData = {};
			$scope.classAddClick = function () {
				$scope.classAddData.title = '';
				$scope.classAddData.content = '';
				$scope.classAddData.start_hours = '';
				$scope.classAddData.start_minutes = '';
				$scope.classAddData.end_hours = '';
				$scope.classAddData.end_minutes = '';
				$scope.classAddData.location = null;
				$scope.classAddData.teacher = null;

				$scope.locations = Location.all();
				$scope.userProfile = UserProfile.all();
				$scope.classAdd.show();
			};

			$scope.classCloseClick = function () {
				$scope.classAdd.hide();
			};

			$scope.classDraftClick = function () {
				var data = {
					title: $scope.classAddData.title,
					content: $scope.classAddData.content,
					start_hours: parseInt($scope.classAddData.start_hours),
					start_minutes: parseInt($scope.classAddData.start_minutes),
					end_hours: parseInt($scope.classAddData.end_hours),
					end_minutes: parseInt($scope.classAddData.end_minutes),
					location: $scope.classAddData.location,
					teacher: $scope.classAddData.teacher
				};

				$scope.$evalAsync(function () {
					Classes.draft(data);
					$scope.classAdd.hide();
				});
			};

			// Perform the login action when the user submits the login form
			$scope.doLogin = function() {
				$scope.loginData.error = false;

				login($scope.loginData.username, $scope.loginData.password)
					.then(function () {
						$scope.closeLogin();
					}, function () {
						$scope.evalAsync(function () {
							$scope.loginData.error = true;
						});
					});
			};

			function onTokenChange () {
				currentUser()
					.then(function (response) {
						$rootScope.currentUser = response;
					}, function (error) {
						$rootScope.$broadcast('authentication:unauthorized:currentuser');
					});
			}

			$rootScope.$on('authentication:unauthorized:currentuser', $scope.login);

			$rootScope.$watch('token', onTokenChange);

			if (angular.isDefined($window.localStorage['AUTHENTICATION_CREDENTIALS'])) {
				var userData = JSON.parse($window.localStorage['AUTHENTICATION_CREDENTIALS']);

				login(userData.username, userData.password);
			}

			//
			// check for saved token
			if (angular.isDefined($window.localStorage['AUTHENTICATION_TOKEN'])) {
				$rootScope.token = $window.localStorage['AUTHENTICATION_TOKEN'];
				$cookieStore.put('djangotoken', $rootScope.token);
			}
		}
	]);
