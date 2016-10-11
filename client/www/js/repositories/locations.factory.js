angular
	.module('repositories.locations.factory', [])
	.factory('Location', [
		'$http',
		'$rootScope',
		'ApplicationSettings',
		function($http, $rootScope, ApplicationSettings) {

			var Location = [];

			function refresh () {
				var url = ApplicationSettings.SERVER_URL + "/locations/";
				$http
					.get(url)
					.then(function (response) {
						angular.merge(Location, response.data);
					}, function (error) {

					});
			}

			$rootScope.$on('reload', refresh);

			return {
				all: function() {
					refresh();

					return Location;
				},

				remove: function(Location) {
					Location.splice(Location.indexOf(Location), 1);
				},

				get: function(LocationId) {
					for (var i = 0; i < Location.length; i++) {
						if (Location[i].id === parseInt(LocationId)) {
							return Location[i];
						}
					}

					var holding = {
						id: LocationId
					};

					Location.push(holding);

					refresh();

					return holding;
				},

				forClass: function (classId) {
					refresh();

					return Location.filter(function (item) {
						item.parent_class = classId;
					});
				}
			};
		}
	]);
