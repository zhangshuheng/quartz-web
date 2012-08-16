Ext.require(['Ext.app.Application']);

Ext.app.Application.implement({
	
loadModule : function(controllers) {
		var me = this;
		var controllers = Ext.Array.from(controllers), ln = controllers.length, i, controller;
		for (i = 0; i < ln; i++) {
			var name = controllers[i];
			
			/** 避免重复加载 */
			if (!this.controllers.containsKey(name)) {
				controller = Ext.create(
						this.getModuleClassName(name, 'controller'), {
							application : this,
							id : name
						});
				this.controllers.add(controller);
				controller.init(this);
				controller.onLaunch(this);

			}
		}
	}
});

var application;
Ext.application({
			name : 'UserApp',
			appFolder : 'js/quartzWebApp/desktop/',
			launch : function() {
				application = this;
				this.loadModule(['main']);
			}
		});

Ext.getApplication = function() {
	return application;
}

Ext.getController = function(name) {
    return Ext.getApplication().getController(name);
}

