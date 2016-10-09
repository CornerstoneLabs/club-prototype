angular
	.module('controllers.news-detail.controller', [])
	.controller('NewsDetailController', function($scope, $stateParams, News, $ionicNavBarDelegate) {
		$scope.article = News.get($stateParams.id);

		$scope.newsSaveClick = function () {
			News
				.save($scope.article)
				.then(function () {
					$ionicNavBarDelegate.back();
				}, function () {

				});
		};
	});
