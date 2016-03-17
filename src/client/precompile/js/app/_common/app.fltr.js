angular
  .module(`app.filters`, [])
  .filter(`unsafe`, unsafe)
  .filter(`favorites`, favorites)
  ;

/* @ngInject */
function unsafe($sce) {
  return $sce.trustAsHtml;
}
/* @ngInject */
function favorites() {
  return function(entries) {
    if (!entries) {
      return entries;
    }

    return entries.filter((entry) => entry.isFavorite);
  };
}
