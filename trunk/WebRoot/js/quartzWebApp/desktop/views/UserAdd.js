Ext.define('js.quartzWebApp.desktop.views.UserAdd', {
			extend : 'Ext.window.Window',
			alias : 'widget.userAdd',
			initComponent : function() {
				var me = this;
				Ext.applyIf(me, {
							layout : 'fit',
							title : '信息添加',
							bodyStyle : 'background:#fff; padding:10px;',
							items : [{
										xtype : 'form',
										border : false
									}],
							buttons : ['->', {
										text : '添加',
										action : 'save',
										scope : this
									}, '-', {
										text : '关闭',
										action : 'close',
										scope : this
									}]
						});
				me.callParent(arguments);
			},

			flushView : function() {
				this.doLayout();
			},

			loadView : function() {
				var formCmp = this.getComponent(0);
				formCmp.add([{
							xtype : 'textfield',
							fieldLabel : '部门名称',
							labelAlign : 'right',
							name : 'department'
						}, {
							xtype : 'textfield',
							fieldLabel : '名称',
							labelAlign : 'right',
							name : 'name'
						}, {
							xtype : 'textfield',
							fieldLabel : '调查名称',
							labelAlign : 'right',
							name : 'senority'
						}]);

				formCmp.doLayout();
				this.flushView();
			}
		});
