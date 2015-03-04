(function() {
  'use strict';

  angular
    .module('app.controllers', [])
    .controller('Master_Controller', masterController)
    ;

  /* @ngInject */
  function masterController($log, $location, $mdSidenav, $mdThemingProvider) {
    var vm = this; // jshint ignore:line

    vm.toggleSidenav = toggleSidenav;
    vm.init = init;

    vm.init();

    function init() {
      $mdThemingProvider.theme('default')
        .primaryPalette('light-green')
        .accentPalette('green');

      vm.i18n = {
        currentLanguage: _.find(window.__langs, {id: window.__lang}),
        languages: window.__langs
      };

      vm.subNavItems = getSubNavItems();
      vm.selectedSubNavItem = vm.subNavItems.length ? vm.subNavItems[0] : null;

      $log.debug('Controller loaded: Master_Controller');
    }

    function toggleSidenav(menuId) {
      $mdSidenav(menuId).toggle();
    }

    function getSubNavItems() {
      return [
        {id: 0, label: 'Standings'},
        {id: 1, label: 'How to Enter'},
        {id: 2, label: 'Rules'},
        {id: 3, label: 'Payment'},
        {id: 4, label: 'Group Information'}
      ];
    }
  }
})();
