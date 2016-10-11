angular
	.module('app.run', [])
	.run(function($ionicPlatform, ApplicationSettings, $rootScope, $window) {
		$ionicPlatform.ready(function() {
			// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
			// for form inputs)
			if (window.cordova && window.cordova.plugins.Keyboard) {
				$window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
				$window.cordova.plugins.Keyboard.disableScroll(true);

			}
			if (window.StatusBar) {
				// org.apache.cordova.statusbar required
				$window.StatusBar.styleDefault();
			}

			$rootScope.ApplicationSettings = ApplicationSettings;
		});
	});
