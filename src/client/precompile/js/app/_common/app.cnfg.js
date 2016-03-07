angular
  .module(`app.config`, [])
  .config(setupTheme)
  .run(setupStateChangeEvents)
  ;

/* ngInject */
function setupTheme($mdThemingProvider) {
  $mdThemingProvider
    .theme(`default`)
    .primaryPalette(`red`)
    .accentPalette(`blue`)
    ;
}

/* ngInject */
function setupStateChangeEvents($rootScope, $mdSidenav) {
  $rootScope.$on(`$stateChangeSuccess`, onStateChangeSuccess);

  function onStateChangeSuccess(/* event, toState, toParams, fromState, fromParams */) {
    $(`body`).removeAttr(`unresolved`); ``;
    $mdSidenav(`left`).close();
  }
}
