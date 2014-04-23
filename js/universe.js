var stars = .75;
var plutoids = .10;
var minors = .05;
var dwarfs = .02;
var planetStars = 1;

function Universe(bodiesCount) {
    init: {
        this.buildUniverse(bodiesCount);
        this.__interval = undefined;
    }
}

Universe.prototype = {
    buildUniverse: function(bodiesCount) {
        this.__initializeVariables(bodiesCount);
        this.__createCanvas();
        this.__resetUniverse();
        this.__bindEvents();
    },

    __createCanvas: function() {
        var canvas = document.createElement("canvas");
        canvas.width = this.__universe.width;
        canvas.height = this.__universe.height;
        $('#space').html(canvas);
        this.__ctx = canvas.getContext("2d");
    },

    __animateUniverse: function() {
        var self = this;
        this.__interval = setInterval(function() {self.__renderUniverse()}, 33);
    },

    __pauseUniverse: function() {
        clearInterval(this.__interval);
    },

    __createUniverse: function() {
        for(index=0;index < parseInt(this.__bodiesCount * stars); index++) {
            //stars
            this.__bodies.stars.push(new Star(this.__ctx, this.__universe));
        }

        for(index=0;index < parseInt(this.__bodiesCount * plutoids); index++) {
            //plutoids
            this.__bodies.plutoids.push(new Plutoid(this.__ctx, this.__universe));
        }

        for(index=0;index < parseInt(this.__bodiesCount * minors); index++) {
            //minor
            this.__bodies.minors.push(new Minor(this.__ctx, this.__universe));
        }

        for(index=0;index < parseInt(this.__bodiesCount * dwarfs); index++) {
            //dwarf
            this.__bodies.dwarfs.push(new Dwarf(this.__ctx, this.__universe));
        }

        for(index=0;index < planetStars; index++) {
            this.__bodies.planet.push(new Planet(this.__ctx, this.__universe));
        }
    },

    __superNovaUniverse: function() {
        $.each(this.__bodies, function(index, category) {
            $.each(category, function(jndex, star) {
                delete star;
            });
        });

        this.__bodies = this.__buildBodiesObject();
    },

    __resetUniverse: function() {
        this.__superNovaUniverse();
        this.__createUniverse();
        this.__renderUniverse();
    },

    __eraseUniverse: function() {
        this.__ctx.clearRect(0, 0, this.__universe.width, this.__universe.height);
    },

    __renderUniverse: function() {
        this.__eraseUniverse();
        //this.__drawQuadrants(); /*debug*/
        //Order matters
        $.each(this.__bodies.stars, function(index, star) {
            star.draw();
            star.update();
        });

        $.each(this.__bodies.plutoids, function(index, plutoid) {
            plutoid.draw();
            plutoid.update();
        });

        $.each(this.__bodies.minors, function(index, minor) {
            minor.draw();
            minor.update();
        });

        $.each(this.__bodies.dwarfs, function(index, dwarf) {
            dwarf.draw();
            dwarf.update();
        });

        $.each(this.__bodies.planet, function(index, star) {
            star.draw();
            star.update();
        });
    },

    __bindEvents: function() {
        var self = this;
        var animated = false;
        function animateButtons(element, creationType) {
            self.__universe.creation = creationType;
            self.__resetUniverse();
            $('.button').removeClass('highlighted');
            $(element).addClass('highlighted');
        }

        $('#compressedGeneration').click(function() {
            animateButtons(this, 'compressed');
        });

        $('#normalGeneration').click(function() {
            animateButtons(this, 'normal');
        });

        $('#horizontalGeneration').click(function() {
            animateButtons(this, 'horizontal');
        });

        $('#verticalGeneration').click(function() {
            animateButtons(this, 'vertical');
        });

        $('#expandedVerticalGeneration').click(function() {
            animateButtons(this, 'expandedVertical');
        });

        $('#wormHole').click(function() {
            animateButtons(this, 'wormHole');
        });

        $('#animate').click(function() {
            if (animated) {
                self.__pauseUniverse();
                $(this).html("Animate");
                animated = false;
                $(this).removeClass('highlighted');
            } else {
                self.__animateUniverse();
                $(this).html("Pause");
                animated = true;
                $(this).addClass('highlighted');
            }
        });
    },

    __buildUniverseObject: function() {
        var width = parseInt($('#universe').css('width'), 10);
        var height =  parseInt($('#universe').css('height'), 10);
        return {
            'width': width,
            'height': height,
            'heightCenter': height/2,
            'widthCenter': width/2,
            'creation': 'normal'
        };
    },

    __buildBodiesObject: function() {
        return {
            'stars': [],
            'plutoids': [],
            'minors': [],
            'dwarfs': [],
            'planet': []
        };
    },

    __initializeVariables: function(starCount) {
        this.__bodiesCount = starCount || 4;
        this.__bodies = this.__buildBodiesObject();
        this.__ctx = undefined;
        this.__universe = this.__buildUniverseObject();
    }
}

