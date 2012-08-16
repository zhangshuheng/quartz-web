Ext.onReady(function() {
	Ext.QuickTips.init();
	Ext.BLANK_IMAGE_URL = 'http://img.ddvip.com/default/s.gif';
	new Ext.Window({
		title : '????',
		width : 750,
		height : 500,
		bodyStyle : 'background-color:#E5E3DF;',
		resizable : false,
		contentEl : 'mapPic'
	}).show();
	/**
	 * ???
	 */
	function pageInit() {
		var image = Ext.get('image');
		Ext.get('image').on(
				{
					'mousedown' : {
						fn : function() {
							this.setStyle('cursor',
									'url(../images/quartz-web-main.png),default;');
						},
						scope : image
					},
					'mouseup' : {
						fn : function() {
							this.setStyle('cursor',
									'url(../images/quartz-web-main.png),move;');
						},
						scope : image
					},
					'dblclick' : {
						fn : function() {
							zoom(image, true, 1.2);
						}
					}
				});
		new Ext.dd.DD(image, 'pic');
		image.center();// ????
		// ??????
		image.osize = {
			width : image.getWidth(),
			height : image.getHeight()
		};
		Ext.get('up').on('click', function() {
			imageMove('up', image);
		}); // ????

		Ext.get('down').on('click', function() {
			imageMove('down', image);
		}); // ????

		Ext.get('left').on('click', function() {
			imageMove('left', image);
		}); // ??

		Ext.get('right').on('click', function() {
			imageMove('right', image);
		}); // ???

		Ext.get('in').on('click', function() {
			zoom(image, true, 1.5);
		}); // ??

		Ext.get('out').on('click', function() {
			zoom(image, false, 1.5);
		}); // ??

		Ext.get('zoom').on('click', function() {
			restore(image);
		}); // ??
	}
	;
	pageInit();
	/**
	 * ????
	 */
	function imageMove(direction, el) {
		el.move(direction, 50, true);
	}
	/**
	 * 
	 * @param el
	 *            ????
	 * @param type
	 *            true??,false??
	 * @param offset ?
	 */
	function zoom(el, type, offset) {
		var width = el.getWidth();
		var height = el.getHeight();
		var nwidth = type ? (width * offset) : (width / offset);
		var nheight = type ? (height * offset) : (height / offset);
		var left = type ? -((nwidth - width) / 2) : ((width - nwidth) / 2);
		var top = type ? -((nheight - height) / 2) : ((height - nheight) / 2);
		el.animate({
			height : {
				to : nheight,
				from : height
			},
			width : {
				to : nwidth,
				from : width
			},
			left : {
				by : left
			},
			top : {
				by : top
			}
		}, null, null, 'backBoth', 'motion');
	}
	/**
	 * ????
	 */
	function restore(el) {
		var size = el.osize;
		// ???????
		function center(el, callback) {
			el.center();
			callback(el);
		}
		el.fadeOut({
			callback : function() {
				el.setSize(size.width, size.height, {
					callback : function() {
						center(el, function(ee) {// ????
							ee.fadeIn();
						});
					}
				});
			}
		});
	}
});