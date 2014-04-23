function Creation() {
    init: {
        this.__initializeVariables();
    }
}

Creation.prototype = {
    erase: function() {
        this.__universe.__eraseUniverse();
    },

    getXCenter: function() {
        return this.__universe.__universe.widthCenter;
    },

    setXPosition: function(xPosition) {
        this.__body.__currentXPosition = xPosition;
    },

    getYCenter: function() {
        return this.__universe.__universe.heightCenter;
    },

    setYPosition: function(yPosition) {
        this.__body.__currentYPosition = yPosition;
    },

    getRadius: function() {
        return this.__body.__radius;
    },

    setRadius: function(radius) {
        this.__body.__radius = radius;
    },

    draw: function() {
        this.__body.draw();
    },

    update: function() {
        this.__body.update();
    },

    setBody: function(bodyType) {
        this.__body = this.__bodies[bodyType];
    },

    __buildBodiesObject: function() {
        return {
            'planet': new Planet(this.__universe.__ctx, this.__universe.__universe),
            'dwarf': new Dwarf(this.__universe.__ctx, this.__universe.__universe),
            'minor': new Minor(this.__universe.__ctx, this.__universe.__universe),
            'plutoid': new Plutoid(this.__universe.__ctx, this.__universe.__universe),
            'star': new Star(this.__universe.__ctx, this.__universe.__universe)
        };
    },

    __initializeVariables: function() {
        this.__universe = new Universe(-1);
        this.erase();
        this.__bodies = this.__buildBodiesObject();
        this.setBody('planet');
    }
}
