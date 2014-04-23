angular.module('bpCreation.controllers', ['bpCreation.services'])
.controller('bpMenu', ['$scope', 'creation', function(scope, creation) {
    scope.spaceColor="white";
    scope.bodies = [
        { display: 'Planet', value: 'planet'},
        { display: 'Dwarf', value: 'dwarf'},
        { display: 'Minor', value: 'minor'},
        { display: 'Plutoid', value: 'plutoid'},
        { display: 'Star', value: 'star'}
    ]

    scope.body=scope.bodies[0];
    scope.radius = creation.getRadius();
    scope.xPosition = creation.getXCenter();
    scope.yPosition = creation.getYCenter();
    scope.animationSteps = 1;

    function setVariables() {
        creation.setRadius(scope.radius);
        creation.setXPosition(parseInt(scope.xPosition));
        creation.setYPosition(parseInt(scope.yPosition));
    }

    scope.$watch('spaceColor', function(newValue, oldValue) {
        $('#universe').css('background', newValue);
    });

    scope.$watch('radius + xPosition + yPosition', function(newValue, oldValue) {
        setVariables();
        render();
    });

    scope.$watch('body', function(newValue, oldValue) {
        creation.setBody(newValue.value);
        setVariables();
        render();
    });

    scope.update = function() {
        for(var index=0; index<scope.animationSteps; index++) {
            creation.update();
        }
        render();
    };

    function render() {
        creation.erase();
        creation.draw();
    }
}]);
