<%@page import="org.quartz.Scheduler"%>
<%@ page language="java" import="java.util.*" pageEncoding="ISO-8859-1"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'jobdetail.jsp' starting page</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->

  </head>
  
  <body>
    This is my JSP page. <br>
    <%
    
    Scheduler scheduler = (Scheduler) request.getAttribute("scheduler");
    
    
    
     %>
     <table>
	     <tr>
	     	<td>job</td>
	     	<td><%= scheduler.getJobGroupNames().toString() %></td>
	     </tr>
	     <tr>
	     	<td></td>
	     	<td></td>
	     </tr>
     
     </table>
  </body>
</html>
