'use strict';

angular.module('bpCreation', [
    'ngRoute',
    'bpCreation.services',
    'bpCreation.controllers',
    'bpCreation.directives'
]).
config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/space', {templateUrl: 'partials/space.html', controller: 'bpSpaceMenu'});
    $routeProvider.when('/colors', {templateUrl: 'partials/colors.html', controller: 'bpColorMenu'});
    $routeProvider.otherwise({redirectTo: '/space'});
}]);
