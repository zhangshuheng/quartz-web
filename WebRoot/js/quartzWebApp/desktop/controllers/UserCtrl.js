Ext.define('js.quartzWebApp.desktop.controllers.UserCtrl', {
	extend : 'Ext.app.Controller',
	views : ['user', 'userQuery', 'userList', 'userEdit', 'userAdd'],
    stores : ['js.quartzWebApp.desktop.stores.UserStore'],
    models : ['js.quartzWebApp.desktop.models.UserModel'],
	init : function() {
		this.control({
			'userQuery' : {
				'beforerender' : function() {
					var view = Ext.ComponentQuery.query('userQuery')[0];
					view.loadView();
				}
			},
            
            'userQuery form button[action=submit]' : {
                'click' : function() {
                    var formCmp = Ext.ComponentQuery.query('userQuery form')[0];
                    var basicForm = formCmp.getForm();
	                if (basicForm.isValid()) {
                         Ext.Msg.alert("信息", "模糊查询所有文本字段.");
	                }
                }
            },
            
            'userQuery form button[action=reset]' : {
                'click' : function() {
                    var formCmp = Ext.ComponentQuery.query('userQuery form')[0];
                    var basicForm = formCmp.getForm();
                    basicForm.reset();
                }
            },
            
            'userQuery form button[action=submit2]' : {
                'click' : function() {
                    var formCmp = Ext.ComponentQuery.query('userQuery form')[1];
                    var basicForm = formCmp.getForm();
                    if (basicForm.isValid()) {
                        Ext.Msg.alert("信息", "模糊查询所有文本字段.");
                    }
                }
            },
            
            'userQuery form button[action=reset2]' : {
                'click' : function() {
                    var formCmp = Ext.ComponentQuery.query('userQuery form')[1];
                    var basicForm = formCmp.getForm();
                    basicForm.reset();
                }
            },

			'userList' : {
				'beforerender' : function() {
					var view = Ext.ComponentQuery.query('userList')[0];
					view.loadView();
				}
			},

			'userList > grid' : {
				'itemdblclick' : function(table, record, html, row, event, opt) {
					var view = Ext.widget('userEdit');
					view.loadView();
					view.show();
					view.down('form').loadRecord(record);
				}
			},
            
            'userList > grid button[action=add]' : {
                'click' : function() {
                    var view = Ext.widget('userAdd');
                    view.loadView();
                    view.show();
                }
            },
            
            'userList > grid button[action=remove]' : {
                'click' : function() {
                    var grid = Ext.ComponentQuery.query('userList > grid')[0];
                    var sm = grid.getSelectionModel();
                    grid.store.remove(sm.getSelection());
                    
                    // 提交后台
                }
            },

			'userEdit button[action=save]' : {
				'click' : function(button, event, opt) {
					var win = button.up('window'), form = win.down('form'), record = form.getRecord(), values = form.getValues();
					record.set(values);
					win.close();
					this.getuserStore().sync();
                    
                    // 提交后台
				}
			},
            
            'userEdit button[action=close]' : {
                'click' : function(button, event, opt) {
                    var win = button.up('window');
                    win.close();
                }
            },
            
            'userAdd button[action=save]' : {
                'click' : function(button, event, opt) {
                    var win = button.up('window'), form = win.down('form'), values = form.getValues();
                    win.close();
                    var grid = Ext.ComponentQuery.query('userList > grid')[0];
                    var store = grid.store;
                    var record = Ext.create('App.model.user', values);
                    store.add([record]);
                    
                    // 提交后台.
                }
            },
            
            'userAdd button[action=close]' : {
                'click' : function(button, event, opt) {
                    var win = button.up('window');
                    win.close();
                }
            }

		})
	}
});

