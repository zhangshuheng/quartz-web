<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";

    if(null == request.getAttribute("user")){
    	//response.sendRedirect("index.jsp");
    }
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<base href="<%=basePath%>">

		<title>基于quartz1.6.5任务调度管理web应用 </title>

		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
		<meta http-equiv="description" content="This is my page">
		<style type="text/css">
p {
	margin: 5px;
}

.settings {
	background-image: url(images/icons/fam/folder_wrench.png);
}

.nav {
	background-image: url(images/icons/fam/folder_go.png);
}

.info {
	background-image: url(images/icons/fam/information.png);
}
</style>
		<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
<link rel="stylesheet" type="text/css" href="extjs-4.1/resources/css/ext-all.css" />
<script type="text/javascript" src="extjs-4.1/bootstrap.js"></script>
			
<script type="text/javascript" src="js/menu.js"></script>
<script type="text/javascript">
	Ext.require([ '*' ]);

	Ext.onReady(function() {

		Ext.QuickTips.init();

		// NOTE: This is an example showing simple state management. During development,
		// it is generally best to disable state management as dynamically-generated ids
		// can change across page loads, leading to unpredictable results.  The developer
		// should ensure that stable state ids are set for stateful components in real apps.
		Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));

		
		var viewport = Ext.create('Ext.Viewport', {
			id : 'border-example',
			layout : 'border',
			items : [
			// create instance immediately
			Ext.create('Ext.Component', {
				region : 'north',
				height : 32, // give north and south regions a height
				autoEl : {
					tag : 'div',
					html : '<p><a href="http://quartz-scheduler.org/documentation"><img src="images/quartz-scheduler.png" alt="http://quartz-scheduler.org/documentation"/></a></p>'
				}
			}), {
				// lazily created panel (xtype:'panel' is default)
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
			}, {
				xtype : 'tabpanel',
				region : 'east',
				title : '右边区域',
				dockedItems : [ {
					dock : 'top',
					xtype : 'toolbar',
					items : [ '->', {
						xtype : 'button',
						text : '获取最新天气',
						tooltip : '获取最新天气'
					} ]
				} ],
				animCollapse : true,
				collapsible : true,
				split : true,
				width : 225, // give east and west regions a width
				minSize : 175,
				maxSize : 400,
				margins : '0 5 0 0',
				activeTab : 0,
				tabPosition : 'bottom',
				items : [{
					title:'天气',
					autoScroll:true,
					html:'<p>在这里加载天气情况</p><p>定时任务加载天气....</p>'
				
				}, {
					html : '',
					title : 'A Tab',
					autoScroll : true
				}, Ext.create('Ext.grid.PropertyGrid', {
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
				}) ]
			}, {
				region : 'west',
				stateId : 'navigation-panel',
				id : 'west-panel', // see Ext.getCmp() below
				title : '左边区域',
				split : true,
				width : 200,
				minWidth : 175,
				maxWidth : 400,
				collapsible : true,
				animCollapse : true,
				margins : '0 0 0 5',
				layout : 'accordion',
				items : [ {
					contentEl : 'west',
					title : '导航',
					iconCls : 'nav' // see the HEAD section for style used
				}, {
					title : '设置',
					html : '<p>Some settings in here.</p>',
					iconCls : 'settings'
				}, {
					title : '信息',
					html : '<p>Some info in here.</p>',
					iconCls : 'info'
				} ]
			},
			// in this instance the TabPanel is not wrapped by another panel
			// since no title is needed, this Panel is added directly
			// as a Container
			var tabPanel = Ext.create('Ext.tab.Panel', {
				region : 'center', // a center region is ALWAYS required for border layout
				deferredRender : false,
				activeTab : 0, // first tab initially active
//				plugins : Ext.create('Ext.ux.TabCloseMenu', {  
//                    closeTabText : '关闭当前页',  
//                    closeOthersTabsText : '关闭其他页',  
//                    closeAllTabsText : '关闭所有页'  
//                }),  
				items : [{
					contentEl : 'center',
					title : '欢迎页面',
					autoScroll : true
				},{ 
					contentEl : 'quartz-doc', 
					title: 'Quartz官方文档',
		            closable: true,
		            autoScroll: true,
		            listeners: {
			            render: function(p){
//			                p.body.mask('Loading...');
			            },
			            delay: 50
			        } 
				},{ 
					contentEl : 'wetherinfo', 
					title: '全国天气情况',
		            closable: true,
		            autoScroll: true
				} ]
			}) ]
		});
		// get a reference to the HTML element with id "hideit" and add a click listener to it
		Ext.get("hideit").on('click', function() {
			// get a reference to the Panel that was created with id = 'west-panel'
			var w = Ext.getCmp('west-panel');
			// expand or collapse that Panel based on its collapsed property state
			w.collapsed ? w.expand() : w.collapse();
		});
		Ext.create("Ext.Button", {
		
		    renderTo: Ext.get("li1"),
		
		    text: "启动调度器",
		
		    allowDepress: true,     //是否允许按钮被按下的状态
		
		    enableToggle: true,     //是否允许按钮在弹起和按下两种状态中切换
		
		    handler: function () {
		
		        Ext.Msg.alert("提示", "第一个事件");
		
		    },
		
		    id: "startScheduler"
		
		});
		 
		
	});
</script>

</head>

	<body>
		<!-- use class="x-hide-display" to prevent a brief flicker of the content -->
		<div id="west" class="x-hide-display">
			<p>
				左边面板
			</p>
		</div>
		<div id='toolbar' align="right"></div>
		<div id="center" class="x-hide-display" >
			<p>初衷：一个可视化的quartz任务调度的web应用 </p>
	
			<p>采用quartz-1.6.5源码，没有使用jar，这样可以一边看源码一边做开发。 </p>
			
			<p>页面显示是用Extjs-4.1.1来做的，基于 GPL协议的开源。</p>
			<p></p>
			<p></p>
			<p></p>
			<p></p><p></p>
			<p></p>
			<p></p>
			<p></p>
			<p></p>
			<p>
				<a id="hideit" href="#">Toggle the west region</a>
			</p>
			<p>
				<a href="QuartzTestServlet">QuartzTest</a>
			</p>
			<p>
				<a href="desktop/desktop.html">EXT desktop</a>
			</p>
			<ul>

		        <li id="li1"></li>
		
		        <li id="li2"></li>
		
		        <li id="li3"></li>
		
		    </ul>
		    
			
		</div>
		<div id="quartz-doc" class="x-hide-display">
			<a href="http://quartz-scheduler.org/documentation">http://quartz-scheduler.org/documentation</a>
		</div>
		<div id="wetherinfo" class="x-hide-display">
			<iframe width="960" height="719" frameborder="0" scrolling="no" src="http://flash.weather.com.cn/wmaps/index.swf?url1=http:%2F%2Fwww.weather.com.cn%2Fweather%2F&url2=.shtml&from=cn" marginheight="0" marginwidth="0" name="tf"></iframe>
		</div>
		<div id="props-panel" class="x-hide-display"
			style="width: 200px; height: 200px; overflow: hidden;">
		</div>
		<div id="south" class="x-hide-display">
			<p>
				下边面板
			</p>
		</div>
	</body>
</html>
