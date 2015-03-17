(function() {
  'use strict';
  // Controllers that are specific to this feature

  angular
    .module('payment.controllers', [])
    .controller('Payment_Controller', paymentController)
    ;

  /* ngInject */
  function paymentController($log, $scope, $rootScope, CONSTANTS, CacheService) {
    var vm = this; // jshint ignore:line

    $rootScope.$on(CONSTANTS.ONPOOLDATAREFRESHED, onPoolInfoRefreshed);
    $rootScope.$on('i18nInitComplete', oni18nInitComplete); // Listen for i18n i18nInitComplete event before trying to translate

    vm.init = init;

    vm.init();

    function oni18nInitComplete() {
      $scope.$apply(function() {
        vm.title = i18n.t('payment.pageTitle', {defaultValue: 'Payment Details'});
      });
    }

    function init() {
      vm.title = i18n.t('payment.pageTitle', {defaultValue: 'Payment Details'}); // Will quietly fail if i18n is not done loading.

      if(CacheService.get().pool) {
        vm.pool = CacheService.get().pool;
      }
    }

    function onPoolInfoRefreshed(e, pool) {
      vm.pool = pool;
    }
  }
})();
