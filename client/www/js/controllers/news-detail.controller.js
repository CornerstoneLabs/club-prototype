angular
	.module('controllers.news-detail.controller', [])
	.controller('NewsDetailController', function($scope, $stateParams, News) {
		$scope.article = News.get($stateParams.id);
	});
