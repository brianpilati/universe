/* jasmine specs for Planet.js go here */

describe('Planet', function() {
    var planet;

    beforeEach(function() {
        ctxMock = new CTXMock();
        planet = new Planet(ctxMock, new UniverseObjectMock());
    });

    describe('Initialized variables', function() {
        it('should have a size variable', function() {
            expect(planet.__size).toBe('planet');
        });
    });

    describe('Draw Planet', function() {
        beforeEach(function() {
            spyOn(planet, '__ring');
            spyOn(planet, '__orb');
            spyOn(planet, '__shadow2');
        });

        it('should call __ring', function() {
            planet.draw();
            expect(planet.__ring).toHaveBeenCalledWith('red', 0, 6.283185307179586);
        });

        it('should call __orb', function() {
            planet.draw();
            expect(planet.__orb).toHaveBeenCalled();
        });

        it('should call __shadow2', function() {
            planet.draw();
            expect(planet.__shadow2).toHaveBeenCalled();
        });

        it('should call __ring', function() {
            planet.draw();
            expect(planet.__ring).toHaveBeenCalledWith('red', 0.7853981633974483, 4.71238898038469);
        });

        it('should call __ring twice', function() {
            planet.draw();
            expect(planet.__ring.callCount).toBe(2);
        });
    });
});
