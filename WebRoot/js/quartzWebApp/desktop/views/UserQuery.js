Ext.define('js.quartzWebApp.desktop.views.UserQuery', {
			extend : 'Ext.container.Container',
			alias : 'widget.userQuery',
			initComponent : function() {
				var me = this;
				Ext.applyIf(me, {
							items : [{
										xtype : 'fieldset',
										margin : '10 10 0 10',
										padding : '10 10 0 10',
										collapsible : true,
										title : '信息查询',
										items : [{
													xtype : 'tabpanel',
													border : false,
													plain : true,
													activeTab : 0,
													items : [{
														xtype : 'form',
														border : false,
														padding : '10 10 10 10',
														title : '全部',
														layout : 'hbox',
                                                        closable: false
													}, {
                                                        xtype : 'form',
                                                        border : false,
                                                        padding : '10 10 10 10',
                                                        title : '高级',
                                                        layout : 'hbox',
                                                        closable: false
                                                    }],
                                                    listeners : {
                                                        'tabchange' : function(tabPanel, newCard, oldCard, pts) {
                                                            var grid = Ext.ComponentQuery.query('gridpanel')[0];
                                                            grid.setTitle(newCard.title);
                                                        }
                                                    }
												}]
									}]
						});
				me.callParent(arguments);
			},

			flushView : function() {
                this.doLayout();
			},

			loadView : function() {
                var tabpanelCmp = this.getComponent(0).getComponent(0);
				var formCmp = tabpanelCmp.getComponent(0);
                var formCmp2 = tabpanelCmp.getComponent(1);
				formCmp.add([{
							xtype : 'textfield',
							name : 'keyword',
							fieldLabel : ''
						}, {
							xtype : 'button',
							text : '搜索',
							style : 'margin-left: 20px',
                            action : 'submit'
						}, {
							xtype : 'button',
							text : '清空',
							style : 'margin-left: 10px',
                            action : 'reset'
						}]);
                        
                formCmp2.add([{
                            xtype : 'textfield',
                            name : 'keyword',
                            fieldLabel : ''
                        }, {
                            xtype : 'button',
                            text : '搜索',
                            style : 'margin-left: 20px',
                            action : 'submit2'
                        }, {
                            xtype : 'button',
                            text : '清空',
                            style : 'margin-left: 10px',
                            action : 'reset2'
                        }]);
				this.flushView();
			}
		});
