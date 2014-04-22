/* jasmine specs for Constellation.js go here */

describe('Constellation', function() {
    var constellation, realRandom, ctxMock;

    beforeEach(function() {
        realRandom = Math.random;
        ctxMock = new CTXMock();
        Math.random = function() { return 1;}
        constellation = new Constellation(ctxMock, new UniverseObjectMock());
    });

    afterEach(function() {
        Math.random = realRandom;
    });

    describe('Initialized variables', function() {
        it('should have a ctx object', function() {
            expect(constellation.__ctx).toBeDefined();
        });

        it('should have a universe.height variable', function() {
            expect(constellation.__universe.height).toBe(500);
        });

        it('should have a universe.width variable', function() {
            expect(constellation.__universe.width).toBe(700);
        });

        it('should have a currentXPosition variable', function() {
            expect(constellation.__currentXPosition).toBe(351);
        });

        it('should have a currentYPosition variable', function() {
            expect(constellation.__currentYPosition).toBe(451);
        });

        it('should have a speed variable', function() {
            expect(constellation.__speed).toBe(undefined);
        });

        it('should have a speed original variable', function() {
            expect(constellation.__speedOriginal).toBe(undefined);
        });

        it('should have a slope variable', function() {
            expect(constellation.__slope).toBe(1);
        });

        it('should have a slope variable', function() {
            expect(constellation.__b).toBe(100);
        });

        it('should have a radius delta variable', function() {
            expect(constellation.__radiusDelta).toBe(undefined);
        });

        it('should have a radius Original variable', function() {
            expect(constellation.__radiusOriginal).toBe(undefined);
        });

        it('should have a radius variable', function() {
            expect(constellation.__radius).toBe(undefined);
        });

        it('should have an X Quadrant variable', function() {
            expect(constellation.__xQuadrant).toBe(1);
        });

        it('should have an Y Quadrant variable', function() {
            expect(constellation.__yQuadrant).toBe(1);
        });
    });

    describe('Draw Orb Constellation', function() {
        beforeEach(function() {
            constellation.__fillStyle = "#FFFFFF";
            constellation.__strokeStyle = "#FFFFFF";
            constellation.__radius = 0.5;
            constellation.__radiusDelta = 0;
            spyOn(ctxMock, 'save');
            spyOn(ctxMock, 'restore');
            spyOn(ctxMock, 'beginPath');
            spyOn(ctxMock, 'closePath');
            spyOn(ctxMock, 'arc');
            spyOn(ctxMock, 'fill');
            spyOn(ctxMock, 'stroke');
        });

        it('should call ctx.save', function() {
            constellation.__orb();
            expect(ctxMock.save).toHaveBeenCalled();
        });

        it('should call ctx.restore', function() {
            constellation.__orb();
            expect(ctxMock.restore).toHaveBeenCalled();
        });

        it('should call ctx.beginPath', function() {
            constellation.__orb();
            expect(ctxMock.beginPath).toHaveBeenCalled();
        });

        it('should call ctx.arc', function() {
            constellation.__orb();
            expect(ctxMock.arc).toHaveBeenCalledWith(
                351,
                451,
                0.5,
                0,
                6.283185307179586
            );
        });

        it('should call ctx.lineWidth', function() {
            constellation.__orb();
            expect(ctxMock.lineWidth).toBe(undefined);
        });

        it('should call ctx.fillStyle', function() {
            constellation.__orb();
            expect(ctxMock.fillStyle).toBe('#FFFFFF');
        });

        it('should call ctx.fill', function() {
            constellation.__orb();
            expect(ctxMock.fill).toHaveBeenCalled();
        });

        it('should call ctx.strokeStyle', function() {
            constellation.__orb();
            expect(ctxMock.strokeStyle).toBe('#FFFFFF');
        });

        it('should call ctx.stroke', function() {
            constellation.__orb();
            expect(ctxMock.stroke).not.toHaveBeenCalled();
        });

        it('should call ctx.closePath', function() {
            constellation.__orb();
            expect(ctxMock.closePath).toHaveBeenCalled();
        });
    });

    describe('Draw Crater Constellation', function() {
        beforeEach(function() {
            constellation.__currentXPosition = 200;
            constellation.__currentYPosition = 200;
            constellation.__radius = 10;
            constellation.__fillStyle = "#FFFFFF";
            spyOn(ctxMock, 'save');
            spyOn(ctxMock, 'restore');
            spyOn(ctxMock, 'beginPath');
            spyOn(ctxMock, 'closePath');
            spyOn(ctxMock, 'arc');
            spyOn(ctxMock, 'fill');
            spyOn(ctxMock, 'clip');
        });

        it('should call ctx.save', function() {
            constellation.__crater(.5, 1.45);
            expect(ctxMock.save).toHaveBeenCalled();
        });

        it('should call ctx.beginPath', function() {
            constellation.__crater(.5, 1.45);
            expect(ctxMock.beginPath).toHaveBeenCalled();
        });

        it('should call ctx.fillStyle', function() {
            constellation.__crater(.5, 1.45);
            expect(ctxMock.fillStyle).toBe(undefined);
        });

        it('should call ctx.arc', function() {
            constellation.__crater(.5, 1.45);
            expect(ctxMock.arc).toHaveBeenCalledWith(
                200,
                200,
                10,
                0,
                6.283185307179586
            );
        });

        it('should call ctx.clip', function() {
            constellation.__crater(.5, 1.45);
            expect(ctxMock.clip).toHaveBeenCalled();
        });

        it('should call ctx.fill', function() {
            constellation.__crater(.5, 1.45);
            expect(ctxMock.fill).toHaveBeenCalled();
        });

        it('should call ctx.closePath', function() {
            constellation.__crater(.5, 1.45);
            expect(ctxMock.closePath).toHaveBeenCalled();
        });

        it('should call ctx.restore', function() {
            constellation.__crater(.5, 1.45);
            expect(ctxMock.restore).toHaveBeenCalled();
        });
    });

    describe('Update Constellation', function() {
        var realIsConstellationVisible;
        beforeEach(function() {
            constellation.__speed = 4;
            realIsConstellationVisible = constellation.__isConstellationVisible;
        });

        afterEach(function() {
            constellation.__isConstellationVisible = realIsConstellationVisible;
        });

        describe('Constellation is visible', function() {
            beforeEach(function() {
                constellation.isConstellationVisible = function() {return true;}
            });

            it('should increment the currentXPosition', function() {
                expect(constellation.__currentXPosition).toBe(351);
                constellation.update();
                expect(constellation.__currentXPosition).toBe(355);
            });

            it('should increment the currentYPosition', function() {
                expect(constellation.__currentYPosition).toBe(451);
                constellation.update();
                expect(constellation.__currentYPosition).toBe(455);
            });
        });

        describe('Constellation is not visible', function() {
            beforeEach(function() {
                constellation.isConstellationVisible = function() {return false;}
            });

            it('should increment the currentXPosition', function() {
                expect(constellation.__currentXPosition).toBe(351);
                constellation.update();
                expect(constellation.__currentXPosition).toBe(351);
            });

            it('should increment the currentYPosition', function() {
                expect(constellation.__currentYPosition).toBe(451);
                constellation.update();
                expect(constellation.__currentYPosition).toBe(451);
            });
        });
    });
});
