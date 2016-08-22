module.exports = {
	dev : {
		files : 'src/**/*.js',
		tasks : ['sails-linker:dev', 'jasmine:unit'],
		options : {
			reload: true
		}
	}
}
