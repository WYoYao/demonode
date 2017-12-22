var model = {

    /******BEGIN: Same With MyWorkOrder******/
    //------------------------------------------zy__start------------------------------------------
    orderDetailData: {}, //工单详情
    curPage: '',
    curObjType: "",
    curObjType2: "",
    orderOperatList: [],
    personPositionList: [],
    selectedTool: [],
    toolList: [],
    stop_order_content: '',
    planObjExampleArr: [],

    allMatters: [{
        //"matter_name": "未命名事项-1",
        "description": "",
        "desc_forepart": "",
        "desc_aftpart": "",
        "desc_photos": [],
        "desc_objs": [],
        "desc_sops": [],
        "desc_works": [],
        "required_control": [],
        "unMatchedSopList": [],
        "invalidObjList": [],
        "invalidSopList": [],
        "ignoredErrArr": []
    }], //所有的事项
    curMatterPopType: 4, //当前事项弹框类型，0-4为选择或搜索对象弹框，0搜索，1选择大类结果无级别，2选择大类结果有左侧级别，3自定义，4选择大类
    curContent: {}, //当前工作内容
    inputToCustomize: false, //是否为输入未匹配时展开自定义列表
    popShow: false, //pop弹框是否显示
    inputToCustomizeNameRepeat: false, //输入转为自定义时自定义名称是否重复
    //------------------------------------------zy__end------------------------------------------

    //------------------------------------------yn__start------------------------------------------
    //vue绑定的数据data
    LorC: true, //列表页或者新建页
    workAlready: [{
        id: "0",
        name: "草稿箱"
    }, {
        id: "1",
        name: "我发布的工单"
    }, {
        id: "2",
        name: "我参与的工单"
    }],
    workAlreadyID: "",
    workTypeL: [], //工单类型,列表页
    workTypeC: [], //工单类型，创建页
    del_plan_id: "", //方案计划id
    pageNum: 1,
    nScrollHight: 0, //滚动的距离
    temList: [], //存储工单
    workList: [], //工单
    urgency: [ //工单紧急程度
        {
            id: "0",
            name: "低"
        }, {
            id: "1",
            name: "中"
        }, {
            id: "2",
            name: "高"
        }
    ],
    fixedRadio: true, //要求固定时间完成
    starTimeType: [ //要求开始时间执行类型
        {
            id: "1",
            name: "发单后立即开始"
        }, {
            id: "2",
            name: "自定义开始时间"
        }
    ],
    timeTypeSel: true, //要求开始时间类型
    starYear: null,
    endYear: null,
    regular: false, //结构化输入
    editBtn: true, //编辑或清空

    controlsList: [
        { name: "普通文本", type: "1" },
        { name: "单选", type: "2" },
        { name: "多选", type: "3" },
        { name: "无单位的数字", type: "4" },
        { name: "有单位的数字", type: "5" }
    ],
    focusContent: false,
    contentItemAttrNames: ['pre_conform', 'content', 'notice', 'confirm_result', 'domain'],
    emptyContent: { //空的工作内容
        editContent: true,
        "from_sop": false,
        "pre_conform": "",
        "content": "",
        "content_objs": [],
        "notice": "",
        "confirm_result": [],
        "confirm_result_copy": [],
        "domain": ""
    },
    description: "",
    preContent: "",
    domainList: [], //设备实例下专业需求
    systemList: [], //系统专业下所有系统
    treeList: [{
        name: "建筑名称1",
        id: "1",
        child: [{
            name: "1层",
            id: "1-1",
            child: []
        }, {
            name: "2层",
            id: "1-2",
            child: [{
                name: "空间名称1",
                id: "1-2-1",
                child: []
            }, {
                name: "空间名称2",
                id: "1-2-2",
                child: []
            }]
        },]
    },
    {
        name: "建筑名称2",
        id: "2",
        child: [{
            name: "1层",
            id: "1-1",
            child: []
        }, {
            name: "2层",
            id: "1-2",
            child: [{
                name: "空间名称1",
                id: "1-2-1",
                child: []
            }, {
                name: "空间名称2",
                id: "1-2-2",
                child: []
            }]
        },]
    },
    ],
    ask_end_limit: "", //要求固定时间完成
    aite: true,
    buildList: [], //建筑体
    leftLevel: [], //楼层通用设备
    sopList: [], //sop列表
    sopCriteria: {}, //筛选条件
    addContentWindow: false, //添加工作内容
    detailSopShow: false, //sop详细内容展现
    detailSopData: {}, //sop详细内容
    curLevelList: [], //当前有级别列表
    //lastLevel: [],
    clickAiteShow: false,
    clickHashShow: false,
    workOrderDraft: {}, //工单草稿内容
    matters: [], //步骤信息,事项
    singleMatters: {}, //单步事项
    desc_works: [], //工作中设计的工作内容
    workContent: {}, //工作内容
    infoArray: [], //信息点list
    seltype: null,
    desc_forepart: "",

    popTitleText: {
        init: '分类',
        search: '请选择',
        custom: '自定义',
        build: '建筑',
        floor: '楼层',
        space: '房间',
        system: '系统',
        equip: '设备',
    },
    popTitleText2: {
        init: '分类',
        search: '搜索',
        custom: '自定义',
        infoPoint: '信息点'
    },
    matterSignalid: "", //事项标识
    mattersVip: null, //打开的事项
    customs: [], //自定义项列表
    customItem: { items: [] }, //自定义项
    isCustomizeBtnAble: false, //自定义按钮是否able

    singleMatters: {
        matter_name: "", //事项名称
        description: "", //事项描述
        desc_forepart: "", //描述内容前段,结构化时用
        desc_aftpart: "", //描述内容后段,结构化时用
        desc_photos: [], //描述中的图片
        desc_sops: [], //描述中涉及的sop
        desc_works: [], //描述中涉及的工作内容
    },

    workContent: {
        work_id: "", //工作内容id
        work_name: "", //工作内容名称
        pre_conform: "", //强制确认
        content: "", //操作内容
        //操作内容中涉及的对象
        content_objs: [],
        notice: "", //注意事项
        confirm_result: [], //需确认的操作结果
        confirm_result_copy: [], //需确认的操作结果复制
        domain: "", //专业code
        domain_name: "", //专业名称
        selectedObj: {}, //选择信息点 对象列表已选择的对象

    },
    noPop: null, //点击添加对象和信息点是否需要textarea处prop
    selectedObjType: "", //自定义选中对象类别
    blurClose: null,
    textareaOperate: null,
    selSeriesType: '', //添加信息点中对自定义之前的curObjType的记录
    Published: null, //f发布列表页
    searchResultLength: null, //关键字搜索结果
    del_matter_index: '', //删除事项的索引记录
    s_e: false, //开始时间与结束时间的比较
    s_n: false, //开始时间与当前时间的比较
    workTypecError: '', //创建页工单类型为必填
    curSelectedDomain: {}, //当前选择的专业
    curSelectedSystem: {}, //当前选择的系统
    aiteTips: "", //aite 弹窗自定义中的提示
    sopCheckArr: [], //查看sop详情记录数组
    professionalObj: {}, //专业转换键值存储
    postNum: 0, //点击sop请求次数
    detailSopOrderList: [], //创建页sop详情需要的工单类型列表
    fixlimit: false, //固定时间期限，判定
    createrights: false, //创建权限的判定
    userInfo: {}, //人员信息
    vm: null,
    //------------------------------------------yn__end------------------------------------------
    /******END: Same With MyWorkOrder******/

    pages: [ //所有页面导航
        "listCommon", //计划列表
        "planMonitor_scraplist", //计划作废列表
        "planMonitor_scrapDetail", //计划作废详情
        "oldOrderRecordList", //历史记录列表
        "see_palnDetail", //查看计划详情
        "see_orderDetail", //查看工单详情
        "planCreate", //创建计划
        "planCreate_next", //下一步
    ],
    goBackFlag: '', //工单详情返回标记
    curPage: 'listCommon', //当前页面
    //user_id: '1', //用户id 暂时使用
    //project_id: '1', //项目id  暂时使用
    plan_id: '', //计划id
    orderStateList: [], //工单状态列表
    choiceOrderType: {}, //选择的工单状态
    buttonMenus: [{}],
    listTitlePlanName: '', //列表表头类型名称
    listTitlePlanRaceType: '', //列表频率类型
    prevDayDate: [], //上个月天数
    currDayDate: [], //当前月天数
    nextDayDate: [], //下个月天数
    M_currMonth: '', //当前月份
    year: '', //当前年
    tableListDay: [], //列表表格(每日)默认数据
    renderTableListDay: [], //列表表格(每日)渲染
    renderTableListCommon: [], //列表表格年月日渲染
    rightTab_liWidth: '', //每个单元格的宽
    scrapListArr: [], //作废列表数据
    scrapPlanDetail: {}, //作废计划详情
    orderList: [], //工单类型表
    oldOrderList: [], //过去的工单记录列表
    orderStateList: [], //工单状态列表
    choiceOrderType: {}, //工单类型
    historyRecordList: [], //历史记录列表
    planDetailData: {}, //计划详情
    orderDetailData: {}, //工单详情
    orderOperatList: [], //工单操作列表
    orderStateList_img: [], //工单状态列表用于列表中解析对应图标
    cycleListData: [
        { name: "每日", type: "d" },
        { name: "每周", type: "w" },
        { name: "每月", type: "m" },
        { name: "每年", type: "y" }
    ],
    cycleType: "d", //列表周期记录  
    //计划创建
    orderLevelList: [ //工单紧急程度
        { name: "高" },
        { name: "中" },
        { name: "低" }
    ],
    planRateLeft: [
        { name: "年" },
        { name: "月" },
        { name: "周" },
        { name: "日" },

    ], //计划频率年月周天
    planRateRig: [],
    rateYear: '', //年频率数
    rateMonth: '', //月频率数
    rateWeek: '', //周频率数
    rateDay: '', //日频率数
    weekChoice_List: [ //选择星期列表
        { name: "周一" },
        { name: "周二" },
        { name: "周三" },
        { name: "周四" },
        { name: "周五" },
        { name: "周六" },
        { name: "周日" }
    ],
    effectTime_startList: [ //生效时间
        {
            name: "发布成功后立即",

        }, {
            name: "自定义"
        }
    ],
    effectTime_endList: [{
        name: "一直有效",

    }, {
        name: "自定义"
    }],
    seePlanId: '', //查看计划id
    orderTypeObj: { code: "1", name: "" }, //工单类型列表存
    newPlanObj: { //新建计划提交对象
        plan_name: '', //计划名称
        order_type: '', //工单类型code,
        urgency: '', //紧急程度,高、中、低
        ahead_create_time: '', //提前创建工单时间
        freq_cycle: '', //ymwd周期
        freq_num: '', //计划频率次数
        freq_times: [], //计划频率-时间
        plan_start_type: '', //计划开始时间1,发布成功立即2,指定时间
        plan_start_time: '', //开始时间
        plan_end_time: '', //结束时间
        draft_matters: [], //工单事项数组草稿matters
        published_matters: [], //工单事项数组，预览matters

    },
    newPlan_frequencyArr: [], //创建计划频率开始结束时间
    newPlan_startTime: "", //创建计划计划开始时间
    newPlan_endTime: "", //创建计划计划结束时间
    planCreateDetail: [], //计划创建预览matters
    _save_major: '', //专业存储
    _save_system: '', //系统存储
    planObjExampleArr: [], //对象实例数组
    toolList: [], //工具列表
    selectedTool: [], //工具存储数组
    personPositionList: [], //人员岗位列表
    editOrderType: '', //编辑工单类型
    stop_order_content: "", //中止内容
    choiceObjectExample: { //选择对象实例存储层级结构索引
        "index1": "",
        "index2": "",
        "index3": "",
        "index4": ""
    }, //新建计划
    goBackAddressNum: '', //新建计划返回地址记录 新建1编辑2
    choiceObjectFlag: false, //选择对象实例标记

}

