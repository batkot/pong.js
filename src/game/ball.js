var Ball = function(ball){

	ball.Create = create;
	return ball;

	function create(posX, posY){
		return {
			position : {
				x : posX,
				y : posY
			}
		};
	}

}(Ball || {});
