module.exports = {
	dev : {
		options : {
			startTag: '<!-- SCRIPTS:START -->',
			endTag: '<!-- SCRIPTS:END -->',
			fileTmpl: '<script src="%s" ></script>',
		},
		files : {
			'index.html' : '<%= consts.appScripts %>'
		}
	}
};
