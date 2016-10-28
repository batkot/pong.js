var racketOneView = document.getElementById("racket-one");
var racketTwoView = document.getElementById("racket-two");
var tableView = document.getElementById("table");
var scoreView = document.getElementById("scoreboard");
var ballView = document.getElementById("ball");

var keyCodes = {
	UP : 38,
	DOWN: 40,
	W : 87,
	S : 83,
	P : 80
};

var table = Engine.Table.Default;
var leftRacket = Physics.Rectangle.scaleWidth(Physics.Rectangle.scaleHeight(Physics.Rectangle.Unit,120),20);
var rightRacket = Physics.Rectangle.move(leftRacket,
									Physics.Point.multiply(Physics.Point.UnitX, table.width - leftRacket.width));

var ball = Engine.Ball.startOnTable(table);
var renderState = Graphics.createRenderer(racketOneView, racketTwoView, tableView, scoreView, ballView);
var initState = Engine.State.create(leftRacket, rightRacket, table, ball, Engine.Score.Zero);
renderState(initState);

var racketSpeed = 10;
const leftPlayerControls = {
	up : keyCodes.W,
	down : keyCodes.S
};

const rightPlayerControls = {
	up : keyCodes.UP,
	down : keyCodes.DOWN
};

const systemControls = {
	pause : keyCodes.P
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


var keyDownStream = Rx.Observable.fromEvent(document, "keydown");
var keyUpStream = Rx.Observable.fromEvent(document, "keyup");
//system settings
var pauseStream = keyDownStream
								.filter(e => e.keyCode == keyCodes.P)
								.startWith(true)
								.scan((paused, _) => !paused, true);
//left racket
var leftRacketMoveStream = keyDownStream
								.filter(e => filterControlKeys(e.keyCode, leftPlayerControls))
								.map(e => mapControl(e.keyCode, leftPlayerControls));

var leftRacketStream = keyUpStream
								.filter(e => filterControlKeys(e.keyCode, leftPlayerControls))
								.map(e => Physics.Point.Zero)
								.merge(leftRacketMoveStream)
								.startWith(Physics.Point.Zero)
								.map(p => Physics.Point.multiply(p, racketSpeed))
								.map(dir => r => Engine.Racket.move(r,dir, table));
//right racket
var rightRacketMoveStream = keyDownStream
								.filter(e => filterControlKeys(e.keyCode, rightPlayerControls))
								.map(e => mapControl(e.keyCode, rightPlayerControls));

var rightRacketStream = keyUpStream
								.filter(e => filterControlKeys(e.keyCode, rightPlayerControls))
								.map(e => Physics.Point.Zero)
								.merge(rightRacketMoveStream)
								.startWith(Physics.Point.Zero)
								.map(p => Physics.Point.multiply(p, racketSpeed))
								.map(dir => r => Engine.Racket.move(r, dir, table));

//Game loop
Rx.Observable.interval(16)
	.combineLatest(leftRacketStream, (_, left) => left)
	.combineLatest(rightRacketStream)
	.combineLatest(pauseStream,
		(x, p) => { return { leftRacket : x[0], rightRacket : x[1], pause : p }})
	.scan((state, commands) => {
		if (commands.pause) return state;

		let leftRacket = commands.leftRacket(state.leftRacket);
		let rightRacket = commands.rightRacket(state.rightRacket);
		let b = Engine.Ball.move(state.ball, state.table);
		let b1 = Engine.Racket.bounceBall(leftRacket, b);
		let b2 = Engine.Racket.bounceBall(rightRacket, b1);
		let whoShouldScore = Engine.Rules.whoShouldScore(b2, table);
		
		return Engine.State.create(leftRacket,
								   rightRacket,
								   state.table,
								   whoShouldScore !== Engine.Rules.ScoreResult.None ? Engine.Ball.startOnTable(state.table) : b2,
								   Engine.Rules.score(whoShouldScore, state.score));
	}, initState)
	.subscribe(s => renderState(s));
							
