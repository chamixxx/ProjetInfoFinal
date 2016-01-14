angular.module('app').controller('chartManager',chartManagerFnt);

chartManagerFnt.$inject=['$scope', '$log', '$q', '$http'];

function chartManagerFnt($scope, $log, $q, $http) {
	$scope.chartsSmall = [];
	$scope.chartsBig = [];

	$scope.showAddMenu = false;
	$scope.chartOption = {};

	
	$scope.addChart = function() {
		$scope.showAddMenu = true;
	};

	$scope.cancel = function() {
		$scope.showAddMenu = false;
		
	};

	$scope.add = function() {
		$scope.showAddMenu = false;

		var labels = [];
        var series = [];
        var options = {};
        var data = [];

		var future = getData($scope.chartOption.city);
        future.then(
            function(payload) {
                $log.info('meteo',payload);
                var hours = [];
                var row = [];
                
                angular.forEach(payload.fcst_day_0.hourly_data , function(value, key) {
                  this.push(key);
                  row.push(value.TMP2m);
                }, hours);


                labels = hours;
                series = ['Series A'];
                options = {
                    datasetFill: false
                };

                data.push(row);

                var option = {
					"city":$scope.chartOption.city,
					"labels":labels,
					"series":series,
					"options":options,
					"data":data,
					"type":$scope.chartOption.type,
					"size":$scope.chartOption.size
				}

				if ($scope.chartOption.size == "Small") {
					$scope.chartsSmall.push(option);
				}
				if ($scope.chartOption.size == "Big") {
					$scope.chartsBig.push(option);				}
            },
            function(errorPayload){
                $log.info('errorPayload',errorPayload)              
            }
        );
		console.log($scope.chartsSmall);
		console.log($scope.chartsBig);
	};

	function getData(city) { 
        var deferred = $q.defer();
        $http.get('http://www.prevision-meteo.ch/services/json/'+city).
            success(function(data, status, headers, config) {
                deferred.resolve(data)
            }).
            error(function(data, status, headers, config) {
                deferred.reject(status);
            });
        return deferred.promise;
    };
}