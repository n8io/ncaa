(function() {
  'use strict';
  // Controllers that are specific to this feature

  angular
    .module('payment.controllers', [])
    .controller('Payment_Controller', paymentController)
    ;

  /* ngInject */
  function paymentController($log, $scope, $rootScope, $timeout, CONSTANTS, CacheService) {
    var vm = this; // jshint ignore:line

    $rootScope.$on(CONSTANTS.ONPOOLDATAREFRESHED, onPoolInfoRefreshed);
    $rootScope.$on('i18nInitComplete', oni18nInitComplete); // Listen for i18n i18nInitComplete event before trying to translate

    vm.selectedEntries = [];
    vm.transformChip = transformChip;
    vm.querySearch = querySearch;
    vm.onSubmit = onSubmit;
    vm.activate = activate;

    vm.activate();

    function oni18nInitComplete() {
      $scope.$apply(function() {
        vm.title = i18n.t('payment.pageTitle', {defaultValue: 'Payment Details'});
      });
    }

    function transformChip(chip) {
      // If it is an object, it's already a known chip
      if(angular.isObject(chip)) {
        return chip;
      }
      // Otherwise, create a new one
      return {
        name: chip
      };
    }

    function querySearch(query) {
      var results = query ? vm.entries.filter(createFilterFor(query)) : [];

      return results;
    }

    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(entry) {
        return (entry._lowername.indexOf(lowercaseQuery) === 0);
      };
    }

    function onSubmit() {
      // ?&c=USD&o=1&n=2016%20March%20Madness&d=The%20Hoosier%20Brackets&f=Nate&l=Clark&a=2000&i=https://goo.gl/GHMVnF&b=https://goo.gl/iIlJPf&r=http://www.google.com
      var url = (__paymentUri || 'https://stripe-processor.herokuapp.com')
        + '?'
        + '&c=USD'
        + '&n=' + __year + ' March Madness'
        + '&d=' + encodeURIComponent(vm.selectedEntries.map(function(e) { return e.name; }).join(', '))
        + '&a=' + (vm.selectedEntries.length * 10 * 100).toString()
        + '&m_firstName=' + encodeURIComponent(vm.paymentForm.firstName)
        + '&m_lastName=' + encodeURIComponent(vm.paymentForm.lastName)
        + '&m_ncaa=true'
        + '&o=1'
        + '&i=https://goo.gl/GHMVnF'
        + '&b=https://goo.gl/iIlJPf'
        + '&r=http://ncaa.n8io.com'
        ;

      url += '&m_brackets=' + encodeURIComponent(vm.selectedEntries.map(function(e) {
        return e.id.toString() + '~~~' + e.name;
      }).join(':::'));

      window.location.href = url;
    }

    function activate() {
      vm.title = i18n.t('payment.pageTitle', {defaultValue: 'Payment Details'}); // Will quietly fail if i18n is not done loading.

      if(CacheService.get().pool) {
        vm.pool = CacheService.get().pool;
        vm.entries = mapPoolEntries(vm.pool);
      }
    }

    function onPoolInfoRefreshed(e, pool) {
      vm.pool = pool;
      vm.entries = mapPoolEntries(pool);
    }

    function mapPoolEntries(pool) {
      return pool.entries.map(function(e) {
        return {
          id: e.entryID,
          name: e.entryName,
          _lowername: e.entryName.toLowerCase(),
          paid: e.paid
        };
      });
    }
  }
})();
