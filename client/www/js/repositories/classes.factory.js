angular
	.module('repositories.classes.factory', [])
	.factory('Classes', [
		'$http',
		'$timeout',
		'$rootScope',
		'ApplicationSettings',
		function($http, $timeout, $rootScope, ApplicationSettings) {

			var classes = [];

			function refresh () {
				console.log('refreshing classes');
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
								//
								// Matt this is where we set the background image, might want to think about
								// how we do a cycling background image when the list
								// gets transformed into day blocks
								//
								if (item.image_url === '') {
									item.image_url = '/images/background.jpeg';
								}

								var count = classes.filter(function (filterItem) {
									return (filterItem.id === item.id);
								}).length;

								if (count === 0) {
									classes.push(item);
								}
							});

							$rootScope.$broadcast('reloaded');
						});
					}, function (error) {
						console.log(error);
					});
			}

			$rootScope.$on('reload', refresh);

			return {
				draft: function (data) {
					var url = ApplicationSettings.SERVER_URL + "/classes/";
					var holding = {
						new: true
					};

					classes.unshift(holding);

					$http
						.post(url, data)
						.then(function (response) {
							angular.merge(holding, response.data);
							delete holding.new;
						}, function (error) {

						});

					return holding;
				},

				save: function (data) {
					var url = ApplicationSettings.SERVER_URL + "/classes/" + data.id + '/';

					return $http.patch(url, data);
				},

				all: function() {
					refresh();

					return classes;
				},

				remove: function(item) {
					var url = ApplicationSettings.SERVER_URL + "/classes/" + item.id + '/';

					classes.splice(classes.indexOf(item), 1);

					return $http.delete(url);
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
