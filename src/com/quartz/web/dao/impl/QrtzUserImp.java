/**
 * 
 */
package com.quartz.web.dao.impl;

import java.util.List;

import org.springframework.orm.ibatis.support.SqlMapClientDaoSupport;

import com.quartz.web.dao.IQrtzUser;
import com.quartz.web.pojo.QrtzUser;

/**
 * @author Administrator
 *
 */
public class QrtzUserImp extends SqlMapClientDaoSupport implements IQrtzUser {

	/* (non-Javadoc)
	 * @see com.quartz.web.dao.IQrtzUser#insert(com.quartz.web.pojo.QrtzUser)
	 */
	public String insert(QrtzUser user) {
		// TODO Auto-generated method stub
		return getSqlMapClientTemplate().insert("insert", user).toString();
	}

	
	/* (non-Javadoc)
	 * @see com.quartz.web.dao.IQrtzUser#getQrtzUserCount()
	 */
	public Long getQrtzUserCount() {
		// TODO Auto-generated method stub
		return (Long)getSqlMapClientTemplate().queryForObject("selectQrtzUserCount",null);
	}


	public QrtzUser queryById(String id) {
		// TODO Auto-generated method stub
		return (QrtzUser)getSqlMapClientTemplate().queryForObject("selectQrtzUserById", id);
	}


	public List<QrtzUser> getQrtzUserList(int start, int pageSize) {
		// TODO Auto-generated method stub
		return getSqlMapClientTemplate().queryForList("selectQrtzUserList", null, start, pageSize);
	}


	public String delete(String userId) {
		// TODO Auto-generated method stub
		return getSqlMapClientTemplate().delete("delete", userId)+"";
	}


	public String update(QrtzUser qrtzUser) {
		// TODO Auto-generated method stub
		return getSqlMapClientTemplate().update("update", qrtzUser)+"";
	}


	public QrtzUser queryByName(String userName) {
		// TODO Auto-generated method stub
		return (QrtzUser)getSqlMapClientTemplate().queryForObject("selectQrtzUserByName", userName);
	}

	
}
