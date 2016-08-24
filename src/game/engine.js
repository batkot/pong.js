var Engine = (function(engine, phys){

	engine.State = {
		create : createState
	}

	engine.Racket = {
		move : moveRacket
	};

	return engine;

	function moveRacket(racket, direction){
		return phys.Rectangle.move(racket, direction);
	}

	function createState(racket){
		return {
			racket : racket
		};
	}

})(Engine || {}, Physics);
