//配置项
requirejs.config({
	baseUrl:"scripts/lib",
	paths:
		{
			common:"../"
		}
});

//逻辑代码
require(['jquery','common/nav','common/modal'],function($,nav,modal){


	$(".nav_item").live('mouseover',function(){
		var _this = this;
		modal.show({"target":_this,"title":"测试测试","data":["dd","dd","dd","dd"]});
	})

	$(".nav_item").live('mouseout',function(){
		modal.hide();
	})

	//查找指定的select class=modalSelect

	var ele = $(".modalSelect");

	//获取select key value
	if(ele&&ele.length>0){
			var options = ele.children("option");

			//获取options的值
			var data=[];
			for(var i=0;i<options.length;i++){
				var key =  $(options[i]).val();
				var value =$(options[i]).html();

				data.push({"key":key,"value":value});
			}

			var input = $("<input type='text' />");
			ele.after(input);
			input.attr("style",ele.attr('style'));
			input.attr("name",ele.attr('name'));

			ele.remove();

			input.click(function(){
				var _this = this;
					modal.show({"target":_this,"title":"测试测试","data":data,"width":"800px","columns":5,"callback":function(data){
							console.log(data)
					}});
			})
	}


/*	function showModal(options){
		var _this = this;
		if(!options)options = {};
		options.target = _this;
		modal.show(options);
	}*/
});