function Planet(ctx, universe) {
    this.__initializePlanetVariables(ctx, universe);
}

Planet.prototype = {
    draw: function() {
        this.ringBack('#BBBBFF');
        this.__orb();
        this.__shadow('grey',.60 * Math.PI, 1.6 * Math.PI);
        this.__glow('#0000FF', 10);
        var self = this;
        $.each(this.__craters, function(index, center) {
            self.__crater(center[0], center[1], "#7777FF");
        });
        this.ringFront('#BBBBFF');
    },

    __initializePlanetVariables: function(ctx, universe) {
        this.__craters=[];
        this.__speedOriginal = 1;
        this.__radiusOriginal = 1;
        this.__radiusDelta = .5;
        this.__fillStyle = "#8888FF";
        this.__strokeStyle = "#000000";
        this.__initializeVariables(ctx, universe);
        var craterAngle = 0;
        for (var index=0; index<8; index++) {
            this.__craters.push([
                Math.random(),
                craterAngle * Math.PI
            ]);
            craterAngle += .25;//Math.random();
        }
    }
}

function Minor(ctx, universe) {
    this.__initializeMinorVariables(ctx, universe);
}

Minor.prototype = {
    draw: function() {
        this.__orb();
        this.__shadow('grey',.60 * Math.PI, 1.6 * Math.PI);
    },

    __initializeMinorVariables: function(ctx, universe) {
        this.__speedOriginal = 2;
        this.__radiusOriginal = 1;
        this.__radiusDelta = 0.025;
        this.__fillStyle = "#CC6633";
        this.__strokeStyle = "#000000";
        this.__initializeVariables(ctx, universe);
    }
}

function Dwarf(ctx, universe) {
    this.__initializeDwarfVariables(ctx, universe);
}

Dwarf.prototype = {
    draw: function() {
        this.__orb();
        this.__shadow('grey',.60 * Math.PI, 1.6 * Math.PI);
    },

    __initializeDwarfVariables: function(ctx, universe) {
        this.__speedOriginal = 1.5;
        this.__radiusOriginal = 1;
        this.__radiusDelta = 0.05;
        this.__fillStyle = "#CC33FF";
        this.__strokeStyle = "#000000";
        this.__initializeVariables(ctx, universe);
    }
}

function Plutoid(ctx, universe) {
    this.__initializePlutoidVariables(ctx, universe);
}

Plutoid.prototype = {
    draw: function() {
        this.__orb();
    },

    __initializePlutoidVariables: function(ctx, universe) {
        this.__speedOriginal = 3;
        this.__radiusOriginal = 1;
        this.__radiusDelta = 0.015;
        this.__fillStyle = "#99CC99";
        this.__strokeStyle = "#000000";
        this.__initializeVariables(ctx, universe);
    }
}

function Star(ctx, universe) {
    this.__initializeStarVariables(ctx, universe);
}

Star.prototype = {
    draw: function() {
        this.__orb();
    },

    __initializeStarVariables: function(ctx, universe) {
        this.__speedOriginal = 4;
        this.__radiusOriginal = 1;
        this.__radiusDelta = 0;
        this.__fillStyle = "#FFFFFF";
        this.__strokeStyle = "#FFFFFF";
        this.__initializeVariables(ctx, universe);
    }
}

function Constellation(ctx, universe) {
    init: {
        this.__initializeVariables(ctx, universe);
    }
}

