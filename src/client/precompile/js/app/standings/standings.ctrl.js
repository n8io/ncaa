angular
  .module(`standings.controllers`, [])
  .controller(`Standings_Controller`, standingsController)
  ;

/* ngInject */
function standingsController($scope, $rootScope, $timeout, $interval, $sce, $mdMedia, CacheService, CONSTANTS) {
  const vm = this; // jshint ignore:line

  $rootScope.$on(CONSTANTS.ONPOOLDATAREFRESHING, onPoolInfoRefreshing);
  $rootScope.$on(CONSTANTS.ONPOOLDATAREFRESHED, onPoolInfoRefreshed);

  vm.parseEntryName = parseEntryName;
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
    vm.$mdMedia = $mdMedia;
    vm.isRefreshing = true;
    vm.countdown = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      total: 1
    };
    vm.title = `Standings`; // Will quietly fail if i18n is not done loading.

    if (CacheService.get().pool) {
      vm.pool = addDisplayLabel(CacheService.get().pool);
      vm.isRefreshing = false;
    }

    startCountdownInterval();
  }

  function startCountdownInterval() {
    const start = moment(__startTime); // eslint-disable-line
    const now = moment();

    if (start < now) {
      vm.countdown.total = 0;

      return;
    }

    ticToc();
    $interval(ticToc, 1000);
  }

  function ticToc() {
    const start = moment(__startTime); // eslint-disable-line
    const tick = moment();
    const days = moment(start).diff(tick, `days`);
    const hours = moment(start).diff(tick, `hours`) % 24;
    const minutes = moment(start).diff(tick, `minutes`) % 60;
    const seconds = moment(start).diff(tick, `seconds`) % 60;

    vm.countdown.days = days;
    vm.countdown.hours = hours;
    vm.countdown.minutes = minutes;
    vm.countdown.seconds = seconds;
    vm.countdown.total = moment(start).diff(tick, `milliseconds`);
  }

  function parseEntryName(name) {
    return $sce.trustAsHtml(name);
  }

  function addDisplayLabel(pool) {
    if (!pool || !pool.entries) {
      return;
    }

    pool.entries.forEach((entry) => {
      entry.owner = entry.userName;
      entry.financier = (entry.paid ? `${entry.paid.firstName} ${entry.paid.lastName} | ${entry.userName}` : ``) || `${entry.userName}`;
    });

    return pool;
  }
}
