module.exports = {
	unit : {
		src : ['<%= consts.appScripts %>', '!<%= consts.appTests %>'],
		options : {
			specs : '<%= consts.appTests %>'
		}
	}
};
