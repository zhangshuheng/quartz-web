/**
 * 在定义模型前，要清楚添加节点不能象Grid那样添加了，
 * 并且全部集中起来才保存，原因是用户在一个没有id的节点下添加了n层节点，
 * 然后将数据提交到服务器，那么，提交的节点的id都是0，
 * 服务器根据parentId根本就无法分清楚那个节点是那个节点的子节点，
 * 因而每新增一个节点，都必须第一时间到服务器获取实际id，返回后再添加到树。
 * 新增节点后，可使用模型的save方法保存数据，好处是，可监控节点的提交操作是否成功，
 * 如果成功，则添加到树，不成功则显示错误信息。
 * 而使用Store的sync方法，则需要先将记录添加到Store，才能使用，这不是好的选择。
 * 要调用模型的save方法，需要为模型配置Proxy，这样就不需要在Store配置Proxy了。
 * 目标明确，现在可以定义模型了
 *
 * 字段的定义的字段最后与模型的默认字段保持一致，尤其是parentId，这样会省事很多。
 * 节点的移动会自动修改该值，只需要保存节点就行了，不需要自己处理。
 * 配置对象reader中的配置项messageProperty的作用是在服务器端返回的对象中，success为false时，
 * 提取错误信息的属性名称。配置对象writer还是习惯做法，使用data提取数据。
 */
Ext.define("js.quartzWebApp.desktop.models.sysTreeModel",{
	extend:"Ext.data.Model",
	fields:["text",
		{name:"id",type:"int"},
		{name:"parentId",type:"int"}
	],
    validations: [{
        type: 'presence',
        field: 'text'
    }],
    proxy: {
        type: 'ajax',
        api:{
        	read:'ui?action=getTree',
        	create:'ui?action=addTree',
        	destroy:'ui?action=delTree',
        	update:'ui?action=editTree'
        },
        reader:{
        	messageProperty:"Msg",
        },
        writer:{
        	type:"json",
        	encode:true,
        	root:"results",
        	allowSingle:false
        }
    }
});

