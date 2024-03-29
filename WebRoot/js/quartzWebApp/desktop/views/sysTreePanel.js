/**
 * 树与Grid同源的好处就是可使用CellEditing插件编辑节点，而且定义也基本一样。不过要注意的问题很多。首先，因为定义了配置项columns，所以会显示列标题，因而要定义hideHeaders配置项将其隐藏。配置项columns的定义是必须的，不然你无法加入编辑框，而且要定义配置项flex为1，让列使用整个面板的宽度作为其宽度。为了禁止编辑根节点，因而在Cellediting的配置对象中监听了beforeedit事件，如果要编辑的节点是根节点，直接返回false可中止进入编辑状态。在视图的配置对象中，toggleOnDblClick为false这个配置项很关键，其默认是为true的，因而默认情况下，双击节点会展开或折叠节点，这样，你就必须使用单击进入编辑状态，但这样很麻烦，例如你要选择某个节点，单击它，成编辑状态了，只能退出后，再挑好位置单击才能选择。因而，最好的选择是将该值设置为false，空出双击操作给编辑操作，这样就方便多了。要允许通过拖动改变节点位置，只要加入TreeViewDragDrop插件就可以了，它会在视图渲染时设置视图的dragZone和dropZone配置项，从而在视图实现拖放操作。事件refresh的代码应该清楚其作用了，它会设置默认选择第一个节点，并将焦点移动到视图，然后通过键盘导航。
 */
Ext.create("Ext.tree.Panel",{
	title:"树的动态加载及节点维护",
	width:200,
	height:300,
	hideHeaders:true,
	plugins:[{ptype:"cellediting",
		listeners:{
			beforeedit:function(e){
				if(e.record.isRoot()) return false;
			}
		}
	}],
	renderTo:Ext.getBody(),
	store:"sysTreeStore",
	tbar:[
		{text:"增加",id:"add",handler:function(){						
		}},
		{text:"删除",id:"delete",disabled:true,handler:function(){
		}},
		"|",
		{text:"刷新",handler:function(){
			this.up("treepanel").store.load();
		}}
	],
	columns:[
		{xtype:"treecolumn",dataIndex:"text",flex:1,
			field:{allowBlank:false}
		}
	],
	viewConfig:{
		toggleOnDblClick:false,
        plugins: {
            ptype: 'treeviewdragdrop'
        },
		listeners:{
			refresh:function(){
				this.select(0);
				this.focus(0);
			}
		}
	},
	listeners:{
		selectionchange:function(view,rs){
			Ext.getCmp("delete").setDisabled(rs.length==0);
		}
	}
})
