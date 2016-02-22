(function() {
  'use strict';
  // Controllers that are specific to this feature

  angular
    .module('standings.controllers', [])
    .controller('Standings_Controller', standingsController)
    ;

  /* ngInject */
  function standingsController($scope, $rootScope, CacheService, CONSTANTS, ESPNService) {
    var vm = this; // jshint ignore:line

    $rootScope.$on(CONSTANTS.ONPOOLDATAREFRESHING, onPoolInfoRefreshing);
    $rootScope.$on(CONSTANTS.ONPOOLDATAREFRESHED, onPoolInfoRefreshed);
    $rootScope.$on('i18nInitComplete', oni18nInitComplete); // Listen for i18n i18nInitComplete event before trying to translate

    vm.init = init;

    vm.init();

    function oni18nInitComplete() {
      $scope.$apply(function() {
        vm.title = i18n.t('standings.pageTitle', 'Standings');
      });
    }

    function onPoolInfoRefreshing(e, pool) {
      vm.isRefreshing = true;
    }

    function onPoolInfoRefreshed(e, pool) {
      vm.pool = pool;
      vm.isRefreshing = false;
    }

    function init() {
      vm.isRefreshing = false;
      vm.title = i18n.t('standings.pageTitle', 'Standings'); // Will quietly fail if i18n is not done loading.

      if(CacheService.get().pool) {
        vm.pool = CacheService.get().pool;
      }
    }
  }
})();
