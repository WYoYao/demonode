
$(function(){
	controller.init();//controller.js初始化
	//------------------------------------------ydx__start------------------------------------------
	$(document).on("click",".add_more_work",function(){
		if(!$(this).find("ul").is(":visible")){
            $(".more_work_list").hide();
			$(this).find("ul").show();
		}else{
			$(this).find("ul").hide();
		}
	});
    $(document).click(function (event) {
        var tg = event.target;
        if (!$(tg).hasClass('add_more_work') && !$(tg).parents('.add_more_work').length && $(".more_work_list").length && $(".more_work_list").is(':visible') ) {

            $(".more_work_list").hide();
        }
    });
    $(document).click(function (event) {
        event.stopPropagation();
        var tg=event.target;
        if(!$(tg).hasClass('per-madal-float') && !$(tg).parents().hasClass('per-madal-float') && !$(tg).hasClass('tr') && !$(tg).parents().hasClass('tr')){
            $("#floatWindow").phide();
        }
    });


    //------------------------------------------ydx__end------------------------------------------

    //------------------------------------------yn__start------------------------------------------
    //普通事件，组件

    //------------------------------------------yn__end------------------------------------------
});
var yn_method = {
    delConfirm: function (index, content, event) {
        event.stopPropagation();
        workOrderModel.del_plan_id = content;
        $("#del-confirm").pshow({title: '确定删除吗？', subtitle: '删除后不可恢复'});
    },
    cancelConfirm: function () {
        $("#del-confirm").phide();
    },
    eventStop:function (event) {
    event.stopPropagation();
}
};