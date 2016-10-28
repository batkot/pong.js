var racketOneView = document.getElementById("racket-one");
var racketTwoView = document.getElementById("racket-two");

var keyCodes = {
	UP : 38,
	DOWN: 40,
	W : 87,
	S : 83
};

var racketRect = Physics.Rectangle.scaleWidth(Physics.Rectangle.scaleHeight(Physics.Rectangle.Unit,120),20);
var renderRacket = function(racketView, racket){
	racketView.style.top = racket.corner.y + "px";
	racketView.style.left = racket.corner.x + "px";
	racketView.style.width = racket.width;
	racketView.style.height = racket.height;
}
//First racket
var keyStream = Rx.Observable.fromEvent(document, "keydown", e => {
									if (e.keyCode === keyCodes.DOWN) return Physics.Point.UnitY;
									if (e.keyCode === keyCodes.UP) return Physics.Point.negative(Physics.Point.UnitY);
									return undefined;
								})
								.filter(x => x != undefined)
								.scan(function(racket, curr) {
									return Engine.Racket.move(racket, curr);
								}, racketRect)
								.subscribe(racket => {
									renderRacket(racketOneView, racket);
								});
//Second racket
var secondRacket = Rx.Observable.fromEvent(document, "keydown", e => {
									if (e.keyCode === keyCodes.S) return Physics.Point.UnitY;
									if (e.keyCode === keyCodes.W) return Physics.Point.negative(Physics.Point.UnitY);
									return undefined;
								})
								.filter(x => x != undefined)
								.scan(function(racket, curr) {
									return Engine.Racket.move(racket, curr);
								}, Physics.Rectangle.move(
									racketRect,
									Physics.Point.multiply(Physics.Point.UnitX, 900)))
								.subscribe(racket => {
									renderRacket(racketTwoView, racket);
								});
