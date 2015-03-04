(function() {
  'use strict';
  // Controllers that are specific to this feature

  angular
    .module('info.controllers', [])
    .controller('Info_Controller', infoController)
    ;

  /* ngInject */
  function infoController($log, $scope, $rootScope) {
    var vm = this; // jshint ignore:line

    $rootScope.$on('i18nInitComplete', oni18nInitComplete); // Listen for i18n i18nInitComplete event before trying to translate

    vm.init = init;

    vm.init();

    function oni18nInitComplete() {
      $scope.$apply(function() {
        vm.title = i18n.t('info.pageTitle', {defaultValue: 'Group Information'});
      });
    }

    function init() {
      vm.title = i18n.t('info.pageTitle', {defaultValue: 'Group Information'}); // Will quietly fail if i18n is not done loading.

      console.debug('Controller loaded:', 'Info_Controller');
    }
  }
})();
