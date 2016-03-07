angular
  .module(`standings.controllers`, [])
  .controller(`Standings_Controller`, standingsController)
  ;

/* ngInject */
function standingsController($scope, $rootScope, CacheService, CONSTANTS) {
  const vm = this; // jshint ignore:line

  $rootScope.$on(CONSTANTS.ONPOOLDATAREFRESHING, onPoolInfoRefreshing);
  $rootScope.$on(CONSTANTS.ONPOOLDATAREFRESHED, onPoolInfoRefreshed);

  vm.init = init;

  vm.init();

  function onPoolInfoRefreshing(/* e , pool */) {
    vm.isRefreshing = true;
  }

  function onPoolInfoRefreshed(e, pool) {
    vm.pool = pool;
    vm.isRefreshing = false;
  }

  function init() {
    vm.isRefreshing = false;
    vm.title = `Standings`; // Will quietly fail if i18n is not done loading.

    if (CacheService.get().pool) {
      vm.pool = CacheService.get().pool;
    }
  }
}
