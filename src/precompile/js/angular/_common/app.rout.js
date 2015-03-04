(function() {
  'use strict';

  angular
    .module('app.routes', ['ui.router'])
    .config(defineRoutes);

  /* @ngInject */
  function defineRoutes($locationProvider, $stateProvider, $urlRouterProvider) {
    // No hashbangs, just straight history API manipulation
    $locationProvider.html5Mode(true);

    $stateProvider
      .state('standings', {
        url: '/',
        templateUrl: 'standings/standings',
        controller: 'Standings_Controller as sc'
      })
      .state('register', {
        url: '/',
        templateUrl: 'register/register',
        controller: 'Register_Controller as rc'
      })
      .state('rules', {
        url: '/rules',
        templateUrl: 'rules/rules',
        controller: 'Rules_Controller as rc'
      })
      .state('payment', {
        url: '/payment',
        templateUrl: 'payment/payment',
        controller: 'Payment_Controller as pc'
      })
      .state('info', {
        url: '/info',
        templateUrl: 'info/info',
        controller: 'Info_Controller as ic'
      });

    // Handle undefined routes by going back to url (not state) '/'
    $urlRouterProvider.otherwise('/');
  }
})();
