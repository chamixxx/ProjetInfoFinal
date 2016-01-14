(function() {
    'use strict';

    angular
        .module('app.examples.authentication')
        .controller('LoginController', LoginController);

    /* @ngInject */
    function LoginController($scope, $http ,$q ,$mdToast, $state, $filter, $cookies, triSettings) {
        var vm = this;
        vm.loginClick = loginClick;
        vm.socialLogins = [{
            icon: 'fa fa-twitter',
            color: '#5bc0de',
            url: '#'
        },{
            icon: 'fa fa-facebook',
            color: '#337ab7',
            url: '#'
        },{
            icon: 'fa fa-google-plus',
            color: '#e05d6f',
            url: '#'
        },{
            icon: 'fa fa-linkedin',
            color: '#337ab7',
            url: '#'
        }];
        vm.triSettings = triSettings;
        // create blank user variable for login form
        vm.user = {
            email: '',
            password: ''
        };

        $scope.user = vm.user;
    
        ////////////////

        function loginClick() {
            console.log("loginClick");
            var future = $scope.commLogin($scope.user);
            future.then(
                function(payload) {
                    console.log("console.log(payload)");
                    console.log(payload);
                    $cookies.put('userMail',payload.email);
                    $cookies.put('userName',payload.name);
                    $state.go('triangular.admin-default.dashboard-analytics');
                },
                function(errorPayload) {
                    console.log('error'+errorPayload);
                    $mdToast.show(
                        $mdToast.simple()
                        .content($filter('translate')('LOGIN.MESSAGES.ACCESS_DENIED'))
                        .position('bottom right')
                        .hideDelay(5000)
                    );
                }
            );
        }

        $scope.commLogin = function(user) {
            console.log("commLogin user : ");
            console.log(user);
            var deferred = $q.defer();
            var req = {
                method: 'GET',
                url: '/authentication/login',
                params: user
            }
            $http(req).success(function(data, status, headers, config) {
                console.log("console.log(data)");
                    console.log(data);
                    deferred.resolve(data);
                }).
                error(function(data, status, headers, config) {
                    console.log("deferred.reject");
                    deferred.reject(status);
                });
            return deferred.promise;
        };

    } 

})();