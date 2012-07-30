package com.quartz.web.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.quartz.Scheduler;

import com.quartz.web.util.JSONUtil;

public class QuartzTestServlet extends HttpServlet {

	/**
	 * The doGet method of the servlet. <br>
	 *
	 * This method is called when a form has its tag value method equals to get.
	 * 
	 * @param request the request send by the client to the server
	 * @param response the response send by the server to the client
	 * @throws ServletException if an error occurred
	 * @throws IOException if an error occurred
	 */
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		response.setContentType("text/html");
		doPost(request, response);
	}

	/**
	 * The doPost method of the servlet. <br>
	 *
	 * This method is called when a form has its tag value method equals to post.
	 * 
	 * @param request the request send by the client to the server
	 * @param response the response send by the server to the client
	 * @throws ServletException if an error occurred
	 * @throws IOException if an error occurred
	 */
	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		response.setContentType("application/json");
		PrintWriter out = response.getWriter();
		Object returnO = new Object();
		try {
			Scheduler scheduler = (Scheduler)this.getServletContext().getAttribute("org.quartz.impl.StdSchedulerFactory.KEY");
			
			scheduler.start();
			returnO = JSONUtil.buildSuccess("启动成功!");
		} catch (Exception e) {
			// TODO: handle exception
			returnO = JSONUtil.buildSuccess("启动失败!"+e.getMessage());
		}
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		out.print(returnO);
		out.flush();
		out.close();
	}

}
