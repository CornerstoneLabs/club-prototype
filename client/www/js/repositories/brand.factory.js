angular
	.module('repositories.brand.factory', [])
	.factory('Brand', [
		'$http',
		'ApplicationSettings',
		function($http, ApplicationSettings) {

			var brand = [];

			function refresh (cb) {
				var url = ApplicationSettings.SERVER_URL + "/brand/";
				$http
					.get(url)
					.then(function (response) {
						angular.merge(brand, response.data);
					}, function (error) {

					});
			}

			return {
				all: function() {
					refresh();

					return brand;
				},

				remove: function(brand) {
					brand.splice(brand.indexOf(brand), 1);
				},

				get: function() {
					if (brand.length > 0) {
						return brand[0];
					}

					var holding = {
					};

					brand.push(holding);

					refresh();

					return holding;
				}
			};
		}
	]);
