var clockoutApp = angular.module('clockOut', []);

clockoutApp.controller('ClockCtrl', function ($scope,$timeout) {
	$scope.time = 0;
	$scope.hoursRemaining = 0;
	$scope.minutesRemaining = 0;
	$scope.secondsRemaining = 0;
    $scope.counter = 0;
	$scope.started = false;
	$scope.d = Date.now();
	$scope.dayTime = ['AM', 'PM'];
	$scope.timeOfDay = $scope.dayTime[1];
	$scope.ampm = 'null';

    $scope.onTimeout = function() {
        $scope.counter -= .01;
		var total = $scope.counter / 60 / 60;
		$scope.hoursRemaining = parseInt(total);
		total = (total - $scope.hoursRemaining) * 60;
		$scope.minutesRemaining = parseInt(total);
		total = (total - $scope.minutesRemaining) * 60;
		$scope.secondsRemaining = total.toFixed(2);

		if ($scope.counter.toFixed(2) == 300) {
			document.getElementById("five_minutes").play();
		}
		if ($scope.counter.toFixed(2) == 60) {
			document.getElementById("one_minute").play();
		}
		if ($scope.counter.toFixed(2) == 0) {
			$timeout.cancel(mytimeout);
			document.getElementById("warning").play();
		}
		else
			mytimeout = $timeout($scope.onTimeout,10);
    }

	$scope.start = function(time) {
		// Prevent user from starting more than once
		if ($scope.started)
			return;
		$scope.started = true;
		// - 30 at the end for the buffer
		$scope.counter = (40.0 - time) * 60 * 60 - 30;
		var mytimeout = $timeout($scope.onTimeout,10);
	}





	/**************************** UMAIR START ************************/


	$scope.calculate = function (_timeIn, _hours) {
		if(_timeIn, _hours) {
			var timeArray, hour, minutes, totalTime, timeLeft, hoursWorked; 
			
			timeLeft = 40 - _hours;
			
			timeArray = _timeIn.split(":");
			
			hour = timeArray[0];
			minutes = timeArray[1];
			
			$scope.message = 'You should clock out at: ' + calculateTime(timeLeft, hour, minutes) + ' ' + this.ampm;
		}
	};
	
	var calculateTime = function(timeLeft, hour, minutes) {
	
		// Flag to check if timeLeft is a float
		var check = timeLeft.toString().indexOf(".");

		if(check === -1) {
			hour = +timeLeft + +hour;
		
			determineMeridiem(hour);

			hour = hour % 12;

			if (hour == 0)
				hour = 12;
			
			return (hour + ':' + minutes);
		}
		else {
			var accumulatedTimeArray, hrs, tempMin,  min; 

			accumulatedTimeArray = timeLeft.toString().split('.');
			
			hrs = (accumulatedTimeArray[0]);
			tempMin = accumulatedTimeArray[1];

			tempMin = "0." + tempMin;

			min = parseFloat(tempMin);

			min = (min * 60);

			hour = +hour + +hrs; 
			minutes = (+minutes + +min);

			if(minutes > 59) {
				hour++;
				minutes = +minutes - 60;
			}

			if(minutes < 10){
				minutes = "0" + minutes;
			}
			
			determineMeridiem(hour);
			
			hour = hour % 12;

			if (hour == 0) {
				hour = 12;
			}

			return (hour + ':' + parseInt(minutes)); 
		}
	
	};
	
	/* Determines whether time has changed from
	 * AM to PM and vice versa.
	 */
	var determineMeridiem = function(hour) {
			
			if($scope.timeOfDay == 'AM') {
				if(hour > 11)
					$scope.ampm = 'PM';
				else
					$scope.ampm = 'AM';
			}
			else {
				if(hour > 11)
					$scope.ampm = 'AM';
				else
					$scope.ampm = 'PM';
			}
	};
	
	$scope.display = function() {
		return this.message;	
	};
});
