angular
	.module('controllers.news.controller', [])
	.controller('NewsController', function($scope, News, Brand) {
		$scope.news = News.all();
		$scope.brand = Brand.get();

		$scope.$on('$ionicView.enter', function() {
			$scope.news = News.all();
		});
	});