var methods = {
    openScrapDetail: function (planId) { //打开作废计划详情
        model.plan_id = planId;
        controller.getScrapDetail(planId);
    },
    scrapDetailGoBack: function () { //作废详情页返回
        this.curPage = this.pages[1];
        model.scrapPlanDetail = {};
    },
    createNewPlan: function (num) { //创建计划
        var _index = $("#navBar").psel() ? $("#navBar").psel() : 0;
        model.orderTypeCode = model.buttonMenus[_index].order_type;
        model.orderTypeName = model.buttonMenus[_index].name;
        model.orderTypeIndex = model.buttonMenus[_index].plan_index;
        var date = new Date();
        var _year = date.getFullYear();
        var _month = date.getMonth() + 1;
        var _date = date.getDate();
        var _hour = date.getHours();
        var _minute = date.getMinutes();
        var _second = date.getSeconds();
        $("#plan_name").precover(); //计划名称
        $("#orderUrgency").precover("低");
        $("#aheadCreateTime").precover();
        $("#planRateLeft").precover("请选择");
        $("#planRateLeft >div").pdisable(false); //启用计划频率类型
        $("#planRateRig").precover("请选择");
        $("#choice_planStartTime").pdisable(false);
        $("#choice_planStartTime").precover("发布成功后立即");
        $("#choice_planEndTime").precover("一直有效");
        $("#plan_startTime").psel({ y: _year, M: _month, d: _date, h: _hour, m: _minute });
        $("#plan_endTime").psel({ y: _year, M: _month, d: _date, h: _hour, m: _minute });
        $("#plan_startTime").hide();
        $("#plan_endTime").hide();
        model.rateYear = "";
        model.rateMonth = "";
        model.rateWeek = "";
        model.rateDay = "";
        model.seePlanId = "";
        commonData.publicModel.allMatters = []; //初始化计划新建右侧
        publicMethod.addMatter();
        commonData.ignoredErrorList = [];
        model.goBackAddressNum = num;
        this.curPage = this.pages[6];
        myWorkOrderController.queryUserWoInputMode();
    },
    editNewPlan: function () { //编辑计划

    },
    choiceOrderFn: function (modelData, event) { //过去发出的作废工单切换选项
        this.choiceTimerType = modelData;
        var orderState = event.pEventAttr.currItem.code;
        // var page = 1;
        // var pageSize = 50;
        var data = {
            // user_id: userId,
            // project_id: projectId,
            plan_id: model.plan_id,
            order_state: orderState,
            // page: page,
            // page_size: pageSize
        };
        controller.getOldOrderList(data)
    },

    scrapModalHide: function () { //作废模态框隐藏
        $("#scrapModal").phide();
    },
    historyModalShow: function () { //历史记录侧弹框显示
        controller.getHistoryRecordList();
    },
    orderRecordListShow: function (planId) { //作废历史记录列表
        controller.getOrderStateList(); //获取工单状态列表
        model.planId = planId; //进入过去发出的工单列表页存储
        var orderState = model.choiceOrderType.code || '';
        var page = 1;
        var pageSize = 50;
        var data = {
            plan_id: model.plan_id,
            order_state: orderState,
            page: page,
            page_size: pageSize
        };
        controller.getOldOrderList(data)
    },
    oldRecordGoBack: function () { //历史工单记录返回
        model.planId = '';
        model.oldOrderList = '';
        this.curPage = this.pages[2];

    },
    goBackPlanList: function () { //返回计划列表
        var num = model.goBackAddressNum;
        if (num == 1) {
            this.curPage = this.pages[0];
            model.scrapListArr = [];
            model.seePlanId = "";
            model.planDetailData = {}; //返回清空计划详情数据
        } else if (num == 2) {
            var _id = model.seePlanId;
            methods.seePlanDetailShow(_id);
        } else {
            this.curPage = this.pages[0];
        }

        $("#planRateLeft >div").pdisable(false); //启用计划频率
        $("#plan_name").precover(); //重置计划名称
        $("#aheadCreateTime").precover(); //重置工单提前发送时间
        $("#choiceStPlanTime_error").hide();
        $("#choiceStPlanTimeSt_error").hide();
        $("#choicePlanTime_error").hide();
        $("#choice_planStartTime").pdisable(false);
    },
    detailGoBackPlanList: function () { //计划详情返回列表
        this.curPage = this.pages[0];
        model.seePlanId = "";
        model.scrapListArr = [];
        $("#planRateLeft >div").pdisable(false); //启用计划频率
        $("#plan_name").precover(); //重置计划名称
        $("#aheadCreateTime").precover(); //重置工单提前发送时间
    },
    clickScrapPlan: function () { //作废提示框显示
        $("#scrapModal").pshow();
    },
    clickEditPlan: function (num) { //点击修改计划
        model.goBackAddressNum = num;
        commonData.ignoredErrorList = [];
        commonData.publicModel.allMatters = model.planDetailData.draft_matters;
        var planDetailObj = model.planDetailData;
        $("#planRateLeft >div").pdisable(true); //禁用计划频率类型
        // console.log(JSON.stringify(planDetailObj));
        this.curPage = this.pages[6];
        //设置计划相关信息
        $("#plan_name").pval(planDetailObj.plan_name); //计划名称
        model.orderTypeName = planDetailObj.order_type_name + '计划';
        $("#orderUrgency").psel(planDetailObj.urgency);
        $("#aheadCreateTime").pval(planDetailObj.ahead_create_time);
        var _arrLength = planDetailObj.freq_times.length;
        if (planDetailObj.freq_cycle == 'y') { //年
            $("#planRateLeft").psel('年');
            model.rateYear = _arrLength;
        } else if (planDetailObj.freq_cycle == 'm') { //月
            $("#planRateLeft").psel('月');
            model.rateMonth = _arrLength;

        } else if (planDetailObj.freq_cycle == 'w') { //周
            $("#planRateLeft").psel('周');
            model.rateWeek = _arrLength;

        } else if (planDetailObj.freq_cycle == 'd') { //日
            $("#planRateLeft").psel('日');
            model.rateDay = _arrLength;

        }
        var _num = planDetailObj.freq_num;
        // console.log(_num.toString())
        setTimeout(function () {
            $("#planRateRig").psel(_num.toString(), false); //频率

        }, 0);
        //设置计划频率时间开始
        setTimeout(function () {
            if (planDetailObj.freq_cycle == 'y') { //年
                var _arr = planDetailObj.freq_times;
                var _newArr = [];
                for (var i = 0; i < _arr.length; i++) {
                    var _stM = _arr[i].start_time.time_day.substr(0, 2);
                    var _std = _arr[i].start_time.time_day.substr(2, 2);
                    var _sth = _arr[i].start_time.time_hour;
                    var _stm = _arr[i].start_time.time_minute;
                    var _etM = _arr[i].end_time.time_day.substr(0, 2);
                    var _etd = _arr[i].end_time.time_day.substr(2, 2);
                    var _eth = _arr[i].end_time.time_hour;
                    var _etm = _arr[i].end_time.time_minute;
                    _newArr.push({ st: { M: _stM, d: _std, h: _sth, m: _stm }, et: { M: _etM, d: _etd, h: _eth, m: _etm } })
                    $("#yearStartTime" + i).psel({ M: _stM, d: _std, h: _sth, m: _stm });
                    $("#yearEndTime" + i).psel({ M: _etM, d: _etd, h: _eth, m: _etm });
                }
                // console.log(_newArr);
            } else if (planDetailObj.freq_cycle == 'm') { //月
                var _arr = planDetailObj.freq_times;
                var _newArr = [];
                for (var i = 0; i < _arr.length; i++) {
                    var _std = _arr[i].start_time.time_day;
                    var _sth = _arr[i].start_time.time_hour;
                    var _stm = _arr[i].start_time.time_minute;
                    var _etd = _arr[i].end_time.time_day;
                    var _eth = _arr[i].end_time.time_hour;
                    var _etm = _arr[i].end_time.time_minute;
                    _newArr.push({ st: { d: _std, h: _sth, m: _stm }, et: { d: _etd, h: _eth, m: _etm } })
                    $("#monthStartTime" + i).psel({ d: _std, h: _sth, m: _stm });
                    $("#monthEndTime" + i).psel({ d: _etd, h: _eth, m: _etm });
                }

            } else if (planDetailObj.freq_cycle == 'w') { //周
                var _arr = planDetailObj.freq_times;
                var _newArr = [];
                for (var i = 0; i < _arr.length; i++) {
                    var _std = methods.filter_weekDetail_trans(_arr[i].start_time.time_day);
                    var _sth = _arr[i].start_time.time_hour;
                    var _stm = _arr[i].start_time.time_minute;
                    var _etd = methods.filter_weekDetail_trans(_arr[i].end_time.time_day);
                    var _eth = _arr[i].end_time.time_hour;
                    var _etm = _arr[i].end_time.time_minute;
                    _newArr.push({ st: { d: _std, h: _sth, m: _stm }, et: { d: _etd, h: _eth, m: _etm } })
                    $("#weekChoiceList_prev" + i).psel(_std);
                    $("#weekChoiceList_next" + i).psel(_etd);
                    $("#weekStartTime" + i).psel({ h: _sth, m: _stm });
                    $("#weekEndTime" + i).psel({ h: _eth, m: _etm });
                }


            } else if (planDetailObj.freq_cycle == 'd') { //日
                var _arr = planDetailObj.freq_times;
                var _newArr = [];
                for (var i = 0; i < _arr.length; i++) {
                    var _sth = _arr[i].start_time.time_hour;
                    var _stm = _arr[i].start_time.time_minute;
                    var _eth = _arr[i].end_time.time_hour;
                    var _etm = _arr[i].end_time.time_minute;
                    _newArr.push({ st: { h: _sth, m: _stm }, et: { h: _eth, m: _etm } })
                    $("#dayStartTime" + i).psel({ h: _sth, m: _stm });
                    $("#dayEndTime" + i).psel({ h: _eth, m: _etm });
                }

            }
        }, 100);
        //设置计划频率时间结束

        //设置计划开始时间//11.22修改交互，修改计划时，需要将计划开始时间修改为当前时间的第二天作为开始时间
        $("#choice_planStartTime").psel("自定义");
        $("#plan_startTime >div").pshow();
        $("#choice_planStartTime").pdisable(true);
        $("#choiceStPlanTime_error").hide();
        $("#choiceStPlanTimeSt_error").hide();
        $("#choicePlanTime_error").hide();
        var _date = new Date();
        var currStr;
        var trans_currStr;
        var _currStr;
        if (planDetailObj.plan_start_type == '2') { //自定义时间
            var str = planDetailObj.plan_start_time;
            var currPlanStr = str.substr(0, 4) + '-' + str.substr(4, 2) + "-" + str.substr(6, 2) + ' ' + str.substr(8, 2) + ':' + str.substr(10, 2) + ':' + str.substr(12, 2); //转成年-月-日（计划开始时间）
            var _currPlanStr = Date.parse(new Date(currPlanStr));
            currStr = _date.getFullYear() + "-" + (_date.getMonth() + 1) + "-" + _date.getDate() + " " + "00:00:00"; //当前时间
            _currStr = Date.parse(new Date(currStr)) + 86400000; //当前时间转化成时间戳 + 1
            if (_currPlanStr >= _currStr) { //判断如果计划时间大于当前开始时间的隔天就取计划时间，否则取当前时间+1
                trans_currStr = str; //转成年-月-日

            } else {
                trans_currStr = methods.tranY_M_D(_currStr) + "000000";
            }

        } else {
            currStr = _date.getFullYear() + "-" + (_date.getMonth() + 1) + "-" + _date.getDate() + " " + "00:00:00"; //立即开始时间取当前时间
            _currStr = Date.parse(new Date(currStr)) + 86400000;
            trans_currStr = methods.tranY_M_D(_currStr) + "000000";
        }
        setTimeout(function () {
            $("#plan_startTime >div").psel({
                y: trans_currStr.substr(0, 4),
                M: trans_currStr.substr(4, 2),
                d: trans_currStr.substr(6, 2),
                h: trans_currStr.substr(8, 2),
                m: trans_currStr.substr(10, 2)
            }, 0)
            $("#plan_endTime >div").psel({
                y: trans_currStr.substr(0, 4),
                M: trans_currStr.substr(4, 2),
                d: trans_currStr.substr(6, 2),
                h: trans_currStr.substr(8, 2),
                m: trans_currStr.substr(10, 2)
            }, 0)
        });
        // if (planDetailObj.plan_start_type == '2') {
        //     $("#choice_planStartTime").psel("自定义");
        //     $("#plan_startTime >div").pshow();
        //     setTimeout(function () {
        //         var str = planDetailObj.plan_start_time;
        //         $("#plan_startTime >div").psel({
        //             y: str.substr(0, 4),
        //             M: str.substr(4, 2),
        //             d: str.substr(6, 2),
        //             h: str.substr(8, 2),
        //             m: str.substr(10, 2)
        //         })
        //     });

        // } else {
        //     $("#choice_planStartTime").psel("发布成功后立即");
        //     $("#plan_startTime>div").phide();
        // }
        //设置计划结束时间
        if (planDetailObj.plan_end_time != "") {
            $("#choice_planEndTime").psel("自定义");
            $("#plan_endTime >div").pshow();
            setTimeout(function () {
                var str = planDetailObj.plan_end_time;
                $("#plan_endTime>div").psel({
                    y: str.substr(0, 4),
                    M: str.substr(4, 2),
                    d: str.substr(6, 2),
                    h: str.substr(8, 2),
                    m: str.substr(10, 2)
                })

            }, 100)
        } else {
            $("#choice_planEndTime").psel("一直有效");
            $("#plan_endTime >div").phide();
        }
        myWorkOrderController.queryUserWoInputMode();

    },
    //*tab切换
    tabChange: function (model, event) {
        var _this = this;
        var vueModel = window.model;
        var _index = event.pEventAttr.index;
        var plan_name;
        plan_name = vueModel.buttonMenus[_index].name;
        vueModel.listTitlePlanName = plan_name;
        $("#sop_name_search1").pval("");
        _this.getListMonthDate(null, null, null);
    },
    mGetDate: function (_year, _month) { //获取每个月天数
        // console.log(_year)
        var d = new Date(_year, _month, 0);
        return d.getDate();
    },

    getListMonthDate: function (_year, _month, order_type) { //获取当前月和上下月天数
        var _this = this;
        var date = new Date();
        if (_year) {
            model.year = _year;
        }
        if (!model.year) {
            model.year = date.getFullYear();
        }
        var year = model.year ? model.year : date.getFullYear();
        var currMonth = date.getMonth() + 1;
        if (_month) {
            model.M_currMonth = _month;
        } else {
            model.M_currMonth = currMonth;
        }
        var prevMonthLength = {};
        var currMonthLength = {};
        var nextMonthLength = {};
        // 11 12 1 model.year = 2017
        // 12 1 2 model.year = 2018
        // 判断上月
        if (_month) {
            prevMonthLength["length"] = _month - 1 > 0 ? _this.mGetDate(year, _month - 1) : _this.mGetDate(year - 1, _month + 11);
            prevMonthLength["month"] = _month - 1 > 0 ? _month - 1 : _month + 11;
            if (_month - 1 == '0') {
                prevMonthLength["year"] = year - 1;
            } else {
                prevMonthLength["year"] = year;
            }
        } else {
            prevMonthLength["length"] = currMonth - 1 > 0 ? _this.mGetDate(year, currMonth - 1) : _this.mGetDate(year - 1, currMonth + 11);
            prevMonthLength["month"] = currMonth - 1 > 0 ? currMonth - 1 : currMonth + 11;
            if (currMonth - 1 == '0') {
                prevMonthLength["year"] = year - 1;
            } else {
                prevMonthLength["year"] = year;
            }

        };
        //当前月
        if (_month) {
            currMonthLength["length"] = _this.mGetDate(year, _month);
            currMonthLength["month"] = _month;
            currMonthLength["year"] = year;
        } else {
            currMonthLength["length"] = _this.mGetDate(year, currMonth);
            currMonthLength["month"] = currMonth;
            currMonthLength["year"] = year;
        }
        //判断下月
        if (_month) {
            nextMonthLength["length"] = _month + 1 < 13 ? _this.mGetDate(year, _month + 1) : _this.mGetDate(year + 1, _month - 11);
            nextMonthLength["month"] = _month + 1 < 13 ? _month + 1 : _month - 11;
            if (_month - 12 == '0') {
                nextMonthLength["year"] = year + 1;
            } else {
                nextMonthLength["year"] = year;
            }
        } else {
            nextMonthLength["length"] = currMonth + 1 < 13 ? _this.mGetDate(year, currMonth + 1) : _this.mGetDate(year + 1, currMonth - 11)
            nextMonthLength["month"] = currMonth + 1 < 13 ? currMonth + 1 : currMonth - 11;
            if (currMonth - 12 == '0') {
                nextMonthLength["year"] = year + 1;
            } else {
                nextMonthLength["year"] = year;
            }

        }

        //console.log(prevMonthLength,currMonthLength,nextMonthLength);
        var prevArr = [];
        var currArr = [];
        var nextArr = [];
        //上月
        for (var i = 0; i < prevMonthLength.length; i++) {
            prevArr.push({
                "year": prevMonthLength.year,
                "month": prevMonthLength.month,
                "day": i + 1,
                "markDay": (prevMonthLength.year) + "" + (prevMonthLength.month < 10 ? "0" + prevMonthLength.month : prevMonthLength.month) + "" + (i + 1)
            })
        };
        //当前月
        for (var j = 0; j < currMonthLength.length; j++) {
            currArr.push({
                "year": currMonthLength.year,
                "month": currMonthLength.month,
                "day": j + 1,
                "markDay": (currMonthLength.year) + "" + (currMonthLength.month < 10 ? "0" + currMonthLength.month : currMonthLength.month) + "" + (j < 9 ? "0" + (j + 1) : j + 1)
            })
        };
        //下月
        for (var k = 0; k < nextMonthLength.length; k++) {
            nextArr.push({
                "year": nextMonthLength.year,
                "month": nextMonthLength.month,
                "day": k + 1,
                "markDay": (nextMonthLength.year) + "" + (nextMonthLength.month < 10 ? "0" + nextMonthLength.month : nextMonthLength.month) + "" + (k < 9 ? "0" + (k + 1) : k + 1)
            })
        };
        var newPrevArr = prevArr.slice(prevMonthLength.length - 2);
        var newNextArr = nextArr.slice(0, 2);
        //console.log(newPrevArr[0].markDay,newNextArr[newNextArr.length-1].markDay);
        var _startTime = newPrevArr[0].markDay + "000000"; //获取开始时间
        var _endTime = newNextArr[newNextArr.length - 1].markDay + "235959"; //获取结束时间
        // 设置列表内天数
        // _this.prevDayDate = newPrevArr;
        var toDayArr = newPrevArr.concat(currArr, newNextArr)
        model.currDayDate = JSON.parse(JSON.stringify(toDayArr));
        var emptyTableListDay = JSON.parse(JSON.stringify(toDayArr));
        model.tableListDay = emptyTableListDay.map(function (info) {
            info.day = "";
            return info
        });

        function setLiStyle() {
            var liWidth = $(".searchList_table_title_date").width() / model.currDayDate.length;
            var liLength = toDayArr.length;


            var totalWdith = $(".searchList_table_title_date").width();
            var prevWidth = liWidth.toFixed(2) * 2;
            var nextWidth = liWidth.toFixed(2) * 2;
            var currWidth = totalWdith - prevWidth - nextWidth;
            // console.log(liLength+"++++++++++++"+totalWdith/liLength);
            $("#searchList_top_prevMonth").width(prevWidth - 1); //上月
            $("#searchList_top_nextMonth").width(nextWidth - 1); //下月
            $("#searchList_top_currMonth").width(currWidth); //当前月
            model.rightTab_liWidth = (totalWdith / liLength).toFixed(2);
            Vue.nextTick(function () {
                $("#searchList_bott_currMonth >ul >li").css("width", totalWdith / liLength);
            })
        }

        // setTimeout(function () {
        //     $("#searchList_bott_currMonth >ul >li").css("width", totalWdith / liLength);

        // }, 0);
        var cycleType = model.cycleType; //判断请求的频率类型，
        var _index = $("#navBar").psel() ? $("#navBar").psel() : 0;
        var orderType = order_type ? order_type : model.buttonMenus[_index].order_type ? model.buttonMenus[_index].order_type : '1';
        var planName = $("#sop_name_search1 input").val();
        // var startTime = _startTime;
        // var endTime = _endTime;
        var _data = {
            // user_id: model.user_id,
            // project_id: model.project_id,
            order_type: orderType,
            plan_name: planName,
            freq_cycle: model.cycleType,
            start_time: _startTime,
            end_time: _endTime
        };
        // console.log(JSON.stringify(_data))
        if (cycleType == "d") {

            controller.getPlanListDay(_data, setLiStyle); //频率类型为天的
        } else {
            controller.getPlanListCommon(_data, setLiStyle); //频率类型为年、月、周
        }


    },
    getListMonth: function () { //获取当前月和上下月份
        var _this = this;
        var date = new Date();
        var currMonth = date.getMonth() + 1
        _this.currMonth = currMonth;
    },
    searchPrevMonth: function (event) { //切换上一月数据
        var _this = this;
        var prev = parseInt($(event.target).text());
        // console.log(prev);
        if (prev == 12) {
            model.year--;
        }
        _this.getListMonthDate(null, prev);
    },
    searchNextMonth: function (event) { //切换下一月数据
        var _this = this;
        var next = parseInt($(event.target).text());
        // console.log(next);
        if (next == 1) {
            model.year++;
        }
        _this.getListMonthDate(null, next);
    },
    openScrapList: function (num) { //打开作废计划列表
        model.goBackAddressNum = num;
        model.curPage = model.pages[1];
        var _index = $("#navBar").psel();
        var state = model.buttonMenus[_index].order_type;
        var orderType = state || '';
        controller.getScrapList(orderType);
    },
    arrTransfString: function (arr, key) { //数组对象转字符串通用
        var str = '';
        var newArr = [];
        arr.forEach(function (item) {
            newArr.push(item[key])
        });
        return str = newArr.join(" ")
    },

    transfYMWD: function (str) { //通过年月周天转换对应的中文
        var obj = {
            y: "年",
            m: "月",
            w: "周",
            d: "日",
        }
        return obj[str]
    },

    seePlanDetailShow: function (planId) { //查看计划详情
        model.seePlanId = planId; //计划id存储
        model.orderTypeIndex = $("#navBar").psel();
        controller.getPlanDetailById(planId);
        if (planId) {
            model.curPage = model.pages[4];

        }
    },
    scrapBtnYes: function () { //确定作废
        controller.getScrapOperat();
    },
    clickSeeOrderDetail: function (order_id) { //点击列表内工单列表查看工单详情
        var _index = $("#navBar").psel();
        var state = model.buttonMenus[_index].order_type;
        var fn = function () {
            model.curPage = model.pages[0];
            setTimeout(function () {
                methods.getListMonthDate(null, null, state.toString());
            }, 500);
        }
        if (order_id != "" && order_id != "--" && order_id != undefined) {
            orderDetail_pub.getOrderDetail(model, order_id, "2", fn);

        }
    },
    cycleTabChange: function (type, _name) { //列表内周期tab切换
        var type = type || '';
        this.cycleType = type;
        $("#sop_name_search1").precover('', false);
        model.listTitlePlanRaceType = _name;
        if (type == 'd') {
            $("#searchList_table_day").show();
            $("#searchList_table_common").hide();
            var date = new Date();
            var _year = date.getFullYear();
            this.getListMonthDate(_year, null);
            // controller.getPlanListDay(); //计划列表（日）
        } else {
            $("#searchList_table_day").hide();
            $("#searchList_table_common").show();
            var date = new Date();
            var _year = date.getFullYear();
            this.getListMonthDate(_year, null);
            // controller.getPlanListCommon();
        }
    },
    tranY_M_D: function formatDate(obj) {
        var date = new Date(obj);
        var y = 1900 + date.getYear();
        var m = "0" + (date.getMonth() + 1);
        var d = "0" + date.getDate();
        return y + "" + m.substring(m.length - 2, m.length) + "" + d.substring(d.length - 2, d.length);
    },
    filterItemByKeyValue: function (list, key, value) { //数组过滤key,value
        function fltbyName(con, item) {
            if (item[key] == value) con = item;
            return con;
        }

        return list.reduce(fltbyName);
    },

    setYMWD_type: function (pp_model, e) { //设置频率类型
        var rateType = pp_model.name;
        model.rateMonth = ''; //月频率数
        model.rateWeek = ''; //周频率数
        model.rateDay = ''; //日频率数
        model.rateYear = '';
        $("#planRateRig").precover("请选择");
        if (rateType == '年') { //年频率数
            model.planRateRig = [];
            for (var i = 1; i <= 24; i++) { //限定年频率数修改为最大24次
                model.planRateRig.push({ "name": i });
            };

        } else if (rateType == '月') {
            model.planRateRig = [];
            for (var i = 1; i <= 31; i++) {
                model.planRateRig.push({ "name": i }); //月频率数
            };

        } else if (rateType == '周') {
            model.planRateRig = [];
            for (var i = 1; i <= 7; i++) { //周频率数
                model.planRateRig.push({ "name": i });
            };

        } else if (rateType == '日') {
            model.planRateRig = [];
            for (var i = 1; i <= 12; i++) { //频率数
                model.planRateRig.push({ "name": i });
            };

        }

        // console.log(JSON.stringify(pmodel))
        // console.log(JSON.stringify(model.rateYear))
    },

    set_RateNum: function (pp_model, e, type) { //设置频率次数
        var planId = model.seePlanId;
        if (!planId) {
            var rateType = $("#planRateLeft").psel().text;
            var rateTime = pp_model.name;
            // console.log(rateTime)
            // console.log(rateType)
            if (rateType == '年') {
                model.rateYear = rateTime;
                model.rateMonth = ''; //月频率数
                model.rateWeek = ''; //周频率数
                model.rateDay = ''; //日频率数
                setTimeout(function () {
                    for (var i = 0; i < rateTime; i++) {
                        $("#yearStartTime" + i).psel({ M: "01", d: "01", h: "00", m: "00" });
                        $("#yearEndTime" + i).psel({ M: "01", d: "01", h: "00", m: "00" });
                    }
                }, 0);


            } else if (rateType == '月') {
                model.rateYear = '';
                model.rateMonth = rateTime; //月频率数
                model.rateWeek = ''; //周频率数
                model.rateDay = ''; //日频率数
                setTimeout(function () {
                    for (var i = 0; i < rateTime; i++) {
                        $("#monthStartTime" + i).psel({ d: "01", h: "00", m: "00" });
                        $("#monthEndTime" + i).psel({ d: "01", h: "00", m: "00" });
                    }
                }, 0);
            } else if (rateType == '周') {
                model.rateYear = '';
                model.rateMonth = ''; //月频率数
                model.rateWeek = rateTime; //周频率数
                model.rateDay = ''; //日频率数
                setTimeout(function () {
                    for (var i = 0; i < rateTime; i++) {
                        $("#weekStartTime" + i).psel({ w: "01", h: "00", m: "00" });
                        $("#weekEndTime" + i).psel({ w: "01", h: "00", m: "00" });
                    }
                }, 0)
            } else if (rateType == '日') {
                model.rateYear = '';
                model.rateMonth = ''; //月频率数
                model.rateWeek = ''; //周频率数
                model.rateDay = rateTime; //日频率数
                setTimeout(function () {
                    for (var i = 0; i < rateTime; i++) {
                        $("#dayStartTime" + i).psel({ h: "00", m: "00" });
                        $("#dayEndTime" + i).psel({ h: "00", m: "00" });
                    }
                }, 0)
            }
        } else {
            if (type == 'change') {
                var rateType = $("#planRateLeft").psel().text;
                var rateTime = pp_model.name;
                // console.log(rateTime)
                // console.log(rateType)
                if (rateType == '年') {
                    model.rateYear = rateTime;
                    model.rateMonth = ''; //月频率数
                    model.rateWeek = ''; //周频率数
                    model.rateDay = ''; //日频率数
                    setTimeout(function () {
                        for (var i = 0; i < rateTime; i++) {
                            $("#yearStartTime" + i).psel({ M: "01", d: "01", h: "00", m: "00" });
                            $("#yearEndTime" + i).psel({ M: "01", d: "01", h: "00", m: "00" });
                        }
                    }, 0);


                } else if (rateType == '月') {
                    model.rateYear = '';
                    model.rateMonth = rateTime; //月频率数
                    model.rateWeek = ''; //周频率数
                    model.rateDay = ''; //日频率数
                    setTimeout(function () {
                        for (var i = 0; i < rateTime; i++) {
                            $("#monthStartTime" + i).psel({ d: "01", h: "00", m: "00" });
                            $("#monthEndTime" + i).psel({ d: "01", h: "00", m: "00" });
                        }
                    }, 0);
                } else if (rateType == '周') {
                    model.rateYear = '';
                    model.rateMonth = ''; //月频率数
                    model.rateWeek = rateTime; //周频率数
                    model.rateDay = ''; //日频率数
                    setTimeout(function () {
                        for (var i = 0; i < rateTime; i++) {
                            $("#weekStartTime" + i).psel({ w: "01", h: "00", m: "00" });
                            $("#weekEndTime" + i).psel({ w: "01", h: "00", m: "00" });
                        }
                    }, 0)
                } else if (rateType == '日') {
                    model.rateYear = '';
                    model.rateMonth = ''; //月频率数
                    model.rateWeek = ''; //周频率数
                    model.rateDay = rateTime; //日频率数
                    setTimeout(function () {
                        for (var i = 0; i < rateTime; i++) {
                            $("#dayStartTime" + i).psel({ h: "00", m: "00" });
                            $("#dayEndTime" + i).psel({ h: "00", m: "00" });
                        }
                    }, 0)
                }
            }

        }

    },
    goBackPlanCreate: function () { //返回计划创建
        this.curPage = this.pages[6];
    },
    next_btn_step: function () { //下一步
        model.newPlanObj.plan_name = $("#plan_name").pval(); //计划名称
        model.newPlanObj.order_type = model.orderTypeCode; //工单类型code
        model.newPlanObj.urgency = $("#orderUrgency").psel().text || '低';
        model.newPlanObj.ahead_create_time = $("#aheadCreateTime").pval();
        var freqCycle = $("#planRateLeft").psel().text;
        // console.log(freqCycle);
        var freqTimes = []; //存储计划频率每一次的时间
        if (freqCycle == "年") {
            model.newPlan_frequencyArr = [];
            model.newPlanObj.freq_cycle = "y";
            var yearArr = [];
            var arrLength = model.rateYear;
            // console.log(arrLength);
            for (var i = 0; i < arrLength; i++) {
                //开始时间
                var st_str = $("#yearStartTime" + i).psel().startTime;
                var st_yM = st_str.substr(0, 2) + st_str.substr(3, 2);
                var st_h = st_str.substr(6, 2);
                var st_m = st_str.substr(9, 2);
                var obj_st = {
                    cycle: "y",
                    time_day: st_yM,
                    time_hour: st_h,
                    time_minute: st_m
                };
                // 结束时间
                var ed_str = $("#yearEndTime" + i).psel().startTime;
                var ed_yM = ed_str.substr(0, 2) + ed_str.substr(3, 2);
                var ed_h = ed_str.substr(6, 2);
                var ed_m = ed_str.substr(9, 2);
                var obj_et = {
                    cycle: "y",
                    time_day: ed_yM,
                    time_hour: ed_h,
                    time_minute: ed_m
                };
                yearArr.push({ start_time: obj_st, end_time: obj_et });
                model.newPlan_frequencyArr.push({ //组装年时间显示
                    st: st_yM.substr(0, 2) + '.' + st_yM.substr(2, 2) + ' ' + st_h + ':' + st_m,
                    et: ed_yM.substr(0, 2) + '.' + ed_yM.substr(2, 2) + ' ' + ed_h + ':' + ed_m
                });
            };
            model.newPlanObj.freq_times = yearArr;
            // console.log(JSON.stringify(yearArr));
        } else if (freqCycle == "月") {
            model.newPlanObj.freq_cycle = "m";
            model.newPlan_frequencyArr = [];
            var monthArr = [];
            var arrLength = model.rateMonth;
            for (var i = 0; i < arrLength; i++) {
                //开始时间
                var st_str = $("#monthStartTime" + i).psel().startTime;
                var st_d = st_str.substr(0, 2);
                var st_h = st_str.substr(3, 2);
                var st_m = st_str.substr(6, 2);
                var obj_st = {
                    cycle: "m",
                    time_day: st_d,
                    time_hour: st_h,
                    time_minute: st_m
                };
                // 结束时间
                var ed_str = $("#monthEndTime" + i).psel().startTime;
                var ed_d = ed_str.substr(0, 2);
                var ed_h = ed_str.substr(3, 2);
                var ed_m = ed_str.substr(6, 2);
                var obj_et = {
                    cycle: "m",
                    time_day: ed_d,
                    time_hour: ed_h,
                    time_minute: ed_m
                };
                monthArr.push({ start_time: obj_st, end_time: obj_et });
                model.newPlan_frequencyArr.push({ //组装月份时间显示
                    st: st_d + ' ' + st_h + ':' + st_m,
                    et: ed_d + ' ' + ed_h + ':' + ed_m
                });
            };
            model.newPlanObj.freq_times = monthArr;
            // console.log(JSON.stringify(monthArr));
        } else if (freqCycle == "周") {
            model.newPlanObj.freq_cycle = "w";
            model.newPlan_frequencyArr = [];
            var weekArr = [];
            var arrLength = model.rateWeek;
            for (var i = 0; i < arrLength; i++) {
                //开始时间
                var st_str = $("#weekStartTime" + i).psel().startTime;
                var st_dz = $("#weekChoiceList_prev" + i).psel().text || '周一'; //周开始中文显示
                var st_d = methods.filter_weekDetail($("#weekChoiceList_prev" + i).psel().text) || '1';
                var st_h = st_str.substr(0, 2);
                var st_m = st_str.substr(3, 2);
                var obj_st = {
                    cycle: "w",
                    time_day: st_d,
                    time_hour: st_h,
                    time_minute: st_m
                };
                //结束时间
                var ed_str = $("#weekEndTime" + i).psel().startTime;
                var ed_dz = $("#weekChoiceList_next" + i).psel().text || '周一'; //周结束中文显示
                var ed_d = methods.filter_weekDetail($("#weekChoiceList_next" + i).psel().text) || '1';
                var ed_h = ed_str.substr(0, 2);
                var ed_m = ed_str.substr(3, 2);
                var obj_et = {
                    cycle: "w",
                    time_day: ed_d,
                    time_hour: ed_h,
                    time_minute: ed_m
                };
                weekArr.push({ start_time: obj_st, end_time: obj_et });
                model.newPlan_frequencyArr.push({
                    st: st_dz + ' ' + st_h + ':' + st_m,
                    et: ed_dz + ' ' + ed_h + ':' + ed_m
                });
                // console.log(JSON.stringify(weekArr))
            };
            model.newPlanObj.freq_times = weekArr;

        } else if (freqCycle == "日") {
            model.newPlanObj.freq_cycle = "d";
            model.newPlan_frequencyArr = [];
            var dayArr = [];
            var arrLength = model.rateDay;
            for (var i = 0; i < arrLength; i++) {
                //开始时间
                var st_str = $("#dayStartTime" + i).psel().startTime;
                // var st_d = st_str.substr(0,2);
                var st_d = '';

                var st_h = st_str.substr(0, 2);
                var st_m = st_str.substr(3, 2);
                var obj_st = {
                    cycle: "d",
                    time_day: "1",
                    time_hour: st_h,
                    time_minute: st_m
                };
                // 结束时间
                var ed_str = $("#dayEndTime" + i).psel().startTime;
                // var ed_d = ed_str.substr(0,2);
                var ed_d = '';

                var ed_h = ed_str.substr(0, 2);
                var ed_m = ed_str.substr(3, 2);
                var obj_et = {
                    cycle: "d",
                    time_day: "1",
                    time_hour: ed_h,
                    time_minute: ed_m
                };
                dayArr.push({ start_time: obj_st, end_time: obj_et });
                model.newPlan_frequencyArr.push({
                    st: st_h + ':' + st_m,
                    et: ed_h + ':' + ed_m
                });
            };
            model.newPlanObj.freq_times = dayArr;
            // console.log(JSON.stringify(dayArr));

        }
        model.newPlanObj.freq_num = $("#planRateRig").psel().text; //计划频率
        var choiceSt = $("#choice_planStartTime").psel().text || '发布成功后立即';
        var choiceEt = $("#choice_planEndTime").psel().text || '一直有效';
        if (choiceSt == '发布成功后立即') { //判断选择开始时间类型
            model.newPlanObj.plan_start_type = "1"; //计划开始类型
            model.newPlanObj.plan_start_time = ""; //计划开始时间
        } else {
            var str = $("#plan_startTime >div").psel().startTime;
            model.newPlanObj.plan_start_type = "2"; //计划开始类型
            var newStr = str.substr(0, 4) + str.substr(5, 2) + str.substr(8, 2) + str.substr(11, 2) + str.substr(14, 2) + '00';
            model.newPlanObj.plan_start_time = newStr; //计划开始时间
        };

        if (choiceEt == '一直有效') { //判断选择结束时间类型
            model.newPlanObj.plan_end_time = ""; //计划结束时间
        } else {
            var str = $("#plan_endTime >div").psel().startTime;
            var newStr = str.substr(0, 4) + str.substr(5, 2) + str.substr(8, 2) + str.substr(11, 2) + str.substr(14, 2) + '00';
            model.newPlanObj.plan_end_time = newStr; //计划结束时间
        };
        // console.log(JSON.stringify(model.newPlanObj))
        publicMethod.dealMattersParam();
        commonData.notPlanPage = false;
        publicMethod.verifyMatters(function () {
            publicMethod.dealMattersParam();
            var input_mode = commonData.publicModel.regular ? '2' : '1';
            var matters = commonData.publicModel.allMatters || []; //用于存储右侧操作后的结果数组

            model.newPlanObj.draft_matters = matters;
            var _data = {
                "draft_matters": matters,
                "input_mode": input_mode
            };
            var _nameCheck = $("#plan_name").pverifi(); //验证计划名称
            var _aheadCreateTimeCheck = $(".aheadCreateTime").pverifi(); //验证提前发送时间
            var _aheadTime = $("#aheadCreateTime").pval();
            var raceCheck = $("#planRateRig").psel().text; //验证频率
            var planId = model.seePlanId || '';
            if (planId) { //编辑
                choiceSt = $("#choice_planStartTime").psel().text || '自定义'; //开始时间默认值
                if (_nameCheck && _aheadCreateTimeCheck) {
                    if (_aheadTime == '') {
                        $("#aheadCreateTime").pshowTextTip('输入不能为空');
                        return;
                    } else {
                        if (_aheadTime >= 0 && _aheadTime <= 24) {
                            if (raceCheck) { //验证计划频率
                                $("#planRace_error").hide();
                                if (choiceSt) { //当前存在开始时间
                                    var plan_st = $("#plan_startTime >div").psel().startTime;
                                    $("#choiceStPlanTime_error").hide(); //开始时间小于当前时间的下一天提示hide
                                    $("#choicePlanTime_error").hide(); //开始时间大于结束时间提示
                                    var _date = new Date();
                                    var currStr;
                                    var trans_currStr;
                                    var plan_need_tran = new Date(plan_st).getTime(); //当前选择时间
                                    currStr = _date.getFullYear() + "-" + (_date.getMonth() + 1) + "-" + _date.getDate() + " " + "00:00:00";
                                    var plan_demand_time = Date.parse(new Date(currStr)) + 86400000; //要求开始时间

                                    if (choiceSt == '自定义' && choiceEt == '一直有效') {
                                        if (plan_need_tran < plan_demand_time) { //当前时间小于隔天开始时间
                                            $("#choiceStPlanTime_error").show();
                                            return;
                                        } else {

                                            controller.getPlanCreateNext(_data);
                                        }
                                    } else if (choiceSt == '自定义' && choiceEt == '自定义') {
                                        if (plan_need_tran < plan_demand_time) { //当前时间小于隔天开始时间
                                            $("#choiceStPlanTime_error").show();
                                            return;
                                        } else {
                                            var plan_st = $("#plan_startTime >div").psel().startTime;
                                            var plan_et = $("#plan_endTime >div").psel().startTime;
                                            var plan_st_tran = new Date(plan_st).getTime() + 6 * 1000;
                                            var plan_et_tran = new Date(plan_et).getTime();
                                            if (plan_st_tran > plan_et_tran) {
                                                $("#choicePlanTime_error").show();
                                            } else {
                                                controller.getPlanCreateNext(_data);
                                            }
                                        }

                                    }
                                }
                                
                            } else {
                                $("#planRace_error").show();
                            }
                        } else {
                            $("#publishNotice").pshow({ text: '提前发送时间需小于24小时', state: "failure" });
                        }
                    }


                } else {
                    $("#publishNotice").pshow({ text: '缺少必填项，请完善', state: "failure" });
                }
            } else { //新建
                if (_nameCheck && _aheadCreateTimeCheck) {
                    if (_aheadTime == '') {//提前发送时间为空验证
                        $("#aheadCreateTime").pshowTextTip('输入不能为空');
                        return;
                    } else {
                        if (_aheadTime >= 0 && _aheadTime <= 24) {
                            if (raceCheck) { //验证计划频率
                                $("#planRace_error").hide();
                                $("#choiceStPlanTimeSt_error").hide();
                                if (choiceSt == '自定义') { //12-06增加开始时间验证为需大于当前时间
                                    var _st = $("#plan_startTime >div").psel().startTime;
                                    var _currTime = Date.parse(new Date());
                                    var _tran_st = Date.parse(new Date(_st));
                                    if (_currTime > _tran_st) { //小于当前时间提示
                                        $("#choiceStPlanTimeSt_error").show();
                                        return;
                                    }
                                }
                                if (choiceSt == '发布成功后立即' || choiceEt == '一直有效') {
                                    controller.getPlanCreateNext(_data);
                                } else if (choiceSt == '自定义' && choiceEt == '自定义') { //判断自定义时间处理类型
                                    var plan_st = $("#plan_startTime >div").psel().startTime;
                                    var plan_et = $("#plan_endTime >div").psel().startTime;
                                    var plan_st_tran = new Date(plan_st).getTime() + 6 * 1000;
                                    var plan_et_tran = new Date(plan_et).getTime();
                                    if (plan_st_tran > plan_et_tran) {
                                        $("#choicePlanTime_error").show();
                                    } else {
                                        controller.getPlanCreateNext(_data);
                                    }

                                }

                            } else {
                                $("#planRace_error").show();
                            }
                        } else {
                            $("#publishNotice").pshow({ text: '提前发送时间需小于24小时', state: "failure" });
                        }
                    }


                } else {
                    $("#publishNotice").pshow({ text: '缺少必填项，请完善', state: "failure" });
                }
            }

        });


    },
    filter_weekDetail: function (str) {
        var obj = {
            "周一": 1,
            "周二": 2,
            "周三": 3,
            "周四": 4,
            "周五": 5,
            "周六": 6,
            "周日": 7,
        };
        return obj[str]
    },
    filter_weekDetail_trans: function (str) {
        var obj = {
            "01": "周一",
            "02": "周二",
            "03": "周三",
            "04": "周四",
            "05": "周五",
            "06": "周六",
            "07": "周日",
        };
        return obj[str]
    },
    plan_startTime_show: function (pp_model, e) { //12-06增加开始时间默认值为当前时间的下一天        // console.log(pp_model.name, e);
        if (pp_model.name == '自定义') {
            $("#plan_startTime").show();
            var date = new Date();
            var _year = date.getFullYear();
            var _month = date.getMonth() + 1;
            var _date = date.getDate();
            var str = _year + '-' + _month + '-' + _date;
            var tran_str = Date.parse(new Date(str)) + (24 * 60 * 60 * 1000); //转换成时间戳 + 1天
            var re_tran_str = new Date(tran_str).format('yyyy-MM-dd'); //转成普通时间
            var t_year = re_tran_str.substr(0, 4);
            var t_month = re_tran_str.substr(5, 2);
            var t_date = re_tran_str.substr(8, 2);
            setTimeout(function () {
                $("#plan_startTime").psel({ y: t_year, M: t_month, d: t_date, h: '00', m: '00' });
            })
        } else {
            $("#plan_startTime").hide();

        }
    },
    plan_endTime_show: function (pp_model, e) { //12-06增加结束时间默认值为当前时间的下一天 
        // console.log(pp_model.name, e);
        if (pp_model.name == '自定义') {
            $("#plan_endTime").show();
            var date = new Date();
            var _year = date.getFullYear();
            var _month = date.getMonth() + 1;
            var _date = date.getDate();
            var str = _year + '-' + _month + '-' + _date;
            var tran_str = Date.parse(new Date(str)) + (24 * 60 * 60 * 1000); //转换成时间戳 + 1天
            var re_tran_str = new Date(tran_str).format('yyyy-MM-dd'); //转成普通时间
            var t_year = re_tran_str.substr(0, 4);
            var t_month = re_tran_str.substr(5, 2);
            var t_date = re_tran_str.substr(8, 2);
            setTimeout(function () {
                $("#plan_endTime").psel({ y: t_year, M: t_month, d: t_date, h: '00', m: '00' });
            })
        } else {
            $("#plan_endTime").hide();

        }
    },
    choiceObjExample: function (_obj, event, objId, objType, index1, index2, index3, index4, _obj_id) { //选择对象实例
        var matter_objId = _obj_id || '';
        var _data = {
            obj_id: objId,
            obj_type: objType,
            matter_obj_id: matter_objId
        };
        // pub_model.obj_example = _obj;
        model.choiceObjectExample.index1 = index1;
        model.choiceObjectExample.index2 = index2;
        model.choiceObjectExample.index3 = index3;
        model.choiceObjectExample.index4 = index4;
        model._save_major = _obj.obj_name || '';
        var str = '';
        if (_obj.parents && _obj.parents.length > 0) {
            _obj.parents.forEach(function (item) {
                if (item.parent_names && item.parent_names.length > 0) {
                    item.parent_names.forEach(function (info, _index) {
                        if (_index < item.parent_names.length - 1) {
                            str += info + '-';
                        } else {
                            str += info;
                        }

                    })
                }
            })
        }

        model._save_system = str || '';
        // console.log(pub_model.obj_example);
        var _scrollTop = $(".see_planDetail_page_grid").scrollTop();
        var _left = $(event.target).offset().left + 120 + 'px';
        var _top = $(event.target).offset().top - '315' + _scrollTop + 'px';
        // console.log($(event.target).offset().top);
        $(".choiceObjExampleModal").css("left", _left);
        $(".choiceObjExampleModal").css("top", _top);
        controller.getObjExample(_data); //获取对象实例请求
    },
    choiceObjExampleYes: function () {

    },
    choiceObjExampleStatus: function (arr) { //设置选择对象实例状态
        var flag = false;
        if (!flag) {
            if (arr.length > 0) {
                arr.map(function (item) {
                    if (item.matter_steps.length > 0) {
                        item.matter_steps.map(function (info) {
                            if (info.steps.length > 0) {
                                info.steps.map(function (x) {
                                    if (x.confirm_result.length > 0) {
                                        x.confirm_result.map(function (y) {
                                            if (y.obj_type == 'system_class' || y.obj_type == 'equip_class') {
                                                flag = true;
                                                // return flag;
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }

                })
            }
        }
        return flag;

    },
    replaceObjExample: function (_obj) { //替换对象实例(创建计划下一步)
        // console.log(_obj)
        var index1 = model.choiceObjectExample.index1;
        var index2 = model.choiceObjectExample.index2;
        var index3 = model.choiceObjectExample.index3;
        var index4 = model.choiceObjectExample.index4;
        model.planCreateDetail[index1].matter_steps[index2].steps[index3].confirm_result[index4].obj_id = _obj.obj_id;
        model.planCreateDetail[index1].matter_steps[index2].steps[index3].confirm_result[index4].obj_name = _obj.obj_name;
        model.planCreateDetail[index1].matter_steps[index2].steps[index3].confirm_result[index4].obj_type = _obj.obj_type;
        model.planCreateDetail[index1].matter_steps[index2].steps[index3].confirm_result[index4].parents = _obj.parents;
        $(".choiceObjExampleModal").hide();
        model.choiceObjectFlag = methods.choiceObjExampleStatus(model.planCreateDetail);
    },
    publishPlanCreate: function () { //发布&编辑计划
        var planId = model.seePlanId || '';
        var flag = true;
        var planDetail = model.planCreateDetail;
        planDetail.map(function (item) { //判断设备实例中如果obj_type是'system_class'或'equip_class'不能发布
            item.matter_steps.map(function (info) {
                info.steps.map(function (x) {
                    if (x.step_type == '5') {
                        x.confirm_result.map(function (y) {
                            if (y.obj_type == 'system_class' || y.obj_type == 'equip_class') {
                                flag = false;
                            } else {

                            }
                        })
                    } else {

                    }
                })
            })
        });
        var input_mode = commonData.publicModel.regular ? '2' : '1';
        var _data = {
            // user_id: model.userId,
            // project_id: model.projectId,
            input_mode: input_mode, //自定义输入，结构化输入
            plan_name: model.newPlanObj.plan_name, //计划名称
            order_type: model.newPlanObj.order_type, //计划类型
            urgency: model.newPlanObj.urgency, //紧急程度
            ahead_create_time: Number(model.newPlanObj.ahead_create_time), //提前时间
            freq_cycle: model.newPlanObj.freq_cycle, //计划频率-周期
            freq_num: Number(model.newPlanObj.freq_num), //次数
            freq_times: model.newPlanObj.freq_times, //时间
            plan_start_type: model.newPlanObj.plan_start_type, //计划开始类型
            plan_start_time: model.newPlanObj.plan_start_time, //计划开始时间
            plan_end_time: model.newPlanObj.plan_end_time, //计划结束时间
            draft_matters: model.newPlanObj.draft_matters, //草稿matters
            published_matters: model.planCreateDetail, //预览后的matters
        };
        // console.log(JSON.stringify(_data));
        if (planId) {
            _data.plan_id = model.plan_id;
            _data.order_type = model.editOrderType;
            var planIndex = model.orderTypeIndex;
            var raceType = model.newPlanObj.freq_cycle; //计划类型
            if (flag) {
                controller.getEditOrderPlan(_data, planIndex, raceType); //编辑计划
            } else {
                $("#globalnotice").pshow({ text: "请选择设备对象实例后，再次发布", state: "failure" });
            }

        } else {
            var planIndex = model.orderTypeIndex;
            var raceType = model.newPlanObj.freq_cycle; //计划类型
            if (flag) {
                controller.getAddOrderPlan(_data, planIndex, raceType); //新建计划
            } else {
                $("#globalnotice").pshow({ text: "请选择设备对象实例后，再次发布", state: "failure" });
            }

        }
    },
    removePlanFn: function (str) { //删除工单类型中的最后两位
        var str = str || '';
        return str.substring(0, str.length - 2);
    },
    comparePlanEffect: function (str) { //与当前时间做比较，判断计划生效时间
        if (str != '') {
            var _st = orderDetail_pub.timeFormatting(str);
            var _st_tran = Date.parse(new Date(_st));
            var date = new Date();
            var _curr_t = Date.parse(new Date()); //当前时间
            if (_st_tran > _curr_t) {
                return 1;
            } else {
                return 2;
            }
        }

    },
    look_more_oldRecord: function (event, liLength) { //计划历史记录更多展开切换
        var flag = $(event.currentTarget)[0].innerText;
        var _length = liLength;
        if (flag == "更多") {
            $(event.currentTarget)[0].innerText = "收起";
            $(event.currentTarget).parent().parent().css("max-height", (_length * 20) + 'px');
        } else {
            $(event.currentTarget)[0].innerText = "更多";
            $(event.currentTarget).parent().parent().css("max-height", "60px");

        }
        // console.log($(event.currentTarget));
    },


}