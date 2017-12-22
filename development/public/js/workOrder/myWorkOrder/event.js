$(function () {
    myWorkOrderLogger.init();
    //普通事件，组件
    $("#work-already").psel(0, false);
    yn_method.freedomOrRegular()
    $(".textarea-prop").click(function (event) {
        event.stopPropagation();
    });
    $(".aite-bubble").click(function (event) {
        event.stopPropagation();
        // pcombobox.slideUp();
        $("[con]").hide()
    });
    $(".hashtag-bubble").click(function (event) {
        event.stopPropagation();
    });
    yn_method.getDateTime();
    yn_method.closeBubble();


    // var nScrollHight = 0; //滚动距离总长
    var nScrollTop = 0;   //滚动到的当前位置
    $(".myWork-table-body").scroll(function () {
        var nDivHight = $(".myWork-table-body:visible").height();
        commonData.publicModel.nScrollHight = $(".myWork-table-body:visible")[0].scrollHeight;
        nScrollTop = $(this)[0].scrollTop;
        var orderType;
        if (nScrollTop + nDivHight >= commonData.publicModel.nScrollHight) {
            // alert("到底部了")
            if ($("#work-already").psel()) {
                commonData.publicModel.workAlreadyID = commonData.publicModel.workAlready[$("#work-already").psel().index].id;
            }
            if ($("#work-type").psel()) {
                orderType = commonData.publicModel.workTypeL[$("#work-type").psel().index].code;
            }
            //判断url
            var url = commonData.publicModel.workAlreadyID == "0" ? "restMyWorkOrderService/queryMyDraftWorkOrder" : commonData.publicModel.workAlreadyID == "1" ? "restMyWorkOrderService/queryMyPublishWorkOrder" : "restMyWorkOrderService/queryMyParticipantWorkOrder";
            orderType = orderType == "all" ? "" : orderType;
            commonData.publicModel.pageNum += 1;
            var conditionSelObj;
            if (orderType == "") {
                conditionSelObj = {
                    page: commonData.publicModel.pageNum,                       //当前页号，必须
                    page_size: 50                        //每页返回数量，必须
                }
            } else {
                conditionSelObj = {
                    order_type: orderType,                      //工单类型编码
                    page: commonData.publicModel.pageNum,                       //当前页号，必须
                    page_size: 50                        //每页返回数量，必须
                }
            }
            myWorkOrderController.queryWorkOrder(url, conditionSelObj);//查询所有工单

        }

    });


});







