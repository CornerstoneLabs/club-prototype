angular
	.module('repositories.class-session-notification.factory', [])
	.factory('ClassSessionNotifications', [
		'$http',
		'$rootScope',
		'ApplicationSettings',
		function($http, $rootScope, ApplicationSettings) {

			var ClassSessionNotifications = [];

			function refresh () {
				var url = ApplicationSettings.SERVER_URL + "/class-session-notification/";
				$http
					.get(url)
					.then(function (response) {
						angular.merge(ClassSessionNotifications, response.data);
					}, function (error) {

					});
			}

			$rootScope.$on('reload', refresh);

			return {
				all: function() {
					refresh();

					return ClassSessionNotifications;
				},

				remove: function(ClassSessionNotifications) {
					ClassSessionNotifications.splice(ClassSessionNotifications.indexOf(ClassSessionNotifications), 1);
				},

				get: function(ClassSessionNotificationsId) {
					for (var i = 0; i < ClassSessionNotifications.length; i++) {
						if (ClassSessionNotifications[i].id === parseInt(ClassSessionNotificationsId)) {
							return ClassSessionNotifications[i];
						}
					}

					var holding = {
						id: ClassSessionNotificationsId
					};

					ClassSessionNotifications.push(holding);

					refresh();

					return holding;
				},

				forClass: function (classId) {
					refresh();

					return ClassSessionNotifications.filter(function (item) {
						item.parent_class = classId;
					});
				}
			};
		}
	]);
