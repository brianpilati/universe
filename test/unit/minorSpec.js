/* jasmine specs for Minor.js go here */

describe('Minor', function() {
    var minor;

    beforeEach(function() {
        ctxMock = new CTXMock();
        minor = new Minor(ctxMock, new UniverseObjectMock());
    });

    describe('Initialized variables', function() {
        it('should have a speed original variable', function() {
            expect(minor.__speedOriginal).toBe(2);
        });

        it('should have a radius delta variable', function() {
            expect(minor.__radiusDelta).toBe(0.025);
        });

        it('should have a radius Original variable', function() {
            expect(minor.__radiusOriginal).toBe(1);
        });

        it('should have a __fillStyle variable', function() {
            expect(minor.__fillStyle).toBe('#CC6633');
        })

        it('should have a __strokeStyle variable', function() {
            expect(minor.__strokeStyle).toBe('#000000');
        });
    });

    describe('Draw Minor', function() {
        beforeEach(function() {
            spyOn(minor, '__orb');
            spyOn(minor, '__shadow');
        });

        it('should call __orb', function() {
            minor.draw();
            expect(minor.__orb).toHaveBeenCalled();
        });

        it('should call __shadow', function() {
            minor.draw();
            expect(minor.__shadow).toHaveBeenCalledWith('grey', 1.8849555921538759, 5.026548245743669);
        });
    });
});
