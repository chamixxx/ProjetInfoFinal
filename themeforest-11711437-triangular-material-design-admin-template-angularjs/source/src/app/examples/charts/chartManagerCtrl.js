angular.module('app').controller('chartManager',chartManagerFnt);

chartManagerFnt.$inject=['$scope', '$log', '$q', '$http', '$cookies'];

function chartManagerFnt($scope, $log, $q, $http, $cookies) {
	$scope.chartsSmall = [];
	$scope.chartsBig = [];
	$scope.dashboard = {
		'chartsSmall':$scope.chartsSmall,
		'chartsBig':$scope.chartsBig
	};

	$scope.showAddMenu = false;
	$scope.chartOption = {};


	var dashboardFuture = getDasboard();
	dashboardFuture.then(
            function(payload) {
            	$log.info('getDasboard :',payload); 
            	angular.forEach(payload.dashboard.chartsSmall , function(value) {
                  this.push(value);
                }, $scope.chartsSmall);

                angular.forEach(payload.dashboard.chartsBig , function(value) {
                  this.push(value);
                }, $scope.chartsBig);
                $log.info('Big :',$scope.chartsBig); 
            },
            function(errorPayload){
                $log.error('errorPayload',errorPayload);             
            }
        );
	
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

    $scope.saveDashboard = function() {
    	
    	var futureSave = postDashboard();
    	futureSave.then(
            function(payload) {
            	alert("Saved");
            	$log.info('Save :',payload);   			
            },
            function(errorPayload){
                $log.error('errorPayload',errorPayload);             
            }
        );
    } 

    function postDashboard() {
    	var deferred = $q.defer();
		var req = {
 				method: 'POST',
 				url: '/dashboard/saveDashboard',
 				headers: {
   					'Content-Type': 'application/json'
 				},
 				data: {
 					'dashboard':$scope.dashboard,
 					'email':$cookies.get('userMail')
 				}
		}

		$http(req).success(function(data, status, headers, config) {
			 	deferred.resolve(data);
			}).
			error(function(data, status, headers, config) {
				deferred.reject(status);
			});
		return deferred.promise;
    }

    function getDasboard() {
    	var req = {
	    		url: '/dashboard/getDashboard', 
			    method: "GET",
			    params: {
			    	"email":$cookies.get('userMail')
				}
 			}
		var deferred = $q.defer();
		$http(req).success(function(data, status, headers, config) {
			 	deferred.resolve(data)
			}).
			error(function(data, status, headers, config) {
				deferred.reject(status);
			});
        return deferred.promise;
	};
    
}