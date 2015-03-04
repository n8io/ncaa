(function() {
  'use strict';
  // Controllers that are specific to this feature

  angular
    .module('register.controllers', [])
    .controller('Register_Controller', registerController)
    ;

  /* ngInject */
  function registerController($log, $scope, $rootScope) {
    var vm = this; // jshint ignore:line

    $rootScope.$on('i18nInitComplete', oni18nInitComplete); // Listen for i18n i18nInitComplete event before trying to translate

    vm.init = init;

    vm.init();

    function oni18nInitComplete() {
      $scope.$apply(function() {
        vm.title = i18n.t('register.pageTitle', {defaultValue: 'How to Enter'});
      });
    }

    function init() {
      vm.title = i18n.t('register.pageTitle', {defaultValue: 'How to Enter'}); // Will quietly fail if i18n is not done loading.

      console.debug('Controller loaded:', 'Register_Controller');
    }
  }
})();
