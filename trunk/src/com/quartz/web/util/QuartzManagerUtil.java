package com.quartz.web.util;

import java.text.ParseException;

import javax.servlet.http.HttpServlet;

import org.quartz.CronTrigger;
import org.quartz.Job;
import org.quartz.JobDetail;
import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.quartz.SchedulerFactory;
import org.quartz.Trigger;
import org.quartz.impl.StdSchedulerFactory;

public class QuartzManagerUtil extends HttpServlet {
	private static SchedulerFactory sf = new StdSchedulerFactory();

	private static String JOB_GROUP_NAME = "mailgroup";
	private static String TRIGGER_GROUP_NAME = "mailtrigger";
	/**
	 * 添加一个定时任务，使用默认的任务组名，触发器名，触发器组名
	 * 
	 * @param jobName
	 *            任务名
	 * @param job
	 *            任务
	 * @param time
	 *            时间设置，参考quartz说明文档
	 * @throws SchedulerException
	 * @throws ParseException
	 */
	public static void addJob(String jobName, Job job, String time,
			String groupName, String triggerName, String param)
			throws SchedulerException, ParseException {
		Scheduler sched = sf.getScheduler();
		JobDetail jobDetail = new JobDetail(jobName, groupName, job.getClass());// 任务名，任务组，任务执行类
		jobDetail.getJobDataMap().put("param", param);
		// 触发器
		CronTrigger trigger = new CronTrigger(jobName, triggerName);// 触发器名,触发器组
		trigger.setCronExpression(time);// 触发器时间设定
		sched.scheduleJob(jobDetail, trigger);
		// 启动
		if (!sched.isShutdown())
			sched.start();
	}

	/**
	 * 修改一个任务的触发时间(使用默认的任务组名，触发器名，触发器组名)
	 * 
	 * @param jobName
	 * @param time
	 * @throws SchedulerException
	 * @throws ParseException
	 */
	public static void modifyJobTime(String jobName, String time,
			String groupName, String triggerName) throws SchedulerException,
			ParseException {
		Scheduler sched = sf.getScheduler();
		Trigger trigger = sched.getTrigger(jobName, triggerName);
		if (trigger != null) {
			CronTrigger ct = (CronTrigger) trigger;
			ct.setCronExpression(time);
			sched.resumeTrigger(jobName, triggerName);
		}
	}

	/**
	 * 移除一个任务(使用默认的任务组名，触发器名，触发器组名)
	 * 
	 * @param jobName
	 * @throws SchedulerException
	 */
	public static void removeJob(String jobName, String groupName,
			String triggerName) throws SchedulerException {
		Scheduler sched = sf.getScheduler();
		sched.pauseTrigger(jobName, triggerName);// 停止触发器
		sched.unscheduleJob(jobName, triggerName);// 移除触发器
		sched.deleteJob(jobName, groupName);// 删除任务
	}

	/*
	 * 暂停任务
	 */
	public static void shutdownJob(String jobName, String groupName)
			throws SchedulerException {
		Scheduler sched = sf.getScheduler();
		sched.pauseJob(jobName, groupName);
	}

	/**
	 * 恢复任务
	 * 
	 * @param jobName
	 * @throws SchedulerException
	 */
	public static void resumeJob(String jobName, String groupName)
			throws SchedulerException {
		Scheduler sched = sf.getScheduler();
		sched.resumeJob(jobName, groupName);
	}
}
