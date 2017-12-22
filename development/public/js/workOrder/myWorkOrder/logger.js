var myWorkOrderLogger = {
    init: function () {
        //获取用户信息
        $.ajax({
            url: '/userInfo',
            type: 'get',
            data: {},
            success: function (result) {
            },
            error: function (error) {
            },
            complete: function () {
            }
        });

        commonData.publicModel = myWorkOrderModel;

        commonData.publicModel.vm=new Vue({
            el: '#myWorkOrder',
            data: myWorkOrderModel,
            methods: myWorkOrderMethod,
        });


        // myWorkOrderController.getUserInfo();//获取人员信息判断创建权限
        myWorkOrderController.queryPersonRightsForProject();//创建权限
        var drafWorkObj = {
            page: myWorkOrderModel.pageNum,                       //当前页号，必须
            page_size: 50                        //每页返回数量，必须
        };
        var obj = {
            need_return_criteria: true	      //返回结果是否需要带筛选条
        };
        myWorkOrderController.queryWorkOrder('restMyWorkOrderService/queryMyDraftWorkOrder', drafWorkObj);//查询草稿箱内工单
        var workObj2 = {
            dataObj: {
                dict_type: "work_order_type"      //工单类型，必须
            },
            noticeFailureObj: {text: '获取工单类型失败', state: "failure"}

        };
        myWorkOrderController.getOrderTypeList(workObj2);//查询列表页所有工单类型
        var workObj = {
            dataObj: {
                dict_type: "work_order_type"      //工单类型，必须
            },
            // noticeSuccessObj: {text: '获取工单类型成功', state: "success"},
            noticeFailureObj: {text: '获取工单类型失败', state: "failure"}

        };
        myWorkOrderController.queryWorkOrderType(workObj);//查询创建页用户能看到的工单类型
    }
}

