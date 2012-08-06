/**
 * 启动任务调度器
 * 
 */
startScheduler = function() {
	Ext.Ajax.request({
		url : 'ui', // 请求地址
		// 提交参数组
		params : {
			action : 'startScheduler'
		},
		// 成功时回调
		success : _call_back_
	});
}

/**
 * 中止任务调度器
 */
stopScheduler = function() {
	Ext.Ajax.request({
		url : 'ui', // 请求地址
		// 提交参数组
		params : {
			action : 'stopScheduler'
		},
		// 成功时回调
		success : _call_back_
	});
}
/**
 * 退出系统
 */
logout = function() {
	Ext.Ajax.request({
		url : 'ui', // 请求地址
		// 提交参数组
		params : {
			action : 'logout'
		},
		// 成功时回调
		success : function(response, options) {
			// 获取响应的json字符串
			var responseArray = Ext.decode(response.responseText);
			if (responseArray.success == true) {
				window.location.href = location;
				Ext.Msg.alert('提示', responseArray.message);
			} else {
				Ext.Msg.alert('失败', responseArray.message);
			}
		}
	});
}

_call_back_ = function(response, options) {
	// 获取响应的json字符串
	var responseArray = Ext.decode(response.responseText);
	if (responseArray.success == true) {
		Ext.Msg.alert('提示', responseArray.message);
	} else {
		Ext.Msg.alert('失败', responseArray.message);
	}
}
/**
 * 公共调用方法
 * u: 请求处理
 * p:参数
 * s: 回调函数
 */
commonOperate = function(u,p,s){
	var url,action,succes;
	Ext.Ajax.request({
		url : url, // 请求地址
		// 提交参数组
		params : {
			action : params
		},
		// 成功时回调
		success : _call_back_
	});
}