Ext.define('js.quartzWebApp.desktop.stores.UserStore', {
			extend : 'Ext.data.Store',
			autoLoad : true,
			model : 'js.quartzWebApp.desktop.models.UserModel',
			data : {
				'employees' : [{
							"name" : "Michael Scott",
							"senority" : 7,
							"department" : "Manangement"
						}, {
							"name" : "Dwight Schrute",
							"senority" : 2,
							"department" : "Sales"
						}, {
							"name" : "Jim Halpert",
							"senority" : 3,
							"department" : "Sales"
						}, {
							"name" : "Kevin Malone",
							"senority" : 4,
							"department" : "Accounting"
						}, {
							"name" : "Angela Martin",
							"senority" : 5,
							"department" : "Accounting"
						}]
			},
			proxy : {
				type : 'memory',
				reader : {
					type : 'json',
					root : 'employees'
				}
			}
		});
