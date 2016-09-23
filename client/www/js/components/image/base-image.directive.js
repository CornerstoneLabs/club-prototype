angular
	.module('components.base-image', [])
	.directive('baseImage', [
		'ApplicationSettings',
			function baseImage (ApplicationSettings) {
			return {
				restrict: 'AE',
				scope: {
					src: '@'
				},
				templateUrl: 'templates/components/image-base.html',
				link: function (scope, element, attr) {
					scope.show = false;
					scope.backgroundImage = {};

					function getUrl () {
						 scope.targetUrl = ApplicationSettings.SERVER_URL + scope.src;

						 return scope.targetUrl;
					}

					function imageLoaded () {
						scope.$evalAsync(function () {
							scope.backgroundImage = {
								'background-image': 'url("' + scope.targetUrl + '");'
							};
							scope.show = true;
						});
					}

					function onChange () {
						if (scope.src === '') {
							return;
						}

						var image = new Image();
						image.src = getUrl();
						image.onload = imageLoaded;
					}

					scope.$watch('src', onChange);
				}
			};
		}
	])
