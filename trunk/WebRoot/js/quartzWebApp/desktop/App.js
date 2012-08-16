/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('js.quartzWebApp.desktop.App', {
	extend : 'Ext.ux.desktop.App',

	requires : [ 'Ext.window.MessageBox',

	'Ext.ux.desktop.ShortcutModel',

	'js.quartzWebApp.desktop.models.SystemStatus',
	'js.quartzWebApp.desktop.views.VideoWindow',
	'js.quartzWebApp.desktop.views.GridWindow',
	
	'js.quartzWebApp.desktop.views.JOBGridWindow',
	
	'js.quartzWebApp.desktop.views.TabWindow',
	'js.quartzWebApp.desktop.views.AccordionWindow',
	'js.quartzWebApp.desktop.models.Notepad',
	'js.quartzWebApp.desktop.models.BogusMenuModule',
	'js.quartzWebApp.desktop.models.BogusModule',
	'js.quartzWebApp.desktop.views.jobDetailEditorWindow',


	// 'js.quartzWebApp.desktop.Blockalanche',
	'js.quartzWebApp.desktop.views.Settings' ],

	meName : 'Administrator',

	init : function() {
		// custom logic before getXYZ methods get called...

		this.callParent();

		// now ready...
	},

	getModules : function() {
		return [ new js.quartzWebApp.desktop.views.VideoWindow(),
		// new js.quartzWebApp.desktop.Blockalanche(),
		        new js.quartzWebApp.desktop.models.SystemStatus(),
				new js.quartzWebApp.desktop.views.GridWindow(),
				
				new js.quartzWebApp.desktop.views.JOBGridWindow(),
				
				new js.quartzWebApp.desktop.views.TabWindow(),
				new js.quartzWebApp.desktop.views.AccordionWindow(),
				new js.quartzWebApp.desktop.models.Notepad(),
				new js.quartzWebApp.desktop.models.BogusMenuModule(),
				new js.quartzWebApp.desktop.models.BogusModule(),
				new js.quartzWebApp.desktop.views.jobDetailEditorWindow() ];
	},

	/**
	 * 桌面配置项
	 * 1、右键
	 * 2、桌面快捷方式
	 * 3、桌面背景
	 * @returns
	 */
	getDesktopConfig : function() {
		var me = this, ret = me.callParent();

		return Ext.apply(ret, {
			// cls: 'ux-desktop-black',

			contextMenuItems : [ {
				text : '更改设置',
				handler : me.onSettings,
				scope : me
			} ],

			shortcuts : Ext.create('Ext.data.Store', {
				model : 'Ext.ux.desktop.ShortcutModel',
				data : [ {
					name : 'Grid Window',
					iconCls : 'grid-shortcut',
					module : 'grid-win'
				},{
					name : 'JOB详细',
					iconCls : 'grid-shortcut',
					module : 'jobGrid-win'
				}, {
					name : 'Accordion Window',
					iconCls : 'accordion-shortcut',
					module : 'acc-win'
				}, {
					name : 'Notepad',
					iconCls : 'notepad-shortcut',
					module : 'notepad'
				}, {
					name : 'System Status',
					iconCls : 'cpu-shortcut',
					module : 'systemstatus'
				}]
			}),

			wallpaper : 'images/desktop/wallpapers/',
			wallpaperStretch : true
		});
	},

	// 配置开始菜单
	getStartConfig : function() {
		var me = this, ret = me.callParent();

		return Ext.apply(ret, {
			title : this.meName,// 'Default'此处的title属性是动态获取的，如果没有动态设置，则为默认值Adminstrator
			iconCls : 'user',
			height : 300,
			toolConfig : {
				width : 100,
				items : [ {
					text : '设置',
					iconCls : 'settings',
					handler : me.onSettings,
					scope : me
				}, '-', {
					text : '注销',
					iconCls : 'logout',
					handler : me.onLogout,
					scope : me
				},'-',{
					text : '控制面板',
					handler : me.onContrls,
					scope : me
				} ]
			}
		});
	},

	getTaskbarConfig : function() {
		var ret = this.callParent();

		return Ext.apply(ret, {
			quickStart : [ {
				name : 'Accordion Window',
				iconCls : 'accordion',
				module : 'acc-win'
			}, {
				name : 'Grid Window',
				iconCls : 'icon-grid',
				module : 'grid-win'
			} ],
			trayItems : [ {
				xtype : 'trayclock',
				flex : 1
			} ]
		});
	},

	onLogout : function() {
		Ext.Msg.confirm("提示", "确认注销?", function(button, text) {
			if (button == 'yes') {
				Ext.Ajax.request({
					url : 'ui', // 请求地址
					// 提交参数组
					params : {
						action : 'logout'
					},
					// 成功时回调
					success : function(response, options) {
						// 获取响应的json字符串
						var responseArray = Ext.decode(response.responseText);
						if (responseArray.success == true) {
							window.location.href = location;
							Ext.Msg.alert('提示', responseArray.message);
						} else {
							Ext.Msg.alert('失败', responseArray.message);
						}
					}
				});
			}
		});

	},

	onSettings : function() {
		var dlg = new js.quartzWebApp.desktop.views.Settings({
			desktop : this.desktop
		});
		dlg.show();
	},
	onContrls : function(){
		Ext.Msg.alert('提示','此功能暂未开放.......敬请期待!');
	}
});
