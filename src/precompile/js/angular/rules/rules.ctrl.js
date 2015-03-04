(function() {
  'use strict';
  // Controllers that are specific to this feature

  angular
    .module('rules.controllers', [])
    .controller('Rules_Controller', rulesController)
    ;

  /* ngInject */
  function rulesController($log, $scope, $rootScope) {
    var vm = this; // jshint ignore:line

    $rootScope.$on('i18nInitComplete', oni18nInitComplete); // Listen for i18n i18nInitComplete event before trying to translate

    vm.init = init;

    vm.init();

    function oni18nInitComplete() {
      $scope.$apply(function() {
        vm.title = i18n.t('rules.pageTitle', 'Rules');
      });
    }

    function init() {
      vm.title = i18n.t('rules.pageTitle', 'Rules'); // Will quietly fail if i18n is not done loading.

      $log.debug('Controller loaded:', 'Rules_Controller');
    }
  }
})();
