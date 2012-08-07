Ext.onReady(function() {
	
	var Toolbar = new Ext.toolbar.Toolbar({// 创建工具栏
		renderTo : 'toolbar',
		width : 300,
		height : 27
	});
	//信息菜单
	var infoMenu = Ext.create("Ext.menu.Menu",{// 一级菜单
		ignoreParentClicks : true,// 忽略父菜单的单击事件
		plain : true,
		items : [ {
			text : '个人信息',
			menu : new Ext.menu.Menu({// 二级菜单
				ignoreParentClicks : true,// 忽略父菜单的单击事件
				items : [ {
					text : '基本信息',
					menu : new Ext.menu.Menu({// 三级菜单
						items : [ {
							text : '身高',
							handler : onMenuItem
						}, {
							text : '体重',
							handler : onMenuItem
						} ]
					})
				} ]
			})
		},// 添加菜单项
		{
			id : '_org_id_',
			text : '组织机构信息',
			handler : getOrgItem
			
		}
		]
	});
	//设置菜单
	var setMenu = Ext.create("Ext.menu.Menu",{
		ignoreParentClicks : true,
		plain : true,
		  items : [{
			  text : '日程管理',
		      handler : onMenuItem//getCalendar
		  },'-',{
			  text : '启动调度器',
		      handler : startScheduler
		  },{
			  text : '关闭调度器',
		      handler : stopScheduler
		  },'-',{
			  text : '退出系统',
			  handler : logout
		  }]
	});
	//导航菜单
	var navMenu = Ext.create("Ext.menu.Menu",{
		plain : true,
		ignoreParentClicks : true,
		items : [{
			text : '欢迎页面',
			handler : onMenuItem
		},{
			text : 'Quartz官方文档',
			handler : onMenuItem
		},{
			text : '全国天气预报',
			handler : onMenuItem
		},{
			text : '添加面板',
			handler : addTabPage
		},{
			text : 'JOB',
			handler : getJobDetails
		}]
	});
	
	Toolbar.add(
		{text : '导航',iconCls : 'nav',menu : navMenu}// 将菜单加入工具栏
		,{text : '设置',iconCls : 'settings',menu : setMenu}
		,{text : '信息',iconCls : 'info',menu : infoMenu}
	);
	function onMenuItem(item) {// 选择菜单项的处理函数
		Ext.Msg.alert("提示","您点击了:\t<font style='font: bold;' >"+item.text+"</font>");// 取得菜单项的text属性
	}
	/**
	 * 获取组织信息
	 */
	var orgWin;
	function getOrgItem(){
		if (!orgWin) {
			orgWin = Ext.create('widget.window', {
				title : '组织机构',
				autoDestroy : true,
				closable : true,
				maximizable: true,
				minimizable: true,
				closeAction : 'close',
				width : 800,
				minWidth : 350,
				height : 500,
				layout : {
					type : 'border',
					padding : 5
				},
				items : [ {
					region : 'west',
					title : '组织机构树',
					width : 200,
					split : true,
					collapsible : true,
					floatable : false
				}, {
					region : 'center',
					xtype : 'tabpanel',
					draggable : true,
					items : [ {
						title : '组织机构详细01',
						html : '组织机构详细01'
					}, {
						title : '组织机构详细02',
						html : '组织机构详细02'
					}, {
						title : '组织机构详细03',
						html : '组织机构详细03',
						closable : true
					} ]
				} ]
			});
		}
		//button.dom.disabled = true;
		if (orgWin.isVisible()) {
			orgWin.hide(this, function() {
				//button.dom.disabled = false;
			});
		} else {
			orgWin.show(this, function() {
				//button.dom.disabled = false;
			});
		}

	}
	function addTabPage(cmpId){  
		var tabPanel = Ext.getCmp('mainTabPanel');
        var index = tabPanel.items.length + 1;  
        var tabPage = tabPanel.add({//动态添加tab页  
            title: 'tab标签页'+index,  
            html : 'tab标签页'+index+'内容',  
            closable : true//允许关闭  
        })  
        tabPanel.setActiveTab(tabPage);//设置当前tab页  
    } 
});
