var store;
 var tree;
 Ext.onReady(function() {

  /**  
   * 组建树  
   */  
  var buildTree = function(json) {   
      return Ext.create('Ext.tree.Panel', {   
                rootVisible : false,   
                border : false,
                title:json.NAME,   
                store : Ext.create('Ext.data.TreeStore', {  
                fields:['leaf','text','ID','NAME','URL','PARENTID','ZORDER','ISMENU','LV'], 
                    root : {   
                        expanded : true,   
                        children : json.children   
                    },
                    sorters: [{
               property: 'ZORDER',
               direction: 'ASC'
           }]
                }),   
                listeners : {   
                    itemclick : function(view, record, item,index, e) {   
                        var id = record.get('id');   
                        var text = record.get('NAME');   
                        var leaf = record.get('leaf');   
                        if (leaf) {   
                            document.getElementById("mainframe").src="<%=request.getContextPath() %>"+record.get("URL"); 
                        }   
                    },   
                    scope : this  
                }   
            });   
  };   
  
  var accordion = Ext.create('Ext.Panel', {
   region:'west',
   margins:'5 0 5 5',
   split:true,
   width: 210,
   layout:'accordion'
  });

  /**  
   * 加载菜单树  
   */  
  Ext.Ajax.request({   
            url : '<%=request.getContextPath() %>/method/method_initMenu.action',   
            success : function(response) {   
                var json = Ext.JSON.decode(response.responseText)   
                Ext.each(json.data, function(el) {      
                 accordion.add(buildTree(el));   
                });   
            },   
            failure : function(request) {   
                Ext.MessageBox.show({   
                 title : '操作提示',   
                 msg : "连接服务器失败",   
                 buttons : Ext.MessageBox.OK,   
                 icon : Ext.MessageBox.ERROR   
                });
            },   
            method : 'post'  
        });        


  var viewport = Ext.create('Ext.Viewport', {
   layout:'border',
   items:[
    accordion, {
    region:'center',
    margins:'5 5 5 0',
    bodyStyle:'background:#f1f1f1',
    html:'<iframe id="mainframe" frameborder="0" align="top" scrolling="auto" height="100%" width="100%" />'
   }]
  });

 });


function getAccordion() {
	var tree = Ext.create('Ext.tree.Panel', {
		title : 'TreePanel',
		deferRowRender : useDeferRender,
		root : {
			text : 'Root Node',
			expanded : true,
			children : [ {
				text : 'Item 1',
				leaf : true
			}, {
				text : 'Item 2',
				leaf : true
			}, {
				text : 'Folder',
				children : [ {
					text : 'Item 3',
					leaf : true
				} ]
			} ]
		}
	});
	return {
		title : 'Accordion and TreePanel',
		collapsible : true,
		layout : 'accordion',

		x : 660,
		y : 770,

		width : 450,
		height : 240,
		rtl : rtl,

		bodyStyle : {
			'background-color' : '#eee'
		},

		items : [ tree, {
			title : 'Item 2',
			html : 'Some content'
		}, {
			title : 'Item 3',
			html : 'Some content'
		} ]
	};
}
