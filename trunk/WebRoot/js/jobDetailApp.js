/**
 * 参数: quartzweb : 命名空间 js : 加载文件与页面的相对路径
 */
Ext.Loader.setConfig({
	enabled : true,
	paths : {
		quartzweb : 'js'
	}

});

Ext.require('quartzWebApp.views.jobDetailEditorWindow');

Ext.onReady(function() {
	Ext.create('quartzWebApp.views.jobDetailEditorWindow').show();
});
