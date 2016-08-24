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

	describe("Operations", function(){
		var startPointX = 1;
		var startPointY = 2;
		var startPoint = Physics.Point.create(startPointX,startPointY);
		var secondPoint = Physics.Point.create(startPointY,startPointX);

		describe("Add", function() {

			it("Zero should be neutral element", function(){
				neutralElementCheck(Physics.Point.add, startPoint, Physics.Point.Zero);
			});

			it("Should be commutative", function(){
				commutativePropertyCheck(Physics.Point.add, startPoint, secondPoint);
			});

			it("Should be associative", function(){
				associativePropertyCheck(Physics.Point.add, startPoint, secondPoint, startPoint);
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

		describe("Equality", function(){
			
			it("Should return false is points are not equal", function(){
				var expected = false;
				var result = Physics.Point.equal(startPoint, secondPoint);

				expect(result).toBe(expected);
			});

			it("Should return true is compared to self", function(){
				var expected = true;
				var result = Physics.Point.equal(startPoint, startPoint);

				expect(result).toBe(expected);
			});

			it("Should return true if coordinates are the same", function(){
				var expected = true;
				var second = Physics.Point.create(startPoint.x, startPoint.y);
				var result = Physics.Point.equal(startPoint, second);

				expect(result).toBe(expected);
			});

			it("Should be commutative", function(){
				commutativePropertyCheck(Physics.Point.equal, startPoint, secondPoint);
			});
		});

		describe("Negative", function(){
			it("Double negative equals to starting point", function(){
				var result = Physics.Point.negative(
								Physics.Point.negative(startPoint));

				expect(Physics.Point.equal(result, startPoint)).toBe(true);
			});

			it("Negates coordinates", function(){
				var result = Physics.Point.negative(startPoint);

				expect(result.x).toBe(-startPoint.x);
				expect(result.y).toBe(-startPoint.y);
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

		function associativePropertyCheck(func, pointA, pointB, pointC){
			var resultOne = func(
								func(pointA, pointB), 
								pointC);

			var resultTwo = func(
								pointA,
								func(pointB, pointC));

			expect(resultOne.x).toBe(resultTwo.x);
			expect(resultOne.y).toBe(resultTwo.y);
		}
	});
});
