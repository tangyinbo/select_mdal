define(['jquery'],function($){
	var Modal = function(){
		this.init();
	};
	$.extend(Modal.prototype,{
		settings:{
			width:'400px',
			height:'400px',
			itemWidth:0,
			itemHeight:'30px',
			contentStr:"<div class='show-content-modal'><div class='modal_title'></div><ul class='modal_content'></ul><div>",
			container:null,
			containerContent:null,
			timmer:null,
			target:null,
			data:null, //显示数据
			columns:3,
			callback:null
		},
		//动态生成列表项
		getItem:function(showStr){
			return $("<li class='modal_item'>"+showStr+"</li>");
		},
		//设置窗口位置
		resetPostion:function(){

		},
		//隐藏
	/*	hideMethod:function(fn){
			var _timmer =this.settings.timmer;
			var _this = this;
			if(_timmer){
					window.clearTimeout(_timmer);
			}
			this.settings.timmer=window.setTimeout(fn
				,1000);
		},*/
		//显示
	/*	showMethod:function(fn){
			var _timmer =this.settings.timmer;
			var _this = this;
			if(_timmer){
					this.settings.timmer=window.clearTimeout(_timmer);
			}
				fn();
		},*/
		show:function(options){	
			var _this = this;
			$.extend(_this.settings,options);
			var _timmer =this.settings.timmer;
			if(_timmer){
					this.settings.timmer=window.clearTimeout(_timmer);
			}	
			_this.settings.container.appendTo($("body")).show();
		
			this.resetStyle(options);//重置样式
			this.resetData(options);//重置数据
		
			//var _container =this.settings.containerContent;		
		},
		hide:function(){
			var _this = this;

			var _timmer =this.settings.timmer;
			if(_timmer){
					window.clearTimeout(_timmer);
			}

			this.settings.timmer=window.setTimeout(function(){
				_this.settings.container.hide();
				_this.settings.containerContent.children("*").remove();
			},1000);
		},
		//初始化和绑定事件
		init:function(){
			this.settings.container = $(this.settings.contentStr);
			this.settings.containerContent=this.settings.container.children(".modal_content");

			var _this = this;
			var _timmer =_this.settings.timmer;

			_this.settings.containerContent.mouseleave(function(){
				
				if(_this.settings.timmer){
						window.clearTimeout(_this.settings.timmer);
				}
				_this.settings.timmer=window.setTimeout(function(){
					_this.settings.container.hide();
					_this.settings.containerContent.children("*").remove();
				},1000);
			}
				
			);

			_this.settings.containerContent.mouseover(function(){
				if(_this.settings.timmer){
						window.clearTimeout(_this.settings.timmer);
				}
				//_this.settings.container.show()
			}
			);
		},
	
		resetStyle:function(options){
			var _settings = this.settings;
			var _target =$(options.target);
			var left=0;
			var top =0;
			if(_target){
				var screenWidth = $(window).width();

				var offset = _target.offset();
				left =offset.left;
				top =offset.top+40;	
				if(screenWidth<(left+parseInt(_settings.width))){
					left = screenWidth-parseInt(_settings.width);
				}
			}
			//设置弹窗描述
			var title = options.title;
			if(title){
				$(".modal_title").html(title);
			}
			_settings.container.css({
				"width":options.width?options.width:_settings.width,
				"height":options.height?options.height:_settings.height,
				"left":left,
				"top":top
			});

		},
		resetData:function(options){
			var _this = this;
			this.settings.containerContent.children("*").remove();
			var data = options.data?options.data:["aaaaaa","bbbbbbbbb","cccccccc","ddddddddddd"];
			for(var i=0;i<data.length;i++){
				var ele =null;
				//如果data 为json对象
				if(typeof(data[i]) == "object" && Object.prototype.toString.call(data[i]).toLowerCase() == "[object object]" && !data[i].length){
					ele=this.getItem(data[i]['key']);
					ele.attr("datamain",data[i]['value']);
					this.settings.containerContent.append(ele);
				}else{
					ele=this.getItem(data[i]);
					this.settings.containerContent.append(ele);
				}
				if(_this.settings.callback){
					ele.on("click",function(){
						var key=$(this).html();
						var value =$(this).attr("datamain");
						if(value){
							_this.settings.callback({"key":key,"value":value});
						}else{
							_this.settings.callback(key);
						}
						
					});
				};
				
				ele.css({"width":(parseInt(this.settings.width)-this.settings.columns*4)/this.settings.columns+"px"});
				
			}

		}
	
	});
	var modal  = new Modal();
	return {
		/*
			options:{
				width://设置元素的宽度
				height://设置元素的高度
				data://
				target://目标元素
				title://弹窗描述
			}
		*/
		show:function(options){
			modal.show(options);
		},
		hide:function(){
			modal.hide();
		}
	}
});

