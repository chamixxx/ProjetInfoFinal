(function() {
    'use strict';

    angular
        .module('app.examples.authentication')
        .controller('SignupController', SignupController);

    /* @ngInject */
    function SignupController($scope, $state, $mdToast, $http, $filter, triSettings, API_CONFIG) {
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
            $http({
                method: 'POST',
                url: '/authentication/signup',
                data: $scope.user
            }).
            success(function(data) {
                $mdToast.show(
                    $mdToast.simple()
                    .content($filter('translate')('SIGNUP.MESSAGES.CONFIRM_SENT') + ' ' + data.email)
                    .position('bottom right')
                    .action($filter('translate')('SIGNUP.MESSAGES.LOGIN_NOW'))
                    .highlightAction(true)
                    .hideDelay(0)
                ).then(function() {
                    $state.go('public.auth.login');
                });
            }).
            error(function() {
                $mdToast.show(
                    $mdToast.simple()
                    .content($filter('translate')('SIGNUP.MESSAGES.NO_SIGNUP'))
                    .position('bottom right')
                    .hideDelay(5000)
                );
            });
        }
    }
})();