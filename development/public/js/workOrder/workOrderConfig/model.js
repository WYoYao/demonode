var workOrderModel = { //工单管理模块数据模型
    //------------------------------------------ydx__start------------------------------------------
    pages: ['schemeList', 'createWorkOrderCommon'], //页面
    curPage: 'schemeList', //当前页面
    plan_id: '', //工单计划id
    orderList: [], //工单下拉,
    timerTypeList: [], //时间下拉
    choiceOrderType: {},
    choiceTimerType: {},
    editOrderCon: '', //编辑时工单内容
    editOrderCode: '', //编辑时工单code
    editTimerCon: '', //编辑时时间内容
    editTimerCode: '', //编辑时时间code
    allPositionDuty: [], //全部岗位职责列表
    falsePersonPosition: [], //人员岗位false列表
    truePersonPosition: [], //人员岗位true列表
    // rightPositionDutyList:[],//右侧保存列表
    // centerPositionDutyList:[],//中间操作列表
    saveAssignPersonList: [], //指派存储人员岗位列表
    saveNewCreatePersonList: [], //新建存储人员岗位列表
    personPositionList: [], //人员岗位列表
    oneStep_personPositionList: [], //一级人员岗位列表
    oneStep_personPositionList_yes: [], //存储确定选择是一级人员岗位列表
    listShow: false, //职责列表显示
    operateOptionList: [], //岗位人员渲染对象
    transList: [], //每次确认选择的岗位和人员
    operateOptionFaIndex: '', //父级index
    operateOptionChildIndex: '', //子级index
    currStepDutyName: '', //当前执行步骤名称
    currStepDutyCode: '', //当前执行步骤code
    positionPersonModelList: [ //岗位人员模块
        // {
        //     "type": "2",
        //     "name": "岗位名称",
        //     "duty": [

        //     ]


        // },
        // {
        //     "type": "2",
        //     "name": "岗位名称",
        //     "duty": [

        //     ]

        // }
    ],
    createAssignSetList: [], //指派人员列表
    createReminds: [], //提示消息文本

    //------------------------------------------ydx__end------------------------------------------

    //------------------------------------------yn__start------------------------------------------
    //vue绑定的数据data
    schemeList: [], //列表页:查询项目下所有方案
    del_plan_id: "", //方案计划id
    tipMsg: "", //提醒信息
    detailScheme: {} //流转方案详情
    //------------------------------------------yn__end------------------------------------------
}


