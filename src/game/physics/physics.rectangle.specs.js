describe("Physics Rectangle", function () {
	it("Unit should be Rect in (0,0) unit width and height", function(){
		var unit = Physics.Rectangle.Unit;

		expect(Physics.Point.equal(unit.corner, Physics.Point.Zero)).toBe(true);
		expect(unit.width).toBe(1);
		expect(unit.height).toBe(1);
	});

	it("Should not accept negative width on creation", function(){
		expect(function() { Physics.Rectangle.create(Physics.Point.Zero, -1,1)} ).toThrow();
	});

	it("Should not accept negative height on creation", function(){
		expect(function() { Physics.Rectangle.create(Physics.Point.Zero, 1,-1)} ).toThrow();
	});

	it("Should not accept zero width on creation", function(){
		expect(function() { Physics.Rectangle.create(Physics.Point.Zero, 0,1)} ).toThrow();
	});

	it("Should not accept zero height on creation", function(){
		expect(function() { Physics.Rectangle.create(Physics.Point.Zero, 1,0)} ).toThrow();
	});

	describe("Operations", function(){
		describe("Move", function(){
			var rect = Physics.Rectangle.Unit;
			var moveDirection = Physics.Point.create(1,1);
			var movedRect = Physics.Rectangle.move(rect, moveDirection);
			var expectedNewCorner = Physics.Point.create(1,1);

			it("Should not change width", function() { expect(movedRect.width).toBe(rect.width);});
			it("Should not change height", function() { expect(movedRect.height).toBe(rect.height);});
			it("Should move corner", function() {
				expect(Physics.Point.equal(movedRect.corner, expectedNewCorner)).toBe(true);
			});
		});
	});
});
