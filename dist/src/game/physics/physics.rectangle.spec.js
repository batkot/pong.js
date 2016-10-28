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

		describe("Scale", function(){
			var rect = Physics.Rectangle.Unit;
			var scale = 2;
			var scaledRect = Physics.Rectangle.scale(rect, scale);

			it("Should scale the width", function() { expect(scaledRect.width).toBe(rect.width * scale); });
			it("Should scale the height", function() { expect(scaledRect.height).toBe(rect.height * scale); });
			it("Should not change the corner", function() {
				expect(Physics.Point.equal(scaledRect.corner, rect.corner)).toBe(true);
			});
		});

		describe("Intersect", function(){
			var rect = Physics.Rectangle.Unit;
			it("Should intersect with self", function(){
				expect(Physics.Rectangle.intersect(rect,rect)).toBe(true);
			});

			it("Should intersect with rectangle that is inside", function(){
				var largerRect = Physics.Rectangle.create(Physics.Point.create(-1,-1), 3,3);

				expect(Physics.Rectangle.intersect(rect, largerRect)).toBe(true);
			});

			it("Should not intersect with rectangle above", function(){
				intersectWithUnitMovedBy(0,1,false);
			});

			it("Should not intersect with rectangle below", function(){
				intersectWithUnitMovedBy(0,-1,false);
			});

			it("Should not intersect with rectangle to the left", function(){
				intersectWithUnitMovedBy(-1,0,false);
			});

			it("Should not intersect with rectangle to the right", function(){
				intersectWithUnitMovedBy(1,0,false);
			});

			function intersectWithUnitMovedBy(x,y, shouldIntersect){
				var rectToTest = Physics.Rectangle.create(Physics.Point.create(x,y), 1,1);
				expect(Physics.Rectangle.intersect(rect, rectToTest)).toBe(shouldIntersect);
			}
		});
	});
});
