(function () {
    'use strict';

    angular.module('App', [
        'ui.router',
        'ngMessages',
        'ui.bootstrap',
        'ngSanitize',

        'base64',
        'ngLocale',
        'ngCookies',
        'ui.tree',
        'textAngular',
        'angularFileUpload',
        'colorpicker.module',
        'ui.select',
        'ui.timepicker',
        'angular-svg-round-progress',
        'perfect_scrollbar',
        'infinite-scroll',
        'datatables',
        'datatables.bootstrap',
        'chart.js',
        'lightGrid', 'lightGridDataProviders', 'lightGridControls',
        'angular.filter',

        /* shared*/
        'App.common',
        'authorization',

        /* views */
        'login',
        'logged',
        //'dashboard',
        'projects',
        'projectCards',
        'tasks',
        'calendar',
        'company',
        'finance',
        'contacts',
        'mail',
        'report',
        'programs',
        'sandbox',
        'user',
        'planning',
        'admin',
        'RevealModule',
        'bugreports',
        'passwordReset'
    ]);


    angular.module('infinite-scroll').value('THROTTLE_MILLISECONDS', 500);

    angular
        .module('App')
        .config(['$stateProvider', '$locationProvider', '$urlRouterProvider', 'RestangularProvider', '$base64', '$httpProvider', 'apiUrl', '$provide', function ($stateProvider, $locationProvider, $urlRouterProvider, RestangularProvider, $base64, $httpProvider, apiUrl, $provide) {

            $httpProvider.useApplyAsync(true);
            //$locationProvider.html5Mode(true);

            RestangularProvider.setBaseUrl(apiUrl);
            RestangularProvider.setDefaultHttpFields({cache: true});
            RestangularProvider.setDefaultHttpFields({withCredentials: true});


            //  textAngular config
            $provide.decorator('taOptions', ['taOptions', function (taOptions) {
                // $delegate is the taOptions we are decorating
                // here we override the default toolbars and classes specified in taOptions.
                taOptions.toolbar = [
                    ['bold', 'italics', 'underline']
                ];

                return taOptions;
            }]);

            $urlRouterProvider.otherwise("/");

            moment.locale('pl');

            $stateProvider
                .state('default', {
                    url: '/home',
                    onEnter: ['$timeout', '$state', function ($timeout, $state) {
                        $timeout(function () {
                            $state.go('logged.company-search-all').catch(function(){
                                $state.go('logged.taskSearchAll');
                            });
                        }, 10);
                    }]
                })
                //  password reset form
                .state('passwordReset', {
                    url: '/pswdreset/:token'
                })
                .state('logged.error', {
                    url: '/error',
                    templateUrl: 'js/errors/error.html'
                });


        }]);

    //date format in app
    angular
        .module('App')
        .constant('dateFormat', 'dd.MM.yyyy');

}());
