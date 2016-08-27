var Engine = (function(engine, phys){

	engine.State = {
		create : createState
	}

	engine.Racket = {
		move : moveRacket
	};

	engine.Score = {
		Zero : createScore(0,0),
		leftScore : leftScored,
		rightScore : rightScored
	}

	engine.Ball = {
		create : createBall,
		bounceX : bounceXBall,
		bounceY : bounceYBall,
		move : moveBall
	}

	engine.Table = {
		create : createTable
	}

	return engine;

	// SCORE
	function createScore(leftPlayerScore, rightPlayerScore){
		return {
			leftScore : leftPlayerScore,
			rightScore : rightPlayerScore
		};
	}

	function leftScored(score) {
		return createScore(score.leftScore + 1, score.rightScore);
	}

	function rightScored(score){
		return createScore(score.leftScore, score.rightScore + 1);
	}

	// RACKET
	function moveRacket(racket, direction){
		return phys.Rectangle.move(racket, direction);
	}

	// BALL
	function createBall(x,y, d_x, d_y) {
		return {
			position : phys.Point.create(x,y),
			velocity : phys.Point.create(d_x, d_y)
		};
	}

	function bounceXBall(ball) {
		return createBall(
			ball.position.x, 
			ball.position.y, 
			-ball.velocity.x, 
			ball.velocity.y);
	}

	function bounceYBall(ball){
		return createBall(
			ball.position.x, 
			ball.position.y, 
			ball.velocity.x, 
			-ball.velocity.y);
	}

	// TABLE
	function createTable(width, height){
		return {
			width : width,
			height : height,
			ceiling : phys.Rectangle.create(phys.Point,create(0, height),width, 1),
			floor : phys.Rectangle.create(phys.Point,create(0, -1),width, 1),
			leftGoal : phys.Rectangle.create(phys.Point.create(-1,0),1, height),
			rightGoal : phys.Rectangle.create(phys.Point.create(width,0),1, height)
		};
	}

	// STATE
	function createState(racket){
		return {
			racket : racket
		};
	}

})(Engine || {}, Physics);
