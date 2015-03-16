(function() {
  'use strict';
  // Controllers that are specific to this feature

  angular
    .module('standings.controllers', [])
    .controller('Standings_Controller', standingsController)
    ;

  /* ngInject */
  function standingsController($scope, $rootScope, ESPNService) {
    var vm = this; // jshint ignore:line

    $rootScope.$on('i18nInitComplete', oni18nInitComplete); // Listen for i18n i18nInitComplete event before trying to translate

    vm.init = init;

    vm.init();

    function oni18nInitComplete() {
      $scope.$apply(function() {
        vm.title = i18n.t('standings.pageTitle', 'Standings');
      });
    }

    function init() {
      vm.title = i18n.t('standings.pageTitle', 'Standings'); // Will quietly fail if i18n is not done loading.

      ESPNService.getPoolInfo(onGetPoolInfoSuccess);
    }

    function onGetPoolInfoSuccess(err, results) {
      vm.pool = results.group;
      vm.pool.costPerEntry = 5;
      vm.pool.firstPlacePercent = .5;
      vm.pool.secondPlacePercent = .35;
      vm.pool.thirdPlacePercent = .15;

      vm.pool.payouts = {
        first: vm.pool.entries.length * vm.pool.costPerEntry * vm.pool.firstPlacePercent,
        second: vm.pool.entries.length * vm.pool.costPerEntry * vm.pool.secondPlacePercent,
        third: vm.pool.entries.length * vm.pool.costPerEntry * vm.pool.thirdPlacePercent
      };
    }
  }
})();
