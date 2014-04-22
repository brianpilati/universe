/* jasmine specs for Planet.js go here */

describe('Planet', function() {
    var planet;

    beforeEach(function() {
        ctxMock = new CTXMock();
        planet = new Planet(ctxMock, new UniverseObjectMock());
    });

    describe('Initialized variables', function() {
        it('should have a speed original variable', function() {
            expect(planet.__speedOriginal).toBe(1);
        });

        it('should have a radius delta variable', function() {
            expect(planet.__radiusDelta).toBe(0.5);
        });

        it('should have a radius Original variable', function() {
            expect(planet.__radiusOriginal).toBe(1);
        });

        it('should have a __fillStyle variable', function() {
            expect(planet.__fillStyle).toBe('#8888FF');
        })

        it('should have a __strokeStyle variable', function() {
            expect(planet.__strokeStyle).toBe('#000000');
        });
    });

    describe('Draw Planet', function() {
        beforeEach(function() {
            spyOn(planet, '__ring');
            spyOn(planet, '__orb');
            spyOn(planet, '__glow');
            spyOn(planet, '__shadow');
            spyOn(planet, '__crater');
        });

        it('should call __ring', function() {
            planet.draw();
            expect(planet.__ring).toHaveBeenCalledWith('#BBBBFF', 0, 6.283185307179586);
        });

        it('should call __orb', function() {
            planet.draw();
            expect(planet.__orb).toHaveBeenCalled();
        });

        it('should call __shadow', function() {
            planet.draw();
            expect(planet.__shadow).toHaveBeenCalledWith('grey', 1.8849555921538759, 5.026548245743669);
        });

        it('should call __glow', function() {
            planet.draw();
            expect(planet.__glow).toHaveBeenCalledWith('#0000FF', 10);
        });

        it('should call __crater', function() {
            planet.draw();
            expect(planet.__crater).toHaveBeenCalled();
            expect(planet.__crater.callCount).toBe(8);
        });

        it('should call __ring', function() {
            planet.draw();
            expect(planet.__ring).toHaveBeenCalledWith('#BBBBFF', 0.7853981633974483, 4.71238898038469);
        });

        it('should call __ring twice', function() {
            planet.draw();
            expect(planet.__ring.callCount).toBe(2);
        });
    });
});
