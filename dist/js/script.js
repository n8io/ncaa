/* Compiled via gulp-uglify on Wednesday, March 20th 2019, 8:17:50PM -04:00 [ 1553127470565 ] */
"use strict";

(function() {
    "use strict";

    angular.module("app", ["ngMaterial", "app.constants", "app.config", "app.directives", "app.filters", "app.routes", "app.services", "app.controllers", "standings", "register", "rules", "payment"]);
})();

(function() {
    "use strict";

    setupTheme.$inject = ['$mdThemingProvider'];
    setupStateChangeEvents.$inject = ['$rootScope', '$mdSidenav'];
    angular.module("app.config", []).config(setupTheme).run(setupStateChangeEvents);

    /* ngInject */
    function setupTheme($mdThemingProvider) {
        $mdThemingProvider.theme("default").primaryPalette("red").accentPalette("blue");
    }

    /* ngInject */
    function setupStateChangeEvents($rootScope, $mdSidenav) {
        $rootScope.$on("$stateChangeSuccess", onStateChangeSuccess);

        function onStateChangeSuccess() /* event, toState, toParams, fromState, fromParams */ {
            $("body").removeAttr("unresolved");
            "";
            $mdSidenav("left").close();
        }
    }
})();

(function() {
    "use strict";

    angular.module("app.constants", []).constant("CONSTANTS", constants);

    /* @ngInject */
    function constants() {
        return {
            ONPOOLDATAREFRESHED: "onPoolDataRefreshed",
            ONPOOLDATAREFRESHING: "onPoolDataRefreshing"
        };
    }
})();

(function() {
    "use strict";

    masterController.$inject = ['$log', '$location', '$rootScope', '$mdSidenav', 'ESPNService'];
    angular.module("app.controllers", []).controller("Master_Controller", masterController);

    /* @ngInject */
    function masterController($log, $location, $rootScope, $mdSidenav, ESPNService) {
        var vm = this; // eslint-disable-line

        vm.toggleSidenav = toggleSidenav;
        vm.init = init;

        vm.init();

        function init() {
            vm.subNavItems = getSubNavItems();
            vm.onRefreshClick = onRefreshClick;

            ESPNService.refresh();

            setTimeout(function() {
                return ESPNService.refresh();
            }, 1000);
        }

        function toggleSidenav(menuId) {
            $mdSidenav(menuId).toggle();
        }

        function getSubNavItems() {
            return [{
                id: "standings",
                label: "Standings"
            }, {
                id: "register",
                label: "How to Enter"
            }, {
                id: "rules",
                label: "Rules"
            }, {
                id: "payment",
                label: "Payment"
            }];
        }

        function onRefreshClick() {
            ESPNService.refresh();
        }
    }
})();

(function() {
    "use strict";

    gravatar.$inject = ['CryptoJs'];
    angular.module("app.directives", []).directive("gravatar", gravatar);

    /* @ngInject */
    function gravatar(CryptoJs) {
        linkFn.$inject = ['$scope', 'element', 'attrs'];
        return {
            restrict: "E",
            scope: {
                email: "=",
                letter: "="
            },
            replace: true,
            template: "<img data-ng-src='//www.gravatar.com/avatar/{{emailHash}}?s={{size}}&r={{rating}}&d={{defaultImage}}' />",
            link: linkFn
        };

        /* @ngInject */
        function linkFn($scope, element, attrs) {
            $scope.size = parseInt(attrs.size, 0) || 80;
            $scope.class = "gravatar-" + $scope.size;
            $scope.defaultImage = attrs.default || "identicon";
            $scope.forceDefault = angular.isDefined(attrs.force);
            $scope.rating = attrs.rating || "G";
            $scope.round = angular.isDefined(attrs.round);
            $scope.emailHash = CryptoJs.MD5($scope.email).toString();

            if ($scope.round) {
                var styleEl = "\n        <style id='" + $scope.class + "'>\n          ." + $scope.class + " {\n            vertical-align: text-top;\n            height: " + $scope.size + "px;\n            width: " + $scope.size + "px;\n            border-radius: " + $scope.size + "px;\n            display: inline;\n          }\n        </style>\n      ";

                element.addClass($scope.class);

                if (angular.element("#" + $scope.class).length === 0) {
                    angular.element("body").append(styleEl);
                }
            }
        }
    }
})();

