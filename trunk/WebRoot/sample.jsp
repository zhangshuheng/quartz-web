<%@ page language="java" pageEncoding="UTF-8"%>  
  
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">  
<html>  
  <head>  
    <title>例子</title>  
    <meta http-equiv="pragma" content="no-cache">  
    <meta http-equiv="cache-control" content="no-cache">  
    <meta http-equiv="expires" content="0">       
    <meta http-equiv="keywords" content="keyword1,keyword2,keyword3">  
    <meta http-equiv="description" content="This is my page">  
    
       
	<link rel="stylesheet" href="extjs/resources/css/ext-all.css" type="text/css"></link>
  	<link rel="stylesheet" href="extjs/examples/shared/example.css" type="text/css"></link>
  	
	<script type="text/javascript" src="extjs/ext-all.js"></script>
	<script type="text/javascript" src="extjs/examples/shared/examples.js"></script>
    <script type="text/javascript" src="extjs/locale/ext-lang-zh_CN.js"></script>
    <script type="text/javascript">  
    Ext.onReady(function(){    
    	Ext.define("Everts",{
	    	extend:"Ext.data.Model",  
            fields:[  
                 {name:"id"},  
                 {name:"calendar"},   
                 {name:"title"},   
                 {name:"start", type:"date", dateFormat:"Y-m-dTH:i:s"}  ,   
                 {name:"end", type:"date", dateFormat:"Y-m-dTH:i:s"}  ,   
                 {name:"loc"},   
                 {name:"notes"},   
                 {name:"url"},   
                 {name:"ad", type: 'bool'},
                 {name:"rem"},     
                 {name:"n", type: 'bool'} 
            ]  
		}); 
		
		Ext.define("Calendar",{
	    	extend:"Ext.data.Model",  
            fields:[  
                 {name:"id"},  
                 {name:"title"}
            ]  
		});  
	    
	    Ext.create('Ext.data.Store', {
	    	model : 'Everts',
	    	storeId:'evertsStore',
		    fields: ['id', 'calendar','title', 'start','end', 'loc','notes', 'url','ad', 'rem', 'n'],
		    proxy: {
		        type: 'ajax',
		        url: 'findEverts.action',
		        reader: {
		            type: 'json',
		            root: 'everts'
		        }
		    },
		    //用时间分组要format
		    getGroupString: function(instance) {  
	            var group = this.groupers.first();  
	            if (group) {  
	                if (group.property === 'start') {  
	                    return Ext.Date.format(new Date(instance.get('start')), 'Y-m-d');  
	                }  
	                return instance.get(group.property);  
	            }  
	            return '';  
	        },  
		    sorters: {property: 'title', direction: 'ASC'},
        	groupField: 'start',//分组字段
	    	autoLoad: true
		});
	    
	    Ext.create('Ext.data.Store', {
			model : 'Calendar',
			storeId:'calendarsStore',
		    proxy: {
		        type: 'ajax',
		        url: 'findCalendars.action',
		        reader: {
		            type: 'json',
		            root: 'calendars'
		        }
		    },
		    autoLoad: true
		});
		//行编辑
	    var rowEditing= Ext.create('Ext.grid.plugin.RowEditing', {
	        clicksToMoveEditor: 1,
	        autoCancel: false
	    });
	    
		var grid = Ext.create('Ext.grid.Panel', {
		    title: 'Simpsons',
		    layout:'fit',
		    store: Ext.data.StoreManager.lookup('evertsStore'),
		    selModel : Ext.create('Ext.selection.CheckboxModel', {}),
		    columns: [
		        { header: 'id',  dataIndex: 'id', hidden: true},
		        { 
		        	header: 'calendar', 
		        	dataIndex: 'calendar',
		        	renderer: function(value){
		        		if(value != null){
		        			return value.title;
		        		}
		        	},
		        	width: 120,
		        	editor: {
		                xtype: 'combo',
		                id: 'aaa',
		                queryMode: 'local',
		                store: Ext.data.StoreManager.lookup('calendarsStore'),
					    displayField: 'title',
					    valueField: 'id',
                		triggerAction: 'all',
                		editable: false,
		                allowBlank: false
		            },
		            summaryType: 'count',
		            summaryRenderer: function(value, summaryData, dataIndex) {
		                return value + ' 项';
		            }
		        },
		        { 
		        	header: 'title', dataIndex: 'title', 
		        	editor: {
		        		xtype: 'textfield'
		        	},
		            flex: 1
		        },
		        { 
		        	xtype:'datecolumn' ,header: 'end', dataIndex: 'end', format: 'Y-m-d',
		        	editor: {
		                xtype: 'datefield',
		                allowBlank: false,
		                format: 'Y-m-d'
		            }
	            },
		        { header: 'loc',dataIndex: 'loc', 
		        	editor: {
		        		xtype: 'textfield'
		        	}
		        },
		        { header: 'notes', dataIndex: 'notes', editor: {
		        		xtype: 'textfield'
		        	}
		        },
		        { header: 'url', dataIndex: 'url', editor: {
		        		xtype: 'textfield'
		        	}
		        },
		        { 
		        	header: 'ad', 
		        	dataIndex: 'ad',
		        	renderer: function(value){
				        if (value) {
				            return '√';
				        }else{
				        	return '×';
				        }
				    },
		        	editor: {
	                	xtype: 'checkbox',
		                cls: 'x-grid-checkheader-editor'
		            }
		     	},
		        //{ header: 'rem', dataIndex: 'rem' },
		        { 
		        	header: 'n', 
		        	dataIndex: 'n',
		        	renderer: function(value){
				        if (value) {
				            return '√';
				        }else{
				        	return '×';
				        }
				    },
		        	editor: {
	                	xtype: 'checkbox',
		                cls: 'x-grid-checkheader-editor'
		            }
	    		}
		        
		    ],
		    tbar: [{
		    	xtype: 'combo',
                queryMode: 'local',
                store: Ext.data.StoreManager.lookup('calendarsStore'),
			    displayField: 'title',
			    valueField: 'id',
              	triggerAction: 'all',
              	editable: false
		    },{
	            text: '新增',
	            iconCls: 'employee-add',
	            handler : function() {
	                rowEditing.cancelEdit();
	                // 创建新对象
	                var r = Ext.create('Everts', {
	                //'id', 'calendar','title', 'start','end', 'loc','notes', 'url','ad', 'rem', 'n'
	                	calendar: Ext.data.StoreManager.lookup('calendarsStore').getAt(0),
	                    title: 'new',
	                    start: new Date(),
	                    end: new Date()
	                });
					//插入新对象
	                Ext.data.StoreManager.lookup('evertsStore').insert(0, r);
	                rowEditing.startEdit(0, 0);
	            }
	        }, {
	            itemId: 'removeEmployee',
	            text: '删除',
	            iconCls: 'employee-remove',
	            handler: function() {
	                var records = grid.getSelectionModel().getSelection();
	                if(records.length != 1){
	                	Ext.example.msg('提示', '请选择一条记录!');
	                	return;
	                }
	            	var params = {
						'id': records[0].data.id
					}; 
					var url = "deleteEvert.action";
					var succFn = function(){
						e.record.commit();
						Ext.data.StoreManager.lookup('evertsStore').load();
					};
					var failMsg = "删除";
	            	//新版消息框的好处,能直接用方法
	            	Ext.MessageBox.show({
			           	title:'提示',
			           	msg: '确定要删除该数据吗?',
			           	buttons: Ext.MessageBox.YESNO,
			           	fn: actionFn(params,url,succFn,msg),
           				icon: Ext.MessageBox.QUESTION
           			});
	            },
	            disabled: true
	        }],
	        features: [{
	            id: 'group',
	            ftype: 'groupingsummary',
	            groupHeaderTpl: '{name}',
	            hideGroupedHeader: true,
	            enableGroupingMenu: false
	        }],
	        plugins: [rowEditing] ,
	        listeners: {
	            'selectionchange': function(view, records) {
	                grid.down('#removeEmployee').setDisabled(!records.length);
	            }
	        },
		    renderTo: 'editor-grid'
		});
		
		//监听编辑按钮
		grid.on('edit', function(editor, e) {
			var params = {
				'evert.id': e.record.data.id,
				'evert.calendar.id': e.record.data.calendar,
				'evert.title':  e.record.data.title,
				'evert.start': e.record.data.start,
				'evert.end' : e.record.data.end,
				'evert.loc' : e.record.data.loc,
				'evert.notes' : e.record.data.notes,
				'evert.url' : e.record.data.url,
				'evert.ad' : e.record.data.ad,
				//'evert.rem' : e.record.data.rem,
				'evert.n' : e.record.data.n
			}; 
			var url = "saveEvert.action";
			var succFn = function(){
				e.record.commit();
				Ext.data.StoreManager.lookup('evertsStore').load();
			};
			var failMsg = "新增";
			
			actionFn(params,url,succFn,failMsg);
		});
        
        /**	
        	统一提交action方法;
	        params: 参数,
	        url: 地址,
	        succFn: 成功后执行的方法,
	        failMsg: 失败提示.
        */
        function actionFn(params,url,succFn,failMsg){
        	Ext.Ajax.request({
          		params: params,
				url: url,
				success: function(response) {
					var resp = Ext.JSON.decode(response.responseText);
					if (resp.status == "ok") {
		           		succFn();
					} else {
						Ext.MessageBox.alert(msg+'失败', resp.status);
					}
				}
			});
        }
		
		/**
			解决在rowEditing中使用对象下拉框时加载为[object Object]的现象		
		*/
		Ext.override(Ext.form.field.ComboBox, {
		    findRecord: function(field, value) {
		        var ds = this.store,
		            idx = ds.findExact(field, value[field]);
		        return idx !== -1 ? ds.getAt(idx) : false;
		    }
		});
				
		
  	});
    </script>
    <style type="text/css">
        .employee-add {
            background-image: url('extjs/examples/shared/icons/fam/user_add.gif') !important;
        }

        .employee-remove {
            background-image: url('extjs/examples/shared/icons/fam/user_delete.gif') !important;
        }
        .task .x-grid-cell-inner {
            padding-left: 15px;
        }
        .x-grid-row-summary {
            color:#333;
            background: #f1f2f4;
        }
        .x-grid-row-summary  .x-grid-cell-inner {
            font-weight: bold;
            font-size: 11px;
            padding-bottom: 4px;
        }
        .x-grid-hide-summary .x-grid-row-summary {
            display:none;
        }
        .x-grid-row .x-grid-cell-cost {
            background-color:#f1f2f4;
        }
        .x-grid-row-summary .x-grid-cell-cost {
            background-color:#e1e2e4;
        }
    </style>
</head>  
     
  <body>
      <div id="editor-grid"></div>
  </body>
</html>  
