module.exports = function(grunt){
	require('load-grunt-config')(grunt);

	grunt.registerTask('build',
	[
		'bower:install',
		'sails-linker:dev'
	]);

	grunt.registerTask('default', ['sails-linker:dev']);
	grunt.registerTask('dev',
	[
		'build',
		'watch:dev'
	]);
};
