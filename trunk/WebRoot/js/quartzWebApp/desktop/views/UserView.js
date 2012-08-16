Ext.define('js.quartzWebApp.desktop.views.UserView', {
	extend : 'Ext.container.Container',
	alias : 'widget.user',
    autoShow : true,

	initComponent : function() {
		var me = this;
		Ext.applyIf(me, {
            items : [{
                xtype : 'userQuery'
            }, {
                xtype : 'userList'
            }] 
        });
		this.callParent(arguments);
	}
});
