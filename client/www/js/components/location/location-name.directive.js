angular
	.module('components.location-name', [])
	.directive('locationName', [
		'Location',
		function locationName (Location) {
			return {
				restrict: 'AE',
				scope: {
					id: '='
				},
				templateUrl: 'templates/components/location-name.html',
				link: function (scope) {
					function onChange () {
						if (angular.isDefined(scope.id) &&
							(scope.id !== null)) {
							scope.location = Location.get(scope.id);
						}
					}

					scope.$watch('id', onChange);
				}
			};
		}
	]);
