Ext.define('js.quartzWebApp.desktop.views.jobDetailGridPanel', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.jobDetailGridPanel',
	requires : [ 'js.quartzWebApp.desktop.stores.jobDetailStore' ],
	initComponent : function() {
		this.store = js.quartzWebApp.desktop.stores.jobDetailStore;
		this.columns = this.buildColumns();
		this.callParent();
	},
	buildColumns : function() {
		return [{id:'_jobName',header : 'job名称',width:80, sortable:true,dataIndex :　'jobName'},
		           {id:'_jobGroup',header :'job组名',width : 80,sortable:true,dateIndex : 'jobGroup'},
		           {id : '_jobClassName',header : 'job类名',width : 160,css : "font-size : 13px;padding:3px;",sortable : true,dataIndex : 'jobClassName'},
		           {id:'_isDurable',header : '是否持久',width : 80,sortable:true,dateIndex : 'isDurable'},
		           {id:'_isStateful',header : 'job组名',width : 80,sortable:true,dateIndex : 'isStateful'},
		           {id:'_isVolatile',header : '是否稳定',width : 80,sortable:true,dateIndex : 'isVolatile'},
		           {id:'_requestsRecovery',header : '请求复原',width : 80,sortable:true,dateIndex : 'requestsRecovery'},
		           {id:'_description',header : '描述',width : 80,sortable:true,dateIndex : 'description'},
		           {id:'_jobData',header : 'BLOB数据',width : 80,sortable:true,dateIndex : 'jobData'}];
	}
});
