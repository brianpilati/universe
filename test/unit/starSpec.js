/* jasmine specs for Star.js go here */

describe('Star', function() {
    var star;

    beforeEach(function() {
        ctxMock = new CTXMock();
        star = new Star(ctxMock, new UniverseObjectMock());
    });

    describe('Initialized variables', function() {
        it('should have a speed original variable', function() {
            expect(star.__speedOriginal).toBe(4);
        });

        it('should have a radius delta variable', function() {
            expect(star.__radiusDelta).toBe(0);
        });

        it('should have a radius Original variable', function() {
            expect(star.__radiusOriginal).toBe(1);
        });

        it('should have a __fillStyle variable', function() {
            expect(star.__fillStyle).toBe('#FFFFFF');
        })

        it('should have a __strokeStyle variable', function() {
            expect(star.__strokeStyle).toBe('#FFFFFF');
        });
    });

    describe('Draw Star', function() {
        beforeEach(function() {
            spyOn(star, '__orb');
        });

        it('should call __orb', function() {
            star.draw();
            expect(star.__orb).toHaveBeenCalled();
        });
    });
});
