/**
 * 
 */
package com.quartz.web.test;

import java.util.Date;

import org.apache.log4j.Logger;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;


/**
 * @author Administrator
 *
 */
public class ScanDB implements Job {
	private static final Logger log = Logger.getLogger(ScanDB.class);
	/* (non-Javadoc)
	 * @see org.quartz.Job#execute(org.quartz.JobExecutionContext)
	 */
	public void execute(JobExecutionContext context)
			throws JobExecutionException {
		// TODO Auto-generated method stub
		log.debug("开始时间:"+new Date().toLocaleString());
		System.out.println("Scanning..............");
		log.debug("结束时间:"+new Date().toLocaleString());

	}

}
