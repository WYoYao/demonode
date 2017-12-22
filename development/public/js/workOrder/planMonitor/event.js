
$(function(){
    $(".textarea-prop").click(function (event) {
        event.stopPropagation();
    });
    $(".aite-bubble").click(function (event) {
        event.stopPropagation();
    });
    $(".hashtag-bubble").click(function (event) {
        event.stopPropagation();
    });

    planMonitorLogger.init();//controller.js初始化
	$(document).click(function (event) {
        event.stopPropagation();
        var tg = event.target;
        // var _width = $(document).width();
        if (!$(tg).hasClass('choiceObjExampleModal') &&!$(tg).parents('.choiceObjExampleModal').length && $(".choiceObjExampleModal").length && $(".choiceObjExampleModal").is(':visible')) {
            $(".choiceObjExampleModal").hide();
        }
        if($("#floatWindow").size() >0){
            if(!$(tg).hasClass('per-madal-float') && !$(tg).parents('.per-madal-float').length){
                $("#floatWindow").phide();
            } 
            // $("#floatWindow").css({"right":'-'+_width +'px'});
            
            // console.log($("#floatWindow").css("width"));
        }
        
       
    });
    

});
var pub_method = {
   //公共方法
     checkedInput:function(event){
        // console.log(event.currentTarget.value);
        var val = $("#aheadCreateTime").pval();
        if(val == '0'){
            // $("#aheadCreateTime").pverifi(true);
        }else if(val.pisSpace()){
            $("#aheadCreateTime").pshowTextTip('输入不能为空');
            return;
        }else{
            var flag = val.pisPositiveInt();
            if(!flag){
                $("#aheadCreateTime").pshowTextTip('请输入正整数或0');
                return;
            }
        }
     },
     returnPop:function(e){
        e.stopPropagation();
     }
};
var pub_model = {
	obj_example:{},
}

yn_method.closeBubble();