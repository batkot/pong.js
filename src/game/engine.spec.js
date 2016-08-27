describe("Game Engine", function(){

	describe("Score", function(){
	    var zero = Engine.Score.Zero;

		it("Zero Score should be 0:0", function(){

			expect(zero.leftScore).toBe(0);
			expect(zero.rightScore).toBe(0);
		});

		it("Should increase left score on scored", function(){
			var newScore = Engine.Score.leftScore(zero);

			expect(newScore.leftScore).toBe(zero.leftScore + 1);
		});

		it("Should increase right score on scored", function(){
			var newScore = Engine.Score.rightScore(zero);

			expect(newScore.rightScore).toBe(zero.rightScore + 1);
		});
	});

	describe("Ball", function(){
		var ballX = 1;
		var ballY = 1;
		var ballDx = 1;
		var ballDy = 1;

		it("create Should create proper object", function(){
			var ball = Engine.Ball.create(ballX, ballY, ballDx, ballDy);

			expect(ball.position.x).toBe(ballX);
			expect(ball.position.y).toBe(ballY);
			expect(ball.velocity.x).toBe(ballDx);
			expect(ball.velocity.y).toBe(ballDy);
		});

		it("Should change ball x velocity on bounceX", function(){
			var ball = Engine.Ball.create(ballX, ballY, ballDx, ballDy);
			var bouncedBall = Engine.Ball.bounceX(ball);

			expect(bouncedBall.position.x).toBe(ballX);
			expect(bouncedBall.position.y).toBe(ballY);
			expect(bouncedBall.velocity.x).toBe(-ballDx);
			expect(bouncedBall.velocity.y).toBe(ballDy);
		});

		it("Should change ball y velocity on bounceY", function(){
			var ball = Engine.Ball.create(ballX, ballY, ballDx, ballDy);
			var bouncedBall = Engine.Ball.bounceY(ball);

			expect(bouncedBall.position.x).toBe(ballX);
			expect(bouncedBall.position.y).toBe(ballY);
			expect(bouncedBall.velocity.x).toBe(ballDx);
			expect(bouncedBall.velocity.y).toBe(-ballDy);
		});
	});
});
