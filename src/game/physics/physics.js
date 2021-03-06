var Physics = (function(physics){
	
	physics.Point = {
		Zero : createPoint(0,0),
		UnitX : createPoint(1,0),
		UnitY : createPoint(0,1),

		create : createPoint,
		add : addPoints,
		subtract : subtractPoints,
		multiply : multiplyPoint,
		equal: equalPoints,
		negative : negativePoint
	}

	physics.Rectangle = {
		Unit : createRectangle(physics.Point.Zero, 1,1),
		create : createRectangle,
		move : moveRectangle,
		scale : scaleRectangle,
		scaleWidth : scaleRectangleWidth,
		scaleHeight : scaleRectangleHeight,
		intersect : intersectRectangles
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

	function negativePoint(a){
		return createPoint(-a.x, -a.y);
	}

	function multiplyPoint(point, scalar){
		return createPoint(point.x * scalar, point.y * scalar);
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

	function scaleRectangleWidth(rect, scale){
		return createRectangle(
			rect.corner,
			rect.width * scale,
			rect.height);
	}

	function scaleRectangleHeight(rect, scale){
		return createRectangle(
			rect.corner,
			rect.width,
			rect.height * scale);
	}

	function intersectRectangles(rectA, rectB){
		return (rectA.corner.x < rectB.corner.x + rectB.width && 
				rectA.corner.x + rectA.width > rectB.corner.x &&
				rectA.corner.y < rectB.corner.y + rectB.height &&
				rectA.corner.y + rectA.height > rectB.corner.y)
	}

})(Physics || {});
