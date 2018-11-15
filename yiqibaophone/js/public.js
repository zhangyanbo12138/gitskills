(function(){
	
	//1. 获取像素比
	
	var num = 1/window.devicePixelRatio;
	
	//2. 动态生成视口标签
	
	var meta = document.createElement('meta');
	
	meta.name = 'viewport';
	
	meta.content = 'width=device-width, user-scalable=no, initial-scale='+num+', maximum-scale='+num+', minimum-scale='+num;
	
	//3.将创建的标签插入页面
	
	document.body.appendChild(meta);
	
	//4. 获取页面宽度/10
	
	var width = document.documentElement.clientWidth/10;
	
	//5.设置页面1/10大小为html的字号
	
	document.getElementsByTagName('html')[0].style.fontSize = width+'px';
	
	//<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" />
	
})();


$(function() {
	var currentIndex = 0;
	$(document).ready(function() {
		$(".tab-head ul li").click(function() {
			var index = $(this).index();
			if(currentIndex != index) {
				currentIndex = index;
				$(this).removeClass("normal-li").addClass("selected-li");
				$(this).siblings().removeClass("selected-li").addClass("normal-li");
				var contents = $(".tab-content").find("li");
				$(contents[index]).show();
				$(contents[index]).siblings().hide();
			}
		});
	});
})
$(function(){
	$(".menu-on").click(function(){
		$(this).hide(300);
		$(".menu-off").show(300);
		$(".menu-list").slideToggle(600);
	})
	$(".menu-off").click(function(){
		$(this).hide(300);
		$(".menu-on").show(300);
		$(".menu-list").slideToggle(600);
	})
	$(".search-but").click(function(){
		$(".search-ban").show(300);
	})
	$(".search-ban i").click(function(){
		$(".search-ban").hide(300);
	})
})
