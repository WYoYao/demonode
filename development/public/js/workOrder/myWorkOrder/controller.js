var myWorkOrderController = {

    //------------------------------------------zy__start------------------------------------------
    //1、新增页:保存工单草稿
    saveDraftWorkOrder: function (obj) {
        $('#globalloading').pshow();
        var returnObj = publicMethod.isIncludeAttachments(obj);
        pajax[returnObj.requestType]({
            url: 'restMyWorkOrderService/saveDraftWorkOrder',
            data: returnObj.obj,
            success: function (result) {
                var data = result ? result : {};
                if (returnObj.requestType == 'post') commonData.publicModel.workOrderDraft.order_id = data.order_id;
                $('#globalnotice').pshow({text: '草稿保存成功', state: 'success'});
            },
            error: function (err) {
                $('#globalnotice').pshow({text: '草稿保存失败，请重试', state: 'failure'});
            },
            complete: function () {
                $('#globalloading').phide();
            }
        });

    },

    //2、新增页:预览工单草稿
    previewWorkOrder: function (obj) {
        $('#globalloading').pshow();
        obj.user_id = frameModel.userInfo.person_id;
        obj.project_id = frameModel.selectedProjectId;
        $.ajax({
            url: '/previewWorkOrderDraft',
            type: 'get',
            data: obj,
            success: function (result) {
                var data = result ? result : {};
                commonData.publicModel.orderDetailData = data.wo_body || {};
                orderDetail_pub.getOrderDetail(commonData.publicModel, commonData.publicModel.orderDetailData.order_id, '4');
                orderDetail_data.choiceObjectFlag = orderDetail_pub.choiceObjExampleStatus(data.wo_body.matters);
                commonData.publicModel.LorC = 0;
            },
            error: function (err) {
            },
            complete: function () {
                $('#globalloading').phide();
            }
        });
    },

    //3、我的工单-新增页:发布工单
    publishWorkOrder: function (obj) {
        $('#globalloading').pshow();
        var paramObj = {
            order_id: commonData.publicModel.workOrderDraft.order_id,
            wo_body: obj,
            user_id: frameModel.userInfo.person_id,
            project_id: frameModel.selectedProjectId
        }
        $.ajax({
            url: '/publishWorkOrder',
            type: 'post',
            contentType: 'application/json;charset=utf-8',
            data: JSON.stringify(paramObj),
            success: function (result) {
                var data = result ? result : {};
                $('#globalnotice').pshow({text: '发布成功', state: 'success'});
                commonData.publicModel.LorC = true;
                setTimeout(function () {
                    commonData.bpCreateWorkOrder = true;
                    $("#work-already").psel(0, true);
                }, 0);
                $('#globalloading').phide();
                myWorkOrderController.saveAddWorkOrder(data.order_id || '');
            },
            error: function (err) {
                $('#globalnotice').pshow({text: '发布失败，请重试', state: 'failure'});
            },
            complete: function () {
                $('#globalloading').phide();
            }
        });
    },

    //4、根据id查询工单详细信息-发布后的     //To Use
    queryWorkOrderById1: function (order_id) {
        $('#globalloading').pshow();
        pajax.post({
            url: 'restWoMonitorService/queryWorkOrderById',
            data: {
                order_id: order_id
            },
            success: function (result) {
                var data = result ? result : {};

            },
            error: function (err) {
            },
            complete: function () {
                $('#globalloading').phide();
            }
        });
    },

    //5、我的工单-验证对象和sop是否匹配
    verifyObjectAndSop: function (allMatters, obj, index, call) {
        pajax.post({
            url: 'restSopService/verifyObjectAndSop',
            data: obj,
            success: function (result) {
                var data = result && result.data ? result.data : [];
                var filteredData = [];
                var matter = allMatters[index];
                for (var i = 0; i < data.length; i++) {
                    var ignored = false;
                    if (matter.ignoredErrArr) {
                        for (var j = 0; j < matter.ignoredErrArr.length; j++) {
                            if (data[i].obj_name == matter.ignoredErrArr[j].obj_name && data[i].sop_name == matter.ignoredErrArr[j].sop_name) {
                                ignored = true;
                                break;
                            }
                        }
                    }
                    if (!ignored) {
                        filteredData.push(JSON.parse(JSON.stringify(data[i])));
                        commonData.isValid = false;
                    }
                }
                commonData.publicModel.allMatters[index].unMatchedSopList = filteredData;
                publicMethod.verifyNextMatter(allMatters, index, call);
            },
            error: function (err) {
            },
            complete: function () {
            }
        });
    },

    //6、查询工具/部件列表
    queryTempObjectList: function (dom, obj_type, isNextPage, keyword, isSearch) {
        $('#loading').pshow();
        if (obj_type == '2' || obj_type == '3') {
            commonData.click_class_option = '1';
            var objClassName = obj_type == '2' ? 'component' : 'tool';
            commonData.class_option_name = commonData.objClass[objClassName];
        }
        pajax.post({
            url: 'restObjectService/queryTempObjectList',
            data: {
                obj_type: obj_type,     //String, 对象类型，1、自定义对象、2-部件、3-工具、4-品牌、5、自定义标签、9其它，必须, String型
                obj_name: keyword
            },
            success: function (result) {
                var data = result && result.data ? result.data : [];
                if (!isNextPage && !isSearch) {
                    commonData.publicModel.curObjType = obj_type == '2' ? 'component' : obj_type == '3' ? 'tool' : 'other';
                    commonData.initialCheckedObjs = [];
                    commonData.otherSelectedObjs = [];
                    for (var i = 0; i < commonData.editingContentObjs.length; i++) {
                        var contentObj = commonData.editingContentObjs[i];
                        for (var j = 0; j < data.length; j++) {
                            var item = data[j];

                            if (item.obj_id === contentObj.obj_id) {
                                item.checked = true;
                                contentObj = true;
                                commonData.initialCheckedObjs.push(item);
                                break;
                            }
                        }
                    }
                    for (var i = 0; i < commonData.editingContentObjs.length; i++) {
                        var contentObj = commonData.editingContentObjs[i];
                        if (!contentObj.checked) {
                            commonData.otherSelectedObjs.push(contentObj);
                        }
                    }
                    //publicMethod.setSureBtnStatus();
                    commonData.initialSelectedObjs = JSON.parse(JSON.stringify(commonData.editingContentObjs));
                    commonData.checkedObjs = JSON.parse(JSON.stringify(commonData.initialCheckedObjs));
                    commonData.tempObjectList = data;
                    commonData.publicModel.curLevelList = JSON.parse(JSON.stringify(data));
                    publicMethod.setCurPop(1);
                }
            },
            error: function (err) {
            },
            complete: function () {
                $('#loading').phide();
            }
        });
    },

    //7、埋点-添加工作内容
    saveAddWork: function (confirm) {
        $('#loading').pshow();
        pajax.update({
            url: 'restBuryPointService/saveAddWork',
            data: {
                click_close_button: !confirm ? '1' : '0',
                click_confirm_button: confirm ? '1' : '0'
            },
            success: function (result) {
            },
            error: function (err) {
            },
            complete: function () {
            }
        });
    },

    //8、埋点-新建工单
    saveAddWorkOrder: function (order_id) {
        var allMatters = commonData.publicModel.allMatters;
        var obj_num = 0, sop_num = 0, work_num = 0;
        for (var i = 0; i < allMatters.length; i++) {
            var matter = allMatters[i];
            obj_num += (matter.desc_objs ? matter.desc_objs.length : 0);
            sop_num += (matter.desc_sops ? matter.desc_sops.length : 0);
            work_num += (matter.desc_works ? matter.desc_works.length : 0);
        }
        pajax.update({
            url: 'restBuryPointService/saveAddWorkOrder',
            data: {
                order_id: order_id,
                obj_num: obj_num + '',
                sop_num: sop_num + '',
                work_num: work_num + '',
                new_tool_num: commonData.new_tool_num + ''
            },
            success: function (result) {
            },
            error: function (err) {
            },
            complete: function () {
            }
        });
    },

    //9、埋点-模式切换
    saveWoInputMode: function () {
        pajax.update({
            url: 'restBuryPointService/saveWoInputMode',
            data: {
                order_id: commonData.publicModel.workOrderDraft.order_id,
                free_input: commonData.publicModel.regular ? '0' : '1',
                structure_input: commonData.publicModel.regular ? '1' : '0'
            },
            success: function (result) {
            },
            error: function (err) {
            },
            complete: function () {
            }
        });
    },

    //10、埋点-选择对象
    saveObjSel: function () {
        var paramObj = {
            from_type: commonData.publicModel.addContentWindow ? '3' : '2',
            hand_at: commonData.click_at_button == '1' ? '0' : '1',
            click_at_button: commonData.click_at_button,
            click_class_option: commonData.click_class_option,
            class_option_name: commonData.class_option_name,
            input_text: commonData.input_text,
            click_custom_button: commonData.click_custom_button,
            custom_result: commonData.custom_result,
            click_domain_button: commonData.click_domain_button,
            click_system_button: commonData.click_system_button,
            final_result: commonData.final_result
        }
        pajax.update({
            url: 'restBuryPointService/saveObjSel',
            data: paramObj,
            success: function (result) {
            },
            error: function (err) {
            },
            complete: function () {
            }
        });
    },

    //11、埋点-选择信息点
    saveInfoPointSel: function () {
        var paramObj = {
            from_type: '2',
            click_add_obj_info_point: commonData.click_add_info_point == '1' ? '0' : '1',
            click_add_info_point: commonData.click_add_info_point,
            click_class_option: commonData.click_class_option,
            class_option_name: commonData.class_option_name,
            click_search_button: commonData.click_search_button,
            search_use_enter_key: '0',
            keyword_num: commonData.keyword_num + '',
            click_custom_button: commonData.click_custom_button,
            custom_result: commonData.custom_result,
            final_result: commonData.final_result
        }
        pajax.update({
            url: 'restBuryPointService/saveInfoPointSel',
            data: paramObj,
            success: function (result) {
            },
            error: function (err) {
            },
            complete: function () {
            }
        });
    },

    //12、埋点-选择SOP
    saveSopSel: function () {
        var paramObj = {
            hand_hash_key: commonData.click_at_button == '1' ? '0' : '1',
            click_hash_key: commonData.click_at_button,
            input_text: commonData.input_text,
            custom_sop_name: commonData.custom_sop_name,
            click_sop_name: commonData.click_sop_name,
            click_sop_screen_button: commonData.click_sop_screen_button      //To Confirm
        }
        pajax.update({
            url: 'restBuryPointService/saveSopSel',
            data: paramObj,
            success: function (result) {
            },
            error: function (err) {
            },
            complete: function () {
            }
        });
    },

    //13、保存用户使用的工单输入方式
    saveUserWoInputMode: function () {
        pajax.update({
            url: 'restUserService/saveUserWoInputMode',
            data: {
                input_mode: commonData.publicModel.regular ? '2' : '1'
            },
            success: function (result) {
            },
            error: function (err) {
            },
            complete: function () {
            }
        });
    },

    //------------------------------------------zy__end------------------------------------------

    //------------------------------------------yn__start------------------------------------------
    // ajax请求
    //获取登录信息--根据项目id判断有无创建权限
    /*getUserInfo: function() { //获取用户信息
     $.ajax({
     url: '/userInfo',
     type: 'get',
     data: {},
     success: function(result) {
     commonData.publicModel.userInfo = result;
     publicMethod.createRight();//创建权限
     // console.log(JSON.stringify(workOrderMngModel.userInfo.user))
     },
     error: function(error) {},
     complete: function() {}
     });
     },*/
    //创建权限
    queryPersonRightsForProject: function () {
        $('#globalloading').pshow();
        pajax.post({
            url: 'restUserService/queryPersonRightsForProject',
            data: {},
            success: function (result) {
                var data = result && result.rights && result.rights.wo_create ? result.rights.wo_create : "";
                commonData.publicModel.createrights = data
            },
            error: function (err) {
                $("#globalnotice").pshow({text: '获取权限失败', state: "failure"});
            },
            complete: function () {
                $('#globalloading').phide();
            }
        });
    },
    /* 创建页--工单类型 --用户能看到的*/
    queryWorkOrderType: function (postObj) {
        // $('#globalloading').pshow();
        $('#globalloading').pshow();
        pajax.post({
            url: 'restGeneralDictService/queryWorkOrderType',
            data: postObj.dataObj,
            success: function (result) {
                var data = result && result.data ? result.data : [];
                commonData.publicModel.workTypeC = data;//创建页
            },
            error: function (err) {
                $("#globalnotice").pshow(postObj.noticeFailureObj);
            },
            complete: function () {
                $('#globalloading').phide();
            }
        });
    },
    /*列表页--工单类型--所有的*/
    getOrderTypeList: function () { //查询工单类型列表
        pajax.post({
            url: 'restGeneralDictService/queryGeneralDictByKey',
            data: {
                dict_type: "work_order_type"
            },
            success: function (res) {
                var _data = res && res.data ? res.data : [];
                commonData.publicModel.detailSopOrderList = _data;
                var allArr = [
                    {
                        code: "all",
                        name: "全部",
                        description: "",
                        dic_type: 'work_order_type'
                    }
                ];
                commonData.publicModel.workTypeL = allArr.concat(_data);
                setTimeout(function () {
                    $("#work-type").psel(0, false);
                },0);
            },
            error: function (error) {

            },

            complete: function () {
                // $("#globalloading").phide();
            }
        });
    },
    queryWorkOrder: function (url, conditionObj) {
        $('#globalloading').pshow();
        pajax.post({
            url: url,
            data: conditionObj,
            success: function (result) {
                var data = result && result.data ? result.data : [];
                // commonData.publicModel.temList = commonData.publicModel.temList.concat(data);
                commonData.publicModel.workList = commonData.publicModel.workList.concat(data);
                setTimeout(function () {
                    if (window.outerHeight > 720) {
                        if (commonData.publicModel.workList.length > 21) {
                            $(".myWork-table-body").addClass("border-on");
                            $(".myWork-table-body>.tr:last-of-type").removeClass("border-on");
                        } else {
                            $(".myWork-table-body").removeClass("border-on");
                            $(".myWork-table-body>.tr:last-of-type").addClass("border-on");
                        }
                    } else {
                        if (commonData.publicModel.workList.length > 11) {
                            $(".myWork-table-body").addClass("border-on");
                            $(".myWork-table-body>.tr:last-of-type").removeClass("border-on");
                        } else {
                            $(".myWork-table-body").removeClass("border-on");
                            $(".myWork-table-body>.tr:last-of-type").addClass("border-on");
                        }
                    }
                }, 0)
            },
            error: function (err) {
                $("#globalnotice").pshow({text: '获取工单列表失败', state: "failure"});
            },
            complete: function () {
                $('#globalloading').phide();
                $(".flash").removeClass("flash-pub");
            }
        });
    },
    selAlreadyEvent: function () {
        if ($("#work-already").psel()) {
            commonData.publicModel.workAlreadyID = commonData.publicModel.workAlready[$("#work-already").psel().index].id;
        }
        if ($("#work-type").psel()) {
            var orderType = commonData.publicModel.workTypeL[$("#work-type").psel().index].code;
        }
        //判断url
        var url = commonData.publicModel.workAlreadyID == "0" ? "restMyWorkOrderService/queryMyDraftWorkOrder" : commonData.publicModel.workAlreadyID == "1" ? "restMyWorkOrderService/queryMyPublishWorkOrder" : "restMyWorkOrderService/queryMyParticipantWorkOrder";
        orderType = orderType == "all" ? "" : orderType;
        commonData.publicModel.pageNum = 1;
        commonData.publicModel.nScrollHight=0;
        if (orderType == "") {
            var conditionObj = {
                // user_id: userId,                        //员工id-当前操作人id，必须
                // project_id: proId,                     //项目id，必须
                page: commonData.publicModel.pageNum,                       //当前页号，必须
                page_size: 50                        //每页返回数量，必须
            };
        } else {
            conditionObj = {
                order_type: orderType,                      //工单类型编码
                page: commonData.publicModel.pageNum,                       //当前页号，必须
                page_size: 50                        //每页返回数量，必须
            };
        }

        // commonData.publicModel.temList = [];
        commonData.publicModel.workList = [];
        myWorkOrderController.queryWorkOrder(url, conditionObj);
    },
    /*根据Id删除草稿工单*/
    deleteDraftWorkOrderById: function () {
        $('#globalloading').pshow();
        commonData.publicModel.workList = [];
        pajax.post({
            url: 'restMyWorkOrderService/deleteDraftWorkOrderById',
            data: {
                order_id: commonData.publicModel.del_plan_id
            },
            success: function (result) {
                $("#globalnotice").pshow({text: '删除成功', state: "success"});
            },
            error: function (err) {
                $("#globalnotice").pshow({text: '删除失败', state: "failure"});
            },
            complete: function () {
                $('#globalloading').phide();
                $("#del-confirm").phide();
                myWorkOrderController.selAlreadyEvent(); //此处重新获取一遍列表
            }
        });
    },
    //查看发布后的工单详情
    queryWorkOrderById: function (order_id) {
        $('#globalloading').pshow();
        commonData.publicModel.workList = [];
        pajax.post({
            url: 'restMyWorkOrderService/queryWorkOrderById',
            data: {
                order_id: order_id
            },
            success: function (result) {
                var data = result ? result : {};
                commonData.publicModel.orderDetailData = data.work_order.wo_body || {};
                orderDetail_pub.getOrderDetail(commonData.publicModel, commonData.publicModel.orderDetailData.order_id, '4');
                // commonData.publicModel.LorC = true;
                commonData.publicModel.Published = 1;
            },
            error: function (err) {
                $("#globalnotice").pshow({text: '获取详情失败', state: "failure"});
            },
            complete: function () {
                $('#globalloading').phide();
            }
        });
    },
    /*查询用户输入方式*/
    queryUserWoInputMode: function (call) {
        $('#globalloading').pshow();
        commonData.publicModel.workList = [];
        pajax.post({
            url: 'restUserService/queryUserWoInputMode',
            data: {},
            success: function (result) {
                var input_mode = result && result.input_mode ? result.input_mode : "";//工单输入方式，0-未记录过，1-自由输入，2-结构化输入
                commonData.clickInputMode = false;
                if (typeof call == 'function') {        //编辑工单
                    call();
                }
                if (!commonData.publicModel.workOrderDraft) commonData.publicModel.workOrderDraft = {};
                commonData.publicModel.workOrderDraft.input_mode = input_mode;
                commonData.publicModel.regular = input_mode == 0 ? false : input_mode == 1 ? false : true;
                $("#switch-slide").psel(commonData.publicModel.regular);
            },
            error: function (err) {
                $("#globalnotice").pshow({text: '获取失败', state: "failure"});
            },
            complete: function () {
                $('#globalloading').phide();
            }
        });
    },
    /*编辑草稿*/
    editDraft: function (index, order_id, event) {
        event.stopPropagation();
        commonData.publicModel.workOrderDraft = {};
        var editDraftObj = {};
        if (order_id) {
            editDraftObj[order_id] = order_id;
        }

        $('#globalloading').pshow();
        pajax.post({
            url: 'restMyWorkOrderService/queryDraftWorkOrderById',      ////根据id查询工单详细信息-草稿的
            data: {
                order_id: order_id
            },
            success: function (result) {
                var data = result ? result : {};
                myWorkOrderController.queryUserWoInputMode(function () {
                    publicMethod.setEditedMatterDatas(result);
                    publicMethod.setEditDraft()
                });
            },
            error: function (err) {
            },
            complete: function () {
                $('#globalloading').phide();
            }
        });

    },
    /*查询建筑体*/
    queryBuild: function (dom, param2, isPop3) {
        commonData.click_class_option = '1';
        commonData.class_option_name = commonData.objClass['build'];
        commonData.publicModel.buildList = [];
        $('#globalloading').pshow();
        pajax.post({
            url: 'restObjectService/queryBuild',
            data: {},
            success: function (result) {
                var data = result && result.data ? result.data : [];
                commonData.publicModel.curObjType = 'build';

                commonData.publicModel.buildList = data;
                commonData.publicModel.curLevelList = JSON.parse(JSON.stringify(data));
                /*isPop3 ? publicMethod.isSelectedObj1() : */
                /*<<<<<<< .mine
                 // publicMethod.isSelectedObj(null, commonData.types[0]);
                 if (commonData.publicModel.work_c) {
                 publicMethod.setCurPop(1, commonData.types[3]);
                 } else {
                 publicMethod.isSelectedObj(null, commonData.types[0]);
                 publicMethod.setCurPop(1, commonData.types[0]);
                 }
                 =======*/
                var type = commonData.publicModel.addContentWindow ? commonData.types[3] : commonData.types[0];
                publicMethod.isSelectedObj(null, type);
                publicMethod.setCurPop(1, type);

                /*isPop3 ? publicMethod.setCurPop3(1) : */
                //$(event).parent(".none-both").hide().siblings(".only-checkbox").show();
                // commonData.publicModel.workType = data;
            },
            error: function (err) {
            },
            complete: function () {
                $('#globalloading').phide();
            }
        });
    },
    //查询楼层(左侧一级)  //10、查询空间（左侧两级）
    queryFloor: function (dom, deleteFloorLevel) {
        commonData.click_class_option = '1';
        var objClassName = deleteFloorLevel ? 'floor' : 'space';
        commonData.class_option_name = commonData.objClass[objClassName];
        commonData.publicModel.leftLevel = [];
        //commonData.publicModel.lastLevel = [];        //MARK
        commonData.publicModel.curLevelList = [];
        $('#globalloading').pshow();
        pajax.post({
            url: 'restObjectService/queryFloor',        //未返回对象类型
            data: {
                need_back_parents: deleteFloorLevel
            },
            success: function (result) {
                var data = result && result.data ? result.data : [];
                //data = JSON.parse(JSON.stringify(leftOneLevel));        //To Delete
                if (deleteFloorLevel) {
                    for (var i = 0; i < data.length; i++) {
                        data[i].contentCopy = JSON.parse(JSON.stringify(data[i].content));
                        data[i].content = null;
                        // commonData.publicModel.lastLevel.push(data[i].contentCopy);
                    }
                    commonData.publicModel.leftLevel = data;
                    commonData.publicModel.curObjType = 'floor';

                } else {
                    commonData.publicModel.leftLevel = data;
                    commonData.publicModel.curObjType = 'space';
                }
                $(dom).parent(".none-both").hide().siblings(".both-all").show();
            },
            error: function (err) {
            },
            complete: function () {
                $('#globalloading').phide();
            }
        });
    },

    /*查询系统，左侧一级*/
    querySystem: function (dom, deleteFloorLevel, event) {
        commonData.click_class_option = '1';
        commonData.class_option_name = commonData.objClass['system'];
        if (event) event.stopPropagation();
        commonData.publicModel.leftLevel = [];
        //commonData.publicModel.lastLevel = [];        //MARK
        commonData.publicModel.curLevelList = [];
        commonData.publicModel.infoArray = [];
        $('#globalloading').pshow();
        pajax.post({
            url: 'restObjectService/querySystem',        //未返回对象类型
            data: {
                need_back_parents: deleteFloorLevel
            },
            success: function (result) {
                var data = result && result.data ? result.data : [];
                //data = JSON.parse(JSON.stringify(leftOneLevel));        //To Delete
                if (deleteFloorLevel) {
                    for (var i = 0; i < data.length; i++) {
                        data[i].contentCopy = JSON.parse(JSON.stringify(data[i].content));
                        data[i].content = null;
                        // commonData.publicModel.lastLevel.push(data[i].contentCopy);
                    }
                    commonData.publicModel.leftLevel = data;
                    commonData.publicModel.curObjType = 'system';
                    if (commonData.publicModel.addContentWindow) {
                        publicMethod.setCurPop(2, 'content');

                    } else {
                        publicMethod.setCurPop(2, 'obj')
                    }
                }
                var type = commonData.publicModel.addContentWindow ? commonData.types[3] : commonData.types[0];
                publicMethod.isSelectedObj(null, type);
            },
            error: function (err) {
            },
            complete: function () {
                $('#globalloading').phide();
            }
        });
    },
    /*查询系统，左侧一级*/
    querySystemResult: function (dom, deleteFloorLevel, event) {
        if (event) event.stopPropagation();
        commonData.click_class_option = '1';
        commonData.class_option_name = commonData.objClass['system'];
        commonData.publicModel.leftLevel = [];
        //commonData.publicModel.lastLevel = [];        //MARK
        commonData.publicModel.curLevelList = [];
        commonData.publicModel.infoArray = [];
        $('#globalloading').pshow();
        pajax.post({
            url: 'restObjectService/querySystem',        //未返回对象类型
            data: {
                need_back_parents: deleteFloorLevel
            },
            success: function (result) {
                var data = result && result.data ? result.data : [];
                //data = JSON.parse(JSON.stringify(leftOneLevel));        //To Delete
                if (deleteFloorLevel) {
                    for (var i = 0; i < data.length; i++) {
                        data[i].contentCopy = JSON.parse(JSON.stringify(data[i].content));
                        data[i].content = null;
                        // commonData.publicModel.lastLevel.push(data[i].contentCopy);
                    }
                    commonData.publicModel.leftLevel = data;
                    commonData.publicModel.curObjType = 'system';
                    $("#result-equip-tree").precover(true);
                    publicMethod.setCurPop2(1, false);


                }
                var type = commonData.publicModel.addContentWindow ? commonData.types[3] : commonData.types[0];
                publicMethod.isSelectedObj(null, type);
            },
            error: function (err) {
            },
            complete: function () {
                $('#globalloading').phide();
            }
        });
    },
    /*查询空间，左侧两级*/
    querySpace: function (obj_id, obj_type, deleteFloorLevel) {
        //commonData.publicModel.lastLevel = [];        //MARK
        commonData.publicModel.curLevelList = [];
        $('#globalloading').pshow();
        pajax.post({
            url: 'restObjectService/querySpace',        //未返回对象类型
            data: {
                need_back_parents: deleteFloorLevel,
                obj_id: obj_id,            //对象id,建筑或者楼层的id,必须
                obj_type: obj_type,	     //对象类型，build、floor,必须

            },
            success: function (result) {
                var data = result && result.data ? result.data : [];
                //commonData.publicModel.lastLevel = data;        //MARK
                commonData.publicModel.curLevelList = data;
                var type = commonData.publicModel.addContentWindow ? commonData.types[3] : commonData.types[0];
                publicMethod.isSelectedObj(null, type);
            },
            error: function (err) {
            },
            complete: function () {
                $('#globalloading').phide();
            }
        });
    },
    /*查询设备实例(左侧三级) 即：查询建筑-楼层-空间列表树*/
    queryBuildFloorSpaceTree: function (dom, event) {
        commonData.click_class_option = '1';
        commonData.class_option_name = commonData.objClass['equip'];
        if (event) event.stopPropagation();
        commonData.publicModel.curSelectedDomain = {};
        commonData.publicModel.curSelectedSystem = {};
        commonData.publicModel.leftLevel = [];
        //commonData.publicModel.lastLevel = [];        //MARK
        commonData.publicModel.curLevelList = [];
        commonData.publicModel.infoArray = [];
        commonData.publicModel.systemList = [];
        var editDom = $(dom).parents(".aite-bubble").find(".system-major>div:not(:first-of-type)");
        $(editDom[0]).precover('专业');
        $(editDom[2]).precover('系统');
        $('#globalloading').pshow();
        pajax.post({
            url: 'restObjectService/queryBuildFloorSpaceTree',        //未返回对象类型
            data: {},
            success: function (result) {
                var data = result && result.data ? result.data : [];
                commonData.publicModel.curObjType = 'equip';
                // commonData.publicModel.curObjType2 = 'infoPoint';
                commonData.publicModel.leftLevel = data;
                if (commonData.publicModel.addContentWindow) {
                    publicMethod.setCurPop(2, 'content');

                } else {
                    publicMethod.setCurPop(2, 'obj');
                }
                // $(dom).parent(".none-both").hide().siblings(".both-all").show();
                myWorkOrderController.queryGeneralDictByKey();
            },
            error: function (err) {
            },
            complete: function () {
                $('#globalloading').phide();
            }
        });
    },
    /*查询设备实例(左侧三级) 即：查询建筑-楼层-空间列表树*/
    queryBuildFloorSpaceTreeResult: function (dom, event) {
        if (event) event.stopPropagation();
        commonData.click_class_option = '1';
        commonData.class_option_name = commonData.objClass['equip'];
        commonData.publicModel.curSelectedDomain = {};
        commonData.publicModel.curSelectedSystem = {};
        commonData.publicModel.leftLevel = [];
        //commonData.publicModel.lastLevel = [];        //MARK
        commonData.publicModel.curLevelList = [];
        commonData.publicModel.infoArray = [];
        commonData.publicModel.systemList = [];
        var editDom = $(dom).parents(".aite-bubble").find(".system-major>div:not(:first-of-type)");
        $(editDom[0]).precover('专业');
        $(editDom[2]).precover('系统');
        $('#globalloading').pshow();
        pajax.post({
            url: 'restObjectService/queryBuildFloorSpaceTree',        //未返回对象类型
            data: {},
            success: function (result) {
                var data = result && result.data ? result.data : [];
                commonData.publicModel.curObjType = 'equip';
                // commonData.publicModel.curObjType2 = 'infoPoint';
                commonData.publicModel.leftLevel = data;
                publicMethod.setCurPop2(1, false);
                // $(dom).parent(".none-both").hide().siblings(".both-all").show();
                myWorkOrderController.queryGeneralDictByKey();
            },
            error: function (err) {
            },
            complete: function () {
                $('#globalloading').phide();
            }
        });
    },
    /*查询设备实例*/
    queryEquip: function (obj) {
        //commonData.publicModel.lastLevel = [];        //MARK
        commonData.publicModel.curLevelList = [];
        $('#globalloading').pshow();
        pajax.post({
            url: 'restObjectService/queryEquip',        //未返回对象类型
            data: obj,
            success: function (result) {
                var data = result && result.data ? result.data : [];
                //commonData.publicModel.lastLevel = data;        //MARK
                commonData.publicModel.curLevelList = data;
                var type = commonData.publicModel.addContentWindow ? commonData.types[3] : commonData.types[0];
                publicMethod.isSelectedObj(null, type);
            },
            error: function (err) {
            },
            complete: function () {
                $('#globalloading').phide();
            }
        });
    },
    /*查询设备实例--专业*/
    queryGeneralDictByKey: function () {
        commonData.publicModel.domainList = [];
        pajax.post({
            url: 'restGeneralDictService/queryGeneralDictByKey',        //未返回对象类型
            data: {
                dict_type: "domain_require"
            },
            success: function (result) {
                var data = result && result.data ? result.data : [];
                commonData.publicModel.domainList = data;
                var arr = JSON.parse(JSON.stringify(data));
                var listObj = {};
                arr.forEach(function (item, index) {
                    listObj[item.code] = item.name;
                });
                // console.log(JSON.stringify(listObj))
                commonData.publicModel.professionalObj = listObj; //专业需求转换成键值对存储

            },
            error: function (err) {
            },
            complete: function () {
            }
        });
    },
    /*查询设备实例系统专业下的系统*/
    querySystemForSystemDomain: function (content) {
        commonData.click_domain_button = '1';
        if (content.code == commonData.publicModel.curSelectedDomain.code) return;
        if (arguments[1] && arguments[1].target) {
            commonData.publicModel.curSelectedSystem = {};
            $(arguments[1].target).parents('.system-major').children().eq(2).precover('系统');
        }
        commonData.publicModel.curSelectedDomain = JSON.parse(JSON.stringify(content));
        commonData.publicModel.systemList = [];
        pajax.post({
            url: 'restObjectService/querySystemForSystemDomain',        //未返回对象类型
            data: {
                system_domain: content.code
            },
            success: function (result) {
                var data = result && result.data ? result.data : [];
                commonData.publicModel.systemList = data;
            },
            error: function (err) {
            },
            complete: function () {
            }
        });
    },

    /*查询可供选择的sop*/
    //params
    //  getAllSops: 清除筛选条件获取所有SOP
    querySopListForSel: function (obj, getAllSops, moveToBeforeSpace, hashtype, isMatchSop) {/**/
        commonData.publicModel.sopList = [];
        commonData.publicModel.sopCriteria = [];
        $('#globalloading').pshow();
        commonData.notShowSopPop = false;
        pajax.post({
            url: 'restSopService/querySopListForSel',
            data: obj,
            success: function (result) {
                var sopList = result && result.content ? result.content : [];
                var sopCriteria = result && result.criteria ? result.criteria : {};
                if (isMatchSop) {     //空格结束SOP输入，匹配该对象是否存在于SOP列表
                    var matched = false;
                    for (var i = 0; i < sopList.length; i++) {
                        var item = sopList[i];
                        if (obj.sop_name == item.sop_name) {
                            matched = true;
                            ((commonData.publicModel.allMatters[commonData.curMatterIndex] || {})['desc_sops'] || []).push(item);
                            break;
                        }
                    }
                    if (!matched) {
                        commonData.custom_sop_name = obj.sop_name;
                        publicMethod.saveObjOrSopSel('#');
                    }
                    var contentData = publicMethod.getContentData(commonData.types[1]);
                    contentData.content.disableSopBtn = false;
                    return;
                }
                if (!commonData.notShowSopPop) {
                    commonData.publicModel.sopList = sopList;
                    commonData.publicModel.sopCriteria = sopCriteria;
                    publicMethod.setCriteriaStatus('brands', 'selectedBrands', false);
                    publicMethod.setCriteriaStatus('order_type', 'selectedOrder_type', true, 'code');
                    publicMethod.setCriteriaStatus('fit_objs', 'selectedFit_objs', true, 'obj_id');
                    publicMethod.setCriteriaStatus('labels', 'selectedLabels', false);


                    var value = obj.sop_name;
                    for (var i = 0; i < sopList.length; i++) {
                        var item = sopList[i];
                        if (item.sop_name) item.sop_name_arr = publicMethod.strToMarkedArr(item.sop_name, value);
                    }

                    commonData.publicModel.curLevelList = JSON.parse(JSON.stringify(sopList));

                    if (commonData.firstSetMore) {
                        publicMethod.initSopModal();
                    }
                    /*isPop3 ? publicMethod.setCurPop3(1) : */
                    publicMethod.setCurPop(null, commonData.types[1], null, moveToBeforeSpace);
                    if (hashtype) {
                        //重新定位
                        yn_method.locationHashPop(true);
                    }
                    if (getAllSops) {

                    }
                    /*isPop3 ? publicMethod.isSelectedObj1() : */
                    publicMethod.isSelectedObj(null, commonData.types[1]);


                    if (commonData.firstSetMore) {
                        publicMethod.initSopModal();
                    }
                    if (!getAllSops) {
                        //$("#sop-modal").pshow();        //To Modify
                    }

                    //取消复选框勾选状态
                    setTimeout(function () {
                        if (getAllSops) {
                            $('.sel-all').addClass('sel-span');
                            publicMethod.toggleSameClassCriterias(commonData.publicModel.sopCriteria.brandsArr, 'selectedBrands', false);
                            publicMethod.toggleSameClassCriterias(commonData.publicModel.sopCriteria.order_type, 'selectedOrder_type', false, 'code');
                            publicMethod.toggleSameClassCriterias(commonData.publicModel.sopCriteria.fit_objs, 'selectedFit_objs', false, 'obj_id');
                            publicMethod.toggleSameClassCriterias(commonData.publicModel.sopCriteria.labelsArr, 'selectedLabels', false);


                            publicMethod.hideCollapseBtns();
                        }
                    }, 0);
                }
            },
            error: function (err) {
            },
            complete: function () {
                $('#globalloading').phide();
            }
        });
    },
    /*sop详细信息*/
    querySopDetailById: function (sop, obj) {/**/
        $('#globalloading').pshow();
        pajax.post({
            url: 'restSopService/querySopDetailById',
            data: obj,
            success: function (result) {
                var data = result ? result : {};
                commonData.publicModel.detailSopData = data;
            },
            error: function (err) {
                $("#globalnotice").pshow({text: '查询sop详情失败', state: "failure"});
            },
            complete: function () {
                $('#globalloading').phide();
            }
        });
    },
    //创建页sop详情，工单类型--all查询
    /*getOrderTypeList: function() { //查询工单类型列表
     pajax.post({
     url: 'restGeneralDictService/queryGeneralDictByKey',
     data: {
     dict_type: "work_order_type"
     },
     success: function(res) {
     var _data = res && res.data ? res.data : [];
     commonData.publicModel.detailSopOrderList = _data;

     },
     error: function(error) {

     },

     complete: function() {
     // $("#globalloading").phide();
     }
     });
     },*/
    queryInfoPointForObject: function (obj, jqInfoPointPop, keyword) {

        commonData.publicModel.infoArray = [];
        $('#globalloading').pshow();
        commonData.publicModel.selectedObj = obj;
        commonData.publicModel.searchResultLength = null;
        var keywordArr = keyword ? keyword.split(' ') : [];
        var keywordNum = 0;
        for (var i = 0; i < keywordArr.length; i++) {
            if (keywordArr[i]) keywordNum++;
        }
        commonData.keyword_num = keywordNum;
        pajax.post({
            url: 'restObjectService/queryInfoPointForObject',
            data: {
                obj_id: obj.obj_id,
                // obj_type: commonData.publicModel.curObjType || obj.obj_type,
                obj_type: obj.obj_type || commonData.publicModel.curObjType,
                keyword: keyword
            },
            success: function (result) {
                var data = result && result.data ? result.data : [];
                //data = JSON.parse(JSON.stringify(infoPointList));
                var info_points = commonData.infoPoint_obj.info_points || [];
                if (commonData.belongChoosedObj) {
                    for (var i = 0; i < data.length; i++) {
                        var checked = false;
                        for (var j = 0; j < info_points.length; j++) {
                            if (data[i].id === info_points[j].id) {
                                checked = true;
                                break;
                            }
                        }
                        if (checked) data[i].checked = true;
                    }
                }
                commonData.publicModel.infoArray = data;
                // commonData.publicModel.curLevelList = data;
                commonData.publicModel.searchResultLength = data.length;
                if (commonData.jqPopDataDivsInfo.length) {
                    if (commonData.publicModel.searchResultLength) {
                        publicMethod.setCurPopInfo(0)
                    } else {
                        publicMethod.setCurPopInfo(2)
                    }
                }
                // commonData.jqPopDataDivs2
                // jqPopDataDivs
                // if (jqInfoPointPop) {
                //     jqInfoPointPop.find('.infoPointKeyword').val('');
                //     jqInfoPointPop.show();
                // }
                /*if (commonData.publicModel.objAddInfo===1 && commonData.publicModel.domElement) {//添加信息點彈窗並且點擊搜索
                 if (!commonData.publicModel.searchResultLength) {
                 $(commonData.publicModel.domElement).parents(".list-search").next().find(".list-body").hide().siblings().show();
                 } else {
                 $(commonData.publicModel.domElement).parents(".list-search").next().find(".only-checkbox").show().siblings().hide();
                 commonData.publicModel.curObjType = ""
                 }
                 } else if(commonData.publicModel.objAddInfo===1 && !commonData.publicModel.domElement){//添加信息點彈窗並且不是點擊的搜索
                 if (jqInfoPointPop) jqInfoPointPop.show();
                 if (!commonData.publicModel.searchResultLength) {
                 $(jqInfoPointPop).find(".list-body").hide().siblings().show();
                 } else {
                 $(jqInfoPointPop).find(".list-body").show().siblings().hide();
                 $(jqInfoPointPop).find(".only-checkbox").show().siblings().hide();
                 // commonData.publicModel.curObjType = ""
                 }
                 }else{
                 if (jqInfoPointPop) jqInfoPointPop.show();
                 }*/
                // if (jqInfoPointPop) jqInfoPointPop.show();
                commonData.publicModel.isCustomizeBtnAble = true;

            },
            error: function (err) {
            },
            complete: function () {
                $('#globalloading').phide();
            }
        });
    },
    //搜索信息点
    searchInfoPoint: function (dom) {
        commonData.click_search_button = '1';
        $('#globalloading').pshow();
        commonData.publicModel.curObjType = 'search';
        // commonData.publicModel.curObjType2 = 'infoPoint';
        // $(dom).parents(".aite-bubble").find(".timely-checkbox").show().siblings().hide();
        var keyword = $(dom).parents('.info-search-box').find('input').val();
        var keywordArr = keyword ? keyword.split(' ') : [];
        var keywordNum = 0;
        for (var i = 0; i < keywordArr.length; i++) {
            if (keywordArr[i]) keywordNum++;
        }
        commonData.keyword_num = keywordNum;
        pajax.post({
            url: 'restObjectService/searchInfoPoint',
            data: {
                keyword: keyword
            },
            success: function (result) {
                var data = result && result.data ? result.data : [];
                var keywordArr = keyword.split(' ');
                for (var i = 0; i < data.length; i++) {
                    var item = data[i];
                    if (item.parents) {
                        for (var j = 0; j < item.parents.length; j++) {
                            var item1 = item.parents[j];
                            item1.linked_names = item1.parent_names.join('>') + '>' + item.obj_name;
                        }

                    }
                    if (item.info_point.name) {
                        for (var j = 0; j < keywordArr.length; j++) {
                            var singleKeyword = keywordArr[j];
                            if (!singleKeyword) continue;
                            item.info_point.name_arr = publicMethod.strToMarkedArr(item.info_point.name, singleKeyword, item.info_point.name_arr);
                        }
                    }
                }
                commonData.publicModel.curLevelList = data;
                commonData.publicModel.searchResultLength = data.length;

                if (!commonData.publicModel.searchResultLength) {//搜索无数据
                    publicMethod.setCurPop2(4, true);
                    // $(dom).parents(".list-search").next().find(".nodata-box").show().siblings().hide()
                } else {//搜索有数据
                    publicMethod.setCurPop2(2, true);
                    // $(dom).parents(".list-search").next().find(".nodata-box").hide().siblings().show()
                }

                publicMethod.isSelectedInfoPoint()

            },
            error: function (err) {
            },
            complete: function () {
                $('#globalloading').phide();
            }
        });
    },

    //12-0、验证自定义对象是否已经存在
    existTempObject: function (obj, isConfirmCustomizeObj, isShowPop, type, call) {
        pajax.post({
            url: 'restObjectService/existTempObjectWithType',
            data: obj,
            success: function (result) {
                var data = result ? result : {};
                if (!data.exist && typeof call == 'function') {
                    call();
                } else {
                    if (commonData.publicModel.inputToCustomize) {
                        commonData.publicModel.inputToCustomizeNameRepeat = true;
                        var contentData;
                        contentData = publicMethod.getContentData(type);
                        var endIndex = commonData.text1.length && commonData.text1[commonData.text1.length - 1] == ' ' ? commonData.text1.length - 1 : commonData.text1.length;
                        commonData.text1 = commonData.text1.slice(0, endIndex);
                        commonData.text2 = ' ' + commonData.text2;
                        contentData.content[contentData.attrName1] = commonData.text1 + commonData.text2;
                        publicMethod.setCurPop(3, type);
                        setTimeout(function () {
                            publicMethod.setCaretPosition(commonData.editingJqTextwrap[0], commonData.text1.length);
                        }, 0);
                    } else {
                        var jqPopDataDivs = commonData.editingJqTextwrap.parents(".textarea-div").find(".free-aite-pops").children();
                        var curJqPopDataDiv = $(jqPopDataDivs[3]);
                        curJqPopDataDiv.find('.customText').children().eq(1).pshowTextTip('名称不允许重复');
                    }
                }
            },
            error: function (error) {
            },
            complete: function () {
            }
        });
    },

    //12、添加自定义对象
    addTempObjectWithType: function (obj, isConfirmCustomizeObj, isShowPop, type) {
        pajax.post({
            url: 'restObjectService/addTempObjectWithType',
            data: obj,
            success: function (result) {
                var data = result ? result : {};
                obj.obj_id = data.obj_id;
                obj.isCustomized = true;
                publicMethod.addedTempObjectWithType(obj, isConfirmCustomizeObj, isShowPop, type);
            },
            error: function (err) {
            },
            complete: function () {
            }
        });
    },
    //搜索物理世界对象
    searchObject: function (keyword, notShowPop, moveToBeforeSpace) {
        $('#globalloading').pshow();
        commonData.notShowPop = false;
        pajax.post({
            url: 'restObjectService/searchObject',
            data: {
                keyword: keyword
            },
            success: function (result) {
                var data = result && result.data ? result.data : [];
                var type = commonData.publicModel.addContentWindow ? commonData.types[3] : commonData.types[0];
                if (!notShowPop) {
                    if (!commonData.notShowPop) {
                        var value = keyword;
                        for (var i = 0; i < data.length; i++) {
                            var item = data[i];
                            if (item.obj_name) item.obj_name_arr = publicMethod.strToMarkedArr(item.obj_name, value);
                            if (item.parents) {
                                for (var j = 0; j < item.parents.length; j++) {
                                    var item1 = item.parents[j];

                                    item1.linked_names = item1.parent_names.join('>');
                                    if (item1.linked_names) item1.linked_names_arr = publicMethod.strToMarkedArr(item1.linked_names, value);
                                }
                            }
                        }

                        //判断输入的对象是否能匹配搜索结果列表中的某个对象，可以在弹窗关闭时再进行判断
                        //publicMethod.isMatchExistingObj(keyword, data);

                        //createSopModel.searchedObjectList = data;
                        commonData.publicModel.curLevelList = data;
                        commonData.publicModel.curObjType = 'search';
                        //publicMethod.updateObjs();
                        if (data.length) {
                            publicMethod.setCurPop(0, type, null, moveToBeforeSpace);
                        } else {        //无匹配的结果时转换为自定义形式
                            commonData.publicModel.inputToCustomize = true;
                            publicMethod.setCurPop(3, type, null, moveToBeforeSpace);
                        }
                        publicMethod.isSelectedObj(null, type);
                        //publicMethod.locationPop(commonData.textwrap, commonData.textdiv, commonData.textareapop, commonData.text);     //定位
                        publicMethod.locationPop(null, type);
                    }
                } else {
                    commonData.publicModel.curLevelList = data;
                    var customizeObj = true;
                    for (var i = 0; i < data.length; i++) {
                        var item = data[i];
                        if (keyword == item.obj_name) {
                            //添加自定义对象
                            customizeObj = false;
                            break;
                        }
                    }
                    if (customizeObj) {
                        console.log('输入了一个空格，结束对象输入，该对象为自定义对象');
                        var objName = keyword;
                        var obj = {
                            user_id: commonData.user_id,
                            project_id: commonData.project_id,
                            obj_type: '1',
                            obj_name: objName
                        }
                        myWorkOrderController.existTempObject(obj, true, null, type, function () {
                            myWorkOrderController.addTempObjectWithType(obj, true, null, type);
                        });
                    } else {
                        console.log('输入了一个空格，结束对象输入，该对象可匹配到物理世界的对象');

                        if (type == commonData.types[3]) {
                            var contentData = publicMethod.getContentData(type);
                            var content = contentData.content;

                            //设置需确认的操作结果对象
                            var confirm_result = content.confirm_result || [];
                            var objTypes = ['system', 'equip', 'other', 'component', '2'];
                            if (objTypes.indexOf(data[i].obj_type) > -1) {
                                var belong = false;
                                for (var j = 0; j < confirm_result.length; j++) {
                                    if (data[i].obj_id == confirm_result[j].obj_id) {
                                        belong = true;
                                        break;
                                    }
                                }
                                if (!belong) {
                                    confirm_result.push(JSON.parse(JSON.stringify(data[i])));
                                    if ($('.contentResult').find('.edit-div').is(':visible')) {
                                        $('.contentResult').find('.edit-div').hide();
                                        $('.contentResult').find('.clear-div').show();
                                    }
                                }
                            }
                            $('.confirmSlideBody').show();      //$('.confirmSlideBody').slideDown();
                        }
                        if (type == commonData.types[0]) {
                            commonData.publicModel.allMatters[commonData.curMatterIndex].disableObjBtn = false;
                        } else {
                            commonData.publicModel.workContent.disableObjBtn = false;
                        }
                        var type1 = type == commonData.types[1] ? type : commonData.types[0];
                        publicMethod.updateObjs(0, keyword, type, type1, data[i]);
                    }
                }
            },
            error: function (err) {
            },
            complete: function () {
                $('#globalloading').phide();
            }
        });
    },
    //------------------------------------------yn__end------------------------------------------

}
