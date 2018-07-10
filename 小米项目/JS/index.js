(function () {
  //1.jquery用$来选择元素，比如选择id为main的元素，原生js的写法为：document.getElementById('main'),而在jquery里面写法为:$('#main')
  //2.jquery选择元素写法与css选择元素类似，例如可以选择main下的li元素：$('#main li')，选择main下的第一个div元素：$('#main div').first()
  //3.jquery有很多内置的方法可以快速获取到元素，例如，获取id为main下所有的子元素：$('#main').children(),获取子元素的最后一个元素：$('#main').children().last(),获取第n个子元素(注意第一个从0开始，与数组类似)：$('#main').children().eq(0)
  var UI = {
    //获取页面宽度，document.body.clientWidth即为页面宽度
    width:document.body.clientWidth + "px",
    //三角形，封装为本页面的通用方法
    triangle:function (element) {
      //获取最近section的背景颜色用于填充三角形，是三角形颜色与section颜色一致，closest用于选择距离最近的父元素
      var color=element.closest("section").css("background-color");  
      // 获取该元素的data属性画三角形，data属性为自定义属性，不同的data值画不同的三角形，
      //attr用于获取或更改元素的属性，如果有两个参数则为更改元素的属性，例如：$("#main").attr('class','hide'),意思就是把main的class设为hide；
      //只有一个参数就是获取属性，例如：$("#main").attr('class')，意思就是获取main的class属性
      switch (element.attr("data")) {  
        // 画左下角填充的三角形，
        // 如果不知道怎么用css画三角形，可以百度
        //$(element).css()用于设置元素的css样式，其接受一个对象作为参数
        case "left-bottom":       
            element.css({
              "border-left":" 0 solid transparent",
              "border-right": "solid transparent",
              "border-right-width":UI.width,
              "border-bottom-style": "solid",
              "border-bottom-color":color,
            });
            break;
        // 画右上角填充的三角形
        case "left-top":
           element.css({
             "border-left":" 0 solid transparent",
             "border-right": "solid transparent",
             "border-right-width":UI.width,
             "border-top-style": " solid",
             "border-top-color":color,
           });
           break;
        // 画右下角填充的三角形
        case "right-bottom":
           element.css({
             "border-right":" 0 solid transparent",
             "border-left": "solid transparent",
             "border-left-width":UI.width,
             "border-bottom-style": " solid",
             "border-bottom-color":color,
           });
           break;
        // 画右上角填充的三角形
        case "right-top":
           element.css({
             "border-right":" 0 solid transparent",
             "border-left": "solid transparent",
             "border-left-width":UI.width,
             "border-top-style": "solid",
             "border-top-color":color,
           });
           break;
      }
    },
    // 控制菜单的显示与隐藏
    toggleMenu:function  () {
      // jquery点击事件
      $(".menu-content").on("click",function  () {
        // 点击menu-content部分隐藏菜单
        // addClass()用于向元素添加class
        $(".menu-content").addClass("hide");  
      });
      $(".menu-content .content").on("click",function  (e) {
        // 阻止冒泡事件，防止点击菜单选项隐藏菜单
        // 时间有两种形式，一种是事件冒泡，一种是事件捕获
        // 所谓事件冒泡就是点击子元素，点击事件也会向上传递到父元素
        e.stopPropagation();
      });
      $(".menu-content .close").on("click",function  (e) {
        // 点击关闭隐藏菜单
        $(".menu-content").addClass("hide");
      });
      $("#toggle-menu").on("click",function  (argument) {
        // 点击菜单隐藏菜单
        $(".menu-content").toggleClass("hide");
      });
    }
  };
  var ownFn = {
    // 为每个div画三角形
    eachTriangle:function (element){
      element.each(function (){
        UI.triangle($(this));
      })
    }
  };
  // 页面初始化调用滚动插件
  window.onload = function () {
    var myScroll = new IScroll('.main', {probeType:2, mouseWheel: true ,bounce:true,click:true});
    var scrollObj = {
        headerScrollAnimate : function () {
        // 获取个部分的高度
        // parseInt用于获取整数
        // parseInt(3.5)会返回3
        // parseInt(500px)会返回500
        var bannerHeight=parseInt($("#banner").css("height")),   
            oneHeight=parseInt($(".one").css("height")) + bannerHeight,
            twoHeight=parseInt($(".two").css("height")) + oneHeight,
            threeHeight=parseInt($(".three").css("height")) + twoHeight,
            fourHeight=parseInt($(".four").css("height")) + threeHeight;
          //滚动监听
        // 滚动时，通过获取滚动的距离来动态改变header的背景颜色与title的显示与隐藏
        myScroll.on('scroll', function () {
        if(-this.y > bannerHeight){
          $("#header .hide").addClass("show").removeClass("hide");
        };
        if(-this.y < bannerHeight){

          $("#header").css({"background-color":" rgba(162, 153, 153, 0.5)"});
          $("#header .show").addClass("hide").removeClass("show");

        }else if(-this.y > bannerHeight && -this.y < oneHeight ){

          $("#header").css({"background-color":"rgba(85, 158, 184, 0.8)"});


        }else if(-this.y > oneHeight && -this.y <  twoHeight){

          $("#header").css({"background-color":"rgba(201, 95, 45, 0.8)"})

        }else if(-this.y > twoHeight && -this.y < threeHeight){

          $("#header").css({"background-color":"rgba(3, 89, 89, 0.8)"})

        }else if(-this.y > threeHeight){

          $("#header").css({"background-color":"rgb(76, 136, 158)"})
        }



        });
      },
      // 点击菜单各个选项时滚动到相应位置
      scrollTo:function  () {
        // 事件委托
        $(".links").on("click","li a",function  (e) {
            myScroll.scrollToElement($(this).attr("data"));
            $(".menu-content").addClass('hide');
        });
      }
    }
    // 插件规定调用方法
      document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
      scrollObj.headerScrollAnimate();
      scrollObj.scrollTo()

  }

  ownFn.eachTriangle($(".triangle"));   //调用函数画三角形
  UI.toggleMenu(); // 调用菜单显示与隐藏开关

  // 页面尺寸变化时重新获取页面宽度并重绘三角形
  window.onresize=function (){
    UI.width=document.body.clientWidth + "px";
    ownFn.eachTriangle($(".triangle"));
  }

})()
