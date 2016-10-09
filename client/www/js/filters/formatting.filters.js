angular
	.module('filters.formatting', [])
	.filter('numberFixedLen', function () {
		return function (n, len) {
			var num = parseInt(n, 10);
			len = parseInt(len, 10);
			if (isNaN(num) || isNaN(len)) {
				return n;
			}
			num = ''+num;
			while (num.length < len) {
				num = '0'+num;
			}
			return num;
		};
	})
	.directive('focusMe', function($timeout) {
		return {
			link: function(scope, element, attrs) {
				$timeout(function() {
					element[0].focus();
				}, 350);
			}
		};
	});
