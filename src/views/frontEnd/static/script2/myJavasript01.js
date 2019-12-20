$(function() {
  $(".question").on("click", "dt", function() {
    $(this).siblings("dd").toggle().closest(".question").siblings().find("dd").hide();
  });

  $(".content-tab").on("click", "li", function() {
    var me = $(this);
    var index = me.index();

    me.addClass("sel").siblings().removeClass("sel");
    me.closest("dl").find("dd.question-list-wrap:eq("+index+")").show().siblings(".question-list-wrap").hide();
  }).find(".sel").trigger('click');
});
