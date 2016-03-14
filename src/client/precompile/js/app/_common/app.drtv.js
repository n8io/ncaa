angular
  .module(`app.directives`, [])
  .directive(`gravatar`, gravatar)
  ;

/* @ngInject */
function gravatar(CryptoJs) {
  return {
    restrict: `E`,
    scope: {
      email: `=`,
      letter: `=`
    },
    replace: true,
    template: `<img data-ng-src='//www.gravatar.com/avatar/{{emailHash}}?s={{size}}&r={{rating}}&d={{defaultImage}}' />`,
    link: linkFn
  };

  /* @ngInject */
  function linkFn($scope, element, attrs) {
    $scope.size = parseInt(attrs.size, 0) || 80;
    $scope.class = `gravatar-${$scope.size}`;
    $scope.defaultImage = attrs.default || `identicon`;
    $scope.forceDefault = angular.isDefined(attrs.force);
    $scope.rating = attrs.rating || `G`;
    $scope.round = angular.isDefined(attrs.round);
    $scope.emailHash = CryptoJs.MD5($scope.email).toString();

    if ($scope.round) {
      const styleEl = `
        <style id='${$scope.class}'>
          .${$scope.class} {
            vertical-align: text-top;
            height: ${$scope.size}px;
            width: ${$scope.size}px;
            border-radius: ${$scope.size}px;
            display: inline;
          }
        </style>
      `;

      element.addClass($scope.class);

      if (angular.element(`#${$scope.class}`).length === 0) {
        angular.element(`body`).append(styleEl);
      }
    }
  }
}
