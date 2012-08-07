<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";

	if (null == request.getSession().getAttribute("user")) {
		response.sendRedirect("index.jsp");
	}
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<title>基于quartz1.6.5任务调度管理web应用</title>

		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta http-equiv="keywords" content="基于quartz1.6.5任务调度管理web应用">
		<meta http-equiv="description" content="基于quartz1.6.5任务调度管理web应用">
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
		
		<!--  -->
		<link rel="stylesheet" type="text/css" href="css/calendar/calendar.css">
		<link rel="stylesheet" type="text/css" href="css/calendar/examples.css">
		<!--  -->
		
		<script type="text/javascript" src="extjs-4.1/bootstrap.js"></script>
		<script type="text/javascript" src="js/commons.js"></script>
		<script type="text/javascript" src="js/job_details.js"></script>
		<script type="text/javascript" src="js/scheduler.js"></script>
		
		<!--  -->
		<!--  -->
		
		
		<script type="text/javascript" src="js/menu.js"></script>
		<script type="text/javascript" src="js/demo.js"></script>
		<script type="text/javascript" src="js/main.js"></script>

	</head>

	<body>
		<!-- use class="x-hide-display" to prevent a brief flicker of the content -->
		<div id="west-tree" class="x-hide-display">
			<p>
				左边面板
			</p>
		</div>
		<div id='toolbar' align="right"></div>
		<div id="center" class="x-hide-display">
			<p>
				初衷：一个可视化的quartz任务调度的web应用
			</p>

			<p>
				采用quartz-1.6.5源码，没有使用jar，这样可以一边看源码一边做开发。
			</p>

			<p>
				页面显示是用Extjs-4.1.1来做的，基于 GPL协议的开源。
			</p>
			<p></p>
			<p></p>
			<p></p>
			<p></p>
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
		
<!--			<iframe width="960" height="719" frameborder="0" scrolling="no"-->
<!--				src="http://flash.weather.com.cn/wmaps/index.swf?url1=http:%2F%2Fwww.weather.com.cn%2Fweather%2F&url2=.shtml&from=cn"-->
<!--				marginheight="0" marginwidth="0" name="tf"></iframe>-->
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
