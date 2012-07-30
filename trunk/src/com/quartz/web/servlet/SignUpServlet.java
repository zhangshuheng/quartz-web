package com.quartz.web.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.quartz.web.dao.IQrtzUser;
import com.quartz.web.pojo.QrtzUser;

public class SignUpServlet extends HttpServlet {
	private static final Logger log = Logger.getLogger(SignUpServlet.class);
	private IQrtzUser qrtzUserDao;
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

		response.setContentType("application/json;charset=UTF-8"); 
		response.setCharacterEncoding("UTF-8");
		this.doPost(request, response);
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

		response.setContentType("application/json;charset=UTF-8"); 
		response.setCharacterEncoding("UTF-8");
		String userName =request.getParameter("userName").toString();
		String password = request.getParameter("password").toString();
		log.debug("页面参数：userName:"+userName+"\tpassword:"+password);
		String msg = "";
		PrintWriter out = response.getWriter();
		if(null == userName || null == password || "" == userName || "" == password ){
			msg = "{success:false,errors:{info:'用户名密码不能为空'}}";
		}else{
			ApplicationContext context  = new ClassPathXmlApplicationContext("com/quartz/web/config/spring/applicationContext.xml");
			qrtzUserDao = (IQrtzUser)context.getBean("QrtzUserImp");
			
			QrtzUser user = qrtzUserDao.queryByName(userName);
			log.debug("password.trim()="+password.trim());
			log.debug("user.getQrtzUserPassword().trim()="+user.getQrtzUserPassword().trim());
			log.debug("password.trim()==user.getQrtzUserPassword().trim()="+password.trim()==user.getQrtzUserPassword().trim());
			if(null == user){
				msg = "{success:false,errors:{info:'用户不存在!'}}";
			}else if(password.trim()==user.getQrtzUserPassword().trim()) {
				msg = "{success:true,msg:{}}";
				request.setAttribute("user", user);
			}else{
				msg = "{success:false,errors:{info:'用户密码不正确!'}}";
			}
		}
		out.println(msg);
		out.flush();
		out.close();
	}

}
