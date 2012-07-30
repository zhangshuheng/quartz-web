/**
 * 
 */
package com.quartz.web.dao;

import java.util.List;

import com.quartz.web.pojo.QrtzUser;

/**
 * @author Administrator
 * 
 */
public interface IQrtzUser {

	String insert(QrtzUser user);

	QrtzUser queryById(String userId);
	
	QrtzUser queryByName(String userName);

	List<QrtzUser> getQrtzUserList(int start, int pageSize);

	Long getQrtzUserCount();

	String delete(String userId);

	String update(QrtzUser qrtzUser);
}
