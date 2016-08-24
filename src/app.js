var racket = document.getElementById("racket");

var keyCodes = {
	UP : 38,
	DOWN: 40
};

var keyStream = Rx.Observable.fromEvent(document, "keydown", e => {
									if (e.keyCode === keyCodes.DOWN) return Physics.Point.UnitY;
									if (e.keyCode === keyCodes.UP) return Physics.Point.negative(Physics.Point.UnitY);
									return undefined;
								})
								.filter(x => x != undefined)
								.scan(function(state, curr) {
									var newRacket = Engine.Racket.move(state.racket, curr);
									return Engine.State.create(newRacket);
								}, Engine.State.create(Physics.Rectangle.Unit))
								.subscribe(state => {
									racket.style.top = state.racket.corner.y + "px";
									racket.style.left = state.racket.corner.x + "px";
								});

