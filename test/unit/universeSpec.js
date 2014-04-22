/* jasmine specs for Universe.js go here */

describe('Universe', function() {
    var universe;

    beforeEach(function() {
        setFixtures('<div id="universe"></div>');
        var universeElement = $('#universe');
        universeElement.css({'width': 700, 'height': 500});
        universe = new Universe();
        spyOn(window, 'setInterval');
    });

    describe('Initialized variables', function() {
        it('should have a default star count', function() {
            expect(universe.__bodiesCount).toBe(4);
        });

        it('should have a defined star count', function() {
            var definedUniverse = new Universe(500);
            expect(definedUniverse.__bodiesCount).toBe(500);
        });

        it('should have a stars star array', function() {
            expect(universe.__bodies.stars.length).toEqual(3);
        });

        it('should have a stars plutoids array', function() {
            expect(universe.__bodies.plutoids.length).toEqual(0);
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

        it('should have a universe creation variable', function() {
            expect(universe.__universe.creation).toBe('normal');
        });
    });

    describe('Reset Universe', function() {
        beforeEach(function() {
            spyOn(universe, "__superNovaUniverse");
            spyOn(universe, "__createUniverse");
            spyOn(universe, "__renderUniverse");
            universe.__resetUniverse();
        });

        it('should call __superNovaUniverse', function() {
            expect(universe.__superNovaUniverse).toHaveBeenCalled();
        });

        it('should call __createUniverse', function() {
            expect(universe.__createUniverse).toHaveBeenCalled();
        });

        it('should call __renderUniverse', function() {
            expect(universe.__renderUniverse).toHaveBeenCalled();
        });
    });

    describe('Animate Universe', function() {
        it('should call setInterval', function() {
            universe.__animateUniverse();
            expect(window.setInterval).toHaveBeenCalled();
        });
    });

    describe('Pause Universe', function() {
        it('should call clearInterval', function() {
            spyOn(window, 'clearInterval');
            universe.__pauseUniverse();
            expect(window.clearInterval).toHaveBeenCalled();
        });
    });

    describe('Render Universe', function() {
        var starMock;
        beforeEach(function() {
            starMock = new StarMock();
            spyOn(starMock, "draw");
            spyOn(starMock, "update");
            spyOn(universe.__ctx, "clearRect");
            universe.__bodies = new BodiesObjectMock();
            universe.__bodies.stars.push(starMock);
            universe.__bodies.plutoids.push(starMock);
        });

        it('should call clearRect', function() {
            universe.__renderUniverse();
            expect(universe.__ctx.clearRect).toHaveBeenCalled();
            expect(universe.__ctx.clearRect.callCount).toBe(1);
        });

        it('should call star.draw', function() {
            universe.__renderUniverse();
            expect(starMock.draw).toHaveBeenCalled();
            expect(starMock.draw.callCount).toBe(2);
        });

        it('should call star.update', function() {
            universe.__renderUniverse();
            expect(starMock.update).toHaveBeenCalled();
            expect(starMock.update.callCount).toBe(2);
        });
    });

    describe('Render Universe', function() {
        var localUniverse;
        beforeEach(function() {
            localUniverse = new Universe();
            localUniverse.__bodies = new BodiesObjectMock();
            localUniverse.__bodies.stars.push(new StarMock());
            localUniverse.__bodies.stars.push(new StarMock());
            localUniverse.__bodies.stars.push(new StarMock());
        });

        it('should superNova the localUniverse', function() {
            expect(localUniverse.__bodies.stars.length).toBe(3);
            localUniverse.__superNovaUniverse();
            expect(localUniverse.__bodies.stars.length).toBe(0);
        });
    });
});
