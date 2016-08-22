module.exports = {
	dev : {
		files : 'src/**/*.js',
		tasks : ['sails-linker:dev'],
		options : {
			reload: true
		}
	}
}
