var Racket = (function(racket){
	
	racket.Zero = createRocket(0,0);
	racket.move = move;
	return racket;

	function move(racket, displacement){
		return createRocket(
					racket.position.x + displacement.x, 
					racket.position.y + displacement.y);
	}

	function createRocket(posX, posY){
		return {
			position : {
				x : posX,
				y : posY
			}
		};
	}

})(Racket || {});
