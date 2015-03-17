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
        controller: 'Standings_Controller',
        controllerAs: 'sc'
      })
      .state('register', {
        url: '/register',
        templateUrl: 'register/register',
        controller: 'Register_Controller',
        controllerAs: 'rc'
      })
      .state('rules', {
        url: '/rules',
        templateUrl: 'rules/rules',
        controller: 'Rules_Controller',
        controllerAs: 'rc'
      })
      .state('payment', {
        url: '/payment',
        templateUrl: 'payment/payment',
        controller: 'Payment_Controller',
        controllerAs: 'pc'
      })
      ;

    // Handle undefined routes by going back to url (not state) '/'
    $urlRouterProvider.otherwise('/standings');
  }
})();
