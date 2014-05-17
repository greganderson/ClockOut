var app = angular.module('clockOut', []);


app.controller("Timer", function ($scope,$timeout) {
	$scope.time = 0;
    $scope.counter = 0;
	$scope.started = false;

    $scope.onTimeout = function() {
        $scope.counter -= .01;
		if ($scope.counter.toFixed(2) == 0) {
			$timeout.cancel(mytimeout);
			console.log("timer expired");
			alert("done");
		}
		else
			mytimeout = $timeout($scope.onTimeout,10);
    }

	$scope.start = function(time) {
		// Prevent user from starting more than once
		if ($scope.started)
			return;
		$scope.started = true;
		$scope.counter = (40.0 - time) * 60;
		var mytimeout = $timeout($scope.onTimeout,10);
	}
})
