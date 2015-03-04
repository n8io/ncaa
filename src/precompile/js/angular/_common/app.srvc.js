(function() {
  'use strict';

  angular
    .module('app.services', ['ngResource'])
    .service('IpService', ipService)
    .service('Md5Service', md5Service)
    ;

  /* @ngInject */
  function ipService($log, $http) {
    var svc = {
      getClientIp: getClientIp
    };

    return svc;

    function getClientIp(callback) {
      var uri = 'http://ip.jsontest.com';
      $http
        .get(uri)
        .success(onGetIpSuccess)
        .error(onGetIpError)
        ;

      function onGetIpSuccess(data, status, headers, config) {
        // signature: callback(error, results) {...}
        return callback(null, data);
      }

      function onGetIpError(data, status, headers, config) {
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

  /* @ngInject */
  function md5Service($log, $resource) {
    var uri = 'http://md5.jsontest.com'; // ?text=test
    var timeout = 5000;
    var paramDefaults = {
      text: 'email@ddress.here'
    };

    return $resource(uri, paramDefaults,
      {
        getHash: {
          method: 'GET',
          timeout: timeout
        }
      }
    );
  }
})();
