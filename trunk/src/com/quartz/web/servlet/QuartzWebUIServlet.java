package com.quartz.web.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;

import com.quartz.web.util.GlobalConstants;
import com.quartz.web.util.JSONUtil;

public class QuartzWebUIServlet extends HttpServlet {

	static Logger log = Logger.getLogger(QuartzWebUIServlet.class);

	public final void init(ServletConfig servletConfig) throws ServletException {
		log.info("************ STARTED: QuartzWebUIServlet ******************");
	}

	public void doGet(HttpServletRequest req, HttpServletResponse res)
			throws ServletException {
		doPost(req, res);
	}

	public void doPost(HttpServletRequest req, HttpServletResponse res)
			throws ServletException {
		String subject = StringUtils.trimToNull(req.getParameter("action"));

		log.debug("请求参数:" + subject);

		if (subject != null) {
			try {
				Object returnO = new Object();
				res.setContentType("application/json");
				PrintWriter out = res.getWriter();

				if (subject.equalsIgnoreCase(GlobalConstants.LOAD_INSTANCES)) {
					// TODO 加载实例
					returnO = "";
				} else if (subject
						.equalsIgnoreCase(GlobalConstants.CREATE_INSTANCE)) {
					// TODO 创建实例
					Map map = JSONUtil.convertRequestToMap(req);

					returnO = "";
				} else if (subject
						.equalsIgnoreCase(GlobalConstants.LOAD_SCHEDULERS)) {
					// TODO 加载调度器
					Map map = JSONUtil.convertRequestToMap(req);
					returnO = "";
				} else if (subject.equalsIgnoreCase(GlobalConstants.LOAD_JOBS)) {
					// TODO 加载Jobs
					Map map = JSONUtil.convertRequestToMap(req);
					returnO = "";
				} else if (subject
						.equalsIgnoreCase(GlobalConstants.LOAD_SCHEDULERINFO)) {
					// TODO 加载调度器信息
					Map map = JSONUtil.convertRequestToMap(req);
					returnO = "";
				} else if (subject
						.equalsIgnoreCase(GlobalConstants.LOAD_TRIGGERS_FOR_JOB)) {
					// TODO 加载Job的任务触发器
					Map map = JSONUtil.convertRequestToMap(req);
					returnO = "";
				} else if (subject
						.equalsIgnoreCase(GlobalConstants.MONITOR_JOBS)) {
					// TODO 加载所有任务列表
					Map map = JSONUtil.convertRequestToMap(req);
					returnO = "";
				}

				out.print(returnO);
				out.flush();
				out.close();

			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}
}
