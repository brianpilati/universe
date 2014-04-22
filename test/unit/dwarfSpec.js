/* jasmine specs for Dwarf.js go here */

describe('Dwarf', function() {
    var dwarf;

    beforeEach(function() {
        ctxMock = new CTXMock();
        dwarf = new Dwarf(ctxMock, new UniverseObjectMock());
    });

    describe('Initialized variables', function() {
        it('should have a speed original variable', function() {
            expect(dwarf.__speedOriginal).toBe(1.5);
        });

        it('should have a radius delta variable', function() {
            expect(dwarf.__radiusDelta).toBe(0.05);
        });

        it('should have a radius Original variable', function() {
            expect(dwarf.__radiusOriginal).toBe(1);
        });

        it('should have a __fillStyle variable', function() {
            expect(dwarf.__fillStyle).toBe('#CC33FF');
        })

        it('should have a __strokeStyle variable', function() {
            expect(dwarf.__strokeStyle).toBe('#000000');
        });
    });

    describe('Draw Dwarf', function() {
        beforeEach(function() {
            spyOn(dwarf, '__orb');
            spyOn(dwarf, '__shadow');
        });

        it('should call __orb', function() {
            dwarf.draw();
            expect(dwarf.__orb).toHaveBeenCalled();
        });

        it('should call __shadow', function() {
            dwarf.draw();
            expect(dwarf.__shadow).toHaveBeenCalledWith('grey', 1.8849555921538759, 5.026548245743669);
        });
    });
});
