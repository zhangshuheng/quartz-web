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
    <base href="<%=basePath%>">
    
    <title>桌面版本V 1.0</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
	<link rel="stylesheet" type="text/css" href="extjs-4.1/resources/css/ext-all.css" />
		
		<!--  -->
		<link rel="stylesheet" type="text/css" href="css/calendar/calendar.css">
		<link rel="stylesheet" type="text/css" href="css/desktop.css">
		<!--  -->
		
		<script type="text/javascript" src="extjs-4.1/bootstrap.js"></script>
		
		<!--  -->
		<!--  -->
		<script type="text/javascript">
		Ext.Loader.setConfig({enabled:true});
		
        Ext.Loader.setPath({
            'Ext.ux.desktop': 'js/quartzWebApp/desktop/core'
        });

        Ext.require('js.quartzWebApp.desktop.App');

        var quartzWebAppDesktop;
        Ext.onReady(function () {
            quartzWebAppDesktop = new js.quartzWebApp.desktop.App();
            quartzWebAppDesktop.meName='<%=request.getSession().getAttribute("username")%>';
            
        });
    </script>
		

  </head>
  
  <body>
  <a href="http://quartz-scheduler.org/" target="_blank" alt="Powered by Ext JS"
       id="poweredby"><div></div></a>
  </body>
</html>
