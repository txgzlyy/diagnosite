var txgz = {};

txgz.timerAnimate = null;   // 整屏切换动画
txgz.currentStep = 'step1'

$(function(){
	txgz.inset();
});

txgz.inset = function(){  // 初始化
	txgz.resize();     // 设置首屏高度和top
	txgz.events();     // 配置屏幕尺寸变化事件
	txgz.configNav()        //  配置导航，和首页动画
	$('body').height('8500px');
	txgz.animate3D('.start','.state1','.state2',0.5);
	txgz.configScroll();         // 整屏切换控制，与滚动条控制
}

// 配置事件
txgz.events = function(){ 
	txgz.navAnimate() // 执行导航动画
	
	$('.wrapper').bind('mousewheel',function(ev){
		ev.preventDefault();
	});
	$('.wrapper').one('mousewheel',mousewheelFn);     // 只执行一次
	
	
	
	var timer = null;
	function mousewheelFn(ev,direction){
		
		if(direction<1){
			txgz.changeFn('next')    // 向下滚动
		}else{
			txgz.changeFn('prev')    // 向上滚动
		};
		clearTimeout(timer)
		timer = setTimeout(function(){
			$('.wrapper').one('mousewheel',mousewheelFn);     // 只执行一次
		},1200) ;
	}
	
	
	$(window).resize( txgz.resize );
}

//  整屏切换
txgz.changeFn = function(value){
	if(value === 'next'){   // 向下切换
		// 获取当前动画的时间
		var currentTime = txgz.timerAnimate.getLabelTime(txgz.currentStep);
		//获取下一个动画状态
		var afterStep = txgz.timerAnimate.getLabelAfter(currentTime);
		if(!afterStep){ return };
		
		txgz.timerAnimate.tweenTo(afterStep);  //指定到下一个运动
		//获取下一个动画时间
		var afterTime = txgz.timerAnimate.getLabelTime(afterStep);
		//  获取动画总时间
		var allTimer = txgz.timerAnimate.totalDuration();
		
		// 获取滚动条最大运动范围
		var maxH = $('body').height() - $(window).height();
		// 滚动条滚动距离
		var positionY = afterTime/allTimer *maxH;
		// 滚动条滚动时间
		var d = Math.abs( txgz.timerAnimate.time() - afterTime );
		// 滚动条运动
		var scrollAnimate = new TimelineMax();
		
		scrollAnimate.to("html,body",d,{scrollTop:positionY})
		
		txgz.currentStep = afterStep;  // 把下一个状态记录为当前状态   方便继续切换
	}else{  // 向上切换
		// 获取当前动画的时间
		var currentTime = txgz.timerAnimate.getLabelTime(txgz.currentStep);
		//获取上一个动画状态
		var beforStep = txgz.timerAnimate.getLabelBefore(currentTime);
		if(!beforStep){ return };
		
		txgz.timerAnimate.tweenTo(beforStep);  //指定到下一个运动
		//获取上一个动画时间
		var beforTime = txgz.timerAnimate.getLabelTime(beforStep);
		//  获取动画总时间
		var allTimer = txgz.timerAnimate.totalDuration();
		
		// 获取滚动条最大运动范围
		var maxH = $('body').height() - $(window).height();
		// 滚动条滚动距离
		var positionY = beforTime/allTimer *maxH;
		// 滚动条滚动时间
		var d = Math.abs( txgz.timerAnimate.time() - beforTime );
		// 滚动条运动
		var scrollAnimate = new TimelineMax();
		
		scrollAnimate.to('html,body',d,{scrollTop:positionY})
		
		txgz.currentStep = beforStep;  // 把上一个状态记录为当前状态   方便继续切换
	}
}


// 整屏切换控制，与滚动条控制
txgz.configScroll = function(){
	
	txgz.timerAnimate = new TimelineMax();
	

	txgz.timerAnimate.to('.scene1',0.8,{top:0});
	    txgz.timerAnimate.add('step1')     //  添加一个属性 表示第二屏
	txgz.timerAnimate.to('.scene2',0.8,{top:0})
	    txgz.timerAnimate.add('step2')     //  添加一个属性 表示第三屏
	txgz.timerAnimate.to('.scene3',0.8,{top:0})
	    txgz.timerAnimate.add('step3')     //  添加一个属性 表示第四屏
	txgz.timerAnimate.to('.scene4',0.8,{top:0})
	    txgz.timerAnimate.add('step4')     //  添加一个属性 表示第五屏
	txgz.timerAnimate.to('.scene5',0.8,{top:0})
	    txgz.timerAnimate.add('step5')     //  添加一个属性 表示第二屏
	txgz.timerAnimate.stop();   // 开始不让其执行
}

