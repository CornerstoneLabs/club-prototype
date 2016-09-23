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

				$http
					.post(ApplicationSettings.SERVER_URL + '/' + 'api-token-auth/', user_data, {"Authorization": ""})
					.then(function(response) {
						$cookieStore.put('djangotoken', response.token);
						$http.defaults.headers.common['Authorization'] = 'Bearer ' + response.token;

						$rootScope.token = response.data.token;
						$window.localStorage['AUTHENTICATION_TOKEN'] = response.data.token;

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
		'$scope',
		'$ionicModal',
		'$rootScope',
		'$window',
		'login',
		'currentUser',
		function(
			$scope,
			$ionicModal,
			$rootScope,
			$window,
			login,
			currentUser
		) {
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

			$scope.logout = function () {
				$scope.token = null;
				$scope.currentUser = null;
			};

			// Perform the login action when the user submits the login form
			$scope.doLogin = function() {
				$scope.loginData.error = false;

				login($scope.loginData.username, $scope.loginData.password)
					.then(function () {
						$scope.closeLogin();
					}, function () {
						$scope.loginData.error = true;
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

			//
			// check for saved token
			if (angular.isDefined($window.localStorage['AUTHENTICATION_TOKEN'])) {
				$rootScope.token = $window.localStorage['AUTHENTICATION_TOKEN'];
			}
		}
	]);
