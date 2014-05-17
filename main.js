var app = angular.module('clockOut', []);

app.controller("Test", function($scope) {
	$scope.testFunction = function () {
		alert("Hey it worked!");
	}
})

app.directive("test", function() {
	return function(scope, element, attrs) {
		element.bind("click", function() {
			scope.$apply(attrs.test);
		})
	}
})
