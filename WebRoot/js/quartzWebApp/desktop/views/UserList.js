Ext.define('js.quartzWebApp.desktop.views.UserList', {
	extend : 'Ext.container.Container',
	alias : 'widget.userList',
	requires : ['Ext.ux.RowExpander', 'Ext.grid.plugin.RowEditing'],
	initComponent : function() {
		var me = this;
		Ext.applyIf(me, {
					margin : '0 10 10 10'
				});
		me.callParent(arguments);
	},

	flushView : function() {
		this.doComponentLayout();
	},

	loadView : function() {
		var store = Ext.create('js.quartzWebApp.desktop.stores.UserStore');

		var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
					store : store,
					displayInfo : true,
					items : ['-', {
								text : '每页显示'
							}, {
								xtype : 'combo',
								name : 'pageSize',
								displayField : 'pageSize',
								typeAhead : true,
								mode : 'local',
								forceSelection : true,
								triggerAction : 'all',
								editable : false,
								value : 15,
								width : 80,
								selectOnFocus : true,
								itemId : '#pageSize',
								store : Ext.create('Ext.data.ArrayStore', {
											fields : ['pageSize'],
											data : [[15], [20], [30], [40],
													[50]]
										})
							}, {
								text : '条'
							}, '-']
				});

		var grid = Ext.create('Ext.grid.Panel', {
			title : '全部',
			store : store,
			autoShow : true,
			selType : 'rowmodel',
			selModel : Ext.create('Ext.selection.CheckboxModel', {
						listeners : {
							selectionchange : function(sm, selections) {
								grid.down('#removeButton')
										.setDisabled(selections.length == 0);
							}
						}
					}),
			columns : [Ext.create('Ext.grid.RowNumberer'), {
						header : 'Name',
						dataIndex : 'name',
						flex : 3
					}, {
						header : 'Senority',
						dataIndex : 'senority',
						flex : 1
					}, {
						header : 'Department',
						dataIndex : 'department',
						flex : 1
					}, {
						xtype : 'actioncolumn',
						draggable : false,
						header : '操作',
						flex : 1
					}],
			plugins : [{
				ptype : 'rowexpander',
				rowBodyTpl : ['<b>Department:</b> {department}
<br>',
						'<b>Summary:</b> {name}
']
			}],
			dockedItems : [{
						xtype : 'toolbar',
						items : [{
									text : '添加',
									itemId : 'addButton',
									iconCls : 'add',
                                    action : 'add'
								}, '-', {
									itemId : 'removeButton',
									text : '删除',
									iconCls : 'remove',
									disabled : true,
                                    action : 'remove'
								}, '-']
					}]
		});

		this.add([pagingtoolbar, grid]);
		this.doComponentLayout();
	}
});
