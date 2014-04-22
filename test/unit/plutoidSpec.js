/* jasmine specs for Plutoid.js go here */

describe('Plutoid', function() {
    var plutoid;

    beforeEach(function() {
        ctxMock = new CTXMock();
        plutoid = new Plutoid(ctxMock, new UniverseObjectMock());
    });

    describe('Initialized variables', function() {
        it('should have a speed original variable', function() {
            expect(plutoid.__speedOriginal).toBe(3);
        });

        it('should have a radius delta variable', function() {
            expect(plutoid.__radiusDelta).toBe(0.015);
        });

        it('should have a radius Original variable', function() {
            expect(plutoid.__radiusOriginal).toBe(1);
        });

        it('should have a __fillStyle variable', function() {
            expect(plutoid.__fillStyle).toBe('#99CC99');
        })

        it('should have a __strokeStyle variable', function() {
            expect(plutoid.__strokeStyle).toBe('#000000');
        });
    });

    describe('Draw Plutoid', function() {
        beforeEach(function() {
            spyOn(plutoid, '__orb');
        });

        it('should call __orb', function() {
            plutoid.draw();
            expect(plutoid.__orb).toHaveBeenCalled();
        });
    });
});
