var data = {
	JOBS : [ {
		JOB_GROUP : '1',
		JOB_NAME : '1',
		DESCRIPTION : '1',
		JOB_CLASS_NAME : '1',
		IS_DURABLE : '1',
		IS_VOLATILE : '1',
		IS_STATEFUL : '1',
		REQUESTS_RECOVERY : '1'
	} ]
}
// 定义一个model
Ext.define('JOBDETAILS', {
	extend : 'Ext.data.Model',
	/**
	 * 包含两个字段
	 * JOB_GROUP, JOB_NAME, DESCRIPTION,
	 * JOB_CLASS_NAME, IS_DURABLE, 
	 * IS_VOLATILE, IS_STATEFUL,
	 * REQUESTS_RECOVERY, 
	 * JOB_DATA暂不显示
	 */
	 
	fields : [ 'JOB_GROUP', 'JOB_NAME', 'JOB_CLASS_NAME', 'IS_DURABLE',
			'IS_VOLATILE', 'IS_STATEFUL', 'REQUESTS_RECOVERY', 'DESCRIPTION' ],
	// 从后台获取数据
	proxy : {
		type : 'ajax',
		url : 'ui?action=get_jobs'
	}
});
// 创建一个store
var store = Ext.create('Ext.data.Store', {
	// 数据结构
	model : 'JOBDETAILS',
	groupField : 'JOB_GROUP',
	// data:data,
	// 从本地上下文中获取数据
	proxy : {
		type : 'memory',
		reader : {
			type : 'json',
			root : 'JOBS'
		}
	}
});
var demoGrid = Ext.create('Ext.grid.Panel', {
	title : 'qrtz_job_details',
	store : store,
	forceFit : true,
	// renderTo : 'demo_div',
	// 声明分组展示
	features : [ Ext.create('Ext.grid.feature.Grouping', {
		// 组名
		groupHeaderTpl : '{name}({rows.length})'
	}) ],
	columns : [ {
		text : 'JOB组',
		dataIndex : 'JOB_GROUP'
	}, {
		text : 'JOB名称',
		dataIndex : 'JOB_NAME'
	}, {
		text : 'JOB_CLASS_NAME',
		dataIndex : 'JOB_CLASS_NAME'
	}, {
		text : 'DESCRIPTION',
		dataIndex : 'DESCRIPTION'
	}, {
		text : 'IS_DURABLE',
		dataIndex : 'IS_DURABLE'
	}, {
		text : 'IS_VOLATILE',
		dataIndex : 'IS_VOLATILE'
	}, {
		text : 'IS_STATEFUL',
		dataIndex : 'IS_STATEFUL'
	}, {
		text : 'REQUESTS_RECOVERY',
		dataIndex : 'REQUESTS_RECOVERY'
	} ]
});