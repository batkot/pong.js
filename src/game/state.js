var model = function(model) {

	model.initScore = {
		left : 0,
		right: 0
	};

	model.state = {
		score : model.initScore
	}

	return model;
}(model || {} );
