angular
	.module('controllers.classes-detail.controller', [])
	.controller('ClassesDetailController', [
		'$q',
		'$scope',
		'$stateParams',
		'Classes',
		'$http',
		'$cookies',
		'$cookieStore',
		'$rootScope',
		'ClassSessions',
		'ClassSessionNotifications',
		'ApplicationSettings',
		function (
			$q,
			$scope,
			$stateParams,
			Classes,
			$http,
			$cookies,
			$cookieStore,
			$rootScope,
			ClassSessions,
			ClassSessionNotifications,
			ApplicationSettings
		) {
			$scope.class = Classes.get($stateParams.id);
			$scope.tab = 'updates';
			$scope.sessions = ClassSessions.all();
			$scope.classFilter = ApplicationSettings.LOCAL_URL + '/classes/' + $stateParams.id + '/';
			$scope.notifications = ClassSessionNotifications.all();

			$scope.isParticipating = function () {
				var result = false;

				angular.forEach($scope.class.participants, function (item) {
					if (item === ApplicationSettings.LOCAL_URL + '/users/' + $rootScope.currentUser.id + '/') {
						result = true;
					}
				});

				return result;
			};

			$scope.isCheckedIn = function (session) {
				var result = false;

				angular.forEach(session.checked_in, function (item) {
					if (item === ApplicationSettings.LOCAL_URL + '/users/' + $rootScope.currentUser.id + '/') {
						result = true;
					}
				});

				return result;
			};

			function attend () {
				var config = {
					method: 'POST',
					url: ApplicationSettings.SERVER_URL + '/actions/classes/add-participant/',
					data: {
						class_id: $stateParams.id
					},
					headers: {
						'X-CSRFToken': $cookies['djangotoken'],
						'Authorization': 'Bearer ' + $rootScope.token
					}
				};

				$http.defaults.headers.common['X-CSRFToken'];

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
					url: ApplicationSettings.SERVER_URL + '/actions/classes/check-in/',
					data: {
						class_session_id: classSessionId
					},
					headers: {
						'X-CSRFToken': $cookies['djangotoken'],
						'Authorization': 'Bearer ' + $rootScope.token
					}
				};

				$http.defaults.headers.common['X-CSRFToken'];

				$http(config)
					.then(function (response) {
						angular.merge(classSession, response.data);
					}, function (error) {
						debugger;
					});
			};

			$scope.attend = function () {
				attend();
			};
		}
	]);

