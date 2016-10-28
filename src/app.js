var racketOneView = document.getElementById("racket-one");
var racketTwoView = document.getElementById("racket-two");
var tableView = document.getElementById("table");
var scoreView = document.getElementById("scoreboard");
var ballView = document.getElementById("ball");

var keyCodes = {
	UP : 38,
	DOWN: 40,
	W : 87,
	S : 83
};

var table = Engine.Table.Default;
var leftRacket = Physics.Rectangle.scaleWidth(Physics.Rectangle.scaleHeight(Physics.Rectangle.Unit,120),20);
var rightRacket = Physics.Rectangle.move(leftRacket,
									Physics.Point.multiply(Physics.Point.UnitX, table.width - leftRacket.width));

var ball = Engine.Ball.startOnTable(table);

var renderRacket = function(racketView, racket){
	racketView.style.top = racket.corner.y + "px";
	racketView.style.left = racket.corner.x + "px";
	racketView.style.width = racket.width;
	racketView.style.height = racket.height;
}

var renderTable = function(tableView, table){
	tableView.style.width = table.width;
	tableView.style.height = table.height;
}

var renderScore = function(scoreView, score){
	scoreView.innerHTML = score.leftScore + ":" + score.rightScore;
}

var renderBall = function(ballView, ball){
	ballView.style.top = ball.position.y + "px";
	ballView.style.left = ball.position.x + "px";
}

var renderState = function(state) {
	renderRacket(racketOneView, state.leftRacket);
	renderRacket(racketTwoView, state.rightRacket);
	renderBall(ballView, state.ball);
	renderTable(tableView, state.table);
	renderScore(scoreView, state.score);
}


//left racket
var leftRacketStream = Rx.Observable.fromEvent(document, "keydown", e => {
									if (e.keyCode === keyCodes.S) return Physics.Point.UnitY;
									if (e.keyCode === keyCodes.W) return Physics.Point.negative(Physics.Point.UnitY);
									return Physics.Point.Zero;
								})
								.scan((racket, dir) => Engine.Racket.move(racket, dir, table), leftRacket);
//right racket
var rightRacketStream = Rx.Observable.fromEvent(document, "keydown", e => {
									if (e.keyCode === keyCodes.DOWN) return Physics.Point.UnitY;
									if (e.keyCode === keyCodes.UP) return Physics.Point.negative(Physics.Point.UnitY);
									return Physics.Point.Zero;
								})
								.scan((racket, dir) => Engine.Racket.move(racket, dir, table), rightRacket);

//ball 
var ballStream = Rx.Observable.interval(16)
					.scan((b, e) => Engine.Ball.move(b,table), ball)
					.subscribe(b => renderBall(ballView, b));

//Game loop
leftRacketStream
	.combineLatest(
		rightRacketStream, 
		(left, right) => { return { leftRacket : left, rightRacket : right }})
	.scan((state, latestMoves) => {
		return Engine.State.create(
			latestMoves.leftRacket,
			latestMoves.rightRacket,
			state.table,
			state.ball,
			state.score)
	},Engine.State.create(leftRacket, rightRacket, table, ball, Engine.Score.Zero))
	.subscribe(s => renderState(s));
							
