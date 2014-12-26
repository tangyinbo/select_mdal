(function($){
	$.fn.replaceModal=function(options){
		new Modal(this,options);
	}

	var Modal = function(select,options){
		this.init($.extend(options,{'select':$(select)}));
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
			callback:null,
			tempInput:null,
			select:null
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
			var _timmer =this.settings.timmer;
			if(_timmer){
					this.settings.timmer=window.clearTimeout(_timmer);
			}	
			_this.settings.container.appendTo($("body")).show();
		
			this.resetStyle(options);//重置样式
			this.getSelectData();
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
		getSelectData:function(){
			var _this = this;
			var ele =this.settings.select;

			var options = ele.children("option");

			//获取options的值
			_this.settings.data=[];
			for(var i=0;i<options.length;i++){
				var key =  $(options[i]).html();
				var value =$(options[i]).val();

				_this.settings.data.push({"key":key,"value":value});
			}

		},
		//初始化和绑定事件
		init:function(options){
			var _this = this;
			$.extend(_this.settings,options);
			this.settings.container = $(this.settings.contentStr);
			this.settings.containerContent=this.settings.container.children(".modal_content");

		
			var _timmer =_this.settings.timmer;

			//生成input 替换以前的select
			_this.settings.tempInput = $("<input type='text'/>");

			_this.settings.select.after(_this.settings.tempInput);
			_this.settings.tempInput.attr("style",_this.settings.select.attr('style'));
			_this.settings.tempInput.attr("name",_this.settings.select.attr('name'));
			_this.settings.select.remove();



			_this.settings.tempInput.on('click focus focusin',function(){
				_this.show();
				if(_this.settings.timmer){
						window.clearTimeout(_this.settings.timmer);
				}
				_this.settings.container.show()
			});

			_this.settings.tempInput.on('focusout blur',function(){
				
				if(_this.settings.timmer){
						window.clearTimeout(_this.settings.timmer);
				}
				_this.settings.timmer=window.setTimeout(function(){
					_this.settings.container.hide();
					_this.settings.containerContent.children("*").remove();
				},1000);
			});

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
	
		resetStyle:function(){
			var _settings = this.settings;
			var _target =_settings.tempInput;
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
			var title = _settings.title;
			if(title){
				$(".modal_title").html(title);
			}
			_settings.container.css({
				"width": _settings.width? _settings.width:_settings.width,
				"height": _settings.height? _settings.height:_settings.height,
				"left":left,
				"top":top
			});

		},
		resetData:function(){
			var _this = this;
			this.settings.containerContent.children("*").remove();
			var data = _this.settings.data? _this.settings.data:["aaaaaa","bbbbbbbbb","cccccccc","ddddddddddd"];
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
						_this.settings.tempInput.val(key);
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

})(jQuery);