// 导航动画
txgz.navAnimate = function(){
	var navAnimate = new TimelineMax();
	$('.nav a').bind('mouseenter',function(){
		var w = $(this).width();
	    var l = $(this).offset().left;
	    navAnimate.to('.line',0.2,{opacity:1,width:w,left:l})
	});
	$('.nav a').bind('mouseleave',function(){
		navAnimate.to('.line',0.2,{opacity:0})
	});
	// language
	var languageAnimate = new TimelineMax();
	$('.language').bind('mouseenter',function(){
		languageAnimate.clear();
		languageAnimate.to('.dropdown',0.2,{opacity:1,'display':'block'})
	});
	$('.language').bind('mouseleave',function(){
		languageAnimate.clear();
		languageAnimate.to('.dropdown',0.2,{opacity:0,'display':'none'})
	});
	
	// 左侧导航
	$('.btn_mobile').bind('click',function(){
		var leftNavAnimate = new TimelineMax();
		leftNavAnimate.to('.left_nav',0.5,{left:0})
	});
	$('.l_close').bind('click',function(){
		var closeNavAnimate = new TimelineMax();
		closeNavAnimate.to('.left_nav',0.5,{left:-300})
	})
	
}

// 导航3d 翻转
txgz.animate3D = function(obj,element1,element2,d){
	var ele1 = $(obj).find(element1);
	var ele2 = $(obj).find(element2);
	var intAnimate = new TimelineMax();
	intAnimate.to(ele1,0,{rotationX:0,transformPerspective:600,transformOrigin:'center bottom'});
	intAnimate.to(ele2,0,{rotationX:-90,transformPerspective:600,transformOrigin:'top center'});
	
	$(obj).bind('mouseenter',function(){
		var enterAnimate = new TimelineMax();
		enterAnimate.to(ele1,0.3,{rotationX:90,top:-$(element1).height(),transformPerspective:600,transformOrigin:'center bottom'},0);
	    enterAnimate.to(ele2,0.3,{rotationX:0,top:0,transformPerspective:600,transformOrigin:'top center'},0);
	});
	$(obj).bind('mouseleave',function(){
		var leaveAnimate = new TimelineMax();
		leaveAnimate.to(ele1,0.3,{rotationX:0,top:0,transformPerspective:600,transformOrigin:'center bottom'},0);
	    leaveAnimate.to(ele2,0.3,{rotationX:-90,top:$(element2).height(),transformPerspective:600,transformOrigin:'top center'},0);
	});
}


//  配置导航，和首页动画
txgz.configNav = function(){
	var configAnimate = new TimelineMax();
	//  导航
	configAnimate.to('.menu',0.5,{opacity:1});
	configAnimate.to('.menu',0.5,{left:22},'-=.3');
	configAnimate.to('.nav',0.5,{opacity:1});
	//  首屏
	configAnimate.to('.scene1_logo',0.2,{opacity:1});
	configAnimate.staggerTo('.scene1_1 img',2,{opacity:1,rotationX:0,ease:Elastic.easeOut},0.2);
	configAnimate.to('.light_left',0.7,{rotationZ:0,ease:Cubic.easeOut},'-=2');
	configAnimate.to('.light_right',0.7,{rotationZ:0,ease:Cubic.easeOut},'-=2');
	configAnimate.to('.controls',0.5,{opacity:1,bottom:20},'-=.7');
	configAnimate.to('body',0,{'overflow-y':'scroll'})
}

// 设置首屏高度和top
txgz.resize = function(){
	$('.scene').height( $(window).height() );
	$('.scene:not(":first")').css( 'top',$(window).height() );
	if($(window).width()<=950){
		$('body').addClass('r950');
		$('.menu').css('top','0');
	}else{
		$('body').removeClass('r950');
		$('.menu').css('top','22');
	}
	
}
















