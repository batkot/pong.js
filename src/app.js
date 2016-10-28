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

var racketSpeed = 10;
const leftPlayerControls = {
	up : keyCodes.W,
	down : keyCodes.S
};

const rightPlayerControls = {
	up : keyCodes.UP,
	down : keyCodes.DOWN
};

var filterControlKeys = function(keyCode, controls){
	for(var prop in controls){
		if (controls[prop] === keyCode) 
			return true;
	}
	return false;
}

var mapControl = function(keyCode, controls){
	return controls.up === keyCode 
	     ? Physics.Point.negative(Physics.Point.UnitY)
		 : Physics.Point.UnitY;
}


//left racket
var leftRacketStream = Rx.Observable.fromEvent(document, "keydown")
								.filter(e => filterControlKeys(e.keyCode, leftPlayerControls))
								.map(e => mapControl(e.keyCode, leftPlayerControls))
								.map(p => Physics.Point.multiply(p, racketSpeed))
								.scan((racket, dir) => Engine.Racket.move(racket, dir, table), leftRacket);
//right racket
var rightRacketStream = Rx.Observable.fromEvent(document, "keydown")
								.filter(e => filterControlKeys(e.keyCode, rightPlayerControls))
								.map(e => mapControl(e.keyCode, rightPlayerControls))
								.map(p => Physics.Point.multiply(p, racketSpeed))
								.scan((racket, dir) => Engine.Racket.move(racket, dir, table), rightRacket);

//ball 
var ballStream = Rx.Observable.interval(16)
					.scan((b, e) => b, ball);
					//Engine.Ball.move(b,table), ball);

//Game loop
leftRacketStream
	.combineLatest(
		rightRacketStream, 
		(left, right) => { return { lr : left, rr : right }})
	.combineLatest(
		ballStream,
		(x, ball) => { return { leftRacket : x.lr, rightRacket : x.rr, ball : ball }})
	.scan((state, stateCandidate) => {
		//Check score:
		let b1 = Engine.Racket.bounceBall(stateCandidate.leftRacket, stateCandidate.ball);
		let b2 = Engine.Racket.bounceBall(stateCandidate.rightRacket, b1);
		let whoShouldScore = Engine.Rules.whoShouldScore(b2, table);
		
		return Engine.State.create(
			stateCandidate.leftRacket,
			stateCandidate.rightRacket,
			state.table,
			b2,
			Engine.Rules.score(whoShouldScore, state.score));
	},Engine.State.create(leftRacket, rightRacket, table, ball, Engine.Score.Zero))
	.subscribe(s => renderState(s));
							

//Commands:
//MoveLeftRacket { x }
//MoveRightRacket { x }
//MoveBall
