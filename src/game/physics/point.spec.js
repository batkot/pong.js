describe("Physics 2DPoint", function () {
	it("Zero point should be at (0,0)", function() {
		var zero = Physics.Point.Zero;
		expect(zero.x).toBe(0);
		expect(zero.y).toBe(0);
	});

	it("Create should return point with proper coordinates", function(){
		var point = Physics.Point.create(1,2);

		expect(point.x).toBe(1);
		expect(point.y).toBe(2);
	});

	describe("Add", function() {
		var startPointX = 1;
		var startPointY = 2;
		var startPoint = Physics.Point.create(startPointX,startPointY);
		var secondPoint = Physics.Point.create(startPointY,startPointX);

		it("Zero should be neutral element", function(){
			neutralElementCheck(Physics.Point.add, startPoint, Physics.Point.Zero);
		});

		it("Should be commutative", function(){
			commutativePropertyCheck(Physics.Point.add, startPoint, secondPoint);
		});

		it("Should add points", function(){
			var expectedSum = Physics.Point.create(startPointX + startPointY, startPointY + startPointX);
			var sum = Physics.Point.add(startPoint, secondPoint);

			expect(sum.x).toBe(expectedSum.x);
			expect(sum.y).toBe(expectedSum.y);
		});

		describe("Immutability check", function(){
			var sum = Physics.Point.add(startPoint, secondPoint);

			it("First parameter should be unchanged", function(){
				expect(startPoint.x).toBe(startPointX);
				expect(startPoint.y).toBe(startPointY);
			});

			it("Second parameter should be unchanged", function(){
				expect(secondPoint.x).toBe(startPointY);
				expect(secondPoint.y).toBe(startPointX);
			});
		});
	});

	describe("Subtract", function(){
		var startPointX = 1;
		var startPointY = 2;
		var startPoint = Physics.Point.create(startPointX,startPointY);
		var secondPoint = Physics.Point.create(startPointY,startPointX);

		it("Zero should be neutral element", function(){
			neutralElementCheck(Physics.Point.subtract, startPoint, Physics.Point.Zero);
		});

		it("Should subtract points", function(){
			var expected = Physics.Point.create(startPointX - startPointY, startPointY - startPointX);
			var result = Physics.Point.subtract(startPoint, secondPoint);

			expect(result.x).toBe(expected.x);
			expect(result.y).toBe(expected.y);
		});

		describe("Immutability check", function(){
			var sum = Physics.Point.subtract(startPoint, secondPoint);

			it("First parameter should be unchanged", function(){
				expect(startPoint.x).toBe(startPointX);
				expect(startPoint.y).toBe(startPointY);
			});

			it("Second parameter should be unchanged", function(){
				expect(secondPoint.x).toBe(startPointY);
				expect(secondPoint.y).toBe(startPointX);
			});
		});
	});

	function commutativePropertyCheck(func, pointA, pointB){
		var first = func(pointA, pointB);
		var second = func(pointB, pointA);

		expect(first.x).toBe(second.x);
		expect(first.y).toBe(second.y);
	}

	function neutralElementCheck(func, point, e){
		var result = func(point,e);

		expect(result.x).toBe(point.x);
		expect(result.y).toBe(point.y);
	}
});
