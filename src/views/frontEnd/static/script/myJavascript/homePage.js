// // 上下滚动
// function AutoScroll(obj) {
//   $(obj).find("ul:first").animate({
//       marginTop: "-25px"
//     },
//     500,
//     function() {
//       $(this).css({
//         marginTop: "0px"
//       }).find("li:first").appendTo(this);
//     });
// }
// $(document).ready(function() {
//   var myar = setInterval('AutoScroll("#scrollDiv")', 3000);
//   $("#scrollDiv").hover(function() {
//       clearInterval(myar);
//     },
//     function() {
//       myar = setInterval('AutoScroll("#scrollDiv")', 3000)
//     }); //当鼠标放上去的时候，滚动停止，鼠标离开的时候滚动开始
// });
//
// $(function () {
// $('.flexslider').flexslider({
//   directionNav: true,
//   pauseOnAction: false
// });
// //产品列表滚动
// var pLength = $('.pListContentBox > li').length;
// var cishu = pLength-4;
// var n = 0;
// $('.pListContentBox').css({'width':pLength*245+'px'});
// if(pLength>4){
//   $('.pListRight').addClass('curr');
// }
// $('.pListRight').on('click',function(){
//   if(cishu>0){
//     //alert('1');
//     n++;
//     cishu--;
//     $('.pListContentBox').animate({'left':'-'+n*244+'px'},500);
//     if(cishu==0){
//       $('.pListRight').removeClass('curr');
//     }
//     if(n>0){
//       $('.pListLeft').addClass('curr');
//     }
//   }
// });
// $('.pListLeft').on('click',function(){
//   if(n>0){
//     n--;
//     cishu++;
//     $('.pListContentBox').animate({'left':'-'+n*244+'px'},500);
//     if(n==0){
//       $('.pListLeft').removeClass('curr');
//     }
//     if(cishu>0){
//       $('.pListRight').addClass('curr');
//     }
//   }
// });
// // alert(pLength);
//
//
// });
//
//
// var gaintop;
// $(function(){
//   gaintop = $(".login_float").css("top");
//   $(".login_float").css("top",-695);
//   $(".login_float").show();
//   $(".login_float").animate({top: gaintop,opacity:1},800);
//   $(".login_float").animate({top: '-=12px',opacity:1},200);
//   $(".login_float").animate({top: gaintop,opacity:1},200);
//   $(".login_float").animate({top: '-=6px',opacity:1},200);
//   $(".login_float").animate({top: gaintop,opacity:1},200);
//   $(".login_float").animate({top: '-=2px',opacity:1},100);
//   $(".login_float").animate({top: gaintop,opacity:1},100);
// });


$(function () {
// 上下滚动
  function AutoScroll(obj) {
    $(obj).find("ul:first").animate({
        marginTop: "-25px"
      },
      500,
      function () {
        $(this).css({
          marginTop: "0px"
        }).find("li:first").appendTo(this);
      });
  }

  var myar = setInterval(AutoScroll("#scrollDiv"), 3000);
  $("#scrollDiv").hover(function () {
      clearInterval(myar);
    },
    function () {
      myar = setInterval(AutoScroll("#scrollDiv"), 3000)
    }); //当鼠标放上去的时候，滚动停止，鼠标离开的时候滚动开始

  $('.flexslider').flexslider({
    directionNav: true,
    pauseOnAction: false
  });
  //产品列表滚动
  var pLength = $('.pListContentBox > li').length;
  var cishu = pLength - 4;
  var n = 0;
  $('.pListContentBox').css({'width': pLength * 245 + 'px'});
  if (pLength > 4) {
    $('.pListRight').addClass('curr');
  }
  $('.pListRight').on('click', function () {
    if (cishu > 0) {
      //alert('1');
      n++;
      cishu--;
      $('.pListContentBox').animate({'left': '-' + n * 244 + 'px'}, 500);
      if (cishu == 0) {
        $('.pListRight').removeClass('curr');
      }
      if (n > 0) {
        $('.pListLeft').addClass('curr');
      }
    }
  });
  $('.pListLeft').on('click', function () {
    if (n > 0) {
      n--;
      cishu++;
      $('.pListContentBox').animate({'left': '-' + n * 244 + 'px'}, 500);
      if (n == 0) {
        $('.pListLeft').removeClass('curr');
      }
      if (cishu > 0) {
        $('.pListRight').addClass('curr');
      }
    }
  });
  //alert(pLength);

  var gaintop;
  gaintop = $(".login_float").css("top");
  $(".login_float").css("top", -695);
  $(".login_float").show();
  $(".login_float").animate({top: gaintop, opacity: 1}, 800);
  $(".login_float").animate({top: '-=12px', opacity: 1}, 200);
  $(".login_float").animate({top: gaintop, opacity: 1}, 200);
  $(".login_float").animate({top: '-=6px', opacity: 1}, 200);
  $(".login_float").animate({top: gaintop, opacity: 1}, 200);
  $(".login_float").animate({top: '-=2px', opacity: 1}, 100);
  $(".login_float").animate({top: gaintop, opacity: 1}, 100);

});












