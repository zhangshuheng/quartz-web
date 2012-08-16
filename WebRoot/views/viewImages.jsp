<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//E
N">
<html>
	<head>
		<title>??????</title>
		<link rel="stylesheet" type="text/css"
			href="../extjs-4.1/resources/css/ext-all.css" />
		<script type="text/javascript" src="../extjs-4.1/bootstrap.js"></script>
		<script type="text/javascript"
			src="../extjs-4.1/locale/ext-lang-zh_CN.js"></script>
		<script type="text/javascript" src="../js/viewImages.js"></script>
	</head>
	<body oncontextmenu="return false">
		<div id="mapPic">
			<div class="nav">
				<div class="up" id="up"></div>
				<div class="right" id="right"></div>
				<div class="down" id="down"></div>
				<div class="left" id="left"></div>
				<div class="zoom" id="zoom"></div>
				<div class="in" id="in"></div>
				<div class="out" id="out"></div>
			</div>
			<img id='image' src='../images/quartz-web-main.png' border='0'
				style="cursor: url(../images/quartz-web-main.png), default;">
		</div>
	</body>
</html>