(function() {
    "use strict";
})();

(function() {
    "use strict";

    unsafe.$inject = ['$sce'];
    angular.module("app.filters", []).filter("unsafe", unsafe).filter("favorites", favorites).filter("eliminated", eliminated).filter("alive", alive);

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

            return entries.filter(function(entry) {
                return entry.isFavorite;
            });
        };
    }
    /* @ngInject */
    function eliminated() {
        return function(entries) {
            if (!entries) {
                return entries;
            }

            return entries.filter(function(entry) {
                return entry.winningTeam && !!entry.winningTeam.isEliminated;
            });
        };
    }
    /* @ngInject */
    function alive() {
        return function(entries) {
            if (!entries) {
                return entries;
            }

            return entries.filter(function(entry) {
                return !entry.winningTeam || !entry.winningTeam.isEliminated;
            });
        };
    }
})();

(function() {
    "use strict";

    defineRoutes.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];
    angular.module("app.routes", ["ui.router"]).config(defineRoutes);

    /* @ngInject */
    function defineRoutes($locationProvider, $stateProvider, $urlRouterProvider) {
        // No hashbangs, just straight history API manipulation
        $locationProvider.html5Mode(true);

        $stateProvider.state("standings", {
            url: "/",
            templateUrl: "/html/js/app/standings/standings.tmpl.html",
            controller: "Standings_Controller",
            controllerAs: "sc"
        }).state("register", {
            url: "/register",
            templateUrl: "/html/js/app/register/register.tmpl.html",
            controller: "Register_Controller",
            controllerAs: "rc"
        }).state("rules", {
            url: "/rules",
            templateUrl: "/html/js/app/rules/rules.tmpl.html",
            controller: "Rules_Controller",
            controllerAs: "rc"
        }).state("payment", {
            url: "/payment?entry",
            templateUrl: "/html/js/app/payment/payment.tmpl.html",
            controller: "Payment_Controller",
            controllerAs: "pc"
        });

        // Handle undefined routes by going back to url (not state) '/'
        $urlRouterProvider.otherwise("/standings");
    }
})();

