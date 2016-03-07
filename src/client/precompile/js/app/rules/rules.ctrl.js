(function() {
  'use strict';
  // Controllers that are specific to this feature

  angular
    .module(`rules.controllers`, [])
    .controller(`Rules_Controller`, rulesController)
    ;

  /* ngInject */
  function rulesController($log, $scope, $rootScope, CONSTANTS, CacheService) {
    const vm = this; // eslint-disable-line

    $rootScope.$on(CONSTANTS.ONPOOLDATAREFRESHED, onPoolInfoRefreshed);

    vm.init = init;

    vm.init();

    function init() {
      vm.title = `Rules`; // Will quietly fail if i18n is not done loading.

      if (CacheService.get().pool) {
        vm.pool = CacheService.get().pool;
      }
    }

    function onPoolInfoRefreshed(e, pool) {
      vm.pool = pool;
    }
  }
})();
