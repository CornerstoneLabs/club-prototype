angular
	.module('app.routes', [])
	.config([
		'$stateProvider',
		'$urlRouterProvider',
		'$httpProvider',
		function($stateProvider, $urlRouterProvider, $httpProvider) {
			$httpProvider.defaults.xsrfCookieName = 'csrftoken';
			$httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

			$stateProvider
				.state('app', {
					url: '/app',
					abstract: true,
					templateUrl: 'templates/menu.html',
					controller: 'AppCtrl'
				})
				.state('app.search', {
					url: '/search',
					views: {
						'menuContent': {
							templateUrl: 'templates/search.html'
						}
					}
				})
				.state('app.classes', {
					url: '/classes/',
					views: {
						'menuContent': {
							templateUrl: 'templates/classes.html',
							controller: 'ClassesController'
						}
					}
				})
				.state('app.classes-detail', {
					url: '/classes/:id',
					views: {
						'menuContent': {
							templateUrl: 'templates/classes-detail.html',
							controller: 'ClassesDetailController'
						}
					}
				})
				.state('app.news', {
					url: '/news/',
					views: {
						'menuContent': {
							templateUrl: 'templates/news.html',
							controller: 'NewsController'
						}
					}
				})
				.state('app.news-detail', {
					url: '/news/:id',
					views: {
						'menuContent': {
							templateUrl: 'templates/news-detail.html',
							controller: 'NewsDetailController'
						}
					}
				})
				.state('app.news-detail-edit', {
					url: '/news/:id/edit',
					views: {
						'menuContent': {
							templateUrl: 'templates/forms/news/news-edit.html',
							controller: 'NewsDetailController'
						}
					}
				});

				// if none of the above states are matched, use this as the fallback
			$urlRouterProvider.otherwise('/app/news/');
		}
	]);
