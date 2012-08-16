Ext.define('js.quartzWebApp.desktop.views.jobDetailEditorWindow',{
	extend:'Ext.Window',
	requires:['js.quartzWebApp.desktop.views.jobDetailGridPanel','js.quartzWebApp.desktop.views.jobDetailFormPanel'],
	height:200,
	width:550,
	border:false,
	id:'job-win',
	
	layout:{
		type:'hbox',
		align:'stretch'
	},
	initComponent:function(){
		this.items=this.buildItems();
		this.buttons=this.buildButtons();
		this.callParent();
		this.on('afterrender',this.onAfterRenderLoadForm,this);
	},
	buildItems:function(){
		return[{
			xtype:'jobDetailGridPanel',
			width:280,
			itemId:'jobDetailGrid',
			listeners:{scope:this,itemclick:this.onGridItemClick
			}
		},{
			xtype:'jobDetailFormPanel',
			itemId:'jobDetailForm',
			flex:1
		}];
	},
	buildButtons:function(){
		return[{
			text:'Save',
			scope:this,
			handler:this.onSaveBtn
		},{
			text:'New',
			scope:this,
			handler:this.onNewBtn
		}];
	},
	onGridItemClick:function(view,record){
		var formPanel=this.getComponent('jobDetailForm');
		formPanel.loadRecord(record)
	},
	onSaveBtn:function(){
		var gridPanel=this.getComponent('jobDetailGrid'),
		gridStore=gridPanel.getStore(),
		formPanel=this.getComponent('jobDetailForm'),
		basicForm=formPanel.getForm(),
		currentRec=basicForm.getRecord(),
		formData=basicForm.getValues(),
		storeIndex=gridStore.indexOf(currentRec),
		key;
		
		// loopthroughtherecordandsetvalues
		currentRec.beginEdit();
		for(key in formData){
			currentRec.set(key,formData[key]);
		}
		currentRec.endEdit();
		currentRec.commit();
		// Addandselect
		if(storeIndex==-1){
			gridStore.add(currentRec);
			gridPanel.getSelectionModel().select(currentRec)
		}
	},
	onNewBtn:function(){
		var gridPanel=this.getComponent('jobDetailGrid'),
		formPanel=this.getComponent('jobDetailForm'),
		newModel=Ext.ModelManager.create({},'js.quartzWebApp.desktop.models.jobDetailModel');
		gridPanel.getSelectionModel().clearSelections();
		formPanel.getForm().loadRecord(newModel)
	},
	onAfterRenderLoadForm:function(){
		this.onNewBtn();
	}
});
