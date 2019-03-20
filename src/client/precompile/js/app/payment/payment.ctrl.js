'use strict';

angular
  .module(`payment.controllers`, [])
  .controller(`Payment_Controller`, paymentController);

/* ngInject */
function paymentController(
  $log,
  $scope,
  $rootScope,
  $timeout,
  $location,
  $sce,
  CONSTANTS,
  CacheService
) {
  const vm = this; // eslint-disable-line

  $rootScope.$on(CONSTANTS.ONPOOLDATAREFRESHED, onPoolInfoRefreshed);

  vm.selectedEntries = [];
  vm.transformChip = transformChip;
  vm.querySearch = querySearch;
  vm.onSubmit = onSubmit;
  vm.activate = activate;
  vm.title = `Payment Details`;

  vm.activate();

  function transformChip(chip) {
    // If it is an object, it's already a known chip
    if (angular.isObject(chip)) {
      return chip;
    }
    // Otherwise, create a new one
    return {
      name: $sce.trustAsHtml(chip)
    };
  }

  function querySearch(query) {
    const results = query ? vm.entries.filter(createFilterFor(query)) : [];

    return results;
  }

  function createFilterFor(query) {
    const lowercaseQuery = angular.lowercase(query);

    return function filterFn(entry) {
      return entry._lowername.indexOf(lowercaseQuery) === 0;
    };
  }

  function onSubmit() {
    // ?&c=USD&o=1&n=2016%20March%20Madness&d=The%20Hoosier%20Brackets&f=Nate&l=Clark&a=2000&i=https://goo.gl/GHMVnF&b=https://goo.gl/iIlJPf&r=https://www.google.com
    let url =
      (__paymentUri || `https://stripe-processor.herokuapp.com`) + // eslint-disable-line
      `?` +
      `&c=USD` +
      `&n=` +
      __year +
      ` March Madness` +
      `&d=` +
      encodeURIComponent(
        vm.selectedEntries
          .map(function(e) {
            return e.name;
          })
          .join(`, `)
      ) + // eslint-disable-line
      `&a=` +
      (vm.selectedEntries.length * 10 * 100).toString() +
      `&m_firstName=` +
      encodeURIComponent(vm.paymentForm.firstName) +
      `&m_lastName=` +
      encodeURIComponent(vm.paymentForm.lastName) +
      `&m_ncaa=true` +
      `&m_year=${new Date().getFullYear()}` +
      `&o=1` +
      `&i=https://goo.gl/GHMVnF` +
      `&b=https://goo.gl/iIlJPf` +
      `&r=https://ncaa.n8io.com` +
      `&z=1`;
    url +=
      `&m_brackets=` +
      encodeURIComponent(
        vm.selectedEntries
          .map(function(e) {
            // eslint-disable-line
            return `${e.id.toString()}~~~${e.name}`;
          })
          .join(`:::`)
      );

    angular
      .element(`#payment`)
      .attr(`disable`, `disable`)
      .text(`Please wait...`);

    window.location.href = url;
  }

  function activate() {
    vm.title = `Payment Details`;

    if (CacheService.get().pool) {
      vm.pool = CacheService.get().pool;
      vm.entries = mapPoolEntries(vm.pool);
      addQsSelection();
    }
  }

  function onPoolInfoRefreshed(e, pool) {
    vm.pool = pool;
    vm.entries = mapPoolEntries(pool);
    addQsSelection();
  }

  function mapPoolEntries(pool) {
    return pool.entries.map(function(e) {
      return {
        id: e.id,
        name: e.entryName,
        _lowername: e.entryName.toLowerCase(),
        paid: Boolean(e.paid)
      };
    });
  }

  function addQsSelection() {
    const qsEntry = $location.search().entry;

    if (qsEntry) {
      vm.selectedEntries = vm.entries.filter(
        entry => entry.id === parseInt(qsEntry, 10)
      );
    }
  }
}