(function() {
    "use strict";

    'use strict';

    espnService.$inject = ['$log', '$http', '$rootScope', 'CONSTANTS'];
    cacheService.$inject = ['$log', '$http', '$rootScope', 'CONSTANTS'];
    angular.module("app.services", ["ngResource"]).service("CacheService", cacheService).service("ESPNService", espnService).service("CryptoJs", CryptoJs).service("Favorites", Favorites);

    /* @ngInject */
    function espnService($log, $http, $rootScope, CONSTANTS) {
        var svc = {
            refresh: function refresh(callback) {
                return refreshPoolData(callback);
            }
        };

        return svc;

        function refreshPoolData(callback) {
            var uri = "/api/espn/bracket";

            callback = typeof callback === "function" ? callback : function() {};

            $rootScope.$broadcast(CONSTANTS.ONPOOLDATAREFRESHING);

            $http.get(uri).success(onGetBracketInfoSuccess).error(onGetBracketInfoError);

            function onGetBracketInfoSuccess(data /* , status, headers, config */ ) {
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

                return callback(new Error("Could not retrieve bracket info at this time."));
            }
        }
    }

    /* @ngInject */
    function cacheService($log, $http, $rootScope, CONSTANTS) {
        var data = {};
        var svc = {
            get: function get() {
                return data;
            },
            set: function set(d) {
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
        var FAV_KEY = "favorites_" + new Date().getFullYear();

        return {
            get: get,
            set: set
        };

        function get() {
            if (!window.localStorage) {
                return [];
            }

            var str = localStorage.getItem(FAV_KEY) || "[]";

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
})();

(function() {
    "use strict";
})();

(function() {
    "use strict";

    angular.module("payment", ["payment.controllers"]);
})();

(function() {
    "use strict";

    angular.module("register", ["register.controllers"]);
})();

(function() {
    "use strict";

    angular.module("standings", ["standings.controllers"]);
})();

(function() {
    "use strict";

    angular.module("rules", ["rules.controllers"]);
})();

(function() {
    "use strict";

    angular.element(document).ready(function() {
        angular.bootstrap(document, ["app"]);
    });
})();

(function() {
    "use strict";

    'use strict';

    paymentController.$inject = ['$log', '$scope', '$rootScope', '$timeout', '$location', '$sce', 'CONSTANTS', 'CacheService'];
    angular.module("payment.controllers", []).controller("Payment_Controller", paymentController);

    /* ngInject */
    function paymentController($log, $scope, $rootScope, $timeout, $location, $sce, CONSTANTS, CacheService) {
        var vm = this; // eslint-disable-line

        $rootScope.$on(CONSTANTS.ONPOOLDATAREFRESHED, onPoolInfoRefreshed);

        vm.selectedEntries = [];
        vm.transformChip = transformChip;
        vm.querySearch = querySearch;
        vm.onSubmit = onSubmit;
        vm.activate = activate;
        vm.title = "Payment Details";

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
            var results = query ? vm.entries.filter(createFilterFor(query)) : [];

            return results;
        }

        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);

            return function filterFn(entry) {
                return entry._lowername.indexOf(lowercaseQuery) === 0;
            };
        }

        function onSubmit() {
            // ?&c=USD&o=1&n=2016%20March%20Madness&d=The%20Hoosier%20Brackets&f=Nate&l=Clark&a=2000&i=https://goo.gl/GHMVnF&b=https://goo.gl/iIlJPf&r=https://www.google.com
            var url = (__paymentUri || "https://stripe-processor.herokuapp.com") + // eslint-disable-line
                "?" + "&c=USD" + "&n=" + __year + " March Madness" + "&d=" + encodeURIComponent(vm.selectedEntries.map(function(e) {
                    return e.name;
                }).join(", ")) + // eslint-disable-line
                "&a=" + (vm.selectedEntries.length * 10 * 100).toString() + "&m_firstName=" + encodeURIComponent(vm.paymentForm.firstName) + "&m_lastName=" + encodeURIComponent(vm.paymentForm.lastName) + "&m_ncaa=true" + ("&m_year=" + new Date().getFullYear()) + "&o=1" + "&i=https://goo.gl/GHMVnF" + "&b=https://goo.gl/iIlJPf" + "&r=https://ncaa.n8io.com" + "&z=1";
            url += "&m_brackets=" + encodeURIComponent(vm.selectedEntries.map(function(e) {
                // eslint-disable-line
                return e.id.toString() + "~~~" + e.name;
            }).join(":::"));

            angular.element("#payment").attr("disable", "disable").text("Please wait...");

            window.location.href = url;
        }

        function activate() {
            vm.title = "Payment Details";

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
            var qsEntry = $location.search().entry;

            if (qsEntry) {
                vm.selectedEntries = vm.entries.filter(function(entry) {
                    return entry.id === parseInt(qsEntry, 10);
                });
            }
        }
    }
})();

(function() {
    "use strict";

    registerController.$inject = ['$log', '$scope', '$rootScope', 'CONSTANTS', 'CacheService'];
    angular.module("register.controllers", []).controller("Register_Controller", registerController);

    /* ngInject */
    function registerController($log, $scope, $rootScope, CONSTANTS, CacheService) {
        var vm = this; // eslint-disable-line

        $rootScope.$on(CONSTANTS.ONPOOLDATAREFRESHED, onPoolInfoRefreshed);

        vm.init = init;

        vm.init();

        function init() {
            vm.title = "How to Enter";

            if (CacheService.get().pool) {
                vm.pool = CacheService.get().pool;
            }
        }

        function onPoolInfoRefreshed(e, pool) {
            vm.pool = pool;
        }
    }
})();

(function() {
    "use strict";

    standingsController.$inject = ['$scope', '$rootScope', '$timeout', '$interval', '$sce', '$mdMedia', 'Favorites', 'CacheService', 'CONSTANTS'];
    angular.module("standings.controllers", []).controller("Standings_Controller", standingsController);

    /* ngInject */
    function standingsController($scope, $rootScope, $timeout, $interval, $sce, $mdMedia, Favorites, CacheService, CONSTANTS) {
        var vm = this; // jshint ignore:line

        $rootScope.$on(CONSTANTS.ONPOOLDATAREFRESHING, onPoolInfoRefreshing);
        $rootScope.$on(CONSTANTS.ONPOOLDATAREFRESHED, onPoolInfoRefreshed);

        vm.parseEntryName = parseEntryName;
        vm.toggleFavorite = toggleFavorite;
        vm.init = init;

        vm.init();

        function onPoolInfoRefreshing() /* e , pool */ {
            $timeout(function() {
                return vm.isRefreshing = true;
            });
        }

        function onPoolInfoRefreshed(e, pool) {
            console.log({
                onPoolInfoRefreshed: pool
            });
            $timeout(function() {
                return setPool(pool);
            });
        }

        function init() {
            vm.$mdMedia = $mdMedia;
            vm.isRefreshing = true;
            vm.countdown = {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
                total: 0
            };
            vm.title = "Standings"; // Will quietly fail if i18n is not done loading.

            if (CacheService.get().pool) {
                setPool(CacheService.get().pool);
            }

            startCountdownInterval();
        }

        function setPool(pool) {
            if (!pool) return;

            vm.pool = addDisplayLabel(pool);
            vm.pool.entries = vm.pool.entries.map(function(e) {
                e.isFavorite = !!Favorites.get().find(function(id) {
                    return e.id === id;
                });

                return e;
            });
            vm.isRefreshing = false;
        }

        function startCountdownInterval() {
            var start = moment(__startTime); // eslint-disable-line
            var now = moment();

            if (start < now) {
                vm.countdown.total = 0;

                return;
            }

            ticToc();
            $interval(ticToc, 1000);
        }

        function ticToc() {
            var start = moment(__startTime); // eslint-disable-line
            var tick = moment();
            var days = moment(start).diff(tick, "days");
            var hours = moment(start).diff(tick, "hours") % 24;
            var minutes = moment(start).diff(tick, "minutes") % 60;
            var seconds = moment(start).diff(tick, "seconds") % 60;

            vm.countdown.days = days;
            vm.countdown.hours = hours;
            vm.countdown.minutes = minutes;
            vm.countdown.seconds = seconds;
            vm.countdown.total = moment(start).diff(tick, "milliseconds");
        }

        function toggleFavorite(entry) {
            entry.isFavorite = !entry.isFavorite;

            Favorites.set(vm.pool.entries.filter(function(e) {
                return e.isFavorite;
            }).map(function(e) {
                return e.id;
            }));
        }

        function parseEntryName(name) {
            return $sce.trustAsHtml(name);
        }

        function addDisplayLabel(pool) {
            if (!pool || !pool.entries) {
                return;
            }

            pool.entries.forEach(function(entry) {
                entry.owner = entry.userName;
                entry.financier = (entry.paid ? entry.paid.firstName + " " + entry.paid.lastName + " | " + entry.userName : "") || "" + entry.userName;
            });

            return pool;
        }
    }
})();

(function() {
    "use strict";

    (function() {
        'use strict';
        // Controllers that are specific to this feature

        rulesController.$inject = ['$log', '$scope', '$rootScope', 'CONSTANTS', 'CacheService'];
        angular.module("rules.controllers", []).controller("Rules_Controller", rulesController);

        /* ngInject */
        function rulesController($log, $scope, $rootScope, CONSTANTS, CacheService) {
            var vm = this; // eslint-disable-line

            $rootScope.$on(CONSTANTS.ONPOOLDATAREFRESHED, onPoolInfoRefreshed);

            vm.init = init;

            vm.init();

            function init() {
                vm.title = "Rules"; // Will quietly fail if i18n is not done loading.

                if (CacheService.get().pool) {
                    vm.pool = CacheService.get().pool;
                }
            }

            function onPoolInfoRefreshed(e, pool) {
                vm.pool = pool;
            }
        }
    })();
})();