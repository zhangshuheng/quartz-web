<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<HTML>
 <HEAD>
  <TITLE>Quartz WEB可视化应用登录页面</TITLE>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <link rel="stylesheet" type="text/css" href="extjs-4.1/resources/css/ext-all.css" />
  <script type="text/javascript" src="extjs-4.1/bootstrap.js"></script>
  <script type="text/javascript" src="extjs-4.1/locale/ext-lang-zh_CN.js"></script>
  <script type="text/javascript">
	Ext.onReady(function(){
		Ext.QuickTips.init();//初始化提示;
		var loginForm = Ext.create('Ext.form.Panel',{
			title:'登录表单',
			width : 330,
			hegght : 120,
			frame : true,
			fieldDefaults:{//统一设置表单字段默认属性
				labelSeparator :'：',//分隔符
				labelWidth : 80,//标签宽度
				msgTarget : 'side',
				width : 280
			},
			renderTo: Ext.getBody(),
			bodyPadding: 5,
			defaultType: 'textfield',//设置表单字段的默认类型
			items:[{
				fieldLabel:'用户名',
				name : 'userName',
				allowBlank : false
			},{
				fieldLabel:'密码',
				name : 'password',
				inputType : 'password',
				allowBlank : false
			}],
			buttons:[{
				text : '登陆',
				handler : login
			},{
				text : '重置',
				handler : reset
			}]
		});
		loginForm.center();
		function login(){//提交表单
			loginForm.getForm().submit({
				clientValidation:true,//进行客户端验证
				url : 'SignUpServlet',//请求的url地址
				method:'GET',//请求方式
				success:function(form,action){//加载成功的处理函数
					Ext.Msg.alert('提示','系统登陆成功');
				},
				failure:function(form,action){//加载失败的处理函数
					if(action.result){
						Ext.Msg.alert('提示-->系统登陆失败！','原因：<br/>类型：'+action.failureType+'<br/>信息: '+action.result.errors.info);
					}else{
						Ext.Msg.alert('提示','系统登陆失败！<br/>原因：<br/>类型：'+action.failureType);
					}
				}
			});
		}
		function reset(){//重置表单
			loginForm.form.reset();
		}
	});
  </script>
 </HEAD>
 <BODY  STYLE="margin: 10px">
 <div id='form'></div>  
    <!-- 错误信息展示元素 -->  
    <div id='errorMsg'></div>
 
 </BODY>
</HTML>



