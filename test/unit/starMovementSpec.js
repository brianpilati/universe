/* jasmine specs for Star Movement.js go here */

describe('Star Movement', function() {
    var starMovement;

    beforeEach(function() {
        starMovement = new Star('small', new CTXMock(), new UniverseObjectMock());
    });

    describe('Is star visible', function() {
        it('should have a true variable', function() {
            starMovement.__currentXPosition = 0;
            starMovement.__universe.width = 1;
            starMovement.__currentYPosition = 0;
            starMovement.__universe.height = 1;
            expect(starMovement.isStarVisible()).toBe(true);
        });

        it('should have a true variable', function() {
            starMovement.__currentXPosition = 0;
            starMovement.__universe.width = 0;
            starMovement.__currentYPosition = 0;
            starMovement.__universe.height = 1;
            expect(starMovement.isStarVisible()).toBe(true);
        });

        it('should have a true variable', function() {
            starMovement.__currentXPosition = 0;
            starMovement.__universe.width = 1;
            starMovement.__currentYPosition = 0;
            starMovement.__universe.height = 0;
            expect(starMovement.isStarVisible()).toBe(true);
        });

        it('should have a false variable', function() {
            starMovement.__currentXPosition = 1;
            starMovement.__universe.width = 0;
            starMovement.__currentYPosition = 0;
            starMovement.__universe.height = 1;
            expect(starMovement.isStarVisible()).toBe(false);
        });

        it('should have a false variable', function() {
            starMovement.__currentXPosition = 0;
            starMovement.__universe.width = 1;
            starMovement.__currentYPosition = 1;
            starMovement.__universe.height = 0;
            expect(starMovement.isStarVisible()).toBe(false);
        });

        it('should have a false variable', function() {
            starMovement.__currentXPosition = 1;
            starMovement.__universe.width = 0;
            starMovement.__currentYPosition = 1;
            starMovement.__universe.height = 0;
            expect(starMovement.isStarVisible()).toBe(false);
        });
    });
});
