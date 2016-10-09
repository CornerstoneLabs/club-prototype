angular
	.module('controllers.news-detail.controller', [])
	.controller('NewsDetailController', function($scope, $stateParams, News, $ionicNavBarDelegate) {
		$scope.article = News.get($stateParams.id);

		$scope.newsSaveClick = function () {
			var data = $scope.article;
			data.date_published = moment(data.date_published).format('YYYY-MM-DD');

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
	});
