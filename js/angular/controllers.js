angular.module('bpCreation.controllers', [])
.controller('bpNavigation', ['$scope', function(scope) {
    scope.pages = [
        {title: 'Creation', route: 'space'},
        {title: 'Colors', route: 'colors'},
    ]
}])
.controller('bpColorMenu', ['$scope', function(scope) {
    scope.planetColor = "FF0000";
    scope.ringColor = "00FF00";
    scope.colorOption = "planet";
    scope.percentageSwatch = 100;

    scope.swatches = [
        {title: 'Planet Color', style: 'planet'},
        {title: 'Ring Color', style: 'ring'}
    ];

    function toHex(number) {
        var hex = parseInt(number).toString(16).toUpperCase();
        if (parseInt(hex, 16) < 16) {
            hex = "0" + hex;
        }
        return hex;
    }

    function updateRGB(hex) {
        scope.redSwatch = parseInt(hex.substr(0,2), 16);
        scope.greenSwatch = parseInt(hex.substr(2,2), 16);
        scope.blueSwatch = parseInt(hex.substr(4,2), 16);
    }

    function shadeRGB(percentage) {
        percentage /= 100;
        scope.redSwatch = scope.originalRedSwatch * percentage;
        scope.greenSwatch = scope.originalGreenSwatch * percentage;
        scope.blueSwatch = scope.originalBlueSwatch * percentage;
    }

    function updateSwatches() {
        var hexColor = toHex(scope.redSwatch) + toHex(scope.greenSwatch) + toHex(scope.blueSwatch);
        if (scope.colorOption === 'planet') {
            scope.planetColor = hexColor;
        } else if (scope.colorOption === 'ring') {
            scope.ringColor = hexColor;
        }
    }

    scope.$watch('colorOption', function(newValue, oldValue) {
        scope.percentageSwatch = 100;
        updateRGB(determineColor(newValue));
        scope.originalRedSwatch = scope.redSwatch;
        scope.originalGreenSwatch = scope.greenSwatch;
        scope.originalBlueSwatch = scope.blueSwatch;
    });

    scope.$watch('percentageSwatch', function(newValue, oldValue) {
        shadeRGB(newValue);
    });

    function determineColor(color) {
        var colors = {
            'planet': scope.planetColor,
            'ring': scope.ringColor
        }
        return colors[color];
    }

    scope.style = function(value) {
        updateSwatches();
        return { "background-color": "#" + determineColor(value)};
    };
}])
.controller('bpSpaceMenu', ['$scope', 'creation', function(scope, creation) {
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
