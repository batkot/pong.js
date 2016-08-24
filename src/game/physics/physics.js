var Physics = (function(physics){
	
	physics.Point = {
		Zero : createPoint(0,0),
		UnitX : createPoint(1,0),
		UnitY : createPoint(0,1),

		create : createPoint,
		add : addPoints,
		subtract : subtractPoints,
		equal: equalPoints
	}

	physics.Rectangle = {
		Unit : createRectangle(physics.Point.Zero, 1,1),
		move : moveRectangle,
		scale : scaleRectangle
	}

	return physics;

	//POINT
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

	function equalPoints(a,b) {
		return a.x === b.x && a.x == b.x;
	}

	//RECT
	function createRectangle(point, width, height){
		if (width <= 0 || height <= 0)
			throw "width and height have to be positive numbers";

		return {
			corner : point,
			width : width,
			height : height
		};
	}

	function moveRectangle(rect, point){
		return createRectangle(
			physics.Point.add(rect.corner, point), 
			rect.width, 
			rect.height);
	}

	function scaleRectangle(rect, scale){
		return createRectangle(
			rect.corner,
			rect.width * scale,
			rect.height * scale);
	}

})(Physics || {});
