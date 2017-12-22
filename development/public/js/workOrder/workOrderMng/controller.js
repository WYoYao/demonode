var controller = {
    init: function () {
        new Vue({
            el: '#workOrderManage-Monitor',
            data: workOrderMngModel,
            methods: workOrderMngMethod,

        });
        var timeObj = {
            dataObj: {
                dict_type: "wo_execute_type"      //时间类型，必须
            },
            noticeSuccessObj: {text: '获取时间类型成功', state: "success"},
            noticeFailureObj: {text: '获取时间类型失败', state: "failure"}

        };
        var workObj = {
            dataObj: {
                dict_type: "work_order_type"      //工单类型，必须
            },
            noticeSuccessObj: {text: '获取工单状态成功', state: "success"},
            noticeFailureObj: {text: '获取工单状态失败', state: "failure"}

        };
        var AllConditionObj = {
            time_type: "",                       //时间类型，temp-临时，plan计划
            order_type: "",                      //工单类型编码
            order_state: "",                     //工单状态编码
            creator_id: "",                      //创建人id
            page: workOrderMngModel.pageNum,                       //当前页号，必须
            page_size: 50                        //每页返回数量，必须
        }

        controller.queryGeneralDictByKey(timeObj);//查询时间类型
        controller.queryGeneralDictByKey(workObj);//查询工单类型
        // controller.queryGeneralDictByKey();//查询工单类型
        // controller.queryGeneralDictByKey();//查询工单类型
        controller.queryWorkOrderState();//查询工单状态
        controller.queryProjectPersonSel();//查询创建人
        controller.queryAllWorkOrder(AllConditionObj);//查询所有工单
    },


    //------------------------------------------ydx__start------------------------------------------
    getOrderDetail: function (order_id, model) { //查看工单详情
        var userId = workOrderMngModel.user_id;
        pajax.post({
            // url: 'restWoPlanService/queryDestroyedWoPlanList', //临时使用
            url: 'restWoMonitorService/queryWorkOrderById',
            data: {
                order_id: order_id
            },
            success: function (res) {
                var _data = res && res.data ? res.data : [];
                // _data = d.orderDetailData; //临时使用
                workOrderMngModel.orderDetailData = _data;
                controller.getWorkOrderServiceList(userId, order_id); //查询工单操作列表
                controller.getUserInfo();
            },
            error: function (error) {

            },

            complete: function () {
                $("#list_loading").phide();
            }
        });
    },
    getWorkOrderServiceList: function (userId, orderId) { //获取工单操作时间列表
        pajax.post({
            // url: 'restWoPlanService/queryDestroyedWoPlanList', //临时使用
            url: 'restMyWorkOrderService/queryOperateRecord',
            data: {
                user_id: userId,
                order_id: orderId
            },
            success: function (res) {
                var _data = res && res.data ? res.data : [];
                // _data = d.orderOperatList; //临时使用
                workOrderMngModel.orderOperatList = _data;
            },
            error: function (error) {

            },

            complete: function () {
                $("#list_loading").phide();
            }
        });
    },
    getPersonPositionList: function () { //获取人员或岗位信息
        pajax.post({
            url: 'restPersonService/queryPositionPersonSel',
            data: {},
            success: function (res) {
                var _data = res && res.data ? res.data : [];

                // workOrderModel.personPositionList = _data.map(function(item) {
                var falseList = _data.map(function (item) {
                    item.isSelected = false;

                    item.id = ptool.produceId();

                    if (item.type == 2) {

                        item.persons = item.persons.map(function (info) {

                            info.isSelected = false;
                            info.id = ptool.produceId();
                            return info;
                        });
                    }
                    ;

                    return item;
                });
                $("#createAssignSet").pshow();
                workOrderMngModel.personPositionList = JSON.parse(JSON.stringify(falseList));
                //console.log(JSON.stringify(workOrderMngModel.personPositionList))
                // workOrderMngModel.personPositionList = workOrderMngModel.personPositionList.length > 0 ? workOrderMngModel.personPositionList : workOrderMngModel.falsePersonPosition;
            },
            error: function (error) {

            },

            complete: function () {

            }
        });
    },
    assignOrderSet: function (_data) { //指派工单请求
        pajax.update({
            url: 'restWoMonitorService/doAssignWithAdmin',
            data: _data,
            success: function (res) {
                $("#publishNotice").pshow({text: '指派成功', state: "success"});
            },
            error: function (error) {
                $("#publishNotice").pshow({text: '指派失败,请重试', state: "failure"});
            },

            complete: function () {
                $("#list_loading").phide();
            }
        });
    },
    stopOrderSet: function (_data) { //中止工单请求
        pajax.update({
            url: 'restWoMonitorService/doStopWithAdmin',
            data: _data,
            success: function (res) {
                $("#publishNotice").pshow({text: '中止成功', state: "success"});
                $("#stopOrder").phide();
            },
            error: function (error) {
                $("#publishNotice").pshow({text: '中止失败,请重试', state: "failure"});
            },

            complete: function () {
                $("#list_loading").phide();
            }
        });
    },
    getUserInfo: function () {//获取用户信息
        $.ajax({
            url: '/userInfo',
            type: 'get',
            data: {},
            success: function (result) {
                workOrderMngModel.userInfo = result;
                // console.log(JSON.stringify(workOrderMngModel.userInfo.user))
            },
            error: function (error) {
            },
            complete: function () {
            }
        });
    },

    //------------------------------------------ydx__end------------------------------------------
    //------------------------------------------yn__start------------------------------------------

    //------------------------------------------yn__end------------------------------------------


    //------------------------------------------yn__start------------------------------------------
    // ajax请求
    /* 时间类型/工单类型 */
    queryGeneralDictByKey: function (postObj) {
        // $('#loadCover').pshow();
        pajax.post({
            url: 'restGeneralDictService/queryGeneralDictByKey',
            data: postObj.dataObj,
            success: function (result) {
                var data = result && result.data ? result.data : [];
                if (postObj.dataObj.dict_type == "work_order_type") {//工单类型
                    var allArr = [{
                        code: "all",
                        name: "全部",
                        description: "",
                        dic_type: 'work_order_type'
                    }]

                    workOrderMngModel.workType = allArr.concat(data);
                    // workOrderMngModel.workType = data;
                    // workOrderMngModel.workType.push(allArr);
                    setTimeout(function () {
                        $("#work-type").psel("全部",false);
                    },0);
                } else {
                    var allArr = [{
                        code: "all",
                        name: "全部",
                        description: "",
                        dic_type: '--'
                    }]
                    workOrderMngModel.timeType = allArr.concat(data);
                    workOrderMngModel.timeType = workOrderMngModel.timeType.slice(0,3)
                    // workOrderMngModel.timeType = data;
                    setTimeout(function () {
                        $("#time-type").psel("全部",false);
                    },0);
                }


            },
            error: function (err) {
                if (postObj.dataObj.dict_type == "work_order_type") {//工单类型
                    $("#monitor-list-notice").pshow({text: "获取工单类型失败", state: "failure"})
                }else{
                    $("#monitor-list-notice").pshow({text: "获取时间类型失败", state: "failure"})
                }
            },
            complete: function () {
                // $('#loadCover').phide();
            }
        });
    },

    /* 工单状态 */
    queryWorkOrderState: function () {
        $('#loadCover').pshow();
        pajax.post({
            url: 'restGeneralDictService/queryWorkOrderState',
            data: {
                dict_type: "work_order_state"     //工单状态，必须
            },
            success: function (result) {
                var data = result && result.data ? result.data : [];
                var allArr = [{
                    code: "all",
                    name: "全部",
                    description: ""
                }]

                workOrderMngModel.workState = allArr.concat(data);
                // workOrderMngModel.workState = data
                // workOrderMngModel.workState.push(allArr);
                setTimeout(function () {
                   $("#work-state").psel("全部",false);
                },0);
            },
            error: function (err) {
                $("#monitor-list-notice").pshow({text: "获取工单状态失败", state: "failure"})
            },
            complete: function () {
                // $('#loadCover').phide();
            }
        });

    },
    /* 创建人 */
    queryProjectPersonSel: function () {
        $('#loadCover').pshow();
        pajax.post({
            url: 'restPersonService/queryProjectPersonSel',
            data: {},
            success: function (result) {
                var data = result && result.data ? result.data : [];
                var allArr = [{
                    person_id: "all",
                    name: "全部",
                    description: ""
                }];
                workOrderMngModel.createPerson = allArr.concat(data);
                // workOrderMngModel.createPerson = data;
                // workOrderMngModel.createPerson.push(allArr);
                setTimeout(function () {
                   $("#create-person").psel("全部",false);
                },0);
            },
            error: function (err) {
                $("#monitor-list-notice").pshow({text: "获取创建人失败", state: "failure"})
            },
            complete: function () {
                // $('#loadCover').phide();
            }
        });

    },
    /* 所有工单 */
    queryAllWorkOrder: function (conditionObj, flag) {
        // workOrderMngModel.workList=[];
        if (flag == 1) {
            workOrderMngModel.workList = [];
        }
        $('#loadCover').pshow();
        pajax.post({
            url: 'restWoMonitorService/queryAllWorkOrder',
            data: conditionObj,
            success: function (result) {
                var data = result && result.data ? result.data : [];
                workOrderMngModel.workList = workOrderMngModel.workList.concat(data);
                if (flag == 1) {
                    workOrderMngModel.curPage = "workOrderList";
                }
                setTimeout(function () {
                    if (window.outerHeight > 720) {
                        if (workOrderMngModel.workList.length > 21) {
                            $(".monitor-table-body").addClass("border-on");
                            $(".monitor-table-body>.tr:last-of-type").removeClass("border-on");
                        } else {
                            $(".monitor-table-body").removeClass("border-on");
                            $(".monitor-table-body>.tr:last-of-type").addClass("border-on");
                        }
                    } else {
                        if (workOrderMngModel.workList.length > 11) {
                            $(".monitor-table-body").addClass("border-on");
                            $(".monitor-table-body>.tr:last-of-type").removeClass("border-on");
                        } else {
                            $(".monitor-table-body").removeClass("border-on");
                            $(".monitor-table-body>.tr:last-of-type").addClass("border-on");
                        }
                    }
                },0)

            },
            error: function (err) {
                $("#monitor-list-notice").pshow({text: "获取工单列表失败", state: "failure"})
            },
            complete: function () {
                $('#loadCover').phide();
                $(".monitor-flash").removeClass("flash-no");

            }
        });
    },
    /*根据筛选条件查询工单*/
    selEvent: function (selObj, event) {
        var time = workOrderMngModel.timeType[$("#time-type").psel().index].code;
        var orderType = workOrderMngModel.workType[$("#work-type").psel().index].code;
        var orderState = workOrderMngModel.workState[$("#work-state").psel().index].code;
        var creatorId = workOrderMngModel.createPerson[$("#create-person").psel().index].person_id;
        time = time == "all" ? "" : time;
        orderType = orderType == "all" ? "" : orderType;
        orderState = orderState == "all" ? "" : orderState;
        creatorId = creatorId == "all" ? "" : creatorId;
        workOrderMngModel.pageNum = 1;
        var conditionObj = {
            time_type: time,                       //时间类型，temp-临时，plan计划
            order_type: orderType,                      //工单类型编码
            order_state: orderState,                     //工单状态编码
            creator_id: creatorId,                      //创建人id
            page: workOrderMngModel.pageNum,                       //当前页号，必须
            page_size: 50                        //每页返回数量，必须
        };
        workOrderMngModel.temList = [];
        $(".monitor-table-noData").addClass("flash-no");
        workOrderMngModel.workList = [];
        controller.queryAllWorkOrder(conditionObj, 0);
    },

    //------------------------------------------yn__end------------------------------------------

}

