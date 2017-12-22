var controller = {
    init: function() {
        new Vue({
            el: '#workOrderManage',
            data: workOrderModel,
            methods: workOrderMethod,

        });
        controller.queryFlowPlanRemindMsg(); //工单配置-列表页:提醒信息
        controller.queryProjectFlowPlan(); //工单配置-列表页:查询项目下所有方案
        controller.getOrderTypeList(); //查询工单类型列表
        controller.getOrderImplementType(); //查询工单执行类型
        controller.getAllPositionDuty(); //岗位职责
        controller.getPersonPositionList();


    },


    //------------------------------------------ydx__start------------------------------------------

    getOrderTypeList: function() { //查询工单类型列表
        pajax.post({
            url: 'restGeneralDictService/queryGeneralDictByKey',
            data: {
                dict_type: "work_order_type"
            },
            success: function(res) {
                var _data = res && res.data ? res.data : [];
                // _data = [{ "code": "1", "name": "保养", "description": "xxx" },       //临时使用
                //     { "code": "2", "name": "维修", "description": "xxx" },
                //     { "code": "3", "name": "巡检", "description": "xxx" },
                //     { "code": "4", "name": "运行", "description": "xxx" }
                // ]
                workOrderModel.orderList = _data;

            },
            error: function(error) {

            },

            complete: function() {
                $("#list_loading").phide();
            }
        });
    },
    getOrderImplementType: function() { //查询工单执行类型
        pajax.post({
            url: 'restGeneralDictService/queryGeneralDictByKey',
            data: {
                dict_type: "wo_execute_type"
            },
            success: function(res) {
                var _data = res && res.data ? res.data : [];
                // _data = [{ "code": "all", "name": "全部", "description": "xxx" },     //临时使用
                //     { "code": "temp", "name": "临时性", "description": "xxx" },
                //     { "code": "plan", "name": "计划性", "description": "xxx" }
                // ]
                _data.forEach(function(item, index) {
                    if (item.code != 'all') {
                        item.name = item.name + "性";
                    }
                })
                workOrderModel.timerTypeList = _data;

            },
            error: function(error) {

            },

            complete: function() {
                $("#list_loading").phide();
            }
        });
    },
    getAllPositionDuty: function() { //查询岗位职责
        pajax.post({
            url: 'restGeneralDictService/queryGeneralDictByKey',
            data: {
                dict_type: "wo_control_module"
            },
            success: function(res) {
                var _data = res && res.data ? res.data : [];
                // _data = [{ "code": "create", "name": "新建工单", "description": "xxx" },    //临时使用
                //     { "code": "assign", "name": "指派工单", "description": "xxx" },
                //     { "code": "execute", "name": "执行工作步骤", "description": "xxx" },
                //     { "code": "apply", "name": "提交申请", "description": "xxx" },
                //     { "code": "audit", "name": "审核申请", "description": "xxx" },
                //     { "code": "stop", "name": "终止工单", "description": "xxx" },
                //     { "code": "close", "name": "结束工单", "description": "xxx" }
                // ];
                var newData = JSON.parse(JSON.stringify(_data));
                newData.forEach(function(items) {
                    items['control_code'] = items['code'];
                    items['control_name'] = items['name'];
                    delete items['code'];
                    delete items['name'];
                    delete items['description'];
                    delete items['dict_type'];
                })
                // console.log(_data);
                workOrderModel.allPositionDuty = JSON.parse(JSON.stringify(newData));

            },
            error: function(error) {

            },

            complete: function() {
                $("#list_loading").phide();
            }
        });
    },
    getPersonPositionList: function() { //获取人员或岗位信息
        pajax.post({
            url: 'restPersonService/queryPositionPersonSel',
            data: {},
            success: function(res) {
                var _data = res && res.data ? res.data : [];

                // workOrderModel.personPositionList = _data.map(function(item) {
                var falseList = _data.map(function(item) {
                    item.isSelected = false;

                    item.id = ptool.produceId();

                    if (item.type == 2) {

                        item.persons = item.persons.map(function(info) {

                            info.isSelected = false;
                            info.id = ptool.produceId();
                            return info;
                        })
                    }

                    return item;
                });

                workOrderModel.falsePersonPosition = JSON.parse(JSON.stringify(falseList));
                workOrderModel.oneStep_personPositionList = JSON.parse(JSON.stringify(falseList));
                workOrderModel.oneStep_personPositionList_yes = JSON.parse(JSON.stringify(falseList));
                workOrderModel.personPositionList = workOrderModel.personPositionList.length > 0 ? workOrderModel.personPositionList : workOrderModel.falsePersonPosition;




            },
            error: function(error) {

            },

            complete: function() {

            }
        });
    },
    editPersonPositionList: function() { //编辑人员岗位列表
        pajax.post({
            url: 'restPersonService/queryPositionPersonSel',
            data: {},
            success: function(res) {
                var _data = res && res.data ? res.data : [];

                // workOrderModel.personPositionList = _data.map(function(item) {
                var falseList = _data.map(function(item) {
                    item.isSelected = false;

                    item.id = ptool.produceId();

                    if (item.type == 2) {

                        item.persons = item.persons.map(function(info) {

                            info.isSelected = false;
                            info.id = ptool.produceId();
                            return info;
                        })
                    }

                    return item;
                });

                workOrderModel.oneStep_personPositionList = JSON.parse(JSON.stringify(falseList));
                // var fun = _fn;
                setTimeout(function(){
                    var json_data = {
                        plan_id: workOrderModel.plan_id
                    }
                    controller.getEditOrderDetail(json_data);
                },0)



            },
            error: function(error) {

            },

            complete: function() {

            }
        });
    },
    getWorkOrderSave: function(_data) { //新建保存
        $("#list_loading").pshow();
        pajax.post({
            url: 'restFlowPlanService/addFlowPlan',
            data: _data,
            success: function(res) {
                $("#publishNotice").pshow({ text: '保存成功', state: "success" });
                workOrderModel.curPage = workOrderModel.pages[0];
                controller.queryProjectFlowPlan();
                controller.queryFlowPlanRemindMsg(); //列表上方显示的状态
            },
            error: function(error) {
                $("#publishNotice").pshow({ text: '保存失败，请重试', state: "failure" });
            },

            complete: function() {
                $("#list_loading").phide();
            }
        });
    },
    getEditOrderDetail: function(_data) { //编辑读取详情
        $('#list_loading').pshow();
        pajax.post({
            // url: 'restGeneralDictService/queryGeneralDictByKey', //临时使用
            url: 'restFlowPlanService/queryFlowPlanById',
            data: _data,
            success: function(result) {
                var data = result ? result : {};
                // var data = templateObj;
                var rightArr = [];
                workOrderModel.editOrderCon = data.order_type_name;
                workOrderModel.editTimerCon = data.execute_type_name;
                workOrderModel.editOrderCode = data.order_type;
                workOrderModel.editTimerCode = data.execute_type;
                //添加下级路由数据构造
                setTimeout(function() {
                    var _personPositionArr = JSON.parse(JSON.stringify(workOrderModel.oneStep_personPositionList));
                    var operateBlockList = JSON.parse(JSON.stringify(workOrderModel.allPositionDuty)); //操作模块列表
                    operateBlockList.forEach(function(item) {
                        item['_show'] = true;
                    });
                    var backPositionList = JSON.parse(JSON.stringify(data.post_and_duty));
                    var _ppList = [];
                    var leftArr = JSON.parse(JSON.stringify(data.post_and_duty)); //存储左侧已选的岗位人员列表
                    var ppArr = JSON.parse(JSON.stringify(workOrderModel.oneStep_personPositionList));
                    leftArr.forEach(function(item) { //构造下级路由ppList
                        ppArr.forEach(function(info) {
                            if (item.type == 2) {
                                if (item.name == info.name) {
                                    _ppList.push(info);

                                }
                            }
                            if (item.type == 3) {
                                if (info.type == 2) {
                                    info.persons.forEach(function(x) {
                                        if (item.person_id == x.person_id) {
                                            _ppList.push({ "type": "3", "name": x.name, "person_id": x.person_id ,"id":x.id+ 'PER'});
                                        }
                                    })
                                }
                                if (info.type == 3) {
                                    if (item.person_id == info.person_id) {
                                        _ppList.push(info);
                                    }
                                }

                            }
                        })
                    });
                    // console.log(_ppList)
                    // console.log(data.post_and_duty)
                    if(_ppList &&_ppList.length >0){
                        _ppList.forEach(function(item){
                            // delete item.id;
                            delete item.isSelected;
                           
                            if(item.type == '2'){
                                item["state"] = '1';
                                item.persons.forEach(function(info){
                                    info["state"] = '1';
                                })
                            }
                            if(item.type == '3'){
                                item["state"] = '1';
                             delete item.persons;
                            }
                        })
                    }
                    
                    var arr_B = JSON.parse(JSON.stringify(_ppList)); //复制已选的岗位人员列表
                    var unique = {};
                    workOrderModel.transList = (workOrderModel.transList || []).concat(arr_B);
                    workOrderModel.transList.forEach(function(gpa){ 
                        unique[ JSON.stringify(gpa) ] = gpa; 
                    });
                    workOrderModel.transList = Object.keys(unique).map(function(u){
                        return JSON.parse(u);
                    }); 

                    backPositionList.forEach(function(item) { //构造渲染的数据结构
                        item.duty.forEach(function(info) {
                            info["ppList"] = _ppList;
                        })
                        item["right"] = operateBlockList;
                    })

                    backPositionList=JSON.parse(JSON.stringify(backPositionList));

                    backPositionList=backPositionList.map(function(z){

                        z.duty=z.duty.map(function(item,index){//所有状态重置为未选中

                            item.ppList.map(function(item){
                                item.state=3;

                                if(item.type==2){

                                    item.persons=item.persons.map(function(info){
                                        info.state=3;
                                        return info;
                                    })
                                }

                                return item;
                            });

                            return item;

                        })

                        z.duty=z.duty.map(function(item,index){//返回结果匹配将匹配到的结果设置为选中

                            // 获取有用的名称和persion——id 集合
                            var names=[],
                                person_ids=[],
                                persions=[],
                                persions_id=[];

                            item.next_route.forEach(function(route){
                                route.type==2?names.push(route.name):person_ids.push(route.person_id);
                            });

                            // 获取所有的人员
                            item.ppList.forEach(function(persion){
                                if(persion.type==2)
                                    persions=persions.concat(persion.persons);
                            })

                            persions_id=persions.map(function(item){
                                return item.person_id;
                            })

                            item.ppList.forEach(function(pp){

                                if(pp.type==2 && names.indexOf(pp.name)!=-1){
                                    //名称相同
                                    pp.state=2;
                                    pp.persons=pp.persons.map(function(info){
                                        info.state=2;
                                        return info;
                                    })


                                }else if(pp.type==3 && person_ids.indexOf(pp.person_id)!=-1){
                                    //persion——id 相同
                                    pp.state=2;
                                }

                                persions_id.forEach(function(person_id,index){

                                    if(person_ids.indexOf(person_id)!=-1){
                                        persions[index].state=2;
                                    }
                                })

                            })
                            // debugger;
                            // if(index==0){
                            //     window.item=item;
                            // }

                            return item;

                            // debugger;


                        })
                        return z;
                    })

                    backPositionList.forEach(function(item) { //构造右侧下拉列表数据
                        item.right.forEach(function(info) {
                            item.duty.forEach(function(x) {
                                if (info.control_code == x.control_code) {
                                    info["_show"] = false;
                                }
                            })
                        })
                    })
                    // console.log(backPositionList)
                    workOrderModel.operateOptionList = JSON.parse(JSON.stringify(backPositionList)); //
                    // console.log(JSON.stringify(workOrderModel.operateOptionList))
                }, 100)

                // console.log(JSON.stringify(newArr));


            },
            error: function(error) {

            },

            complete: function() {
                $('#list_loading').phide();
            }
        });
    },
    getEditWorkOrderSave: function(_data) { //编辑保存
        $("#list_loading").pshow();
        pajax.post({
            url: 'restFlowPlanService/updateFlowPlanById',
            data: _data,
            success: function(result) {
                $("#publishNotice").pshow({ text: '保存成功', state: "success" });
                controller.queryProjectFlowPlan(1);
                controller.queryFlowPlanRemindMsg();

            },
            error: function(error) {
                $("#publishNotice").pshow({ text: '保存失败，请重试', state: "failure" });
            },
            complete: function() {
                $("#list_loading").phide();
            }
        });
    },
    getErrorFlowPlanType: function(typeData, commitData, pustAndDutyData, orderTypeName, executeTypeName) { //验证工单类型、时间类型
        pajax.post({
            url: 'restFlowPlanService/verifyFlowPlanType',
            data: typeData,
            success: function(result) {
                if (result && result.can_use) {
                    controller.getErrorPostAndDuty(pustAndDutyData, commitData);

                } else {
                    $("#publishNotice").pshow({ text: executeTypeName + orderTypeName + '方案已存在,不可重复!', state: "failure" });

                }
            },
            error: function(error) {
                $("#publishNotice").pshow({ text: '保存失败，请重试', state: "failure" });
            },
            complete: function() {

            }
        });
    },
    getErrorPostAndDuty: function(pustAndDutyData, commitData) { //新建提交验证
        pajax.post({
            url: 'restFlowPlanService/verifyPostAndDuty',
            data: pustAndDutyData,
            success: function(result) {
                if (result && result.is_pass) {
                    controller.getWorkOrderSave(commitData);

                } else {
                    var operateOptionList = JSON.parse(JSON.stringify(workOrderModel.operateOptionList));
                    workOrderModel.createReminds = result.reminds;
                    var postAndDutyError = JSON.parse(JSON.stringify(result.post_and_duty));
                    postAndDutyError.forEach(function(errorDuty) {
                        if (errorDuty.type == '2') {
                            operateOptionList.forEach(function(list) {
                                if (list.name == errorDuty.name && list.type == errorDuty.type) {
                                    // console.log(errorDuty.duty);
                                    list.duty.forEach(function(info) {
                                        // info["redBorder"] = null;
                                        errorDuty.duty.forEach(function(item) {
                                            if (item == info.control_code) {
                                                info["redBorder"] = true;
                                                // console.log(info.control_name)
                                            }
                                        })
                                    })

                                }
                            })
                        } else if (errorDuty.type == '3') {
                            operateOptionList.forEach(function(list) {
                                if (list.personId == errorDuty.person_id) {
                                    // console.log(errorDuty.duty);
                                    list.duty.forEach(function(info) {
                                        // info["redBorder"] = null;
                                        errorDuty.duty.forEach(function(item) {
                                            if (item == info.control_code && list.type == errorDuty.type) {
                                                info["redBorder"] = true;
                                                // console.log(info.control_name)
                                            }
                                        })
                                    })

                                }
                            })
                        }
                    });

                    workOrderModel.operateOptionList = JSON.parse(JSON.stringify(operateOptionList));

                }


            },
            error: function(error) {

            },
            complete: function() {

            }
        });
    },
    getEditErrorPostAndDuty: function(pustAndDutyData, editData) { //编辑提交验证
        pajax.post({
            url: 'restFlowPlanService/verifyPostAndDuty',
            data: pustAndDutyData,
            success: function(result) {
                if (result && result.is_pass) {
                    controller.getEditWorkOrderSave(editData);

                } else {
                    var operateOptionList = JSON.parse(JSON.stringify(workOrderModel.operateOptionList));
                    workOrderModel.createReminds = result.reminds;
                    var postAndDutyError = JSON.parse(JSON.stringify(result.post_and_duty));
                    postAndDutyError.forEach(function(errorDuty) {
                        if (errorDuty.type == '2') {
                            operateOptionList.forEach(function(list) {
                                if (list.name == errorDuty.name && list.type == errorDuty.type) {
                                    // console.log(errorDuty.duty);
                                    list.duty.forEach(function(info) {
                                        // info["redBorder"] = null;
                                        errorDuty.duty.forEach(function(item) {
                                            if (item == info.control_code) {
                                                info["redBorder"] = true;
                                                // console.log(info.control_name)
                                            }
                                        })
                                    })

                                }
                            })
                        } else if (errorDuty.type == '3') {
                            operateOptionList.forEach(function(list) {
                                if (list.person_id == errorDuty.person_id) {
                                    // console.log(errorDuty.duty);
                                    list.duty.forEach(function(info) {
                                        // info["redBorder"] = null;
                                        errorDuty.duty.forEach(function(item) {
                                            if (item == info.control_code && list.type == errorDuty.type) {
                                                info["redBorder"] = true;
                                                // console.log(info.control_name)
                                            }
                                        })
                                    })

                                }
                            })
                        }
                    });

                    workOrderModel.operateOptionList = JSON.parse(JSON.stringify(operateOptionList));

                }


            },
            error: function(error) {
                $("#publishNotice").pshow({ text: '保存失败，请重试', state: "failure" });
            },
            complete: function() {

            }
        });
    },


    //------------------------------------------ydx__end------------------------------------------
    //------------------------------------------yn__start------------------------------------------

    //------------------------------------------yn__end------------------------------------------


    //------------------------------------------yn__start------------------------------------------
    // ajax请求
    /*工单配置-列表页:查询项目下所有方案*/
    queryProjectFlowPlan: function(flag) {
        if (flag == 1) {
            workOrderModel.schemeList = []
        }
        $('#loadCover').pshow();
        pajax.post({
            url: 'restFlowPlanService/queryProjectFlowPlan',
            data: {},
            success: function(result) {
                var data = result && result.data ? result.data : [];
                workOrderModel.schemeList = data;
                if (flag == 1) {
                    workOrderModel.curPage = workOrderModel.pages[0];
                }
                setTimeout(function() {
                    if (window.outerHeight > 720) {
                        if (workOrderModel.schemeList.length > 21) {
                            $(".scheme-table-body>.tr:last-of-type").removeClass("border-on");
                        } else {
                            $(".scheme-table-body>.tr:last-of-type").addClass("border-on");
                        }
                    } else {
                        if (workOrderModel.schemeList.length > 11) {
                            $(".scheme-table-body>.tr:last-of-type").removeClass("border-on");
                        } else {
                            $(".scheme-table-body>.tr:last-of-type").addClass("border-on");
                        }
                    }
                }, 0)
            },
            error: function(err) {
                $("#scheme-notice").pshow({ text: "获取方案列表失败", state: "failure" })
            },
            complete: function() {
                $('#loadCover').phide();
                $(".flash").removeClass("flash-pub");
            }
        });
    },
    /*工单配置-列表页:查询项目下所有方案 提示信息*/
    queryFlowPlanRemindMsg: function() {
        $('#loadCover').pshow();
        pajax.update({
            url: 'restFlowPlanService/queryFlowPlanRemindMsg',
            data: {},
            success: function(result) {
                if (result && result[0]) {
                    var data = result[0].remind;
                }
                workOrderModel.tipMsg = data;
            },
            error: function(err) {
                $("#scheme-notice").pshow({ text: "获取提示信息失败", state: "failure" })
            },
            complete: function() {
                $('#loadCover').phide();
            }
        });
    },
    /*工单配置-列表页:根据Id删除流转方案信息*/
    deleteFlowPlanById: function() {
        $('#loadCover').pshow();
        workOrderModel.schemeList = [];
        pajax.update({
            url: 'restFlowPlanService/deleteFlowPlanById',
            data: {
                plan_id: workOrderModel.del_plan_id,

            },
            success: function(result) {
                $("#scheme-notice").pshow({ text: "删除成功", state: "success" });
            },
            error: function(err) {
                $("#scheme-notice").pshow({ text: "删除失败", state: "failure" });
            },
            complete: function() {
                $('#loadCover').phide();
                $("#del-confirm").phide();
                controller.queryProjectFlowPlan(); //工单配置-列表页:查询项目下所有方案,此处重新获取一遍列表
                controller.queryFlowPlanRemindMsg(); //工单配置列表页:重新拉取提示信息
            }
        });
    },
    /*工单配置-列表页:根据Id查询流转方案详细信息*/
    queryFlowPlanById: function(index, content, event) {
        $('#loadCover').pshow();
        // $('#globalloading').pshow();
        pajax.post({
            url: 'restFlowPlanService/queryFlowPlanById',
            data: {
                plan_id: content
            },
            success: function(result) {
                workOrderModel.detailScheme = result;
            },
            error: function(err) {
                $("#scheme-notice").pshow({ text: "获取方案详情失败", state: "failure" })
            },
            complete: function() {
                $('#loadCover').phide();
                $("#floatWindow").pshow({ title: '分配方案详情' })
            }
        });
    }

    //------------------------------------------yn__end------------------------------------------

};