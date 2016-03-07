angular
  .module(`app.controllers`, [])
  .controller(`Master_Controller`, masterController)
  ;

/* @ngInject */
function masterController($log, $location, $rootScope, $mdSidenav, ESPNService) {
  var vm = this; // eslint-disable-line

  vm.toggleSidenav = toggleSidenav;
  vm.init = init;

  vm.init();

  function init() {
    vm.subNavItems = getSubNavItems();
    vm.onRefreshClick = onRefreshClick;

    ESPNService.refresh();
  }

  function toggleSidenav(menuId) {
    $mdSidenav(menuId).toggle();
  }

  function getSubNavItems() {
    return [
      {id: `standings`, label: `Standings`},
      {id: `register`, label: `How to Enter`},
      {id: `rules`, label: `Rules`},
      {id: `payment`, label: `Payment`}
    ];
  }

  function onRefreshClick() {
    ESPNService.refresh();
  }
}
