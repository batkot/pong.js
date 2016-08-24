var Physics = (function(physics){
	
	physics.Point = {
		Zero : createPoint(0,0),
		create : createPoint,
		add : addPoints,
		subtract : subtractPoints
	}

	return physics;

	function createPoint(x,y){
		return {
			x : x,
			y : y
		};
	}

	function addPoints(a,b) {
		return createPoint(a.x + b.x, a.y + b.y);
	}

	function subtractPoints(a,b) {
		return createPoint(a.x - b.x, a.y - b.y);
	}

})(Physics || {});
