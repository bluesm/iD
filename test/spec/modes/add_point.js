describe("iD.modes.AddPoint", function() {
    var context;

    beforeEach(function() {
        var container = d3.select(document.createElement('div'));

        context = iD()
            .container(container);

        container.call(context.map())
            .append('div')
            .attr('class', 'inspector-wrap');

        context.enter(iD.modes.AddPoint(context));
    });

    describe("clicking the map", function () {
        it("adds a node", function() {
            happen.mousedown(context.surface().node(), {});
            happen.mouseup(window, {});
            expect(context.changes().created).to.have.length(1);
            context.mode().exit();
        });

        it("selects the node", function() {
            happen.mousedown(context.surface().node(), {});
            happen.mouseup(window, {});
            expect(context.mode().id).to.equal('select');
            expect(context.mode().selection()).to.eql([context.changes().created[0].id]);
            context.mode().exit();
        });
    });

    describe("pressing ⎋", function() {
        it("exits to browse mode", function(done) {
            happen.keydown(document, {keyCode: 27});
            window.setTimeout(function() {
                expect(context.mode().id).to.equal('browse');
                done();
            }, 200);
        });
    });
});