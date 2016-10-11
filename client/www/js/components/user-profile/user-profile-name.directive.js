angular
	.module('components.user-profile-name', [])
	.directive('userProfileName', [
		'UserProfile',
		function userProfileName (UserProfile) {
			return {
				restrict: 'AE',
				scope: {
					id: '='
				},
				templateUrl: 'templates/components/user-profile-name.html',
				link: function (scope) {
					function onChange () {
						if (angular.isDefined(scope.id) &&
							(scope.id !== null)) {
							scope.userProfile = UserProfile.get(scope.id);
						}
					}

					scope.$watch('id', onChange);
				}
			};
		}
	]);
