package com.quartz.web.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.util.JSONUtils;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.json.simple.JSONValue;
import org.quartz.Scheduler;
import org.quartz.impl.StdSchedulerFactory;
import org.springframework.context.ApplicationContext;

import com.quartz.web.dao.QrtzJobDetailsDAO;
import com.quartz.web.pojo.QrtzJobDetails;
import com.quartz.web.pojo.QrtzJobDetailsExample;
import com.quartz.web.pojo.QrtzUsersExample;
import com.quartz.web.util.GlobalConstants;
import com.quartz.web.util.JSONUtil;

public class QuartzWebUIServlet extends HttpServlet {

	static Logger log = Logger.getLogger(QuartzWebUIServlet.class);
	private StdSchedulerFactory schedulerFactory=null;
	private ApplicationContext springContext = null;
	private Scheduler scheduler=null;
	private QrtzJobDetailsDAO qrtzJobDao=null;

	public final void init(ServletConfig servletConfig) throws ServletException {

		log.info("************ STARTED: QuartzWebUIServlet ******************");
		schedulerFactory = (StdSchedulerFactory)servletConfig.getServletContext().getAttribute("org.quartz.impl.StdSchedulerFactory.KEY");
		log.debug("@@@@@@@@@@@@@@@@@@@@@@@@StdSchedulerFactory@@@@@@@@@@@@@@@@@@@@@@@@"+schedulerFactory);
		springContext = (ApplicationContext)servletConfig.getServletContext().getAttribute("springContext");
		log.debug("########################ApplicationContext#########################"+springContext);
	}

	public void doGet(HttpServletRequest req, HttpServletResponse res)
			throws ServletException {
		doPost(req, res);
	}

	public void doPost(HttpServletRequest req, HttpServletResponse res)
			throws ServletException {
		String subject = StringUtils.trimToNull(req.getParameter("action"));
		Map m = JSONUtil.convertRequestToMap(req);
		log.debug("请求参数:" + subject);
		Object returnO = new Object();
		res.setCharacterEncoding("UTF-8");
		res.setContentType("application/json");
		PrintWriter out = null;
		if (subject != null) {
			try {
				out = res.getWriter();
				if(subject.equalsIgnoreCase(GlobalConstants.START_SCHEDULER)){
					log.debug("启动调度器.........");
					//启动调度器
					scheduler = schedulerFactory.getScheduler();
					if(!scheduler.isStarted()){
						scheduler.start();
						returnO =JSONUtil.buildSuccess("启动调度器成功");
					}else{
						returnO =JSONUtil.buildSuccess("调度器状态为运行状态，无需重启启动");
					}
					
				}else if(subject.equalsIgnoreCase(GlobalConstants.STOP_SCHEDULER)){
					log.debug("关停调度器.........");
					//启动调度器
					scheduler = schedulerFactory.getScheduler();
					if(scheduler.isStarted()){
						scheduler.shutdown();
						returnO =JSONUtil.buildSuccess("关停调度器成功");
					}else{
						returnO =JSONUtil.buildSuccess("调度器状态为关闭状态，无需再次关闭");
					}
					
				} else if (subject.equalsIgnoreCase(GlobalConstants.LOAD_INSTANCES)) {
					// TODO 加载实例
					returnO = "";
				} else if (subject.equalsIgnoreCase(GlobalConstants.CREATE_INSTANCE)) {
					// TODO 创建实例
					Map map = JSONUtil.convertRequestToMap(req);

					returnO = "";
				} else if (subject.equalsIgnoreCase(GlobalConstants.LOAD_SCHEDULERS)) {
					// TODO 加载调度器
					Map map = JSONUtil.convertRequestToMap(req);
					returnO = "";
				} else if (subject.equalsIgnoreCase(GlobalConstants.LOAD_JOBS)) {
					log.debug("加载JOB信息...................");
					
					qrtzJobDao = (QrtzJobDetailsDAO)springContext.getBean("QrtzJobDetailsDAOImpl");
					QrtzJobDetailsExample example = new QrtzJobDetailsExample();
					example.createCriteria().andJobNameIsNotNull();
					List<QrtzJobDetails> qrtzJobDetails = qrtzJobDao.selectByExampleWithBLOBs(example);
					/**
					 * {requestsRecovery=0, description=null, 
					 * jobData=[B@d058d1, jobClassName=com.quartz.web.test.ScanDB, 
					 * isDurable=0, isVolatile=0, isStateful=0}
					 */
					log.debug("JOB信息:JSONObject"+JSONUtil.list2json(qrtzJobDetails));
					// TODO 加载Jobs
					returnO = JSONUtil.list2json(qrtzJobDetails);
				} else if (subject.equalsIgnoreCase(GlobalConstants.LOAD_SCHEDULERINFO)) {
					// TODO 加载调度器信息
					Map map = JSONUtil.convertRequestToMap(req);
					returnO = "";
				} else if (subject.equalsIgnoreCase(GlobalConstants.LOAD_TRIGGERS_FOR_JOB)) {
					// TODO 加载Job的任务触发器
					Map map = JSONUtil.convertRequestToMap(req);
					returnO = "";
				} else if (subject.equalsIgnoreCase(GlobalConstants.MONITOR_JOBS)) {
					// TODO 加载所有任务列表
					Map map = JSONUtil.convertRequestToMap(req);
					returnO = "";
				} else if (subject.equalsIgnoreCase(GlobalConstants.LOGOUT)){
					log.debug("退出系统......");
					req.setAttribute("user", null);
					req.getSession().setAttribute("user", null);
					returnO = JSONUtil.buildSuccess("退出系统成功!");
				}

				

			} catch (Exception e) {
				e.printStackTrace();
				returnO = JSONUtil.buildError("异常："+e.getMessage());
			}
			out.print(returnO);
			out.flush();
			out.close();
		}
	}
}