var workOrderMethod = { //工单管理模块方法
    //------------------------------------------ydx__start------------------------------------------
    newCreateOrder: function() { //创建工单
        var _this = workOrderModel;
        _this.plan_id = '';
        _this.personPositionList = [];
        _this.oneStep_personPositionList = _this.falsePersonPosition; //一级人员岗位选择列表重置
        _this.operateOptionList = [];
        workOrderModel.transList = [];//已选岗位人员列表
        workOrderModel.choiceOrderType = {};
        workOrderModel.choiceTimerType = {};
        _this.createReminds = [];
        $("#orderTypeSelect").precover("请选择工单类型");
        $("#timerTypeSelect").precover("请选择时间类型");
        workOrderModel.oneStep_personPositionList = []; //重置
        workOrderModel.curPage = workOrderModel.pages[1];

    },
    goBackOrderList: function() { //返回
        var _this = workOrderModel;
        _this.plan_id = '';
        _this.personPositionList = [];
        _this.operateOptionList = [];
        workOrderModel.choiceOrderType = {};
        workOrderModel.choiceTimerType = {};
        _this.createReminds = [];
        _this.oneStep_personPositionList = [];
        $("#timerTypeSelect").precover("请选择时间类型");
        $("#orderTypeSelect").precover("请选择工单类型");
        workOrderModel.oneStep_personPositionList = []; //重置
        workOrderModel.curPage = workOrderModel.pages[0];


        $("#orderTypeError").hide();
        $("#timerTypeError").hide();
    },
    editOrderListInfo: function(obj) { //编辑
        workOrderModel.plan_id = obj.plan_id;
        workOrderModel.curPage = workOrderModel.pages[1];
        // console.log(obj);
        workOrderModel.transList = [];
        controller.editPersonPositionList();

    },
    deletePersonPosition: function(items, index) { //删除人和岗位
        var arr = JSON.parse(JSON.stringify(workOrderModel.operateOptionList));
        arr.splice(index, 1);
        var option = items;
        var new_arr = arr.map(function(item){
            if(option.type == '2'){
                if(item.duty && item.duty.length >0){
                    var duty = item.duty.map(function(info){
                        if(info.ppList && info.ppList.length >0){
                             var pp = info.ppList.map(function(p,pp_index){
                                if(option.name == p.name){
                                    info.ppList.splice(pp_index,1);
                                }
                                return p;
                            })
                        }
                        return info;
                   })
                }
               
            }else if(option.type == '3'){
                if(item.duty && item.duty.length >0){
                    var duty = item.duty.map(function(info){
                        if(info.ppList && info.ppList.length >0){
                            var pp = info.ppList.map(function(p,pp_index){
                                if(option.person_id == p.person_id){
                                    info.ppList.splice(pp_index,1);
                                }
                                return p;
                            })
                        }
                        
                        return info;
                   })
                }
                
            }
            return item;
        })
        // console.log(JSON.stringify(new_arr));
        workOrderModel.operateOptionList = new_arr;
        var _ppList = JSON.parse(JSON.stringify(workOrderModel.transList));
        var new_ppList = _ppList.filter(function(item,_index){
             return (option.type == '2' && option.name == item.name) ? false : ((option.type == '3' && option.person_id == item.person_id) ? false : true);
        })
        workOrderModel.transList = JSON.parse(JSON.stringify(new_ppList));
    },
    // 模态框相关
    stepsToPerformWorkHide: function() { //执行工作步骤隐藏
        $("#stepsToPerformWork").phide();
        // setTimeout(function(){
        //     $("#stepsToPerformWork_con_operat_open").psel(true);
        // },500)
    },
    createWorkOrderSetHide: function() { //新建工单设置隐藏
        $("#createWorkOrderSet").phide();
    },
    checkOrderSetHide: function() { //审核工单hide

        $("#checkOrderSet").hide();
    },

    createAssignSetHide: function() { //指派隐藏

        $("#createAssignSet").hide();
    },
    addPersonPosition: function() { //添加人员或岗位click
        var planId = workOrderModel.plan_id;
        if (planId) {
            controller.getPersonPositionList(); //获取人员岗位请求
        } else {
            controller.getPersonPositionList(); //获取人员岗位请求
        }
        $("#choicePersonPosition").pshow();

    },
    choicePersonPosiSetHide: function() { //选择人员隐藏

        setTimeout(function() {
            workOrderModel.oneStep_personPositionList = workOrderModel.oneStep_personPositionList_yes;
            $("#add_person_position_tishi").hide();
            $("#add_person_position_repeat").hide();
        }, 500)
        $("#choicePersonPosition").phide();
    },
    personPositionShow: function(e, argu) { //岗位人员列表显示


        var $target = $(e.target);

        var $person_position_list = $target.parent().parent().find(".choicePersonPosition_con_persion_position");
        if (!$person_position_list.is(":visible")) {
            // console.log(1)
            $person_position_list.show();
            $target.text("b")
        } else {
            $person_position_list.hide();
            $target.text("r")
        }
    },
    uniqueArray:function(array, key){
        /*
         * JSON数组去重
         * @param: [array] json Array
         * @param: [string] 唯一的key名，根据此键名进行去重
         */
        var result = [array[0]];
        for(var i = 1; i < array.length; i++){
            var item = array[i];
            var repeat = false;
            for (var j = 0; j < result.length; j++) {
                if (item[key] == result[j][key]) {
                    repeat = true;
                    break;
                }
            }
            if (!repeat) {
                result.push(item);
            }
        }
        return result;
    },
    addPositionPersonModel: function() { //点击确定添加人或岗位
        var valArr = [];
        var _personPositionArr = JSON.parse(JSON.stringify(workOrderModel.oneStep_personPositionList)); //人员岗位列表
        var selectedPPList = JSON.parse(JSON.stringify(workOrderModel.operateOptionList)); //第一次选择为空
        var operateBlockList = workOrderModel.allPositionDuty; //操作模块列表
        operateBlockList.forEach(function(item) {
            item['_show'] = true;
        });
        var choicePPList = [];
        _personPositionArr.forEach(function(ele) {
            if (ele.isSelected) {
                if (ele.type == 2) { //岗位
                    valArr.push({ "name": ele.name, "type": ele.type, "id": ele.id });
                    ele.persons.forEach(function(item) {
                        item["state"] = '1';
                    })
                    choicePPList.push({ "name": ele.name, "type": ele.type, "id": ele.id, "persons": ele.persons, state: '1' });
                } else if (ele.type == 3) { //单独的人员被选中
                    valArr.push({ "name": ele.name, "type": ele.type, "person_id": ele.person_id, "id": ele.id });
                    choicePPList.push({ "name": ele.name, "type": ele.type, "person_id": ele.person_id, "id": ele.id, state: '1' });

                }
            }
            if (ele.type == "2" && !ele.isSelected) { //岗位下的人被选中
                ele.persons.forEach(function(p) {
                    if (p.isSelected) {
                        valArr.push({ "name": p.name, "type": "3", "person_id": p.person_id, "id": p.id + 'PER' });
                        choicePPList.push({ "name": p.name, "type": "3", "person_id": p.person_id, "id": p.id + 'PER', state: '1' });
                    }
                })
            }
        });
        // console.log(valArr);
        // console.log(choicePPList);
        if (valArr && valArr.length <= 0) { //判断是否选择人员或岗位
            $("#add_person_position_repeat").hide();
            $("#add_person_position_tishi").show();
            return;
        } else {
            $("#add_person_position_tishi").hide();
            var arr_A = JSON.parse(JSON.stringify(valArr)); //复制已选列表
            var arr_B = JSON.parse(JSON.stringify(choicePPList)); //复制已选的岗位人员列表
            var unique = {};
            
            workOrderModel.transList = (workOrderModel.transList || []).concat(arr_B); //存储确认选择的岗位人员
            var workArr = JSON.parse(JSON.stringify(workOrderModel.transList));
            var result = [workArr[0]];
            for(var i = 1; i < workArr.length; i++){
                var item = workArr[i];
                var repeat = false;
                for (var j = 0; j < result.length; j++) {
                    if (item['type'] == '2' && result[j]['type'] == '2' && item['name'] == result[j]['name']) {
                        repeat = true;
                        break;
                    }
                    if(item['type'] == '3' && result[j]['type'] == '3' && item['person_id'] == result[j]['person_id']){
                        repeat = true;
                        break;
                    }
                }
                if (!repeat) {
                    result.push(item);
                }
            }
            workOrderModel.transList = JSON.parse(JSON.stringify(result));//去重后赋值
            // workOrderModel.transList.forEach(function(gpa){ 
            //     unique[ JSON.stringify(gpa) ] = gpa; 
            // });
            // workOrderModel.transList = Object.keys(unique).map(function(u){
            //     return JSON.parse(u);
            // }); 
            // workOrderModel.transList = JSON.parse(JSON.stringify(arr_B));
            if (selectedPPList.length > 0) {
                var isChoice = false;
                for (var i = 0; i < valArr.length; i++) {
                    for (var j = 0; j < selectedPPList.length; j++) {
                        if (valArr[i].type == '2' && selectedPPList[j].type == '2' && valArr[i].name == selectedPPList[j].name || valArr[i].type == '3' && selectedPPList[j].type == '3' && valArr[i].person_id == selectedPPList[j].person_id) {
                            isChoice = true;
                            // console.log("岗位人员重复");
                            $("#add_person_position_repeat").show();
                            return;
                        }

                    }
                }
                if (!isChoice) { //与原有添加不重复
                    $("#add_person_position_repeat").hide();
                    for (var i = 0; i < valArr.length; i++) {
                        valArr[i].duty = [];
                        valArr[i].right = JSON.parse(JSON.stringify(operateBlockList));
                        workOrderModel.operateOptionList.push(valArr[i]);
                        workOrderModel.operateOptionList.forEach(function(item) {
                            if (item.duty && item.duty.length > 0) {
                                item.duty.forEach(function(info) {
                                    if (info.control_code == 'create' || info.control_code == 'assign') {
                                        // info.ppList = (info.ppList || []).concat(arr_B);
                                        info.ppList = JSON.parse(JSON.stringify(result));
                                    }
                                })
                            }
                        })
                        // continue;
                    }
                }
            } else {
                valArr.forEach(function(info) { //第一次选择
                    info.duty = [];
                    info.right = JSON.parse(JSON.stringify(operateBlockList));
                    // info.duty.ppList = JSON.parse(JSON.stringify(perPosiList));
                });
                workOrderModel.operateOptionList = (workOrderModel.operateOptionList || []).concat(valArr);
            }

        }

        $("#choicePersonPosition").hide();

    },
    clickAdditem: function(opt) { //二级弹出框添加选中
        var personPositionList = JSON.parse(JSON.stringify(workOrderModel.personPositionList));
        var id = opt.id;
        personPositionList.forEach(function(item) {

            if (item.id == id) {

                item.state = item.state == '2' ? item.state = '3' : item.state = '2';

                // 当父级被选中的时候子级跟随变化
                if (item.type == 2) {
                    item.persons.map(function(t) {

                        t.state = item.state;
                        return t;
                    })
                }
            } else if (item.type == 2) {
                item.state = item.persons.reduce(function(con, info) {
                    if (info.id == id) {
                        info.state = info.state == '2' ? info.state = '3' : info.state = '2';
                    }

                    if (con != "2") return con;
                    return info.state;
                }, '2');
            }
        })
        workOrderModel.personPositionList = personPositionList;

        // Vue.set(this, 'personPositionList', personPositionList);

    },
    oneStep_clickAdditem: function(item) { //一级岗位人员列表弹出框添加选中

        // if (item.isLock) return;//

        var id = item.id;

        var oneStep_personPositionList = JSON.parse(JSON.stringify(workOrderModel.oneStep_personPositionList));

        oneStep_personPositionList.forEach(function(item) {

            if (item.id == id) {

                item.isSelected = !item.isSelected;

                // 当父级被选中的时候子级跟随变化
                if (item.type == 2) {
                    item.persons.map(function(t) {
                        // if (t.isLock) {
                        //     return
                        // }
                        t.isSelected = item.isSelected;
                        return t;
                    })
                }
            } else if (item.type == 2) {
                item.isSelected = item.persons.reduce(function(con, info) {
                    info.isSelected = info.id == id ? !info.isSelected : info.isSelected;
                    if (!con) return con;
                    return info.isSelected;
                }, true);
            }
        })

        workOrderModel.oneStep_personPositionList = oneStep_personPositionList;

        // Vue.set(this, 'personPositionList', personPositionList);

    },

    //添加更多职责
    addMoreDuty: function(items, itIndex, right, index) {
        //判断添加模块类型
        var _ppList = JSON.parse(JSON.stringify(workOrderModel.transList));
        if (items[itIndex].right[index].control_code == 'create') {
            items[itIndex].duty.push({
                "control_code": items[itIndex].right[index].control_code,
                "control_name": items[itIndex].right[index].control_name,
                "ppList": _ppList,
                "executie_mode": "2",
                "filter_scheduling": false,
            });
        } else if (items[itIndex].right[index].control_code == 'assign') { //指派
            items[itIndex].duty.push({
                "control_code": items[itIndex].right[index].control_code,
                "control_name": items[itIndex].right[index].control_name,
                "ppList": _ppList,
                "filter_scheduling": false,
            });
        } else if (items[itIndex].right[index].control_code == 'execute') { //执行工作步骤
            items[itIndex].duty.push({
                "control_code": items[itIndex].right[index].control_code,
                "control_name": items[itIndex].right[index].control_name,
                "limit_domain": false
            });
        } else if (items[itIndex].right[index].control_code == 'apply') { //申请
            items[itIndex].duty.push({
                "control_code": items[itIndex].right[index].control_code,
                "control_name": items[itIndex].right[index].control_name,
            });
        } else if (items[itIndex].right[index].control_code == 'audit') { //审核
            items[itIndex].duty.push({
                "control_code": items[itIndex].right[index].control_code,
                "control_name": items[itIndex].right[index].control_name,
                "audit_close_way": "1"
            });
        } else if (items[itIndex].right[index].control_code == 'stop') { //中止
            items[itIndex].duty.push({
                "control_code": items[itIndex].right[index].control_code,
                "control_name": items[itIndex].right[index].control_name,
            });
        } else if (items[itIndex].right[index].control_code == 'close') { //结束
            items[itIndex].duty.push({
                "control_code": items[itIndex].right[index].control_code,
                "control_name": items[itIndex].right[index].control_name,
            });
        }else{
            items[itIndex].duty.push({
                "control_code": items[itIndex].right[index].control_code,
                "control_name": items[itIndex].right[index].control_name,
            });
        }
        // items[itIndex].right.splice(index, 1);
        items[itIndex].right[index]._show = false;
    },
    removeDutyData: function(items, itIndex, duty, index) { //移除职责
        var _code = items[itIndex].duty[index].control_code;
        items[itIndex].right.forEach(function(info) {
            if (_code == info.control_code) {
                info._show = true;
            }
        })
        items[itIndex].duty.splice(index, 1);
        // console.log(items)
        // workOrderModel.operateOptionList[itIndex].duty.splice(index,1);//移除对应选项
    },
    //点击执行步骤弹出框
    clickDutyShowModal: function(allList, arr, name, code, faIndex, childIndex) {
        var _this = this;
        //将父级和当前的index存储到model;
        //operateOptionFaIndex:'',//父级index
        //operateOptionChildIndex:'',//子级index
        // console.log(JSON.parse(JSON.stringify(allList)))
        var _data = JSON.parse(JSON.stringify(workOrderModel.falsePersonPosition));
        var falsePersonPositionList = JSON.parse(JSON.stringify(workOrderModel.falsePersonPosition));
        // console.log(name,code,faIndex,childIndex);
        workOrderModel.operateOptionFaIndex = faIndex;
        workOrderModel.operateOptionChildIndex = childIndex;
        workOrderModel.currStepDutyName = name;
        workOrderModel.currStepDutyCode = code;
        /*创建工单*/
        if (code == 'create') {
            var _filter = workOrderModel.operateOptionList[faIndex].duty[childIndex].filter_scheduling; //过滤人员
            var _executieMode = workOrderModel.operateOptionList[faIndex].duty[childIndex].executie_mode; //执行方式
            var _ppList = workOrderModel.operateOptionList[faIndex].duty[childIndex].ppList;
            if (_ppList && _ppList.length > 0) {
                _ppList.forEach(function(item) {
                    if (item.type == "2") { //岗位
                        if (item.state == '1') {
                            item.state = '2';
                        }
                        item.persons.forEach(function(info) {
                            if (info.state == '1') {
                                info.state = '2';
                            }
                        })
                    } else if (item.type == '3') {
                        if (item.state == '1') {
                            item.state = '2';
                        }
                    }

                })
            }
            if (!_this.plan_id) { //新建
                if (_ppList && _ppList.length > 0) { //返回编辑读取人员列表

                    workOrderModel.personPositionList = _ppList;
                } else {
                    workOrderModel.personPositionList = _ppList;
                }

                if (_filter) {
                    $("#new_filter_person").psel(true);
                } else {
                    $("#new_filter_person").psel(false);
                }
                /*执行方式*/
                if (_executieMode == '1') {
                    $("#oneOperaBtn").psel(true);
                } else {
                    $("#moreOperaBtn").psel(true);
                }

            } else { //编辑
                if (_ppList && _ppList.length > 0) { //返回编辑读取人员列表
                    workOrderModel.personPositionList = _ppList;
                } else {
                    workOrderModel.personPositionList = _ppList;
                }

                if (_filter) {
                    $("#new_filter_person").psel(true);
                } else {
                    $("#new_filter_person").psel(false);
                }

                if (_executieMode == '1') {
                    $("#oneOperaBtn").psel(true);
                } else {
                    $("#moreOperaBtn").psel(true);
                }
            }
            $("#createWorkOrderSet").pshow();
        }
        /* 执行工作步骤*/
        else if (code == 'execute') {
            var _state = workOrderModel.operateOptionList[faIndex].duty[childIndex].limit_domain;
            if (!_this.plan_id) {
                if (!_state) {
                    $("#zhixing_open").psel(true);
                } else {
                    $("#zhixing_close").psel(true);
                }

            } else {
                if (!_state) {
                    $("#zhixing_open").psel(true);
                } else {
                    $("#zhixing_close").psel(true);
                }
            }
            $("#stepsToPerformWork").pshow();
        }
        /*指派工单*/
        else if (code == 'assign') {
            var _state = workOrderModel.operateOptionList[faIndex].duty[childIndex].filter_scheduling;
            var _ppList = workOrderModel.operateOptionList[faIndex].duty[childIndex].ppList;
            var state = $(".createAssignSet_con_filter_person >div").psel();
            $(".createAssignSet_con_filter_person >div").psel(state);
            if (_ppList && _ppList.length > 0) {
                _ppList.forEach(function(item) {
                    if (item.state == '1') {
                        item.state = '2';
                    }
                })
            }

            if (!_this.plan_id) { //新建
                if (_ppList && _ppList.length > 0) { //返回编辑读取人员列表

                    workOrderModel.personPositionList = _ppList;
                } else {
                    workOrderModel.personPositionList = _ppList;
                }
                if (_state == true) {
                    $("#zhipai_filter").psel(true);
                } else {
                    $("#zhipai_filter").psel(false);
                }

            } else { //编辑

                if (_ppList && _ppList.length > 0) { //返回编辑读取人员列表

                    workOrderModel.personPositionList = _ppList;
                } else {
                    workOrderModel.personPositionList = _ppList;
                }
                if (_state == true) {
                    $("#zhipai_filter").psel(true);
                } else {
                    $("#zhipai_filter").psel(false);
                }
                //_ppList && _ppList.length > 0 ? workOrderModel.personPositionList = _ppList : workOrderModel.personPositionList = personPositionArr;
            };
            $("#createAssignSet").pshow();
        }
        /* 审核申请*/
        else if (code == 'audit') {
            var _check = workOrderModel.operateOptionList[faIndex].duty[childIndex].audit_close_way; //1手动，2自动
            if (!_this.plan_id) { //新建
                if (_check == undefined || _check == null || _check == '1') {
                    $("#shenhe_open").psel(true);
                } else {
                    $("#shenhe_close").psel(true);
                }
            } else { //编辑
                // var flag = arr.limit_domain;
                if (_check == '1' || _check == null || _check == undefined) {
                    $("#shenhe_open").psel(true);
                } else {
                    $("#shenhe_close").psel(true);
                }
            }
            $("#checkOrderSet").pshow();

        }
    },
    createWorkOrderSetYes: function() { //新建工单确定
        var fIndex = workOrderModel.operateOptionFaIndex;
        var cIndex = workOrderModel.operateOptionChildIndex;
        var name = workOrderModel.currStepDutyName;
        var code = workOrderModel.currStepDutyCode;
        var valArr = [];

        var _ppList = JSON.parse(JSON.stringify(workOrderModel.personPositionList));
        if (_ppList && _ppList.length > 0) {
            _ppList.forEach(function(ele) {
                if (ele.type == '2' && ele.state == "2") {
                    valArr.push({ "name": ele.name, "type": ele.type });
                } else if (ele.type == '2' && ele.state != "2") {
                    ele.persons.forEach(function(p) {
                        if (p.state == '2') {
                            valArr.push({ "name": p.name, "type": "3", "person_id": p.person_id });

                        }
                    })
                } else if (ele.type == '3' && ele.state == "2") {
                    valArr.push({ "name": ele.name, "type": "3", "person_id": ele.person_id });
                }

            })
        }
        var filter_scheduling = $(".createWorkOrderSet_con_filter_person >div").psel();
        var executie_mode = $(".createWorkOrderSet_con_opera_choice >div").psel() ? '2' : '1';
        workOrderModel.operateOptionList[fIndex].duty[cIndex].next_route = valArr;
        workOrderModel.operateOptionList[fIndex].duty[cIndex].executie_mode = executie_mode; //执行方式
        workOrderModel.operateOptionList[fIndex].duty[cIndex].filter_scheduling = filter_scheduling; //过滤人员范围
        workOrderModel.operateOptionList[fIndex].duty[cIndex].ppList = _ppList;
        $("#createWorkOrderSet").hide();

    },
    createAssignSetYes: function() { //指派设置确定
        var fIndex = workOrderModel.operateOptionFaIndex;
        var cIndex = workOrderModel.operateOptionChildIndex;
        var name = workOrderModel.currStepDutyName;
        var code = workOrderModel.currStepDutyCode;
        var valArr = [];

        var _ppList = JSON.parse(JSON.stringify(workOrderModel.personPositionList));
        if (_ppList && _ppList.length > 0) {
            _ppList.forEach(function(ele) {
                if (ele.type == '2' && ele.state == "2") {
                    valArr.push({ "name": ele.name, "type": ele.type });
                } else if (ele.type == '2' && ele.state != "2") {
                    ele.persons.forEach(function(p) {
                        if (p.state == '2') {
                            valArr.push({ "name": p.name, "type": "3", "person_id": p.person_id });

                        }
                    })
                } else if (ele.type == '3' && ele.state == "2") {
                    valArr.push({ "name": ele.name, "type": "3", "person_id": ele.person_id });
                }

            })
        }

        // console.log(JSON.stringify(valArr));
        var filter_scheduling = $(".createAssignSet_con_filter_person >div").psel();
        workOrderModel.operateOptionList[fIndex].duty[cIndex].next_route = valArr;
        workOrderModel.operateOptionList[fIndex].duty[cIndex].filter_scheduling = filter_scheduling;
        workOrderModel.operateOptionList[fIndex].duty[cIndex].ppList = _ppList;
        $("#createAssignSet").hide();
    },
    stepsToPerformWorkYes: function() { //执行工作步骤确定
        var fIndex = workOrderModel.operateOptionFaIndex;
        var cIndex = workOrderModel.operateOptionChildIndex;
        var name = workOrderModel.currStepDutyName;
        var code = workOrderModel.currStepDutyCode;
        var limit_domain = !($(".stepsToPerformWork_con_operat >div").psel());
        workOrderModel.operateOptionList[fIndex].duty[cIndex].limit_domain = limit_domain;
        $("#stepsToPerformWork").hide();
    },
    checkOrderSetYes: function() { //审核确定
        var fIndex = workOrderModel.operateOptionFaIndex;
        var cIndex = workOrderModel.operateOptionChildIndex;
        var name = workOrderModel.currStepDutyName;
        var code = workOrderModel.currStepDutyCode;
        var audit_close_way = $(".checkOrderSet_con_operat >div").psel() ? '1' : '2';
        workOrderModel.operateOptionList[fIndex].duty[cIndex].audit_close_way = audit_close_way;
        $("#checkOrderSet").hide();
    },
    choiceOrderFn: function(model, event) {
        // console.log(model, event)
        workOrderModel.choiceOrderType = model;

    },
    choiceTimerFn: function(model, event) {
        // console.log(model, event)
        workOrderModel.choiceTimerType = model;
    },

    workOrderCommonSave: function() { //保存
        this.createReminds = []; //清空提示数组
        var post_and_duty = JSON.parse(JSON.stringify(workOrderModel.operateOptionList));
        var planId = workOrderModel.plan_id;
        var orderType = workOrderModel.choiceOrderType.code ? workOrderModel.choiceOrderType.code : '';
        var orderTypeName = workOrderModel.choiceOrderType.name ? workOrderModel.choiceOrderType.name : '';
        var executeType = workOrderModel.choiceTimerType.code ? workOrderModel.choiceTimerType.code : '';
        var executeTypeName = workOrderModel.choiceTimerType.name ? workOrderModel.choiceTimerType.name : '';
        post_and_duty.forEach(function(item) {
            delete item.right;
            delete item.id;
            item.duty.forEach(function(info) {
                if (info.redBorder) {
                    delete info.redBorder;
                }
                if (info.control_code == 'create') {
                    delete info.audit_close_way;
                    delete info.limit_domain;
                    var _ppList = info.ppList;
                    info["next_route"] = [];
                    if (_ppList && _ppList.length > 0) {
                        _ppList.forEach(function(ele) {
                            if (ele.type == '2' && ele.state != "3") {
                                info["next_route"].push({ "name": ele.name, "type": ele.type });
                            } else if (ele.type == '2' && ele.state == "3") {
                                ele.persons.forEach(function(p) {
                                    if (p.state != '3') {
                                        info["next_route"].push({ "name": p.name, "type": "3", "person_id": p.person_id });

                                    }
                                })
                            } else if (ele.type == '3' && ele.state != "3") {
                                info["next_route"].push({ "name": ele.name, "type": "3", "person_id": ele.person_id });
                            }

                        })
                    }
                    delete info.ppList;
                    if (!info.executie_mode) {
                        info.executie_mode = '2';
                    }
                    if (!info.filter_scheduling) {
                        info["filter_scheduling"] = false;
                    }
                } else if (info.control_code == 'assign') { //指派
                    delete info.audit_close_way;
                    delete info.limit_domain;
                    delete info.executie_mode;
                    var _ppList = info.ppList;
                    info["next_route"] = [];
                    if (_ppList && _ppList.length > 0) {
                        _ppList.forEach(function(ele) {
                            if (ele.type == '2' && ele.state != "3") {
                                info["next_route"].push({ "name": ele.name, "type": ele.type });
                            } else if (ele.type == '2' && ele.state == "3") {
                                ele.persons.forEach(function(p) {
                                    if (p.state != '3') {
                                        info["next_route"].push({ "name": p.name, "type": "3", "person_id": p.person_id });

                                    }
                                })
                            } else if (ele.type == '3' && ele.state != "3") {
                                info["next_route"].push({ "name": ele.name, "type": "3", "person_id": ele.person_id });
                            }

                        })
                    }
                    delete info.ppList;
                    if (!info.filter_scheduling) {
                        info["filter_scheduling"] = false;
                    }
                } else if (info.control_code == 'execute') {
                    if (!info.limit_domain) {
                        info.limit_domain = false;
                    }
                    delete info.audit_close_way;
                    delete info.filter_scheduling;
                    delete info.executie_mode;
                    delete info.next_route;
                    delete info.ppList;
                } else if (info.control_code == 'apply') {
                    delete info.audit_close_way;
                    delete info.filter_scheduling;
                    delete info.limit_domain;
                    delete info.executie_mode;
                    delete info.next_route;
                    delete info.ppList;
                } else if (info.control_code == 'audit') { //审核
                    delete info.filter_scheduling;
                    delete info.limit_domain;
                    delete info.executie_mode;
                    delete info.next_route;
                    delete info.ppList;
                    if (!info.audit_close_way) {
                        info.audit_close_way = '1';
                    }
                } else if (info.control_code == 'stop') {
                    delete info.next_route;
                    delete info.audit_close_way;
                    delete info.filter_scheduling;
                    delete info.limit_domain;
                    delete info.executie_mode;
                    delete info.ppList;
                } else if (info.control_code == 'close') {
                    delete info.next_route;
                    delete info.audit_close_way;
                    delete info.filter_scheduling;
                    delete info.limit_domain;
                    delete info.executie_mode;
                    delete info.ppList;
                }

            })
        });
        // console.log(JSON.stringify(post_and_duty))
        var order,
            timer,
            result3,
            result4,
            result5,
            result6;
        var commitData = {
            order_type: orderType,
            execute_type: executeType,
            post_and_duty: post_and_duty
        };
        var pustAndDutyData = { //验证工单执行是否正确
            order_type: orderType,
            execute_type: executeType,
            post_and_duty: post_and_duty
        };
        var typeData = { //验证工单类型提交data
            // plan_id: planId,
            order_type: orderType,
            execute_type: executeType
        };

        if (!planId) {

            if (orderType != '') {
                order = true;
                $("#orderTypeError").hide();
            } else {
                $("#orderTypeError").show();
                order = false;
            };
            if (executeType != '') {
                timer = true;
                $("#timerTypeError").hide();
            } else {
                timer = false;
                $("#timerTypeError").show();
            };
            if (order && timer) {
                if (post_and_duty.length > 0) {
                    controller.getErrorFlowPlanType(typeData, commitData, pustAndDutyData, orderTypeName, executeTypeName)

                } else {
                    $("#publishNotice").pshow({ text: '保存失败，请选择岗位或人员，并为每个岗位或人员分配职责', state: "failure" });
                }

            } else {
                $("#publishNotice").pshow({ text: '保存失败，请重试', state: "failure" });
            }

        } else {
            orderType = workOrderModel.editOrderCode;
            executeType = workOrderModel.editTimerCode;
            var pustAndDutyData = {
                // plan_id: planId,
                order_type: orderType,
                execute_type: executeType,
                post_and_duty: post_and_duty
            };
            var editData = {
                plan_id: planId,
                order_type: orderType,
                execute_type: executeType,
                post_and_duty: post_and_duty
            };
            if (post_and_duty.length > 0) {
                controller.getEditErrorPostAndDuty(pustAndDutyData, editData) //编辑验证
            } else {
                $("#publishNotice").pshow({ text: '保存失败，请选择岗位或人员，并为每个岗位或人员分配职责', state: "failure" });
            }
            // controller.getEiteWorkOrderSave(data);
        }


    }




    //------------------------------------------ydx__end------------------------------------------


    //------------------------------------------yn__start------------------------------------------
    //vue的方法


    //------------------------------------------yn__end------------------------------------------
}