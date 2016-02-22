(function() {
  'use strict';
  angular
    .module('app.config', [])
    .config(setupTheme)
    .run(setupStateChangeEvents)
    .run(initI18n)
    ;

  /* ngInject */
  function setupTheme($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('red')
      .accentPalette('blue');

    // $mdThemingProvider.theme('darkTheme')
    //   .primaryPalette('yellow')
  }

  /* ngInject */
  function setupStateChangeEvents($rootScope, $mdSidenav) {
    $rootScope.$on('$stateChangeSuccess', onStateChangeSuccess);
    $rootScope.$on('$stateChangeError', onStateChangeError);
    $rootScope.$on('$stateNotFound', onStateNotFound);

    function onStateChangeSuccess(event, toState, toParams, fromState, fromParams) {
      $('body').removeAttr('unresolved');
      $mdSidenav('left').close();
    }

    function onStateChangeError(event, toState, toParams, fromState, fromParams, error) {
      // Handle error
    }

    function onStateNotFound(event, unfoundState, fromState, fromParams) {
      // Handle not found
    }
  }

  /* @ngInject */
  function initI18n($rootScope) {
    var thirtyMin = 1000 * 60 * 30;
    var isDev = (window.__env || '').indexOf('prod') === -1;
    i18n.init({
      preload: window.__lang,
      resGetPath: '/statics/locales/__lng__/__ns__.json',
      resPostPath: '/locales/add/__lng__/__ns__',
      detectLngQS: 'lang',
      lowerCaseLng: true,
      fallbackLng: isDev ? 'xx' : 'en',
      useLocalStorage: true,
      localStorageExpirationTime: isDev ? (1000 * 5) : thirtyMin,
      debug: isDev,
      sendMissing: true
    }, oni18nInitComplete);

    i18n.momentLng = function() {
      switch(i18n.lng().toLowerCase()) {
        case 'en-us':
        case 'xx-xx':
          return 'en';
        case 'es-mx':
          return 'es';
        case 'fr-ca':
          return 'fr';
        case 'zh-cn':
          return 'zh-cn';
        case 'ja-jp':
          return 'ja';
        default:
          return i18n.lng().toLowerCase();
      }
    };

    moment.locale(i18n.momentLng());

    function oni18nInitComplete() {
      // Broadcast this event so other modules can internationalize text after loading is complete.
      $rootScope.$broadcast('i18nInitComplete', {});
    }
  }
})();
