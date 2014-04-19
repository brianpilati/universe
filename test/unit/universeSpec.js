/* jasmine specs for Universe.js go here */

describe('Universe', function() {
    var universe;

    beforeEach(function() {
        setFixtures('<div id="universe"></div>');
        var universeElement = $('#universe');
        universeElement.css({'width': 700, 'height': 500});

        spyOn(window, 'setInterval');

        universe = new Universe();
    });

    describe('Initialized variables', function() {
        it('should have a default star count', function() {
            expect(universe.__starCount).toBe(2);
        });

        it('should have a defined star count', function() {
            var definedUniverse = new Universe(500);
            expect(definedUniverse.__starCount).toBe(500);
        });

        it('should have a stars array', function() {
            expect(universe.__stars.length).toEqual(2);
        });

        it('should have a ctx variable', function() {
            expect(universe.__ctx).toBeDefined();
        });

        it('should have a universe width variable', function() {
            expect(universe.__universe.width).toBe(700);
        });

        it('should have a universe width center variable', function() {
            expect(universe.__universe.widthCenter).toBe(350);
        });

        it('should have a universe height variable', function() {
            expect(universe.__universe.height).toBe(500);
        });

        it('should have a universe height center variable', function() {
            expect(universe.__universe.heightCenter).toBe(250);
        });
    });

    describe('setInterval', function() {
        it('should call setInterval', function() {
            expect(window.setInterval).toHaveBeenCalled();
        });
    });

    describe('Render Universe', function() {
        var starMock;
        beforeEach(function() {
            starMock = new StarMock();
            spyOn(starMock, "draw");
            spyOn(starMock, "update");
            spyOn(universe.__ctx, "clearRect");
            universe.__stars = [];
            universe.__stars.push(starMock);
        });

        it('should call clearRect', function() {
            universe.__renderUniverse();
            expect(universe.__ctx.clearRect).toHaveBeenCalled();
            expect(universe.__ctx.clearRect.callCount).toBe(1);
        });

        it('should call star.draw', function() {
            universe.__renderUniverse();
            expect(starMock.draw).toHaveBeenCalled();
            expect(starMock.draw.callCount).toBe(1);
        });

        it('should call star.update', function() {
            universe.__renderUniverse();
            expect(starMock.update).toHaveBeenCalled();
            expect(starMock.update.callCount).toBe(1);
        });
    });
});
