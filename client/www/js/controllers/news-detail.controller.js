angular
	.module('controllers.news-detail.controller', [])
	.controller('NewsDetailController', [
		'$scope',
		'$stateParams',
		'News',
		'$ionicNavBarDelegate',
		'$window',
		function($scope, $stateParams, News, $ionicNavBarDelegate, $window) {
			$scope.article = News.get($stateParams.id);

			$scope.onPublishedChange = function () {
				if ($scope.article.published === true) {
					$scope.article.date_published = new Date();
				}
			};

			$scope.newsSaveClick = function () {
				var data = $scope.article;
				data.date_published = $window.moment(data.date_published).format('YYYY-MM-DD');

				if (data.date_published === 'Invalid date') {
					delete data.date_published;
				}

				News
					.save(data)
					.then(function () {
						$ionicNavBarDelegate.back();
					}, function () {

					});
			};
		}
	]);
