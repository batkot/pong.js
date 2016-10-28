var Graphics = (function(graph) {
	
	graph.createRenderer = createRenderer

	return graph;

	function createRenderer(leftRacketDiv, rightRacketDiv, tableDiv, scoreBoardDiv, ballDiv){
		return state => {
			renderRacket(leftRacketDiv, state.leftRacket);
			renderRacket(rightRacketDiv, state.rightRacket);
			renderTable(tableDiv, state.table);
			renderScore(scoreBoardDiv, state.score);
			renderBall(ballDiv, state.ball);
		}
	}

	function renderRacket(racketView, racket) {
		racketView.style.top = racket.corner.y + "px";
		racketView.style.left = racket.corner.x + "px";
		racketView.style.width = racket.width;
		racketView.style.height = racket.height;
	}

	function renderTable(tableView, table) {
		tableView.style.width = table.width;
		tableView.style.height = table.height;
	}

	function renderScore(scoreView, score) {
		scoreView.innerHTML = score.leftScore + ":" + score.rightScore;
	}

	function renderBall(ballView, ball) {
		ballView.style.top = ball.position.y + "px";
		ballView.style.left = ball.position.x + "px";
	}

})(Graphics || {});
