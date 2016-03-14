angular
  .module(`standings.controllers`, [])
  .controller(`Standings_Controller`, standingsController)
  ;

/* ngInject */
function standingsController($scope, $rootScope, $timeout, CacheService, CONSTANTS) {
  const vm = this; // jshint ignore:line

  $rootScope.$on(CONSTANTS.ONPOOLDATAREFRESHING, onPoolInfoRefreshing);
  $rootScope.$on(CONSTANTS.ONPOOLDATAREFRESHED, onPoolInfoRefreshed);

  vm.init = init;

  vm.init();

  function onPoolInfoRefreshing(/* e , pool */) {
    $timeout(() => vm.isRefreshing = true);
  }

  function onPoolInfoRefreshed(e, pool) {
    $timeout(() => {
      vm.pool = addDisplayLabel(pool);
      vm.isRefreshing = false;
    });
  }

  function init() {
    vm.isRefreshing = true;
    vm.title = `Standings`; // Will quietly fail if i18n is not done loading.

    if (CacheService.get().pool) {
      vm.pool = addDisplayLabel(CacheService.get().pool);
      vm.isRefreshing = false;
    }
  }

  function addDisplayLabel(pool) {
    if (!pool || !pool.entries) {
      return;
    }

    pool.entries.forEach((entry) => {
      entry.owner = (entry.paid ? `${entry.paid.firstName} ${entry.paid.lastName}` : entry.userName) || `Unknown`;
    });

    return pool;
  }
}
