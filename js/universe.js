var smallStars = .685;
var mediumStars = .25;
var largeStars = .05;
var novaStars = .01;
var planetStars = 1;

function Universe(starCount) {
    init: {
        this.buildUniverse(starCount);
        this.__interval = undefined;
    }
}

Universe.prototype = {
    buildUniverse: function(starCount) {
        this.__initializeVariables(starCount);
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
        for(index=0;index < parseInt(this.__starCount * smallStars); index++) {
            this.__stars.small.push(new Star('small', this.__ctx, this.__universe));
        }

        for(index=0;index < parseInt(this.__starCount * mediumStars); index++) {
            this.__stars.medium.push(new Star('medium', this.__ctx, this.__universe));
        }

        for(index=0;index < parseInt(this.__starCount * largeStars); index++) {
            this.__stars.large.push(new Star('large', this.__ctx, this.__universe));
        }

        for(index=0;index < parseInt(this.__starCount * novaStars); index++) {
            this.__stars.nova.push(new Star('nova', this.__ctx, this.__universe));
        }

        for(index=0;index < planetStars; index++) {
            this.__stars.planet.push(new Star('planet', this.__ctx, this.__universe));
        }
    },

    __superNovaUniverse: function() {
        $.each(this.__stars, function(index, category) {
            $.each(category, function(jndex, star) {
                delete star;
            });
        });

        this.__stars = this.__buildStarObject();
    },

    __resetUniverse: function() {
        this.__superNovaUniverse();
        this.__createUniverse();
        this.__renderUniverse();
    },

    __renderUniverse: function() {
        this.__ctx.clearRect(0, 0, this.__universe.width, this.__universe.height);
        //this.__drawQuadrants(); /*debug*/
        //Order matters
        $.each(this.__stars.small, function( index, star) {
            star.draw();
            star.update();
        });

        if (this.__stars.medium.length) {
            $.each(this.__stars.medium, function( index, star) {
                star.draw();
                star.update();
            });
        }

        if (this.__stars.large.length) {
            $.each(this.__stars.large, function( index, star) {
                star.draw();
                star.update();
            });
        }

        if (this.__stars.nova.length) {
            $.each(this.__stars.nova, function( index, star) {
                star.draw();
                star.update();
            });
        }

        if (this.__stars.planet.length) {
            $.each(this.__stars.planet, function( index, star) {
                star.draw();
                star.update();
            });
        }
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

    __buildStarObject: function() {
        return {
            'small': [],
            'medium': [],
            'large': [],
            'nova': [],
            'planet': []
        };
    },

    __initializeVariables: function(starCount) {
        this.__starCount = starCount || 4;
        this.__stars = this.__buildStarObject();
        this.__ctx = undefined;
        this.__universe = this.__buildUniverseObject();
    }
}

function Star(size, ctx, universe) {
    init: {
        this.__initializeVariables(size, ctx, universe);
    }
}

Star.prototype = {
    draw: function() {
        this.__ctx.save();
        this.__ctx.beginPath();
        this.__ctx.arc(
            this.__currentXPosition,
            this.__currentYPosition,
            this.__radius,
            0,
            2*Math.PI,
            false
        );
        this.__ctx.fillStyle = this.__fillStyle;
        this.__ctx.strokeStyle = this.__strokeStyle;
        this.__ctx.closePath();
        this.__ctx.fill();
        this.__ctx.stroke();

        if (this.__size === 'planet' || this.__size === 'nova' || this.__size === 'large') {
            this.__ctx.beginPath();
            this.__ctx.arc(
                this.__currentXPosition,
                this.__currentYPosition,
                this.__radius,
                0,
                2*Math.PI,
                false
            );
            this.__ctx.clip();

            this.__ctx.beginPath();
            this.__ctx.strokeStyle = 'black';
            this.__ctx.lineWidth = 5;
            this.__ctx.shadowBlur = 15 + this.__radiusDelta;
            this.__ctx.shadowColor = 'black';
            this.__ctx.shadowOffsetX = 2;
            this.__ctx.shadowOffsetY = 2;
            this.__ctx.arc(
                this.__currentXPosition,
                this.__currentYPosition,
                this.__radius + 3,
                0,
                2*Math.PI,
                false
            );
            this.__ctx.stroke();
        }

        this.__ctx.lineWidth = 1;
        this.__ctx.shadowBlur = 0;
        this.__ctx.shadowColor = 'black';
        this.__ctx.shadowOffsetX = 0;
        this.__ctx.shadowOffsetY = 0;

        this.__ctx.restore();
    },

    update: function() {
        if (this.isStarVisible()) {
            this.__currentXPosition += this.__speed;
            this.__currentYPosition = this.__calculateYTrajectory();
            this.__radius += this.__radiusDelta;
            //this.__radius;
        } else {
            this.__buildStarSpeed();
        }
    },

    __initializeVariables: function(size, ctx, universe) {
        this.__size = size;
        this.__ctx = ctx;
        this.__slope = undefined;
        this.__b = undefined;
        this.__universe = universe;
        this.__buildStarSpeed();
        this.__radius = .5;
        this.__radiusDelta = undefined;
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

    isStarVisible: function() {
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
        var speed;
        if (this.__size === 'small') {
            speed = 4;
            this.__radius = 0.5;
            this.__radiusDelta = 0;
            this.__strokeStyle = "#FFFFFF";
            this.__fillStyle = "#FFFFFF";
        } else if (this.__size === 'medium') {
            speed = 3;
            this.__radius = 2;
            this.__radiusDelta = 0.02;
            this.__fillStyle = "#99CC99";
            this.__strokeStyle = "#000000";
        } else if (this.__size === 'large') {
            speed = 2;
            this.__radius = 4;
            this.__radiusDelta = 0.05;
            this.__fillStyle = "#CC6633";
            this.__strokeStyle = "#000000";
        } else if (this.__size === 'nova') {
            speed = 1.5;
            this.__radius = 6;
            this.__radiusDelta = 0.075;
            this.__fillStyle = "#CC33FF";
            this.__strokeStyle = "#000000";
        } else if (this.__size === 'planet') {
            speed = 1;
            this.__radius = 10;
            this.__radiusDelta = 1;
            this.__fillStyle = "#8888FF";
            this.__strokeStyle = "#000000";
        }

        this.__speed = this.__xQuadrant == 1 ? speed : -1 * speed;
    },

    __getStarXRange: function() {
        var range = {};
        switch(this.__universe.creation) {
            case 'vertical':
                range.min = this.__universe.widthCenter - 2;
                range.max = this.__universe.widthCenter + 2;
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
            case 'horizontal':
                range.min = this.__universe.heightCenter - 2;
                range.max = this.__universe.heightCenter + 2;
                break;
            case 'compressed':
                range.min = this.__universe.heightCenter - 100;
                range.max = this.__universe.heightCenter + 100;
                break;
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

$.extend(Star.prototype, StarGeneration.prototype);
$.extend(Star.prototype, StarMovement.prototype);
$.extend(Universe.prototype, Debug.prototype);
