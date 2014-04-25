angular.module('bpCreation.directives', [])
.directive('bpSpaceMenu', [ function() {
    return {
        restrict: 'E',
        replace: true,
        transclude: false,
        templateUrl: 'partials/spaceMenu.html'
    }
}])
.directive('bpColorMenu', [ function() {
    return {
        restrict: 'E',
        replace: true,
        transclude: false,
        templateUrl: 'partials/colorsMenu.html'
    }
}])
.directive('bpColorSwatches', [ function() {
    return {
        restrict: 'E',
        replace: true,
        transclude: false,
        templateUrl: 'partials/swatch.html'
    }
}])
.directive('bpNavigationMenu', [ function() {
    return {
        restrict: 'E',
        replace: true,
        transclude: false,
        template: '<div class="navigationMenu"><a href="#/{{page.route}}">{{page.title}}</a></div>'
    }
}]);
