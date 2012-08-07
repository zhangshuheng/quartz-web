
/**
 * 字段信息
 * JOB_GROUP, JOB_NAME, 
 * DESCRIPTION, JOB_CLASS_NAME, 
 * IS_DURABLE, IS_VOLATILE, 
 * IS_STATEFUL,REQUESTS_RECOVERY, 
 * JOB_DATA
 * JOB信息:JSONObject
 * {"results":
 *	 {"description":"",
 *		"isDurable":"0",
 *		"isStateful":"0",
 *		"isVolatile":"0","jobClassName":"com.quartz.web.test.ScanDB",
 *		"jobData":[-84,-19,0,5,115,114,0,21,111,114,103,46,113,117,97,114,116,122,46,74,111,98,68,97,116,97,77,97,112,-97,-80,-125,-24,-65,-87,-80,-53,2,0,0,120,114,0,38,111,114,103,46,113,117,97,114,116,122,46,117,116,105,108,115,46,83,116,114,105,110,103,75,101,121,68,105,114,116,121,70,108,97,103,77,97,112,-126,8,-24,-61,-5,-59,93,40,2,0,1,90,0,19,97,108,108,111,119,115,84,114,97,110,115,105,101,110,116,68,97,116,97,120,114,0,29,111,114,103,46,113,117,97,114,116,122,46,117,116,105,108,115,46,68,105,114,116,121,70,108,97,103,77,97,112,19,-26,46,-83,40,118,10,-50,2,0,2,90,0,5,100,105,114,116,121,76,0,3,109,97,112,116,0,15,76,106,97,118,97,47,117,116,105,108,47,77,97,112,59,120,112,1,115,114,0,17,106,97,118,97,46,117,116,105,108,46,72,97,115,104,77,97,112,5,7,-38,-63,-61,22,96,-47,3,0,2,70,0,10,108,111,97,100,70,97,99,116,111,114,73,0,9,116,104,114,101,115,104,111,108,100,120,112,63,64,0,0,0,0,0,12,119,8,0,0,0,16,0,0,0,1,116,0,8,116,101,115,116,109,111,100,101,116,0,4,116,114,117,101,120,0],
 *		"jobGroup":"Scanning","jobName":"ScanItemsInDB",
 *		"requestsRecovery":"0"},
 *	"totalCount":1}
 */
getJobDetails = function(qid, sid, jname, gname) {

	var jobDetailStore = new Ext.data.JsonStore({
				autoDestroy: true,
			    storeId: 'jobDetailStore',

			    proxy: {
			        type: 'ajax',
			        url: 'ui',
			        reader: {
			            type: 'json',
			            root: 'results',
			            idProperty: 'jobClassName'
			        }
			    },

				fields : ['jobName','jobGroup','jobClassName','isDurable','isStateful','isVolatile','requestsRecovery','description','jobData']
			});
	//jobDetailStore.setDefaultSort('JOB_NAME', 'ASC');
	jobDetailStore.load({
		url : 'ui',
		params : {
			action : 'get_jobs',
			'uuid' : qid,
			'sid' : sid,
			'jobName' : jname,
			'groupName' : gname
		},
		waitMsg : '正在加载JOB信息...',
		callback : function(records,options,success) {
//			 var u = Ext.decode(store);
//	            var jobClassName = u.jobClassName;
//	            alert(u_name);

			if (options) {
				var jobDetailGrid = new Ext.grid.GridPanel({
					store : jobDetailStore,
					closable : false,
					autoDestroy : false,
					columns : [{id:'_jobName',header : 'job名称',width:80, sortable:true,dataIndex :　'jobName'},
					           {id:'_jobGroup',header :'job组名',width : 80,sortable:true,dateIndex : 'jobGroup'},
					           {id : '_jobClassName',header : 'job类名',width : 160,css : "font-size : 13px;padding:3px;",sortable : true,dataIndex : 'jobClassName'},
					           {id:'_isDurable',header : '是否持久',width : 80,sortable:true,dateIndex : 'isDurable'},
					           {id:'_isStateful',header : 'job组名',width : 80,sortable:true,dateIndex : 'isStateful'},
					           {id:'_isVolatile',header : '是否稳定',width : 80,sortable:true,dateIndex : 'isVolatile'},
					           {id:'_requestsRecovery',header : '请求复原',width : 80,sortable:true,dateIndex : 'requestsRecovery'},
					           {id:'_description',header : '描述',width : 80,sortable:true,dateIndex : 'description'},
					           {id:'_jobData',header : 'BLOB数据',width : 80,sortable:true,dateIndex : 'jobData'}
							],
					stripeRows : true,
					region : 'center',
					autoScroll : true,
					autoExpandColumn : '_jobGroup',
					floatable : false,
					autoHeight : true,
					border : false,
					frame : false,
					loadMask : true
				});
				var jobDetailWin = new Ext.Window({
							id : 'jobDetailWin',
							title : '<font class="panelTitle">Job详细列表</font>',
							layout : 'border',
							width : 800,
							frame : true,
							maximizable: true,
							minimizable: true,
							height : 300,
							closeAction : 'hide',
							plain : false,
							border : true,
							items : [jobDetailGrid]
						});
				jobDetailWin.show();
			} else {
				Ext.Msg.show({
							title : '加载JOB信息失败!',
							//msg : res.message,
							buttons : Ext.Msg.OK,
							icon : Ext.MessageBox.ERROR
						});
			}
		}
	});
}