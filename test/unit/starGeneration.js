/* jasmine specs for Star Generation.js go here */

describe('Star Generation', function() {
    var starGeneration;

    beforeEach(function() {
        starGeneration = new StarGeneration();
        starGeneration.__universe = new UniverseObjectMock();
    });

    describe('getStarXRange', function() {
        it('should have a compressed X Range', function() {
            var range = starGeneration.__getStarXRange();
            expect(range.min).toBe(150);
            expect(range.max).toBe(350);
        });

        it('should have a vertical X Range', function() {
            starGeneration.__universe.creation = 'vertical';
            var range = starGeneration.__getStarXRange();
            expect(range.min).toBe(248);
            expect(range.max).toBe(252);
        });

        it('should have a normal X Range', function() {
            starGeneration.__universe.creation = 'normal';
            var range = starGeneration.__getStarXRange();
            expect(range.min).toBe(0);
            expect(range.max).toBe(700);
        });

        it('should have a horizontal X Range', function() {
            starGeneration.__universe.creation = 'horizontal';
            var range = starGeneration.__getStarXRange();
            expect(range.min).toBe(0);
            expect(range.max).toBe(700);
        });
    });

    describe('getStarYRange', function() {
        it('should have a compressed Y Range', function() {
            var range = starGeneration.__getStarYRange();
            expect(range.min).toBe(250);
            expect(range.max).toBe(450);
        });

        it('should have a normal Y Range', function() {
            starGeneration.__universe.creation = 'normal';
            var range = starGeneration.__getStarYRange();
            expect(range.min).toBe(0);
            expect(range.max).toBe(500);
        });

        it('should have a vertical Y Range', function() {
            starGeneration.__universe.creation = 'vertical';
            var range = starGeneration.__getStarYRange();
            expect(range.min).toBe(0);
            expect(range.max).toBe(500);
        });

        it('should have a horizontal Y Range', function() {
            starGeneration.__universe.creation = 'horizontal';
            var range = starGeneration.__getStarYRange();
            expect(range.min).toBe(348);
            expect(range.max).toBe(352);
        });
    });

    describe('determineSlope', function() {
        beforeEach(function() {
            starGeneration.__universe.heightCenter = 20;
            starGeneration.__universe.widthCenter = 20;
        });

        it('should have a negative slope in Quadrant IV', function() {
            starGeneration.__currentXPosition = 19;
            starGeneration.__currentYPosition = 19;
            starGeneration.__xQuadrant = starGeneration.__determineXQuadrant();
            starGeneration.__yQuadrant = starGeneration.__determineYQuadrant();
            var x2 = 9;
            var y2 = 9;
            starGeneration.__slope = starGeneration.__determineSlope(x2, y2);
            expect(starGeneration.__xQuadrant).toBe(-1);
            expect(starGeneration.__yQuadrant).toBe(-1);
            expect(starGeneration.__slope).toBe(1);
            expect(starGeneration.__determineYIntercept(x2, y2)).toBe(0);
        });

        it('should have a negative slope in Quadrant II', function() {
            starGeneration.__currentXPosition = 21;
            starGeneration.__currentYPosition = 21;
            starGeneration.__xQuadrant = starGeneration.__determineXQuadrant();
            starGeneration.__yQuadrant = starGeneration.__determineYQuadrant();
            var x2 = 31;
            var y2 = 31;
            starGeneration.__slope = starGeneration.__determineSlope(x2, y2);
            expect(starGeneration.__xQuadrant).toBe(1);
            expect(starGeneration.__yQuadrant).toBe(1);
            expect(starGeneration.__slope).toBe(1);
            expect(starGeneration.__determineYIntercept(x2, y2)).toBe(0);
        });

        it('should have a positive slope', function() {
            starGeneration.__currentXPosition = 0;
            starGeneration.__currentYPosition = 0;
            var x2 = -2;
            var y2 = -2;
            var slope = starGeneration.__determineSlope(x2, y2);
            expect(slope).toBe(1);
        });

        it('should have a positive slope', function() {
            starGeneration.__currentXPosition = 0;
            starGeneration.__currentYPosition = 0;
            var x2 = 2;
            var y2 = 2;
            var slope = starGeneration.__determineSlope(x2, y2);
            expect(slope).toBe(1);
        });
    });
});
