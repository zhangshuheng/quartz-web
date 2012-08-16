/**
 * 'jobName', 'jobGroup', 'jobClassName', 'isDurable', 'isStateful',
 * 'isVolatile', 'requestsRecovery', 'description','jobData'
 */
Ext.define('js.quartzWebApp.desktop.stores.jobDetailStore', {
	extend : 'Ext.data.JsonStore',
	singleton : true,
	autoLoad : true,
	requires : [ 'js.quartzWebApp.desktop.models.jobDetailModel' ],
	model : 'js.quartzWebApp.desktop.models.jobDetailModel',
	constructor : function() {
		this.callParent(arguments);
	},
	proxy : new Ext.data.HttpProxy({
		url : 'ui?action=get_jobs',
		method : "POST"
	}),
	autoLoad : false,
	root : "results", // 不要使用Reader，会报TypeError: record is undefined
	totalProperty : "totalCount",
	idProperty : "id"

});
