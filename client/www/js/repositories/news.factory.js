angular
	.module('repositories.news.factory', [])
	.factory('News', [
		'$http',
		'$q',
		'$rootScope',
		'ApplicationSettings',
		function($http, $q, $rootScope, ApplicationSettings) {

			var news = [];

			function refresh (callback) {
				var url = ApplicationSettings.SERVER_URL + "/articles/";

				$http
					.get(url)
					.then(function (response) {
						angular.merge(news, response.data);

						if (callback) {
							callback();
						}
					}, function (error) {

					});
			}

			$rootScope.$on('reload', function () {
				refresh();
			});

			return {
				refresh: function (callback) {
					refresh(callback);
				},

				draft: function (data) {
					var url = ApplicationSettings.SERVER_URL + "/articles/";
					var holding = {
						new: true
					};

					news.unshift(holding);

					$http
						.post(url, data)
						.then(function (response) {
							angular.merge(holding, response.data);
							delete holding.new;
						}, function (error) {

						});

					return holding;
				},

				remove: function (article) {
					var url = ApplicationSettings.SERVER_URL + "/articles/" + article.id + '/';

					news.splice(news.indexOf(article), 1);

					return $http.delete(url);
				},

				save: function (data) {
					var url = ApplicationSettings.SERVER_URL + "/articles/" + data.id + '/';

					return $http.patch(url, data);
				},

				all: function() {
					refresh();

					return news;
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
