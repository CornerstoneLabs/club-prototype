angular
	.module('controllers.news.controller', [])
	.controller('NewsController', function($scope, $ionicListDelegate, $rootScope, News, Brand) {
		$scope.news = News.all();
		$scope.brand = Brand.get();

		$scope.$on('$ionicView.enter', function() {
			$scope.news = News.all();
		});

		$scope.deleteClick = function (article) {
			News.remove(article);
		};

		$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState){
			$ionicListDelegate.closeOptionButtons();
		});

		function onRefreshComplete () {
			$scope.$broadcast('scroll.refreshComplete');
		}

		$scope.doRefresh = function() {
			News.refresh(onRefreshComplete);
		};

	});
