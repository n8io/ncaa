angular
  .module(`app.filters`, [])
  .filter(`unsafe`, unsafe)
  .filter(`favorites`, favorites)
  .filter(`eliminated`, eliminated)
  .filter(`alive`, alive)
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
/* @ngInject */
function eliminated() {
  return function(entries) {
    if (!entries) {
      return entries;
    }

    return entries.filter((entry) => entry.winningTeam && !!entry.winningTeam.isEliminated);
  };
}
/* @ngInject */
function alive() {
  return function(entries) {
    if (!entries) {
      return entries;
    }

    return entries.filter((entry) => !entry.winningTeam || !entry.winningTeam.isEliminated);
  };
}
