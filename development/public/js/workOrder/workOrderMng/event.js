$(function () {
    controller.init();//controller.js初始化
    //------------------------------------------ydx__start------------------------------------------


    //------------------------------------------ydx__end------------------------------------------

    //------------------------------------------yn__start------------------------------------------
    //普通事件，组件
    var nScrollHight = 0; //滚动距离总长
    var nScrollTop = 0;   //滚动到的当前位置
    $(".monitor-table-body").scroll(function () {
        var nDivHight = $(".monitor-table-body").height();
        nScrollHight = $(this)[0].scrollHeight;
        nScrollTop = $(this)[0].scrollTop;
        if (nScrollTop + nDivHight >= nScrollHight) {
            var time;
            var orderType;
            var orderState;
            var creatorId;
            workOrderMngModel.pageNum +=1;
            time=workOrderMngModel.timeType[$("#time-type").psel().index].code;
            orderType=workOrderMngModel.workType[$("#work-type").psel().index].code;
            orderState=workOrderMngModel.workState[$("#work-state").psel().index].code;
            creatorId=workOrderMngModel.createPerson[$("#create-person").psel().index].person_id;
            time = time=="all" ? "" : time;
            orderType = orderType=="all" ? "" : orderType;
            orderState = orderState=="all" ? "" : orderState;
            creatorId = creatorId=="all" ? "" : creatorId;
            var conditionSelObj={
                time_type:time,                       //时间类型，temp-临时，plan计划
                order_type:orderType,                      //工单类型编码
                order_state:orderState,                     //工单状态编码
                creator_id:creatorId,                      //创建人id
                page:workOrderMngModel.pageNum,                       //当前页号，必须
                page_size:50                        //每页返回数量，必须
            };
            controller.queryAllWorkOrder(conditionSelObj,0);//查询所有工单

        }

    });

    //------------------------------------------yn__end------------------------------------------
});
var yn_method={
    /*scrollLoadMonitor: function () {
        debugger;
        if($("#time-type").psel()){
            var time=workOrderMngModel.timeType[$("#time-type").psel().index].code;
        }
        if($("#work-type").psel()){
            var orderType=workOrderMngModel.workType[$("#work-type").psel().index].code;
        }
        if($("#work-state").psel()){
            var orderState=workOrderMngModel.workState[$("#work-state").psel().index].code;
        }
        if($("#create-person").psel()){
            var creatorId=workOrderMngModel.createPerson[$("#create-person").psel().index].person_id;
        }
        time = time=="all" ? "" : time;
        orderType = orderType=="all" ? "" : orderType;
        orderState = orderState=="all" ? "" : orderState;
        creatorId = creatorId=="all" ? "" : creatorId;
        var nScrollHight = 0; //滚动距离总长
        var nScrollTop = 0;   //滚动到的当前位置
        var nDivHight = $(".monitor-table-body").height();
        $(".monitor-table-body").scroll(function () {
            debugger;
            nScrollHight = $(this)[0].scrollHeight;
            nScrollTop = $(this)[0].scrollTop;
            if (nScrollTop + nDivHight >= nScrollHight) {
                // alert("到底部了")
                workOrderMngModel.pageNum +=1;
                debugger;
                var conditionSelObj={
                    time_type:time,                       //时间类型，temp-临时，plan计划
                    order_type:orderType,                      //工单类型编码
                    order_state:orderState,                     //工单状态编码
                    creator_id:creatorId,                      //创建人id
                    page:workOrderMngModel.pageNum,                       //当前页号，必须
                    page_size:50                        //每页返回数量，必须
                };
                controller.queryAllWorkOrder(conditionSelObj);//查询所有工单

            }

        });
    },*/

};
window.common = {//全局方法
    openOrderDetail:function(order_id,type,fn){
        workOrderMngMethod.openOrderDetail(order_id,type,fn);
    }
};


