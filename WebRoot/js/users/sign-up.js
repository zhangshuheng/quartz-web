Ext.onReady(function(){
		Ext.QuickTips.init();//初始化提示;
		var sign_up_fp = Ext.widget('form', {
	        renderTo: Ext.getBody(),
	        frame: true,
	        width: 350,
	        bodyPadding: 10,
	        bodyBorder: true,
	        title: '用户登陆',
	        defaults: {
	            anchor: '100%'
	        },
	        fieldDefaults: {
	            labelAlign: 'left',
	            msgTarget: 'none',
	            invalidCls: '' //unset the invalidCls so individual fields do not get styled as invalid
	        },
	        listeners: {
	            fieldvaliditychange: function() {
	                this.updateErrorState();
	            },
	            fielderrorchange: function() {
	                this.updateErrorState();
	            }
	        },
	        updateErrorState: function() {
	            var me = this,
	                errorCmp, fields, errors;

	            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
	                errorCmp = me.down('#formErrorState');
	                fields = me.getForm().getFields();
	                errors = [];
	                fields.each(function(field) {
	                    Ext.Array.forEach(field.getErrors(), function(error) {
	                        errors.push({name: field.getFieldLabel(), error: error});
	                    });
	                });
	                errorCmp.setErrors(errors);
	                me.hasBeenDirty = true;
	            }
	        },
	        items: [{
	            xtype: 'textfield',
	            name: 'username',
	            fieldLabel: '用户名称',
	            allowBlank: false,
	            minLength: 4
	        }, {
	            xtype: 'textfield',
	            name: 'password',
	            fieldLabel: '登录密码',
	            inputType: 'password',
	            style: 'margin-top:15px',
	            allowBlank: false,
	            minLength: 3
	        }, 
	        {
	            xtype: 'label',
	            name: 'newUser',
	            fieldLabel: '新用户注册',
	            hideLabel: true,
	            style: 'margin-top:15px;margin-left:260px',
	            html: ' <a href="#" class="terms">新用户注册</a>',

	            // Listener to open the Terms of Use page link in a modal window
	            listeners: {
	                click: {
	                    fn: function(e) {
							window.location.href="users/registration.jsp";
	                    }
	                }
	            },

	            // Custom validation logic - requires the checkbox to be checked
	            getErrors: function() {
	                return this.getValue() ? [] : ['你必须接受用户条款']
	            }
	        }],

	        dockedItems: [{
	            xtype: 'container',
	            dock: 'bottom',
	            layout: {
	                type: 'hbox',
	                align: 'middle'
	            },
	            padding: '10 10 5',

	            items: [{
	                xtype: 'component',
	                id: 'formErrorState',
	                baseCls: 'form-error-state',
	                flex: 1,
	                validText: '表单验证通过',
	                invalidText: '<font color="red">提示信息！</font>',
	                tipTpl: Ext.create('Ext.XTemplate', 
	                		'<ul><tpl for="."><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul><span class="error">如果没有帐户，可点击<a href="users/registration.jsp">新用户注册</a>创建一个帐户！</span>'),

	                getTip: function() {
	                    var tip = this.tip;
	                    if (!tip) {
	                        tip = this.tip = Ext.widget('tooltip', {
	                            target: this.el,
	                            title: '详细信息:',
	                            autoHide: false,
	                            anchor: 'top',
	                            mouseOffset: [-11, -2],
	                            closable: true,
	                            constrainPosition: false,
	                            cls: 'errors-tip'
	                        });
	                        tip.show();
	                    }
	                    return tip;
	                },

	                setErrors: function(errors) {
	                    var me = this,
	                        baseCls = me.baseCls,
	                        tip = me.getTip();

	                    errors = Ext.Array.from(errors);

	                    // Update CSS class and tooltip content
	                    if (errors.length) {
	                        me.addCls(baseCls + '-invalid');
	                        me.removeCls(baseCls + '-valid');
	                        me.update(me.invalidText);
	                        tip.setDisabled(false);
	                        tip.update(me.tipTpl.apply(errors));
	                    } else {
	                        me.addCls(baseCls + '-valid');
	                        me.removeCls(baseCls + '-invalid');
	                        me.update(me.validText);
	                        tip.setDisabled(true);
	                        tip.hide();
	                    }
	                }
	            }, {
	                xtype: 'button',
	                formBind: true,
	                disabled: true,
	                text: 'SIGN UP',
	                width: 80,
	                handler: function() {
	                    var form = this.up('form').getForm();

	                    /* Normally we would submit the form to the server here and handle the response...*/
	                    form.submit({
	                    	clientValidation:true,//进行客户端验证
	        				url : 'SignUpServlet',//请求的url地址
	        				method:'GET',//请求方式
	        				success:function(form,action){//加载成功的处理函数
	        					Ext.Msg.alert('提示','系统登陆成功');
//	        					window.location.href="main.jsp?backurl="+window.location.href;
	        					window.location.href="desktop.jsp?backurl="+window.location.href;//桌面版本
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
	            },{
	            	xtype: 'button',
	                //formBind: true,
	                text: 'RESET',
	                width: 80,
	                handler: function() {
	                    var loginForm = this.up('form').getForm();
	                    loginForm.reset();
	                }
	            }]
	        }]
	    });
	    sign_up_fp.center();
	});