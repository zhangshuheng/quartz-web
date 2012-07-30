/**
 * 
 */
package com.quartz.web.pojo;

import java.io.Serializable;

/**
 * @author Administrator
 *
 */
public class QrtzUser implements Serializable {

	String id;
	String qrtzUserName;
	String qrtzUserPassword;
	String qrtzJobName;
	String qrtzTriggerName;
	String qrtzUserGroup;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getQrtzUserName() {
		return qrtzUserName;
	}
	public void setQrtzUserName(String qrtzUserName) {
		this.qrtzUserName = qrtzUserName;
	}
	public String getQrtzUserPassword() {
		return qrtzUserPassword;
	}
	public void setQrtzUserPassword(String qrtzUserPassword) {
		this.qrtzUserPassword = qrtzUserPassword;
	}
	public String getQrtzJobName() {
		return qrtzJobName;
	}
	public void setQrtzJobName(String qrtzJobName) {
		this.qrtzJobName = qrtzJobName;
	}
	public String getQrtzTriggerName() {
		return qrtzTriggerName;
	}
	public void setQrtzTriggerName(String qrtzTriggerName) {
		this.qrtzTriggerName = qrtzTriggerName;
	}
	public String getQrtzUserGroup() {
		return qrtzUserGroup;
	}
	public void setQrtzUserGroup(String qrtzUserGroup) {
		this.qrtzUserGroup = qrtzUserGroup;
	}
	
	
}
