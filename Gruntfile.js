module.exports = function(grunt){
	require('load-grunt-config')(grunt);

	grunt.registerTask('default', ['sails-linker:dev']);
	grunt.registerTask('dev',
	[
		'sails-linker:dev',
		'watch:dev'
	]);
};
