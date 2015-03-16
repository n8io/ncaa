(function() {
  'use strict';

  angular
    .module('app.services', ['ngResource'])
    .service('ESPNService', espnService)
    ;

  /* @ngInject */
  function espnService($log, $http) {
    var svc = {
      getPoolInfo: getPoolInfo
    };

    return svc;

    function getPoolInfo(callback) {
      var uri = '/api/espn/bracket';
      $http
        .get(uri)
        .success(onGetBracketInfoSuccess)
        .error(onGetBracketInfoError)
        ;

      function onGetBracketInfoSuccess(data, status, headers, config) {
        // signature: callback(error, results) {...}
        return callback(null, data);
      }

      function onGetBracketInfoError(data, status, headers, config) {
        $log.error({
          data: data,
          status: status,
          headers: headers,
          config: config
        });

        return callback(new Error('Could not retrieve client ip at this time.'));
      }
    }
  }
})();
