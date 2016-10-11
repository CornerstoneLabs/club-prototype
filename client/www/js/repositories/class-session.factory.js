angular
	.module('repositories.class-sessions.factory', [])
	.factory('ClassSessions', [
		'$http',
		'$rootScope',
		'ApplicationSettings',
		function($http, $rootScope, ApplicationSettings) {

			var ClassSessions = [];

			function refresh () {
				var url = ApplicationSettings.SERVER_URL + "/class-session/";
				$http
					.get(url)
					.then(function (response) {
						angular.merge(ClassSessions, response.data);
					}, function (error) {

					});
			}

			$rootScope.$on('reload', refresh);

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
					});
				}
			};
		}
	]);
