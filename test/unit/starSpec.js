/* jasmine specs for Star.js go here */

describe('Star', function() {
    var star, realRandom, ctxMock;

    beforeEach(function() {
        realRandom = Math.random;
        ctxMock = new CTXMock();
        Math.random = function() { return 1;}
        star = new Star(ctxMock, new UniverseObjectMock());
    });

    afterEach(function() {
        Math.random = realRandom;
    });

    describe('Initialized variables', function() {
        it('should have a ctx object', function() {
            expect(star.__ctx).toBeDefined();
        });

        it('should have a universe.height variable', function() {
            expect(star.__universe.height).toBe(500);
        });

        it('should have a universe.width variable', function() {
            expect(star.__universe.width).toBe(700);
        });

        it('should have a currentXPosition variable', function() {
            expect(star.__currentXPosition).toBe(253);
        });

        it('should have a currentYPosition variable', function() {
            expect(star.__currentYPosition).toBe(353);
        });

        it('should have a xTrajectory variable', function() {
            expect(star.__speed).toBe(2);
        });

        it('should have a slope variable', function() {
            expect(star.__slope).toBe(0.33035714285714285);
        });

        it('should have a slope variable', function() {
            expect(star.__b).toBe(269.4196428571429);
        });

        it('should have an X Quadrant variable', function() {
            expect(star.__xQuadrant).toBe(1);
        });

        it('should have an Y Quadrant variable', function() {
            expect(star.__yQuadrant).toBe(1);
        });
    });

    describe('Is star visible', function() {
        it('should have a true variable', function() {
            star.__currentXPosition = 0;
            star.__universe.width = 1;
            star.__currentYPosition = 0;
            star.__universe.height = 1;
            expect(star.__isStarVisible()).toBe(true);
        });

        it('should have a true variable', function() {
            star.__currentXPosition = 0;
            star.__universe.width = 0;
            star.__currentYPosition = 0;
            star.__universe.height = 1;
            expect(star.__isStarVisible()).toBe(true);
        });

        it('should have a true variable', function() {
            star.__currentXPosition = 0;
            star.__universe.width = 1;
            star.__currentYPosition = 0;
            star.__universe.height = 0;
            expect(star.__isStarVisible()).toBe(true);
        });

        it('should have a false variable', function() {
            star.__currentXPosition = 1;
            star.__universe.width = 0;
            star.__currentYPosition = 0;
            star.__universe.height = 1;
            expect(star.__isStarVisible()).toBe(false);
        });

        it('should have a false variable', function() {
            star.__currentXPosition = 0;
            star.__universe.width = 1;
            star.__currentYPosition = 1;
            star.__universe.height = 0;
            expect(star.__isStarVisible()).toBe(false);
        });

        it('should have a false variable', function() {
            star.__currentXPosition = 1;
            star.__universe.width = 0;
            star.__currentYPosition = 1;
            star.__universe.height = 0;
            expect(star.__isStarVisible()).toBe(false);
        });
    });

    describe('Draw Star', function() {
        beforeEach(function() {
            spyOn(ctxMock, 'beginPath');
            spyOn(ctxMock, 'arc');
            spyOn(ctxMock, 'fill');
            spyOn(ctxMock, 'stroke');
        });

        it('should call ctx.beginPath', function() {
            star.draw();
            expect(ctxMock.beginPath).toHaveBeenCalled();
        });

        it('should call ctx.arc', function() {
            star.draw();
            expect(ctxMock.arc).toHaveBeenCalledWith(
                253,
                353,
                0.5,
                0,
                6.283185307179586
            );
        });

        it('should call ctx.fillStyle', function() {
            star.draw();
            expect(ctxMock.fillStyle).toBe('#FFFFFF');
        });

        it('should call ctx.fill', function() {
            star.draw();
            expect(ctxMock.fill).toHaveBeenCalled();
        });

        it('should call ctx.strokeStyle', function() {
            star.draw();
            expect(ctxMock.strokeStyle).toBe('#FFFFFF');
        });

        it('should call ctx.stroke', function() {
            star.draw();
            expect(ctxMock.stroke).toHaveBeenCalled();
        });
    });

    describe('Update Star', function() {
        var realIsStarVisible;
        beforeEach(function() {
            realIsStarVisible = star.__isStarVisible;
        });

        afterEach(function() {
            star.__isStarVisible = realIsStarVisible;
        });

        describe('Star is visible', function() {
            beforeEach(function() {
                star.__isStarVisible = function() {return true;}
            });

            it('should increment the currentXPosition', function() {
                expect(star.__currentXPosition).toBe(253);
                star.update();
                expect(star.__currentXPosition).toBe(255);
            });

            it('should increment the currentYPosition', function() {
                expect(star.__currentYPosition).toBe(353);
                star.update();
                expect(star.__currentYPosition).toBe(353.66071428571433);
            });
        });

        describe('Star is not visible', function() {
            beforeEach(function() {
                star.__isStarVisible = function() {return false;}
            });

            it('should increment the currentXPosition', function() {
                expect(star.__currentXPosition).toBe(253);
                star.update();
                expect(star.__currentXPosition).toBe(253);
            });

            it('should increment the currentYPosition', function() {
                expect(star.__currentYPosition).toBe(353);
                star.update();
                expect(star.__currentYPosition).toBe(353);
            });
        });
    });
});
