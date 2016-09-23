angular
	.module('repositories.classes.factory', [])
	.factory('Classes', [
		'$http',
		'$timeout',
		'ApplicationSettings',
		function($http, $timeout, ApplicationSettings) {

			var classes = [];

			function refresh (cb) {
				var url = ApplicationSettings.SERVER_URL + "/classes/";
				$http
					.get(url)
					.then(function (response) {
						$timeout(function () {
							//
							// Order by date
							//
							response.data.sort(function (a,b) {
								if (a.day < b.day)
									return -1;

								if (a.day > b.day)
									return 1;

								return 0;
							});

							angular.forEach(response.data, function (item) {
								classes.push(item);
							});
						});
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
	]);
