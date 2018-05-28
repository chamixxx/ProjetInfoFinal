(function() {
    'use strict';

    angular
        .module('app.examples.authentication')
        .controller('SignupController', SignupController);

    /* @ngInject */
    function SignupController($scope, $state, $mdToast, $http, $filter, $q, triSettings, API_CONFIG) {
        var vm = this;
        vm.triSettings = triSettings;
        vm.signupClick = signupClick;
        vm.user = {
            name: '',
            email: '',
            password: '',
            confirm: ''
        };

        $scope.user = vm.user;

        console.log(API_CONFIG);

        ////////////////

        function signupClick() {
            var future = $scope.commSignup($scope.user);
            future.then(
                function(payload) {
                    console.log("console.log(payload)");
                    console.log(payload);
                    $mdToast.show(
                        $mdToast.simple()
                        .content($filter('translate')('SIGNUP.MESSAGES.CONFIRM_SENT') + ' ' + payload.email)
                        .position('bottom right')
                        .action($filter('translate')('SIGNUP.MESSAGES.LOGIN_NOW'))
                        .highlightAction(true)
                        .hideDelay(0)
                    ).then(function() {
                        $state.go('public.auth.login');
                    });
                },
                function(errorPayload) {
                    console.log('error'+errorPayload);
                    $mdToast.show(
                        $mdToast.simple()
                        .content($filter('translate')('SIGNUP.MESSAGES.NO_SIGNUP'))
                        .position('bottom right')
                        .hideDelay(5000)
                    );
                }
            );
        }
        
        $scope.commSignup = function(user) {
            var deferred = $q.defer();
            var req = {
                method: 'POST',
                url: '/authentication/signup',
                data: user
            }
            $http(req).success(function(data, status, headers, config) {
                    console.log("console.log(data)");
                    console.log(data);
                    deferred.resolve(data);
                }).
                error(function(data, status, headers, config) {
                    deferred.reject(status);
                });
        return deferred.promise;
        };

    }
})();