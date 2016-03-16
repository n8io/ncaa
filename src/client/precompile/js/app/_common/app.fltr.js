angular
  .module(`app.filters`, [])
  .filter(`unsafe`, unsafe)
  ;

/* @ngInject */
function unsafe($sce) {
  return $sce.trustAsHtml;
}
