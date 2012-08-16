/**
 * Proxy都在模型定义了，因而TreeStore没多少配置项。
 * 这里要注意，根节点的id不能设置为0，如果是0，Store会认为它是新节点，
 * 调用sync方法时候会将它提交，因为是整型数据，也不能定义为root这些字符串值，
 * 因而最好的办法是定义为-1这些不可能在数据库中出现的值。
 * 不过在写服务器端代码的时候要注意判断parentId为-1时，要将其修改为0。
 * 在这里没把根节点隐藏是考虑到要在根节点下添加节点，除非多添加一个增加按钮用来添加根节点下的节点，
 * 不然你很难判断到底是在那个位置添加节点，或通过弹出对话框也可解决这个问题，
 * 不过笔者觉得这样更简便，只要禁止用户编辑根节点就行了。
 */
Ext.create("Ext.data.TreeStore",{
	id:'sysTreeStore',
	model:"js.quartzWebApp.desktop.models.sysTreeModel",
	root:{text:"目录",id:-1,expanded:true}
});
