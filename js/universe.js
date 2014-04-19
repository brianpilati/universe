function Universe(starCount) {
    init: {
        this.buildUniverse(starCount);
    }
}

Universe.prototype = {
    buildUniverse: function(starCount) {
        this.__initializeVariables(starCount);
        this.__createCanvas();
        this.__createUniverse();
        //this.__renderUniverse();
        var self = this;
        setInterval(function() {self.__renderUniverse()}, 33);
    },

    __createCanvas: function() {
        var canvas = document.createElement("canvas");
        canvas.width = this.__universe.width;
        canvas.height = this.__universe.height;
        $('#space').html(canvas);
        this.__ctx = canvas.getContext("2d");
    },

    __createUniverse: function() {
        for(index=0;index < this.__starCount; index++) {
            this.__stars.push(new Star(this.__ctx, this.__universe));
        }
    },

    __renderUniverse: function() {
        this.__ctx.clearRect(0, 0, this.__universe.width, this.__universe.height);
        $.each(this.__stars, function( index, star) {
            star.draw();
            star.update();
        });
    },

    __buildUniverseObject: function() {
        var width = parseInt($('#universe').css('width'), 10);
        var height =  parseInt($('#universe').css('height'), 10);
        return {
            'width': width,
            'height': height,
            'heightCenter': height/2,
            'widthCenter': width/2
        };
    },

    __initializeVariables: function(starCount) {
        this.__starCount = starCount || 2;
        this.__stars = [];
        this.__ctx = undefined;
        this.__universe = this.__buildUniverseObject();
    }
}

function Star(ctx, universe) {
    init: {
        this.__initializeVariables(ctx, universe);
    }
}

Star.prototype = {
    draw: function() {
        this.__ctx.beginPath();
        this.__ctx.arc(
            this.__currentXPosition,
            this.__currentYPosition,
            this.__radius,
            0,
            2*Math.PI
        );
        this.__ctx.fillStyle="#FFFFFF";
        this.__ctx.fill();
        this.__ctx.strokeStyle="#FFFFFF";
        this.__ctx.stroke();
    },

    update: function() {
        if (this.__isStarVisible()) {
            this.__currentXPosition += this.__speed;
            this.__currentYPosition = this.__calculateYTrajectory();
        } else {
            this.__buildStarSpeed();
        }
    },

    __isStarVisible: function() {
        if (
            (
                (this.__currentXPosition > this.__universe.width) ||
                (this.__currentXPosition < 0)
            ) ||
            (
                (this.__currentYPosition > this.__universe.height) ||
                (this.__currentYPosition < 0)
            )
        ){
            return false
        } else {
            return true;
        };
    },

    __calculateYTrajectory: function() {
        return this.__slope * this.__currentXPosition + this.__b;
    },

    __generateRandom: function(max) {
        return Math.random() * max + 1;
    },

    __generateRandomRange: function(min,max) {
        return min + (Math.random() * ((max - min) + 1));
    },

    __buildStarSpeed: function() {
        this.__currentXPosition = this.__generateXPosition();
        this.__currentYPosition = this.__generateYPosition();

        this.__xQuadrant = this.__determineXQuadrant();
        this.__yQuadrant = this.__determineYQuadrant();

        var x1 = this.__generateX1Position();
        var y1 = this.__generateY1Position();

        this.__slope = (y1 - this.__currentYPosition) / (x1 - this.__currentXPosition);
        //console.log(this.__slope);
        this.__b = y1 - (this.__slope * x1);

        this.__speed = this.__determineSpeed(x1, y1);
    },

    __determineSpeed: function(x, y) {
        var speed = 2;
        if (
            (
                this.__universe.widthCenter - 50 < x &&
                x < this.__universe.widthCenter + 50
            ) && (
                this.__universe.heightCenter - 50 < y &&
                y < this.__universe.heightCenter + 50
            )
        ) {
            speed = .4;
        }

        return this.__xQuadrant == 1 ? speed : -1 * speed;
    },

    __generateXPosition: function() {
        return this.__generateRandomRange(
            //0,
            //this.__universe.width
            this.__universe.widthCenter - 2,
            this.__universe.widthCenter + 2
        );
    },

    __generateYPosition: function() {
        return this.__generateRandomRange(
            //0,
            //this.__universe.height
            this.__universe.heightCenter - 2,
            this.__universe.heightCenter + 2
        );
    },

    __determineXQuadrant: function() {
        return this.__currentXPosition < this.__universe.widthCenter ? -1 : 1;
    },

    __determineYQuadrant: function() {
        return this.__currentYPosition < this.__universe.heightCenter ? -1 : 1;
    },

    __getXMin: function() {
        return this.__xQuadrant == 1 ? this.__universe.widthCenter : 0;
    },

    __getXMax: function() {
        return this.__xQuadrant == 1 ? this.__universe.width: this.__universe.widthCenter;
    },

    __getYMin: function() {
        return this.__yQuadrant == 1 ? this.__universe.heightCenter : 0;
    },

    __getYMax: function() {
        return this.__yQuadrant == 1 ? this.__universe.height: this.__universe.heightCenter;
    },

    __generateX1Position: function() {
        return this.__generateRandomRange(
            this.__getXMin(),
            this.__getXMax()
        );
    },

    __generateY1Position: function() {
        return yPosition = this.__generateRandomRange(
            this.__getYMin(),
            this.__getYMax()
        );
    },

    __initializeVariables: function(ctx, universe) {
        this.__ctx = ctx;
        this.__slope = undefined;
        this.__b = undefined;
        this.__universe = universe;
        this.__buildStarSpeed();
        this.__radius = .5;
    }
}
