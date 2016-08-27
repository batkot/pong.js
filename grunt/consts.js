module.exports = {
	appSrc : "src",

	appScripts : ['<%= consts.appSrc %>/**/physics/*.js', 
				  '<%= consts.appSrc %>/**/game/*.js', 
				  '<%= consts.appSrc %>/app.js',
				  '!<%= consts.appTests %>'],

	appTests : '<%= consts.appSrc %>/**/*.spec.js'
}
