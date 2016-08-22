describe("Table tennis ball", function(){

	it("Created should have proper position", function(){
		var ball = Ball.Create(0,2);

		expect(ball.position.x).toBe(0);
		expect(ball.position.y).toBe(2);
	});
});
