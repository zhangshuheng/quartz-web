/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('js.quartzWebApp.desktop.views.JOBGridWindow', {
    extend: 'Ext.ux.desktop.Module',

    requires: [
        'js.quartzWebApp.desktop.stores.jobDetailStore',
        'Ext.util.Format',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer'
    ],

    id:'jobGrid-win',

    init : function(){
        this.launcher = {
            text: 'JOB列表',
            iconCls:'icon-grid'
        };
    },

    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('jobGrid-win');
        if(!win){
            win = desktop.createWindow({
                id: 'jobGrid-win',
                title:'JOB列表',
                width:740,
                height:480,
                iconCls: 'icon-grid',
                animCollapse:false,
                constrainHeader:true,
                layout: 'fit',
                items: [
                    {
                        border: false,
                        xtype: 'grid',
                        store: 'js.quartzWebApp.desktop.stores.jobDetailStore',
                        columns: [
                            new Ext.grid.RowNumberer(),
                            
                            {text : 'job名称',flex:1, sortable:true,dataIndex :　'jobName'},
         		            {text : 'job组名',flex : 1,sortable:true,dateIndex : 'jobGroup'},
         		            {text : 'job类名',flex : 1,css : "font-size : 13px;padding:3px;",sortable : true,dataIndex : 'jobClassName'},
         		            {text : '是否持久',flex : 1,sortable:true,dateIndex : 'isDurable'},
         		            {text : 'job状态',flex : 1,sortable:true,dateIndex : 'isStateful'},
         		            {text : '是否稳定',flex : 1,sortable:true,dateIndex : 'isVolatile'},
         		            {text : '请求复原',flex : 1,sortable:true,dateIndex : 'requestsRecovery'},
         		            {text : '描述',flex : 1,sortable:true,dateIndex : 'description'},
         		            {text : 'BLOB数据',flex : 1,sortable:true,dateIndex : 'jobData'}
                        ]
                    }
                ],
                tbar:[{
                    text:'添加',
                    tooltip:'新增一条新记录',
                    iconCls:'add'
                }, '-', {
                    text:'修改',
                    tooltip:'修改信息',
                    iconCls:'option'
                },'-',{
                    text:'删除',
                    tooltip:'删除选中的记录',
                    iconCls:'remove'
                }]
            });
        }
        return win;
    }
});

