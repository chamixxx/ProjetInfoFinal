(function() {
    'use strict';

    angular
        .module('app.examples.dashboards')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($translatePartialLoaderProvider, $stateProvider, triMenuProvider) {
        $translatePartialLoaderProvider.addPart('app/examples/dashboards');

        $stateProvider
        .state('triangular.admin-default.dashboard-analytics', {
            url: '/dashboards/analytics',
            templateUrl: 'app/examples/dashboards/analytics/dashboard-analytics.tmpl.html',
            controller: 'DashboardAnalyticsController',
            controllerAs: 'vm'
        })
        .state('triangular.admin-default.dashboard-server', {
            url: '/dashboards/server',
            templateUrl: 'app/examples/dashboards/server/dashboard-server.tmpl.html',
            controller: 'DashboardServerController',
            controllerAs: 'vm'
        })
        .state('triangular.admin-default.dashboard-social', {
            url: '/dashboards/social',
            templateUrl: 'app/examples/dashboards/social/dashboard-social.tmpl.html',
            controller: 'DashboardSocialController',
            controllerAs: 'vm'
        });

        triMenuProvider.addMenu({
            name: 'MENU.DASHBOARDS.DASHBOARDS',
            icon: 'zmdi zmdi-home',
            type: 'dropdown',
            priority: 1.1,
            children: [{
                name: 'MENU.DASHBOARDS.ANALYTICS',
                state: 'triangular.admin-default.dashboard-analytics',
                type: 'link'
            },{
                name: 'MENU.DASHBOARDS.SERVER',
                state: 'triangular.admin-default.dashboard-server',
                type: 'link'
            },{
                name: 'MENU.DASHBOARDS.SOCIAL',
                state: 'triangular.admin-default.dashboard-social',
                type: 'link'
            }]
        });

    }
})();