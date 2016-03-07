angular
  .module(`app.routes`, [`ui.router`])
  .config(defineRoutes);

/* @ngInject */
function defineRoutes($locationProvider, $stateProvider, $urlRouterProvider) {
  // No hashbangs, just straight history API manipulation
  $locationProvider.html5Mode(true);

  $stateProvider
    .state(`standings`, {
      url: `/`,
      templateUrl: `/html/js/app/standings/standings.tmpl.html`,
      controller: `Standings_Controller`,
      controllerAs: `sc`
    })
    .state(`register`, {
      url: `/register`,
      templateUrl: `/html/js/app/register/register.tmpl.html`,
      controller: `Register_Controller`,
      controllerAs: `rc`
    })
    .state(`rules`, {
      url: `/rules`,
      templateUrl: `/html/js/app/rules/rules.tmpl.html`,
      controller: `Rules_Controller`,
      controllerAs: `rc`
    })
    .state(`payment`, {
      url: `/payment`,
      templateUrl: `/html/js/app/payment/payment.tmpl.html`,
      controller: `Payment_Controller`,
      controllerAs: `pc`
    })
    ;

  // Handle undefined routes by going back to url (not state) '/'
  $urlRouterProvider.otherwise(`/standings`);
}
