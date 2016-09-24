angular
	.module('repositories.news.factory', [])
	.factory('News', [
		'$http',
		'$rootScope',
		'ApplicationSettings',
		function($http, $rootScope, ApplicationSettings) {

			var news = [];

			function refresh () {
				var url = ApplicationSettings.SERVER_URL + "/articles/";
				$http
					.get(url)
					.then(function (response) {
						angular.merge(news, response.data);
					}, function (error) {

					});
			}

			$rootScope.$on('reload', refresh);

			return {
				all: function() {
					refresh();

					return news;
				},

				remove: function(news) {
					news.splice(news.indexOf(news), 1);
				},

				get: function(newsId) {
					for (var i = 0; i < news.length; i++) {
						if (news[i].id === parseInt(newsId)) {
							return news[i];
						}
					}

					var holding = {
						id: newsId
					};
					news.push(holding);

					refresh();

					return holding;
				}
			};
		}
	]);
