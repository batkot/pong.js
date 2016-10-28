module.exports = {
	dev : {
		files : 'src/**/*.js',
		tasks : ['build','sails-linker:dev', 'jasmine:unit'],
		options : {
			reload: true
		}
	}
}
