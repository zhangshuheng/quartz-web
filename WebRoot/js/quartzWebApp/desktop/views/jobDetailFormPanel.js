Ext.define('js.quartzWebApp.desktop.views.jobDetailFormPanel', {
	extend : 'Ext.form.Panel',
	alias : 'widget.jobDetailFormPanel',
	bodyStyle : 'padding :   10px ;   background - color :   #DCE5F0 ; '+ '   border - left :   none ;',
	defaultType : 'textfield',
	defaults : {
		anchor : '- 10',
		labelWidth : 70
	},
	initComponent : function() {
		this.items = this.buildItems();
		this.callParent();
	},
	buildItems : function() {
		return [ {
			fieldLabel : 'job名称',
			name : 'jobName'
		}, {
			fieldLabel : 'job组名',
			name : 'jobGroup'
		}, {
			fieldLabel : 'job类名',
			name : 'jobClassName'
		}, {
			fieldLabel : '描述',
			name : 'description'
		} ];
	}
});