Constellation.prototype = {
    update: function() {
        if (this.isConstellationVisible()) {
            this.__currentXPosition += this.__speed;
            this.__currentYPosition = this.__calculateYTrajectory();
            this.__radius += this.__radiusDelta;
        } else {
            this.__buildStarSpeed();
        }
    },

    __orb: function() {
        this.__ctx.save();
        this.__ctx.beginPath();
        this.__ctx.arc(
            this.__currentXPosition,
            this.__currentYPosition,
            this.__radius,
            0,
            2*Math.PI
        );
        this.__ctx.fillStyle = this.__fillStyle;
        this.__ctx.strokeStyle = this.__strokeStyle;
        this.__ctx.fill();
        this.__ctx.closePath();
        this.__ctx.restore();
    },

    __generateCraters: function(center, radius) {
        return this.__generateRandomRange(
            {
                'min': center - radius,
                'max': center + radius,
            }
        );
    },

    __crater: function(distance, angle, fillStyle) {
        var self = this;
        function calculateXPosition(distance, angle) {
            return self.__currentXPosition + distance * self.__radius * Math.cos(angle);
        }

        function calculateYPosition(distance, angle) {
            return self.__currentYPosition + distance * self.__radius * Math.sin(angle);
        }

        this.__ctx.save();
        this.__ctx.beginPath();
        this.__ctx.arc(
            this.__currentXPosition,
            this.__currentYPosition,
            this.__radius,
            0,
            2*Math.PI
        )
        this.__ctx.clip();
        this.__ctx.closePath();

        this.__ctx.beginPath();
        this.__ctx.strokeStyle = '#333333';
        this.__ctx.fillStyle = fillStyle;
        this.__ctx.shadowBlur = 10;
        this.__ctx.shadowColor = 'black';
        this.__ctx.shadowOffsetX = -1;
        this.__ctx.shadowOffsetY = -1;
        this.__ctx.arc(
            calculateXPosition(distance,angle),
            calculateYPosition(distance,angle),
            this.__radius * .1,
            0,
            2 * Math.PI
        );
        this.__ctx.fill();
        this.__ctx.stroke();
        this.__ctx.closePath();
        this.__ctx.restore();
    },

    ringBack: function(strokeStyle) {
        this.__ring(strokeStyle, 0, 2*Math.PI);
    },

    ringFront: function(strokeStyle) {
        this.__ring(strokeStyle,.25 * Math.PI, 1.50 * Math.PI);
    },

    __ring: function(strokeStyle, startAngle, endAngle) {
        this.__ctx.save();
        this.__ctx.beginPath();
        this.__ctx.globalAlpha = 1;
        this.__ctx.strokeStyle = strokeStyle;
        this.__ctx.lineWidth = this.__radius * .10;

        this.__ctx.transform(0.75,0.05,0.95,.75,this.__currentXPosition,this.__currentYPosition);
        this.__ctx.arc(
            0,
            0,
            this.__radius,
            startAngle,
            endAngle
        );
        this.__ctx.stroke();
        this.__ctx.closePath();
        this.__ctx.restore();
    },

    __shadow: function(strokeStyle, startAngle, endAngle) {
        this.__ctx.save();
        this.__ctx.beginPath();
        this.__ctx.arc(
            this.__currentXPosition,
            this.__currentYPosition,
            this.__radius,
            0,
            2*Math.PI
        )
        this.__ctx.clip();
        this.__ctx.closePath();

        this.__ctx.beginPath();

        this.__ctx.strokeStyle = strokeStyle;
        this.__ctx.lineWidth = 5;
        this.__ctx.shadowBlur = 30;
        this.__ctx.shadowColor = 'black';
        this.__ctx.shadowOffsetX = -10;
        this.__ctx.shadowOffsetY = -10

        this.__ctx.arc(
            this.__currentXPosition,
            this.__currentYPosition,
            this.__radius,
            startAngle,
            endAngle,
            true
        );
        this.__ctx.stroke();
        this.__ctx.closePath();
        this.__ctx.restore();
    },

    __glow: function(shadowColor, shadowBlur) {
        this.__ctx.save();
        this.__ctx.beginPath();
        this.__ctx.strokeStyle = shadowColor;
        this.__ctx.shadowBlur = shadowBlur;
        this.__ctx.shadowColor = shadowColor;
        this.__ctx.arc(
            this.__currentXPosition,
            this.__currentYPosition,
            this.__radius,
            0,
            2*Math.PI
        );
        this.__ctx.stroke();
        this.__ctx.closePath();
        this.__ctx.restore();
    },

    __initializeVariables: function(ctx, universe) {
        this.__ctx = ctx;
        this.__slope = undefined;
        this.__b = undefined;
        this.__universe = universe;
        this.__buildStarSpeed();
    },
}

StarMovement = function() { }

StarMovement.prototype = {
    __isStarRight: function() {
        return this.__currentXPosition > this.__universe.width;
    },

    __isStarLeft: function() {
        return this.__currentXPosition < 0;
    },

    __isStarAbove: function() {
        return this.__currentYPosition > this.__universe.height;
    },

    __isStarBelow: function() {
        return this.__currentYPosition < 0;
    },

    isConstellationVisible: function() {
        return ! ( this.__isStarRight() || this.__isStarLeft() ||
             this.__isStarAbove() || this.__isStarBelow() );
    },

    __calculateYTrajectory: function() {
        return this.__slope * this.__currentXPosition + this.__b;
    },
}

StarGeneration = function() { }

