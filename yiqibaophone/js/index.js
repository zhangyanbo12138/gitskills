(function(){
	
	/**
	 * 1.  添加触摸开始事件
	 * 2.  获取触摸点位置
	 * 3.  获取触摸点-元素到页面左侧的距离 ，得到这段差值。这个值不变
	 * 4.  添加触摸移动事件
	 * 5.  移动根据坐标值计算元素的位置，进行移动
	 * 6.  添加触摸结束事件（触摸取消事件）
	 * 7.  触摸结束时应该判断移动的距离。 如果移动距离超过一半 就可以切换上下（一张） 否则不变。
	 * 
	 */
	
	//1.获取banner元素 
	
	var banner = document.querySelector('.banner');
	
	//2.获取banner里面的按钮元素
	var btns = banner.querySelectorAll('.btn>li');
	
	//3. 获取触摸点位置
	
	var startX = 0;
	
	//4. dif 获取 触摸点到元素左边的差值距离
	
	var dif = 0;
	
	//5.获取list列表元素
	
	var list = banner.querySelector('.list');
	
	//5.1获取屏幕宽的一半，用于判断移动是否超过一半
	
	var width = document.documentElement.clientWidth/2;
	
	//5.2获取索引值
	
	var index = 0;
	
	//6.添加触摸开始事件
	
	banner.addEventListener('touchstart',function(e){
		
		//触摸时清除元素的过渡
		
		list.style.transition = '';
		
		e = getEvent(e);
		
		//7.保存触摸点位置
		
		startX = e.clientX;
		
		
		//8.计算差值
		
		dif = startX-list.offsetLeft;
		
		
		//console.log(dif);
		
	});
	
	
	//9.触摸移动事件
	
	banner.addEventListener('touchmove',function(e){
		
		e = getEvent(e);
		
		//10.根据当前坐标位置 计算list的坐标位置
		
		list.style.marginLeft = e.clientX-dif+'px';
		
		
	});
	
	//11.添加触摸结束和取消事件
	
	banner.addEventListener('touchend',touchEnd);
	banner.addEventListener('touchcancel',touchEnd);
	
	
	
	
	//自定义函数用于获取事件对象中的第一个触摸点
	
	function getEvent(e){
		
		return e.changedTouches[0];
	}
	
	//自定义函数用于触摸结束或取消
	
	function touchEnd(e){
		
		e = getEvent(e);
		
		//11.获取触摸结束时的坐标-触摸开始的坐标。得到移动的位置
		
		var dis = e.clientX-startX;
		
		//12.让移动距离与屏幕宽一半比较，如果大于等于 就可以+- 否则不变
		
		if(Math.abs(dis)>=width){
			
			//13. 让索引值+1 或-1
			
			index+= dis>0 ? -1:1;
			
			//14.判断index值 不能大于 按钮长度-1
			
			index = index>btns.length-1? btns.length-1: index<0? 0:index;
			/*if(index>btns.length-1){
				
				index = 0;
			}
			
			if(index<0){
				
				index = btns.length-1;
			}*/
		
			
		}
			
		move(index);
		
	}
	
	//自定义函数根据索引值计算列表的位置
	
	function move(num){
		
		//15.根据索引值计算移动的位置   -索引值*100%
		
		var left = -num*100+'%';
		
		//16.设置列表样式
		
		list.style.marginLeft = left;
		
		//17.添加过渡
		
		list.style.transition = '.5s';
		
		//18.根据索引值找到对应的按钮添加类名 ，其它的删除类名
		
		for(var i = 0; i<btns.length;i++){
			
			btns[i].className =  i==num?'active':'';
			
		}
		
		
	}
	
	console.log(btns);
	
	
	
	
	
	
	
	
	/*0.创建变量保存触摸时的坐标
	
	var curX= 0;
	
	//0.1创建一个变量保存索引值
	
	var index = 0;
	
	//0.2创建变量保存触摸时  鼠标的位置-元素的位置  得到这段差距。（这段距离不变）
	
	var curLeft = 0;
	
	//0.3获取轮播图列表
	
	var list = document.getElementsByClassName('list')[0];
	
	
	
	
	//1.给页面绑定  touchstart 触摸开始事件
	
	document.body.addEventListener('touchstart',function(e){
		
		//2.0触摸时将元素的过渡去掉
		
		list.style.transition = '';
		
		//2.获取触摸事件对象中的触摸点
		
		e = e.touches[0];
		
		//3.根据event对象获取触摸点的位置
		
		curX = e.clientX;
		
		//4.保存鼠标到元素左侧的距离
		
		curLeft = curX-list.offsetLeft;
		
		
	});
	
	//4.添加触摸移动事件
	
	document.body.addEventListener('touchmove',function(e){
		
		//5.获取触摸事件对象中的触摸点
		
		e = e.touches[0];
		
		//6.根据当前移动的位置-触摸时的位置来判断移动方向 。。。   正值向右  负值向左
		
		var dir = (e.clientX-curX)>0;
		
		move(e);
		
	});
	
	//7.自定义回调函数在移动时执行，移动时获取坐标
	
	function move(e){
		
		//8.根据event对象获取坐标值  -当前触摸时的差
		
		var left = e.clientX-curLeft;
		
		list.style.marginLeft = left+'px';
	
		
	}
	
	//9.添加触摸结束事件
	
	document.body.addEventListener('touchend',function(e){
		//触摸结束之后要判断到底
		
		e = e.changedTouches[0];
		//10. 触摸结束之后拿 结束的坐标-触摸时的坐标 计算移动多少。
		
		var num = e.clientX-curX;
		
		//11.获取方向   真代表向右   假向左
		
		var dir = num>0;
		
		//12.获取页面宽度  一半 
		
		var width = document.documentElement.clientWidth/2;
		
		//13.将移动的距离 转成绝对值    然后与页面一半比较
		
		if(Math.abs(num)>=width){
			
			console.log('走了一半')
		}else{
			console.log('没到一半');
		}
		
		//14. 只有移动超过一半 索引值才会加或减。
		
		index+= Math.abs(num)>=width ? (dir?-1:1):0;
		
		//15.计算出的值 不能小于0  也不能大于3
		
		if(index<0){
			
			index = 3;
		}
		
		if(index>3){
			
			index = 0;
		}
		
		main(index);
		
		
	});
	
	//15.自定义函数  核心函数  根据索引值计算UL的位置
	
	function main(num){
		
		//16.根据索引值计算UL位置   -index*一屏的宽
		
		var left = -num*100+'%';	
		console.log(left);
		list.style.transition = '.5s';
		list.style.marginLeft = left;
		
	}*/
	
	/**
	 * 1. 鼠标按下时 获取
	 * 
	 */	
})()



