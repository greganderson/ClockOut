var app = angular.module('clockOut', []);


app.controller("Timer", function ($scope,$timeout) {
	$scope.time = 0;
	$scope.hours = 0;
	$scope.minutes = 0;
	$scope.seconds = 0;
    $scope.counter = 0;
	$scope.started = false;

    $scope.onTimeout = function() {
        $scope.counter -= .01;
		var total = $scope.counter / 60 / 60;
		$scope.hours = parseInt(total);
		total = (total - $scope.hours) * 60;
		$scope.minutes = parseInt(total);
		total = (total - $scope.minutes) * 60;
		$scope.seconds = total.toFixed(2);
		if ($scope.counter.toFixed(2) == 0) {
			$timeout.cancel(mytimeout);
			console.log("timer expired");
			document.getElementById("sound").play();
		}
		else
			mytimeout = $timeout($scope.onTimeout,10);
    }

	$scope.start = function(time) {
		// Prevent user from starting more than once
		if ($scope.started)
			return;
		$scope.started = true;
		$scope.counter = (40.0 - time) * 60 * 60;
		var mytimeout = $timeout($scope.onTimeout,10);
	}
})
