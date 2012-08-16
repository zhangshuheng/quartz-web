Ext.define('js.quartzWebApp.desktop.models.jobDetailModel', {
	extend : 'Ext.data.Model',
	fields : [ {
		name : 'jobName'
	}, {
		name : 'jobGroup'
	}, {
		name : 'jobClassName'
	}, {
		name : 'isDurable'
	}, {
		name : 'isStateful'
	}, {
		name : 'isVolatile'
	}, {
		name : 'requestsRecovery'
	}, {
		name : 'description'
	}, {
		name : 'jobData'
	} ]
});

