describe("Racket", function () {
	it("Zero racket should be at (0,0)", function() {
		var zero = Racket.Zero;
		expect(zero.position.x).toBe(0);
		expect(zero.position.y).toBe(0);
	});

	describe("Move", function() {
		var zero = Racket.Zero;
		var displacement = {x:1, y:2};
		var moved = Racket.move(zero, displacement);

		it("Returned racket should have proper coordinates", function() {
			expect(moved.position.x).toBe(1);
			expect(moved.position.y).toBe(2);
		});

		it("Given racket should remain unchanged", function(){
			expect(zero.position.x).toBe(0);
			expect(zero.position.y).toBe(0);
		});

		it("Should be additive", function(){
			var doubleMoved = Racket.move(moved, displacement);
			var movedByTwo = Racket.move(zero, {x: displacement.x * 2, y : displacement.y * 2});

			expect(doubleMoved.position.x).toBe(movedByTwo.position.x);
			expect(doubleMoved.position.y).toBe(movedByTwo.position.y);
		});
	});
});
