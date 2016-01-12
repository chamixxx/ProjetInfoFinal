(function() {
    'use strict';

    angular
        .module('app.examples.authentication')
        .controller('ProfileController', ProfileController);

    /* @ngInject */
    function ProfileController($scope, $http ,$q, $cookies) {
        $scope.userMail = $cookies.get('userMail');
        console.log($scope.userMail);
        var vm = this;
        vm.settingsGroups = [{
            name: 'ADMIN.NOTIFICATIONS.ACCOUNT_SETTINGS',
            settings: [{
                title: 'ADMIN.NOTIFICATIONS.SHOW_LOCATION',
                icon: 'zmdi zmdi-pin',
                enabled: true
            },{
                title: 'ADMIN.NOTIFICATIONS.SHOW_AVATAR',
                icon: 'zmdi zmdi-face',
                enabled: false
            },{
                title: 'ADMIN.NOTIFICATIONS.SEND_NOTIFICATIONS',
                icon: 'zmdi zmdi-notifications-active',
                enabled: true
            }]
        },{
            name: 'ADMIN.NOTIFICATIONS.CHAT_SETTINGS',
            settings: [{
                title: 'ADMIN.NOTIFICATIONS.SHOW_USERNAME',
                icon: 'zmdi zmdi-account',
                enabled: true
            },{
                title: 'ADMIN.NOTIFICATIONS.SHOW_PROFILE',
                icon: 'zmdi zmdi-account-box',
                enabled: false
            },{
                title: 'ADMIN.NOTIFICATIONS.ALLOW_BACKUPS',
                icon: 'zmdi zmdi-cloud-upload',
                enabled: true
            }]
        }];

        $scope.commProfile = function(userMail) {
            console.log("commProfile user : ");
            console.log(userMail);
            var deferred = $q.defer();
            var req = {
                method: 'GET',
                url: '/authentication/profile',
                params: {"email":userMail}
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


        console.log("profileClick");
        var future = $scope.commProfile($scope.userMail);
        future.then(
            function(payload) {
                console.log("console.log(payload)");
                console.log(payload);


                vm.user = {
                    name: payload.name,
                    email: payload.email,
                    location: 'Sitia, Crete, Greece',
                    website: 'http://www.oxygenna.com',
                    twitter: 'oxygenna',
                    bio: 'We are a small creative web design agency \n who are passionate with our pixels.',
                    current: '',
                    password: payload.password,
                    confirm: payload.password
                };

            },
            function(errorPayload) {
                console.log('error'+errorPayload);
            }
        );






    }
})();