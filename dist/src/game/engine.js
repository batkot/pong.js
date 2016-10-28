var Engine = (function(engine, phys){

	engine.State = {
		create : createState,
		withLeftRacket : createStateWithLeftRacket,
		withRightRacket : createStateWithRightRacket,
		withBall : createStateWithBall,
		withScore : createStateWithScore
	}

	engine.Racket = {
		move : moveRacket,
		bounceBall : racketBounceBall
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
		move : moveBall,
		accelerate : accelerateBall,
		startOnTable : startOnTableBall
	}

	engine.Table = {
		Default : createTable(900,500),
		create  : createTable
	}

	engine.Rules = {
		ScoreResult : {
			Left : {},
			Right : {},
			None : {}
		},
		whoShouldScore : whoShouldScoreRules,
		score : scorePoints
	}

	return engine;

	//RULES
	function whoShouldScoreRules(ball, table){
		return isBallTouchingWall(ball, table.leftGoal)  ? engine.Rules.ScoreResult.Right 
			 : isBallTouchingWall(ball, table.rightGoal) ? engine.Rules.ScoreResult.Left 
			 : engine.Rules.ScoreResult.None;
	}

	function scorePoints(scoreResult, score){
		return scoreResult == engine.Rules.ScoreResult.Left ? engine.Score.leftScore(score)
			:  scoreResult == engine.Rules.ScoreResult.Right ? engine.Score.rightScore(score)
			: score;
	}

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
	function moveRacket(racket, direction, table){
		var newRacket = phys.Rectangle.move(racket, direction);
		return isObjectOnTableEdge(newRacket, table) 
			? racket
			: newRacket;
	}

	function racketBounceBall(racket, ball){
		return phys.Rectangle.intersect(racket, ballBouncingRectangle(ball))
			 ? accelerateBall(bounceXBall(ball),1.5)
			 : ball;
	}

	// BALL
	function createBall(x,y,r, d_x, d_y) {
		return {
			position : phys.Point.create(x,y),
			radius : r,
			velocity : phys.Point.create(d_x, d_y)
		};
	}

	function bounceXBall(ball) {
		return createBall(
			ball.position.x, 
			ball.position.y, 
			ball.radius,
			-ball.velocity.x, 
			ball.velocity.y);
	}

	function bounceYBall(ball){
		return createBall(
			ball.position.x, 
			ball.position.y, 
			ball.radius,
			ball.velocity.x, 
			-ball.velocity.y);
	}

	function moveBall(ball, table){
		var newPos = phys.Point.add(ball.position, ball.velocity);
		return isObjectOnTableEdge(phys.Rectangle.create(newPos, ball.radius, ball.radius), table) 
			? bounceYBall(ball)
			: createBall(
				newPos.x,
				newPos.y,
				ball.radius,
				ball.velocity.x,
				ball.velocity.y);
	}

	function ballBouncingRectangle(ball){
		return phys.Rectangle.create(ball.position, ball.radius, ball.radius);
	}

	function isBallTouchingWall(ball, goal){
		return phys.Rectangle.intersect(
					ballBouncingRectangle(ball),
					goal);
	}

	function startOnTableBall(table){
		return createBall(
			table.width/2,
			table.height/2,
			10,
			1,
			1);
	}

	function accelerateBall(ball, coefficient){
		var newSpeed = phys.Point.multiply(ball.velocity, coefficient);
		return createBall(
			ball.position.x, 
			ball.position.y, 
			ball.radius,
			newSpeed.x,
			newSpeed.y);
	}

	// TABLE
	function createTable(width, height){
		return {
			width : width,
			height : height,
			ceiling : phys.Rectangle.create(phys.Point.create(0, height),width, 100),
			floor : phys.Rectangle.create(phys.Point.create(0, -100),width, 100),
			leftGoal : phys.Rectangle.create(phys.Point.create(-100,0),100, height),
			rightGoal : phys.Rectangle.create(phys.Point.create(width,0),100, height)
		};
	}

	function isObjectOnTableEdge(position, table){
		return phys.Rectangle.intersect(position, table.ceiling) || phys.Rectangle.intersect(position, table.floor);
	};

	// STATE
	function createState(leftRacket, rightRacket, table, ball, score){
		return {
			leftRacket : leftRacket,
			rightRacket : rightRacket,
			table : table,
			ball : ball,
			score : score
		};
	}

	function createStateWithLeftRacket(state, racket){
		return createState(
			racket,
			state.rightRacket,
			state.table,
			state.ball,
			state.score);
	}

	function createStateWithRightRacket(state, racket){
		return createState(
			state.leftRacket,
			racket,
			state.table,
			state.ball,
			state.score);
	}

	function createStateWithBall(state, ball){
		return createState(
			state.leftRacket,
			state.rightRacket,
			state.table,
			ball,
			state.score);
	}

	function createStateWithScore(state, score){
		return createState(
			state.leftRacket,
			state.rightRacket,
			state.table,
			state.ball,
			score);
	}

})(Engine || {}, Physics);
