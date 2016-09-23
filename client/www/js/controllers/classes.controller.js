angular
	.module('controllers.classes.controller', [])
	.controller('ClassesController', function($scope, Classes, ApplicationSettings) {
		function transformDays (classes, myclasses) {
			var days = {};
			var yourDays = {};
			var dayName = [
				'Monday',
				'Tuesday',
				'Wednesday',
				'Thursday',
				'Friday',
				'Saturday',
				'Sunday'
			];

			$scope.userInfo = {
				id: 1
			};

			classes
				.forEach(function (classItem) {
					function addTo(classItem, days) {
						if (angular.isUndefined(days['k' + classItem.day])) {
							days['k' + classItem.day] = {
								name: dayName[classItem.day]
							};
						}

						if (angular.isUndefined(days['k' + classItem.day].classes)) {
							days['k' + classItem.day].classes = [];
						}

						days['k' + classItem.day].classes.push(classItem);
					}

					addTo(classItem, days);

					// now do yourdays
					var currentUserHref = ApplicationSettings.LOCAL_URL + '/users/' + $scope.userInfo.id + '/';
					if (classItem.participants.indexOf(currentUserHref) !== -1) {
						addTo(classItem, yourDays);
					}
				});

			return {
				all: days,
				your: yourDays
			};
		}

		function reload ($scope) {
			$scope.classes = Classes.all();
			$scope.days = transformDays($scope.classes);
		}

		$scope.$watchCollection('classes', function () {
			$scope.days = transformDays($scope.classes);
		});

		$scope.$on('$ionicView.enter', function() {
			reload($scope);
		});

		$scope.tab = 'all';

		reload($scope);
	});
