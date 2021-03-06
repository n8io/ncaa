'use strict';

angular
  .module(`app.services`, [`ngResource`])
  .service(`CacheService`, cacheService)
  .service(`ESPNService`, espnService)
  .service(`CryptoJs`, CryptoJs)
  .service(`Favorites`, Favorites)
  ;

/* @ngInject */
function espnService($log, $http, $rootScope, CONSTANTS) {
  const svc = {
    refresh: function(callback) {
      return refreshPoolData(callback);
    }
  };

  return svc;

  function refreshPoolData(callback) {
    const uri = `/api/espn/bracket`;

    callback = typeof callback === `function` ? callback : function() {};

    $rootScope.$broadcast(CONSTANTS.ONPOOLDATAREFRESHING);

    $http
      .get(uri)
      .success(onGetBracketInfoSuccess)
      .error(onGetBracketInfoError)
      ;

    function onGetBracketInfoSuccess(data /* , status, headers, config */) {
      data.pool = convertPool(data.group, CONSTANTS.teams);

      $rootScope.$broadcast(CONSTANTS.ONPOOLDATAREFRESHED, data.pool);

      // console.log(data.pool);

      return callback(null, data.pool);
    }

    function onGetBracketInfoError(data, status, headers, config) {
      $log.error({
        data: data,
        status: status,
        headers: headers,
        config: config
      });

      $rootScope.$broadcast(CONSTANTS.ONPOOLDATAREFRESHED, data.pool);

      return callback(new Error(`Could not retrieve bracket info at this time.`));
    }
  }
}

/* @ngInject */
function cacheService($log, $http, $rootScope, CONSTANTS) {
  let data = {};
  const svc = {
    get: function() {
      return data;
    },
    set: function(d) {
      data = d;
    }
  };

  $rootScope.$on(CONSTANTS.ONPOOLDATAREFRESHED, handlePoolDataReceivedEvent);

  return svc;

  function handlePoolDataReceivedEvent(e, pool) {
    data.pool = pool;
  }
}

/* @ngInject */
function CryptoJs() {
  return CryptoJS;
}

/* @ngInject */
function Favorites() {
  const FAV_KEY = `favorites_${(new Date()).getFullYear()}`;

  return {
    get: get,
    set: set
  };

  function get() {
    if (!window.localStorage) {
      return [];
    }

    const str = localStorage.getItem(FAV_KEY) || `[]`;

    return angular.fromJson(str);
  }

  function set(favs) {
    if (!window.localStorage) {
      return favs;
    }

    localStorage.setItem(FAV_KEY, angular.toJson(favs));
  }
}

function convertPool(pool) {
  pool = pool || {};
  pool.costPerEntry = 10;
  pool.firstPlacePercent = .5;
  pool.secondPlacePercent = .35;
  pool.thirdPlacePercent = .15;

  pool.payouts = {
    first: pool.entries.length * pool.costPerEntry * pool.firstPlacePercent,
    second: pool.entries.length * pool.costPerEntry * pool.secondPlacePercent,
    third: pool.entries.length * pool.costPerEntry * pool.thirdPlacePercent
  };

  return JSON.parse(JSON.stringify(pool));
}
