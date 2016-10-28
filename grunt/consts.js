module.exports = {
	appSrc : "src",
	libSrc : "lib",

	appScripts : ['<%= consts.libSrc %>/**/*.js',
				  '<%= consts.appSrc %>/**/physics/*.js', 
				  '<%= consts.appSrc %>/**/game/*.js', 
				  '<%= consts.appSrc %>/app.js',
				  '!<%= consts.appTests %>'],

	appTests : '<%= consts.appSrc %>/**/*.spec.js'
}
