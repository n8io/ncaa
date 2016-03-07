angular
  .module(`app.constants`, [])
  .constant(`CONSTANTS`, constants)
  ;

/* @ngInject */
function constants() {
  return {
    ONPOOLDATAREFRESHED: `onPoolDataRefreshed`,
    ONPOOLDATAREFRESHING: `onPoolDataRefreshing`
  };
}
