angular
  .module(`register.controllers`, [])
  .controller(`Register_Controller`, registerController)
  ;

/* ngInject */
function registerController($log, $scope, $rootScope, CONSTANTS, CacheService) {
  const vm = this; // eslint-disable-line

  $rootScope.$on(CONSTANTS.ONPOOLDATAREFRESHED, onPoolInfoRefreshed);

  vm.init = init;

  vm.init();

  function init() {
    vm.title = `How to Enter`;

    if (CacheService.get().pool) {
      vm.pool = CacheService.get().pool;
    }
  }

  function onPoolInfoRefreshed(e, pool) {
    vm.pool = pool;
  }
}
