(function() {
  'use strict';

  angular
    .module('app.controllers', [])
    .controller('Master_Controller', masterController)
    ;

  /* @ngInject */
  function masterController($log, $location, $rootScope, $mdSidenav) {
    var vm = this; // jshint ignore:line

    $rootScope.$on('i18nInitComplete', oni18nInitComplete);

    vm.toggleSidenav = toggleSidenav;
    vm.onSelectSubNavItem = onSelectSubNavItem;
    vm.init = init;

    vm.init();

    function init() {
      vm.i18n = {
        currentLanguage: _.find(window.__langs, {id: window.__lang}),
        languages: window.__langs
      };

      vm.subNavItems = getSubNavItems();
    }

    function toggleSidenav(menuId) {
      $mdSidenav(menuId).toggle();
    }

    function onSelectSubNavItem(item) {
      // console.log(item);
    }

    function getSubNavItems() {
      return [
        {id: 'standings', label: i18n.t('subnav.Standings', {defaultValue: 'Standings'})},
        {id: 'register', label: i18n.t('subnav.HowtoEnter', {defaultValue: 'How to Enter'})},
        {id: 'rules', label: i18n.t('subnav.Rules', {defaultValue: 'Rules'})},
        {id: 'payment', label: i18n.t('subnav.Payment', {defaultValue: 'Payment'})},
        {id: 'info', label: i18n.t('subnav.GroupInformation', {defaultValue: 'Group Information'})}
      ];
    }

    function oni18nInitComplete() {
      vm.subNavItems = getSubNavItems();
    }
  }
})();
