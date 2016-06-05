(function () {
    'use strict';

    angular.module('App', []);
    angular
        .module('App')
        .config([ '$stateProvider',
            '$locationProvider',
            '$urlRouterProvider',
            'RestangularProvider',
            '$base64',
            '$httpProvider',
            'apiUrl',
            '$provide',
            function ($stateProvider, $locationProvider, $urlRouterProvider, RestangularProvider, $base64, $httpProvider, apiUrl, $provide) {

            console.log('test');

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
