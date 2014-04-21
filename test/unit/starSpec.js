/* jasmine specs for Star.js go here */

describe('Star', function() {
    var star, realRandom, ctxMock;

    beforeEach(function() {
        realRandom = Math.random;
        ctxMock = new CTXMock();
        Math.random = function() { return 1;}
        star = new Star('small', ctxMock, new UniverseObjectMock());
    });

    afterEach(function() {
        Math.random = realRandom;
    });

    describe('Initialized variables', function() {
        it('should have a size variable', function() {
            expect(star.__size).toBe('small');
        });

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
            expect(star.__currentXPosition).toBe(351);
        });

        it('should have a currentYPosition variable', function() {
            expect(star.__currentYPosition).toBe(451);
        });

        it('should have a xTrajectory variable', function() {
            expect(star.__speed).toBe(4);
        });

        it('should have a slope variable', function() {
            expect(star.__slope).toBe(1);
        });

        it('should have a slope variable', function() {
            expect(star.__b).toBe(100);
        });

        it('should have a radius delta variable', function() {
            expect(star.__radiusDelta).toBe(undefined);
        });

        it('should have an X Quadrant variable', function() {
            expect(star.__xQuadrant).toBe(1);
        });

        it('should have an Y Quadrant variable', function() {
            expect(star.__yQuadrant).toBe(1);
        });
    });

    describe('Draw Star', function() {
        beforeEach(function() {
            spyOn(ctxMock, 'save');
            spyOn(ctxMock, 'restore');
            spyOn(ctxMock, 'beginPath');
            spyOn(ctxMock, 'closePath');
            spyOn(ctxMock, 'arc');
            spyOn(ctxMock, 'fill');
            spyOn(ctxMock, 'stroke');
        });

        it('should call ctx.save', function() {
            star.draw();
            expect(ctxMock.save).toHaveBeenCalled();
        });

        it('should call ctx.restore', function() {
            star.draw();
            expect(ctxMock.restore).toHaveBeenCalled();
        });

        it('should call ctx.beginPath', function() {
            star.draw();
            expect(ctxMock.beginPath).toHaveBeenCalled();
        });

        it('should call ctx.arc', function() {
            star.draw();
            expect(ctxMock.arc).toHaveBeenCalledWith(
                351,
                451,
                0.5,
                0,
                6.283185307179586
            );
        });

        it('should call ctx.lineWidth', function() {
            star.draw();
            expect(ctxMock.lineWidth).toBe(1);
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

        it('should call ctx.closePath', function() {
            star.draw();
            expect(ctxMock.closePath).toHaveBeenCalled();
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
                expect(star.__currentXPosition).toBe(351);
                star.update();
                expect(star.__currentXPosition).toBe(355);
            });

            it('should increment the currentYPosition', function() {
                expect(star.__currentYPosition).toBe(451);
                star.update();
                expect(star.__currentYPosition).toBe(455);
            });
        });

        describe('Star is not visible', function() {
            beforeEach(function() {
                star.isStarVisible = function() {return false;}
            });

            it('should increment the currentXPosition', function() {
                expect(star.__currentXPosition).toBe(351);
                star.update();
                expect(star.__currentXPosition).toBe(351);
            });

            it('should increment the currentYPosition', function() {
                expect(star.__currentYPosition).toBe(451);
                star.update();
                expect(star.__currentYPosition).toBe(451);
            });
        });
    });
});