StarGeneration.prototype = {
    __buildStarSpeed: function() {
        this.__currentXPosition = this.__generateXPosition();
        this.__currentYPosition = this.__generateYPosition();

        this.__xQuadrant = this.__determineXQuadrant();
        this.__yQuadrant = this.__determineYQuadrant();

        var x2 = this.__universe.widthCenter;
        var y2 = this.__universe.heightCenter;

        this.__slope = this.__determineSlope(x2, y2);
        this.__b = this.__determineYIntercept(x2, y2);

        this.__determineSpeed();
    },

    __determineYIntercept: function(x2, y2) {
        return y2 - (this.__slope * x2);
    },

    __determineSlope: function(x2, y2) {
        return (y2-this.__currentYPosition) / (x2-this.__currentXPosition);
    },

    __determineSpeed: function() {
        //http://www.ninestein.com/html/NinesteinHTMLcolorGuide.htm
        this.__radius = this.__radiusOriginal;
        this.__speed = this.__xQuadrant == 1 ? this.__speedOriginal : -1 * this.__speedOriginal;
    },

    __getStarXRange: function() {
        var range = {};
        switch(this.__universe.creation) {
            case 'wormHole':
            case 'vertical':
                range.min = this.__universe.widthCenter - 2;
                range.max = this.__universe.widthCenter + 2;
                break;
            case 'expandedVertical':
                range.min = this.__universe.widthCenter - (this.__universe.width * .10);
                range.max = this.__universe.widthCenter + (this.__universe.width * .10);
                break;
            case 'compressed':
                range.min = this.__universe.widthCenter - 100;
                range.max = this.__universe.widthCenter + 100;
                break;
            case 'horizontal':
            case 'normal':
                range.min = 0;
                range.max = this.__universe.width;
                break;
            default :
                //code to be executed if n is different from case 1 and 2
        }

        return range;
    },

    __getStarYRange: function() {
        var range = {};
        switch(this.__universe.creation) {
            case 'wormHole':
            case 'horizontal':
                range.min = this.__universe.heightCenter - 2;
                range.max = this.__universe.heightCenter + 2;
                break;
            case 'compressed':
                range.min = this.__universe.heightCenter - 100;
                range.max = this.__universe.heightCenter + 100;
                break;
            case 'expandedVertical':
            case 'vertical':
            case 'normal':
                range.min = 0;
                range.max = this.__universe.height;
                break;
            default :
                break;
        }

        return range;
    },

    __generateXPosition: function() {
        return this.__generateRandomRange(
            this.__getStarXRange()
        );
    },

    __generateYPosition: function() {
        return this.__generateRandomRange(
            this.__getStarYRange()
        );
    },

    __determineXQuadrant: function() {
        return (this.__currentXPosition < this.__universe.widthCenter ? -1 : 1);
    },

    __determineYQuadrant: function() {
        return (this.__currentYPosition < this.__universe.heightCenter ? -1 : 1);
    },

    __getXMin: function() {
        return this.__xQuadrant == 1 ? this.__currentXPosition: 0;
    },

    __getXMax: function() {
        return this.__xQuadrant == 1 ? this.__universe.width: this.__currentXPosition;
    },

    __getYMin: function() {
        return this.__yQuadrant == 1 ? this.__currentYPosition: 0;
    },

    __getYMax: function() {
        return this.__yQuadrant == 1 ? this.__universe.height: this.__currentYPosition;
    },

    __generateX1Position: function() {
        return this.__generateRandomRange(
            {
                'min': this.__getXMin(),
                'max': this.__getXMax()
            }
        );
    },
    __generateY1Position: function() {
        return yPosition = this.__generateRandomRange(
            {
                'min': this.__getYMin(),
                'max': this.__getYMax()
            }
        );
    },

    __generateRandomRange: function(range) {
        return range.min + (Math.random() * ((range.max - range.min) + 1));
    },

}

function Debug() {

}

Debug.prototype = {
    __drawQuadrants: function() {
        this.__ctx.beginPath();
        this.__ctx.moveTo(0,this.__universe.heightCenter);
        this.__ctx.lineTo(this.__universe.width,this.__universe.heightCenter);
        this.__ctx.strokeStyle="#FFFFFF";
        this.__ctx.stroke();

        this.__ctx.beginPath();
        this.__ctx.moveTo(this.__universe.widthCenter, 0);
        this.__ctx.lineTo(this.__universe.widthCenter,this.__universe.height);
        this.__ctx.strokeStyle="#FFFFFF";
        this.__ctx.stroke();
    }
}

$.extend(Constellation.prototype, StarGeneration.prototype);
$.extend(Constellation.prototype, StarMovement.prototype);
$.extend(Universe.prototype, Debug.prototype);
$.extend(Planet.prototype, Constellation.prototype);
$.extend(Plutoid.prototype, Constellation.prototype);
$.extend(Minor.prototype, Constellation.prototype);
$.extend(Dwarf.prototype, Constellation.prototype);
$.extend(Star.prototype, Constellation.prototype);

