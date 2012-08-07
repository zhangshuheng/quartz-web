Ext.onReady(function() {
			// NOTE: This is an example showing simple state management. During
			// development,
			// it is generally best to disable state management as
			// dynamically-generated ids
			// can change across page loads, leading to unpredictable results.
			// The developer
			// should ensure that stable state ids are set for stateful
			// components in real apps.
			Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));

			// 树形菜单
			var treePanel = new Ext.tree.TreePanel({
				// renderTo : 'west-tree',
				// /title : 'Tree test',
				// height : 300,
				// width : 400,
				border : false,
				useArrows : true,
				autoScroll : true,
				containerScroll : true,
				rootVisible : false,
				frame : true,
				root : {
					text : 'Tree Node',
					children : [ {
						text : "detention",
						aa : 'aa',
						leaf : true
					}, {
						text : "homework",
						expanded : true,
						children : [ {
							text : "book report",
							leaf : true
						}, {
							text : "alegrbra",
							leaf : true
						} ]
					}, {
						text : "buy lottery tickets",
						leaf : true
					} ]
				},
				listeners : {
					'click' : function(node, e) {
						alert(node.attributes.aa);
					}
				}
			});
			function addtab(id, link, name) { // 这里我定义一个方法，是在节点单击的时候触发这个方法，
				var tabId = "tab-" + id;
				var tabTitle = name;
				var tabLink = link;
				currentPage = tabId;
				var centerpanel = Ext.getCmp('MainTabPanel');
				var tab = centerpanel.getComponent(tabId);

				var subMainId = 'tab-' + id + '-main';

				if (!tab) { // 判断MainTabPanel中是否存在这个页面，如果不存在
					tab = centerpanel.add(new Ext.Panel({
						id : tabId,
						title : tabTitle,
						autoScroll : true,
						iconCls : 'tabIconCss',
						layout : 'fit', // layout一定要是fit，不然显示grid会有问题。
						border : false,
						tools : [ {
							id : 'refresh'
						} ],
						closable : true
					}));

					centerpanel.setActiveTab(tab); // 将焦点指向我点击节点打开的页面
					tab.load({
						url : tabLink, // 指向我传过来的页面的位置
						scope : this,
						discardUrl : true,
						nocache : true,
						text : "页面加载中,请稍候……",
						timeout : 9000,
						scripts : true
					});

				} else { // 如果MainTabPanel，那么就直接将节点指向这个页面
					centerpanel.setActiveTab(tab);
				}
			}

			treePanel.on('click', function(node) { // 当我点击某个节点的时候会出发这个事件
				if (node.id.split('-')[1] == 2) { // 拆分节点的id，判断是否为二级节点
					link = node.id.split('-')[2]; // 取出节点对应的jsp页面的路径
					addtab(node.id, link, node.text); // 调用上面对应的方法
				}

			});

			// 屬性
			var propertyCrid = Ext.create('Ext.grid.PropertyGrid', {
				title : 'Property Grid',
				closable : true,
				source : {
					"(name)" : "Properties Grid",
					"grouping" : false,
					"autoFitColumns" : true,
					"productionQuality" : false,
					"created" : Ext.Date.parse('10/15/2006', 'm/d/Y'),
					"tested" : false,
					"version" : 0.01,
					"borderWidth" : 1
				}
			});
			// 創建一個主界面的tabPanel
			var mainTabPanel = Ext.create('Ext.tab.Panel', {
				id : 'mainTabPanel',
				region : 'center', // a center region is ALWAYS required for
									// border layout
				deferredRender : false,
				activeTab : 0, // first tab initially active
				// plugins : Ext.create('Ext.ux.TabCloseMenu', {
				// closeTabText : '关闭当前页',
				// closeOthersTabsText : '关闭其他页',
				// closeAllTabsText : '关闭所有页'
				// }),
				items : [ {
					contentEl : 'center',
					title : '欢迎页面',
					autoScroll : true
				}, {
					contentEl : 'quartz-doc',
					title : 'Quartz官方文档',
					closable : true,
					autoScroll : true,
					listeners : {
						render : function(p) {
							// p.body.mask('Loading...');
						},
						delay : 50
					}
				}, {
					contentEl : 'wetherinfo',
					title : '全国天气情况',
					closable : true,
					autoScroll : true
				} ]
			});
			mainTabPanel.add(demoGrid);
			// 主布局
			var viewport = Ext.create(
							'Ext.Viewport',
							{
								id : 'border-example',
								layout : 'border',
								items : [
										// create instance immediately
										Ext.create('Ext.Component',
														{
															region : 'north',
															height : 32, // give  north  and  south regions  a  height
															autoEl : {
																tag : 'div',
																html : '<p><a href="http://quartz-scheduler.org/documentation"><img src="images/quartz-scheduler.png" alt="http://quartz-scheduler.org/documentation"/></a></p>'
															}
														}),
										{
											// lazily created panel
											// (xtype:'panel' is default)
											region : 'south',
											contentEl : 'south',
											split : true,
											height : 100,
											minSize : 100,
											maxSize : 200,
											collapsible : true,
											collapsed : true,
											title : '下边区域',
											margins : '0 0 0 0'
										},
										{
											xtype : 'tabpanel',
											region : 'east',
											title : '右边区域',
											dockedItems : [ {
												dock : 'top',
												xtype : 'toolbar',
												items : [ '-->', {
													xtype : 'button',
													text : '获取最新天气',
													tooltip : '获取最新天气'
												} ]
											} ],
											animCollapse : true,
											collapsible : true,
											split : true,
											width : 225, // give east and
															// west regions a
															// width
											minSize : 175,
											maxSize : 400,
											margins : '0 5 0 0',
											activeTab : 0,
											tabPosition : 'bottom',
											items : [
													{
														title : '天气',
														autoScroll : true,
														html : '<p>在这里加载天气情况</p><p>定时任务加载天气....</p>'

													}, {
														html : '',
														title : 'A Tab',
														autoScroll : true
													}, propertyCrid ]
										},
										{
											region : 'west',
											stateId : 'navigation-panel',
											id : 'west-panel', // see Ext.getCmp()  below
											title : '左边区域',
											split : true,
											width : 200,
											minWidth : 175,
											maxWidth : 400,
											collapsible : true,
											animCollapse : true,
											margins : '0 0 0 5',
											layout : 'accordion',
											items : [
													{
														// contentEl :
														// 'west-tree',
														items : [ treePanel ],
														title : '导航',
														iconCls : 'nav' // see  the  HEAD section for style used
													},
													{
														title : '设置',
														html : '<p>Some settings in here.</p>',
														iconCls : 'settings'
													},
													{
														title : '信息',
														html : '<p>Some info in here.</p>',
														iconCls : 'info'
													} ]
										},
										// in this instance the TabPanel is not
										// wrapped by another panel
										// since no title is needed, this Panel
										// is added directly
										// as a Container
										mainTabPanel ]
							});
			// get a reference to the HTML element with id "hideit" and add a
			// click listener to it
			Ext.get("hideit").on('click', function() {
				// get a reference to the Panel that was created with id =
				// 'west-panel'
				var w = Ext.getCmp('west-panel');
				// expand or collapse that Panel based on its collapsed property
				// state
				w.collapsed ? w.expand() : w.collapse();
			});
			Ext.create('Ext.Button', {

				renderTo : Ext.get("li1"),

				text : '启动调度器',

				allowDepress : true, // 是否允许按钮被按下的状态

				enableToggle : true, // 是否允许按钮在弹起和按下两种状态中切换

				handler : function() {
					Ext.getBody().mask("调度器启动中.请稍等...", "x-mask-loading");
					Ext.Ajax.request({
						url : 'ui',
						headers : {
							'userHeader' : 'userMsg'
						},
						params : {
							action : 'startScheduler'
						},
						method : 'POST',
						success : function(response, options) {
							var responseArray = Ext.util.JSON
									.decode(response.responseText); // 取得返回的josn
							alert(responseArray.message); // 弹出显示的内容
							Ext.MessageBox.alert('成功', '从服务端获取结果: '
									+ response.responseText);

						},
						failure : function(response, options) {
							Ext.getBody().unmask();
							// Ext.Msg.alert('用户操作', '用户启动调度器失败！');
							Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：'
									+ response.status);
						}
					});
				},
				id : "startScheduler"
			});
			//依赖系统的类加载系统
			Ext.Loader.setConfig({
	            enabled: true,
	            paths: {
	                'Ext.calendar': 'js/calendar'
	            }
	        });
		});