angular
	.module('repositories.user-profile.factory', [])
	.factory('UserProfile', [
		'$http',
		'$rootScope',
		'ApplicationSettings',
		function($http, $rootScope, ApplicationSettings) {

			var UserProfile = [];

			function refresh () {
				var url = ApplicationSettings.SERVER_URL + "/user-profile/";
				$http
					.get(url)
					.then(function (response) {
						angular.merge(UserProfile, response.data);
					}, function (error) {

					});
			}

			$rootScope.$on('reload', refresh);

			return {
				all: function() {
					refresh();

					return UserProfile;
				},

				remove: function(UserProfile) {
					UserProfile.splice(UserProfile.indexOf(UserProfile), 1);
				},

				get: function(UserProfileId) {
					for (var i = 0; i < UserProfile.length; i++) {
						if (UserProfile[i].id === parseInt(UserProfileId)) {
							return UserProfile[i];
						}
					}

					var holding = {
						id: UserProfileId
					};

					UserProfile.push(holding);

					refresh();

					return holding;
				},

				forClass: function (classId) {
					refresh();

					return UserProfile.filter(function (item) {
						item.parent_class = classId;
					});
				}
			};
		}
	]);
