var EquipPublicInfo = function () {
    return {
        "equip_id": "", //设备id,
        "equip_local_id": "", //设备本地编码
        "equip_local_name": "", //设备本地名称
        "BIMID": "", //BIM编码
        "position": "", //安装位置
        "equip_category_name": "", //设备类型名称
        "system_name": "", //所属系统名称
        "length": "", //长
        "width": "", //宽
        "height": "", //高
        "mass": "", //重量
        "material": "", //主体材质
        "dept": "", //所属部门
        "drawing": [ //设备图纸
            // {
            //     "type": "1", //附件类型，1-url，2-附件 {
            //     "name": "",
            //     "url": ""
            // },
        ],
        "picture": [], //设备照片
        "check_report": [ //质检报告
            // { //附件类型，1-url，2-附件 
            //     "type": "1",
            //     "name": "",
            //     "url": ""
            // },
        ],
        "nameplate": [], //铭牌照片
        "archive": [ //设备文档
            // { //附件类型，1-url，2-附件 
            //     "type": "1",
            //     "name": "",
            //     "url": ""
            // }
        ],
        "manufacturer": "", //生产厂家
        "brand": "", //设备品牌
        "product_date": "", //生产日期
        "serial_num": "", //出厂编号
        "specification": "", //设备型号
        "supplier": "", //供应商名称
        "supplier_phone": "", //供应商联系电话
        "supplier_contactor": "", //供应商联系人
        "supplier_web": "", //供应商网址
        "supplier_fax": "", //供应商传真
        "supplier_email": "", //供应商电子邮件
        "contract_id": "", //合同编号
        "asset_id": "", //资产编号
        "purchase_price": "", //采购价格
        "principal": "", //设备负责人
        "maintain_id": "", //维保编码
        "start_date": "", //投产日期
        "maintain_deadline": "", //合同截止日期
        "service_life": 0, //使用寿命
        "warranty": "", //设备保修期
        "maintain_cycle": 0, //保养周期
        "maintainer": "", //维修商单位名称
        "maintainer_phone": "", //维修商联系电话
        "maintainer_contactor": "", //维修商联系人
        "maintainer_web": "", //维修商网址
        "maintainer_fax": "", //维修商传真
        "maintainer_email": "", //维修商电子邮件
        // "status": "1", //投产状态，1-投产 ，2-未投产 ，3-其他
        "insurer": "", //保险公司
        "insurer_num": "", //保险单号
        "insurer_contactor": "", //保险联系人
        "insurer_phone": "", //保险联系电话
        "insurance_file": [ //保险文件
            // { //附件类型，1-url，2-附件 
            //     "type": "1",
            //     "name": "",
            //     "url": ""
            // }
        ]
    }
}

var CardInfo = function () {
    return {
        "equip_id": "", //设备id,
        "equip_qr_code": '', //设备二维码图片的key
        "card_info": [ //名片信息项
            {
                "info_point_code": "",
                "info_point_name": "",
                "value": ""
            },
        ]
    }
}


    ;
(function () {

    // 通过key 值获取对应的DOM   0文本框  1 下拉框 2 图片上传 3 文件上传 4 日历控件 5 多级联动下拉菜单(具体属性单独处理)
    var controlType;

    function querycontroTypeByKey(key) {

        if (!controlType) {
            controlType = {
                insurer: 1,
                insurer_num: 1,
                supplier: 1,
                contract_id: 0,
                asset_id: 0,
                purchase_price: 0,
                manufacturer: 1,
                brand: 1,
                product_date: 4,
                serial_num: 0,
                specification: 0,
                principal: 0,
                maintain_id: 0,
                start_date: 4,
                maintain_deadline: 4,
                service_life: 0,
                warranty: 0,
                maintain_cycle: 0,
                maintainer: 1,
                // status: 1,
                equip_local_name: 0,
                equip_local_id: 0,
                BIMID: 0,
                position: 5,
                system: 1,
                equip_category_name: 1,
                length: 0,
                width: 0,
                height: 0,
                mass: 0,
                material: 0,
                dept: 0,
                drawing: 3,
                picture: 2,
                check_report: 3,
                nameplate: 2,
                archive: 3,
            }
        }

        return controlType[key];

    }

    // 通过key 值获取对应的编辑数据   0 直接获取value  1 需要加 id 进行操作 2 需要获取附件
    function queryDataStuctTypeByKey(key) {

        var DataStuctType = {
            insurer: 1,
            insurer_num: 0,
            supplier: 1,
            contract_id: 0,
            asset_id: 0,
            purchase_price: 0,
            manufacturer: 1,
            brand: 0,
            product_date: 0,
            serial_num: 0,
            specification: 0,
            principal: 0,
            maintain_id: 0,
            start_date: 0,
            maintain_deadline: 0,
            service_life: 0,
            warranty: 0,
            maintain_cycle: 0,
            maintainer: 1,
            // status: 1,
            equip_local_name: 0,
            equip_local_id: 0,
            BIMID: 0,
            position: 4,
            system: 1,
            equip_category_name: 1,
            length: 0,
            width: 0,
            height: 0,
            mass: 0,
            material: 0,
            dept: 0,
            drawing: 3,
            picture: 2,
            check_report: 3,
            nameplate: 2,
            archive: 3,
        };

        return DataStuctType[key];
    }


    function querySearchNameByKey(key) {

        var SearchName = {
            insurer: {
                list: v.instance.insurerList,
                SearchKey: 'company_name',
            },
            insurer_num: {
                list: v.instance.insurer_infos,
                SearchKey: 'name',
            },
            supplier: {
                list: v.instance.supplierList,
                SearchKey: 'company_name',
            },
            manufacturer: {
                list: v.instance.manufacturerList,
                SearchKey: 'company_name',
            },
            brand: {
                list: v.instance.brands,
                SearchKey: 'name',
            },
            maintainer: {
                list: v.instance.maintainerList,
                SearchKey: 'company_name',
            },
            // status: {
            //     list: v.instance.statusList,
            //     SearchKey: 'code',
            // },
            position: {
                list: v.instance.Build2.content.length ? v.instance.Build2.content : (v.instance.Build1.content.length ? v.instance.Build1.content : v.instance.BuildFloorSpaceTree),
                SearchKey: 'obj_name',
            },
            system: {
                list: v.instance.SystemDomain,
                SearchKey: 'system_name',
            },
            equip_category_name: {
                list: v.instance.AllEquipCategory,
                SearchKey: 'name',
            },
        };

        return SearchName[key] || SearchName;
    };

    function recoverSearch(SearchName) {

        // 循环所有的下拉属性对应的赋值
        var key;
        for (key in SearchName) {
            if (SearchName.hasOwnProperty(key)) {
                var item = SearchName[key];

                //处理对应的下拉菜单属性赋值
                v.instance._clickStartChange(key);
            }
        }
    }


    var isPadding = false;

    v.pushComponent({
        name: 'equipmentMngDeatil',
        data: {
            layer: new layerModel(), // 全局共用弹窗
            equip_id: '', // 设备ID
            EquipInfo: new EquipPublicInfo(),
            EquipInfoBak: new EquipPublicInfo(),
            CardInfo: new CardInfo(),
            EquipDynamicInfo: [], // 通用信息点
            WorkOrderState: [], // 工单状态集合
            WorkOrderCode: '', // 选中的工单状态
            EquipRelWorkOrder: [], // 查询到的工单集合
            SystemDomain: [], // 所属系统
            AllEquipCategory: [], // 设备类型
            // 安装位置开始
            BuildFloorSpaceTree: [], //设备空间树  （安装位置）
            Build1: { // 新建下拉菜单中建筑的选择项
                content: [],
            },
            Build2: { // 新建下拉菜单中楼层的选择项
                content: [],
            },
            // 安装位置结束
            // 生产厂家 开始
            manufacturerList: [], // 生产厂家集合
            brands: [], // 品牌
            // 生产厂家 结束
            // 供应&购买 开始
            supplierList: [], // 供应商列表
            // 供应&购买 结束
            // 维保开始
            maintainerList: [], //维修商 集合
            // statusList: [{
            //     name: "投产",
            //     code: 1
            // }, {
            //     name: "未投产",
            //     code: 2
            // }, {
            //     name: "其他",
            //     code: 3
            // }],
            // 维保结束
            // 保险开始
            insurerList: [], // 保险公司集合
            insurer_infos: [], // 当前保险公司下的保险单号
            // 保险结束
            baseTab: 0, // 当前显示的Tab 选项栏
            view: {
                // 控制添加视图属性
                add: {
                    base: {
                        isSHowAddBlock: false,
                    },
                    factory: {
                        isSHowAddBlock: false,
                    },
                    buy: {
                        isSHowAddBlock: false,
                    },
                    maintenance: {
                        isSHowAddBlock: false,
                    },
                    insurance: {
                        isSHowAddBlock: false,
                    },
                },
                // 控制编辑的视图是否显示属性
                ide: {
                    equip_id: false,
                    equip_local_id: false,
                    equip_local_name: false,
                    BIMID: false,
                    position: false,
                    equip_category_name: false,
                    system: false,
                    length: false,
                    width: false,
                    height: false,
                    mass: false,
                    material: false,
                    dept: false,
                    drawing: false,
                    picture: false,
                    check_report: false,
                    nameplate: false,
                    archive: false,
                    manufacturer: false,
                    brand: false,
                    product_date: false,
                    serial_num: false,
                    specification: false,
                    supplier: false,
                    supplier_phone: false,
                    supplier_contactor: false,
                    supplier_web: false,
                    supplier_fax: false,
                    supplier_email: false,
                    contract_id: false,
                    asset_id: false,
                    purchase_price: false,
                    principal: false,
                    maintain_id: false,
                    start_date: false,
                    maintain_deadline: false,
                    service_life: false,
                    warranty: false,
                    maintain_cycle: false,
                    maintainer: false,
                    maintainer_phone: false,
                    maintainer_contactor: false,
                    maintainer_web: false,
                    maintainer_fax: false,
                    maintainer_email: false,
                    // status: false,
                    insurer: false,
                    insurer_num: false,
                    insurer_contactor: false,
                    insurer_phone: false,
                    insurance_file: false
                },
                scroll: [{
                    tag: '基础',
                    isSelected: true,
                }, {
                    tag: '厂家',
                    isSelected: false,
                }, {
                    tag: '供应&购买',
                    isSelected: false,
                }, {
                    tag: '运行&维保',
                    isSelected: false,
                }, {
                    tag: '保险',
                    isSelected: false,
                },]
            },
            showWorkOrder: false,
        },
        computed: {
            // 部门信息是否未空
            baseIsNull: function () {
                var keys = ['equip_local_name',
                    'BIMID',
                    'position',
                    'equip_category_name',
                    'system_name',
                    'length',
                    'width',
                    'height',
                    'mass',
                    'material',
                    'dept',
                    'drawing',
                    'picture',
                    'check_report',
                    'nameplate',
                    'archive'
                ];

                //返回验证是否全部为空
                return this.fev(this.EquipInfo, keys);

            },
            // 厂家信息是否未空
            factoryIsNull: function () {
                var keys = [
                    "manufacturer",
                    "brand",
                    "product_date",
                    "serial_num",
                    "specification"
                ];

                //返回验证是否全部为空
                return this.fev(this.EquipInfo, keys);
            },
            //供应&购买是否未空
            buyIsNull: function () {
                var keys = [
                    "supplier",
                    "supplier_phone",
                    "supplier_contactor",
                    "supplier_web",
                    "supplier_fax",
                    "supplier_email",
                    "contract_id",
                    "asset_id",
                    "purchase_price"
                ];

                //返回验证是否全部为空
                return this.fev(this.EquipInfo, keys);
            },
            //运行&维保是否未空
            maintenanceIsNull: function () {
                var keys = [
                    "principal",
                    "maintain_id",
                    "start_date",
                    "maintain_deadline",
                    "service_life",
                    "warranty",
                    "maintain_cycle",
                    "maintainer",
                    "maintainer_phone",
                    "maintainer_contactor",
                    "maintainer_web",
                    "maintainer_fax",
                    "maintainer_email",
                    // "status"
                ];

                //返回验证是否全部为空
                return this.fev(this.EquipInfo, keys);
            },
            //保险是否未空
            insuranceIsNull: function () {
                var keys = [
                    "insurer",
                    "insurer_num",
                    "insurer_contactor",
                    "insurer_phone",
                    "insurance_file"
                ];

                //返回验证是否全部为空
                return this.fev(this.EquipInfo, keys);
            },
            // 计算左边滚动轴
            scrollLeft: function () {
                var _that = this;
                return _that.covertHeight(_that.view.scroll, 60, 120, 60).map(function (item, index) {

                    return Object.assign({}, item, {
                        isSelected: _that.view.scroll[index].isSelected
                    });
                });
            },
            // 计算右边的滚动轴
            scrollRight: function () {
                var _that = this;
                return _that.covertHeight(_that.EquipDynamicInfo, 60, 120, 60).map(function (item, index) {

                    return Object.assign({}, item, {
                        isSelected: _that.EquipDynamicInfo[index].isSelected
                    });
                });
            },
        },
        filters: {

        },
        methods: {
            _clickInsertBack: function () {
                var _that = this;
                v.initPage("equipmentMng")
                _that.onPage = 'list';
            },
            // 前往工单详情
            _clickGoWorkBkDeatil: function (item) {
                var _that = this;

                _that.showWorkOrder = "wordorder";

                $("#detailBlock").hide();


                orderDetail_pub.getOrderDetail(v.instance, item.order_id, "1", function () {

                    _that.showWorkOrder = false;

                    $("#detailBlock").show();
                });
            },
            // 下载设备名片
            downloadCardInfo: function () {
                equipmentMngDeatilController.downloadCardInfo(this.equip_id);
            },
            // 固定位置的点击事件
            showPartIndex: function (align, index) {

                var _that = this;

                var el = align == "Left" ? $("#verticalAlxescontentA") : $("#verticalAlxescontentB");

                if (align == "Left") {

                    _that.view.scroll = _that.view.scroll.map(function (item, i) {

                        item.isSelected = index == i ? true : false;
                        return item;
                    });
                } else {

                    _that.EquipDynamicInfo = _that.EquipDynamicInfo.map(function (item, i) {

                        item.isSelected = index == i ? true : false;
                        return item;
                    });
                };

                el.find(".part").eq(index)[0].scrollIntoView();

            },
            // 滚动轴Start 跟随滚动
            //滚动轴点击事件
            _clickScroll: function (index, type) {
                var _that = this;

                var el = type == 0 ? $("#verticalAlxescontentA") : $("#verticalAlxescontentB");

                if (type == 0) {

                    _that.view.scroll = _that.view.scroll.map(function (item, i) {

                        item.isSelected = index == i ? true : false;
                        return item;
                    });
                } else {

                    _that.EquipDynamicInfo = _that.EquipDynamicInfo.map(function (item, i) {

                        item.isSelected = index == i ? true : false;
                        return item;
                    });
                }

                // 移动对应的高

                var Top = _that._ScrollToIndex(el, index);
                // 修改完滚动条后修改标签节点
                el.scrollTop(Top);

                if (type == 0) {

                    _that.view.scroll = _that.view.scroll.map(function (item) {

                        item.marginTop = 0;
                        return item;
                    })
                } else {

                    _that.EquipDynamicInfo = _that.EquipDynamicInfo.map(function (item) {

                        item.marginTop = 0;
                        return item;
                    })
                }


                var doc = el[0],
                    scrollTop = doc.scrollTop,
                    scrollHeight = doc.scrollHeight, //总高
                    scorllarr = type == 0 ? _that.scrollLeft : _that.scrollRight, // 当前所有滚动轴的位置
                    startPoint = scorllarr[0], // 第一个锚点
                    endPoint = scorllarr[scorllarr.length - 1], // 最后一个锚点
                    indexPoint = scorllarr[index], // 当前锚点
                    startLong = indexPoint.top - indexPoint.marginTop,
                    endLong = endPoint.top - indexPoint.top;
                // Top=Top>scrollTop?scrollTop:Top;

                // 内容区域的上滚动高度小于剩下锚点轴的高度的时候锚点额外高度为0
                if ((Top - startLong) < 0) {

                    if (type == 0) {

                        _that.view.scroll = _that.view.scroll.map(function (item) {

                            item.marginTop = 0;
                            return item;
                        })
                    } else {

                        _that.EquipDynamicInfo = _that.EquipDynamicInfo.map(function (item) {

                            item.marginTop = 0;
                            return item;
                        })
                    }
                } else if (Top > scrollTop) {
                    // 剩下的锚点高度大于剩下的内容高度的时候
                    // var t=scrollHeight-endPoint.top-60;
                    var t = (Top - startLong);
                    if (type == 0) {

                        _that.view.scroll = _that.view.scroll.map(function (item) {

                            item.marginTop = t;
                            return item;
                        })
                    } else {

                        _that.EquipDynamicInfo = _that.EquipDynamicInfo.map(function (item) {

                            item.marginTop = t;
                            return item;
                        })
                    }


                } else {

                    // var mtp=Top-indexPoint.top+60;
                    var mtp = Top - startLong;

                    if (type == 0) {

                        _that.view.scroll = _that.view.scroll.map(function (item) {

                            item.marginTop = mtp;
                            return item;
                        })
                    } else {

                        _that.EquipDynamicInfo = _that.EquipDynamicInfo.map(function (item) {

                            item.marginTop = mtp;
                            return item;
                        })
                    }

                }


            },
            // 将滚动轴滚动至对应的位置
            _ScrollToIndex: function (el, index) {

                return _.range(index).reduce(function (con, i) {

                    var itemEl = el.find('.part').eq(i);

                    con += (+itemEl.height());

                    return con;
                }, 0);
            },
            // 滚动轴End 跟随滚动
            submitTip: function (event, submitCb, getPoints) {

                this.layer.submit(event.clientX, event.clientY, submitCb, getPoints);
            },
            cancelTip: function (event, cancelCb) {
                this.layer.cancel(event.clientX, event.clientY, cancelCb);
            },
            //======================= 单个编辑Start  ==========================
            /**
             * 根据传入属性的key 值来获取的当前编辑框中该属性的值的
             */
            getValueByKey: function () {


                return "";
            },
            //技术信息点下对号按钮点击事件
            _clickIfmsSubmit: function (event, info) {
                var _that = this,
                    submitCb, getPoints;

                if (info.cmpt == "ptext_text" || info.cmpt == "ptext_unit") {
                    if (!$("#" + info.info_code).pverifi()) {
                        return;
                    }
                }


                // 获取信息节点的方法
                getPoints = equipmentMngDeatilController.queryEquipInfoPointHis.bind(null, _that.equip_id, info.info_code, info);

                var type = info.type;

                var req = {
                    "equip_id": _that.equip_id,
                    "info_point_code": info.info_code, //修改的信息点编码，必须
                    "info_point_value": "", //修改的信息点的值，必须
                    "valid_time": "",
                };

                var info_point_code = info.info_code;
                var info_point_value;

                var res = _that.getDynamicInfo("EquipDynamicInfo", "#cbx_Points_id_");

                req.info_point_value = res[info_point_code];

                if (_.isUndefined(req.info_point_value) && info.cmpt == "pcombobox_normal") {

                    $('#globalnotice').pshow({ text: '请选择' + info.info_name, state: 'failure' });
                    return;
                }

                // 成功回调
                submitCb = function (isNewValue) {
                    req.valid_time = isNewValue.isNewValue;

                    equipmentMngDeatilController.updateEquipInfo(req, (type == 3))
                        .then(function () {

                            _that.hideAllIde();

                            // 技术点信息
                            _that.requeryEquipDynamicInfo();
                        })
                }

                // 显示提交弹窗
                _that.submitTip(event, submitCb, getPoints);

            },
            //技术信息点下叉号按钮点击事件
            _clickIfmsCancel: function (event, info) {

                var _that = this;

                var cancelCb = function () {

                    info.isShow = false;

                    // _that.requeryEquipDynamicInfo();

                    _that.EquipDynamicInfo = JSON.parse(JSON.stringify(_that.EquipDynamicInfoBak));
                };

                // 显示取消弹窗
                _that.cancelTip(event, cancelCb);
            },
            hideAllIde: function () {
                var _that = this;
                Object.keys(_that.view.ide).forEach(function (key) {
                    if (_that.view.ide.hasOwnProperty(key)) {
                        _that.view.ide[key] = false;
                    }
                })
            },
            // 编辑状态下的对号按钮点击事件
            _clickSubmit: function (event, key) {

                var _that = this,
                    submitCb, getPoints;

                // 验证信息是否通过
                if (equieTxt.hasOwnProperty(key)) {
                    if (!$("#ideid_" + key).pverifi()) return;
                }

                // 获取信息节点的方法
                getPoints = equipmentMngDeatilController.queryEquipInfoPointHis.bind(null, _that.equip_id, key);

                // 用于提交的参数
                var req = {
                    "equip_id": _that.equip_id,
                    "info_point_code": key, //修改的信息点编码，必须
                    "info_point_value": "", //修改的信息点的值，必须
                    "valid_time": "",
                };


                // 选择提交时候的需要的调用的回调方法
                // 如果的是下拉菜单需要查询对应的集合
                var type = queryDataStuctTypeByKey(key);

                // 图片附件直接提交
                if (type == 2 || type == 3) {

                    eval('ide_upload_sel_' + key + '()');

                    if (type == 2) {

                        req.info_point_value = [];

                        // 直接数组类型
                        req.attachments = _that.attachments[key].map(function (item) {

                            item.toPro = 'info_point_value';
                            return item;
                        });

                    } else if (type == 3) {

                        // 数组实例类型
                        req.info_point_value = v.instance.EquipInfoBak[key];
                    }

                    // if(isPadding)return;
                    // isPadding=true;

                    equipmentMngDeatilController.updateEquipInfo(req, (type == 2 || type == 3))
                        .then(function () {

                            isPadding = false;

                            _that.view.ide[key] = false;

                            // 更新设备信息
                            _that.requeryEquipPublicInfo();
                        })

                    return;

                } else if (type == 4) {     // 修改安装位置


                    var space_id;
                    // 选择建筑的时候
                    if (space_id == _that.EquipInfo.space_id) {

                        $("#globalnotice").pshow({
                            text: "编辑成功",
                            state: "success"
                        });

                        isPadding = false;

                        _that.view.ide[key] = false;

                        // 更新设备信息
                        _that.requeryEquipPublicInfo();

                        return;

                    } else {

                        if ($("#ideid_position").psel().id == _that.EquipInfo.build_id) {

                            space_id = "";
                        } else {

                            space_id = $("#ideid_position").psel().id
                        }

                        var req = {
                            "equip_id": _that.equip_id,
                            "info_point_code": "space_id", //修改的信息点编码，必须
                            "info_point_value": space_id, //修改的信息点的值，必须
                            "valid_time": "",
                        };


                        equipmentMngDeatilController.updateEquipInfo(req)
                            .then(function () {



                                isPadding = false;

                                _that.view.ide[key] = false;

                                // 更新设备信息
                                _that.requeryEquipPublicInfo();

                                // 更新名片信息
                                _that.queryEquipCardInfo();

                            })

                        return;
                    }



                } else if (type == 1 && key == "system") {

                    req.info_point_code = key + '_id';
                    req.info_point_value = _that.EquipInfoBak[key + '_id'];

                    equipmentMngDeatilController.updateEquipInfo(req, (type == 2 || type == 3))
                        .then(function () {

                            _that.view.ide[key] = false;

                            // 更新设备信息
                            _that.requeryEquipPublicInfo();

                            // 更新名片信息
                            _that.queryEquipCardInfo();

                        }, function () {
                            isPadding = true;
                        })

                } else {                    // 普通信息点修改

                    submitCb = function (isNewValue) {

                        req.valid_time = isNewValue.isNewValue;

                        if (type == 0 || type == 3) {

                            // 直接获取值
                            req.info_point_value = _that.EquipInfoBak[key];
                        } else if (type == 1) {

                            req.info_point_code = key + '_id';
                            req.info_point_value = _that.EquipInfoBak[key + '_id'];
                        }

                        // if (isPadding) return;
                        // isPadding = true;

                        equipmentMngDeatilController.updateEquipInfo(req, (type == 2 || type == 3))
                            .then(function () {

                                // isPadding = false;

                                // 如果是生产厂家 对应编辑品牌列表
                                if (key == "manufacturer") {
                                    // 清空下面的品牌
                                    equipmentMngDeatilController.updateEquipInfo({
                                        "equip_id": _that.equip_id,
                                        "info_point_code": "brand",
                                        "info_point_value": "",
                                        "valid_time": "",
                                    }).then(function () {

                                        // 更新设备信息
                                        _that.view.ide[key] = false;
                                        _that.requeryEquipPublicInfo(function () {

                                            //更新之后的回调
                                            $("#globalnotice").pshow({
                                                text: "请重新选择品牌",
                                                state: "success"
                                            });
                                            _that._clickStartChange("brand");
                                        });
                                    })

                                } else if (key == "insurer") {

                                    // 如果是保险公司则同时编辑对应的保险订单

                                    equipmentMngDeatilController.updateEquipInfo({
                                        "equip_id": _that.equip_id,
                                        "info_point_code": "insurer_num",
                                        "info_point_value": "",
                                        "valid_time": "",
                                    }).then(function () {
                                        // 更新设备信息
                                        _that.view.ide[key] = false;
                                        _that.requeryEquipPublicInfo(function () {
                                            $("#globalnotice").pshow({
                                                text: "请重新选择保险单号",
                                                state: "success"
                                            });
                                            _that._clickStartChange("insurer_num");
                                        });
                                    })

                                } else {

                                    _that.view.ide[key] = false;

                                    // 更新设备信息
                                    _that.requeryEquipPublicInfo();
                                }
                            }, function () {
                                isPadding = true;
                            })


                    };
                    // 显示提交弹窗
                    _that.submitTip(event, submitCb, getPoints);
                }
            },
            // 编辑状态下的叉号按钮点击事件
            _clickCancel: function (event, key) {

                var _that = this;

                var cancelCb = function () {

                    _that.view.ide[key] = false;
                    _that.EquipInfoBak = JSON.parse(JSON.stringify(_that.EquipInfo));

                    var val_ideid_BIMID = $("#ideid_BIMID").pval();
                    var val_ideid_equip_local_id = $("#ideid_equip_local_id").pval();

                    $("#ideid_BIMID").precover();
                    $("#ideid_equip_local_id").precover();

                    $("#ideid_BIMID").pval(val_ideid_BIMID);
                    $("#ideid_equip_local_id").pval(val_ideid_equip_local_id);

                };

                // 显示取消弹窗
                _that.cancelTip(event, cancelCb);
            },
            _clickValiStartChange: function (event, key) {

                var _that = this;

                if (key == "equip_local_id") {

                    controllerInsert.verifyEquipLocalId({
                        equip_id: _that.EquipInfoBak.equip_id,
                        equip_local_id: _that.EquipInfoBak[key],
                    }).then(function (data) {

                        if (!data.can_use) {

                            $("#globalnotice").pshow({
                                text: "设备本地编码重复",
                                state: "failure"
                            });

                        } else {

                            _that._clickSubmit(event, key);
                        }
                    })

                } else if (key == "BIMID") {

                    // 验证不可重复
                    controllerInsert.verifyEquipBimId({
                        equip_id: _that.EquipInfoBak.equip_id,
                        BIMID: _that.EquipInfoBak[key],
                    }).then(function (data) {

                        if (!data.can_use) {

                            $("#globalnotice").pshow({
                                text: "BIMID编码重复",
                                state: "failure"
                            });
                        } else {
                            _that._clickSubmit(event, key);
                        }
                    })

                } else {
                    _that._clickSubmit(event, key);
                }
            },
            // 点击编辑按钮控件赋值
            _clickStartChange: function (key) {

                // 页面显示隐藏
                this.view.ide[key] = !this.view.ide[key];

                var el = $("#ideid_" + key),
                    type = querycontroTypeByKey(key), //0文本框  1 下拉框 2 图片上传 3 文件上传 4 日历控件 5 多级联动下拉菜单
                    value = this.EquipInfo[key],
                    _that = this; // 当前对应的值



                if (type == 0) {
                    el.precover();
                    // 点击编辑文本赋值
                    // el.pval(value);
                } else if (type == 1) {

                    // 点击编辑下拉菜单赋值
                    var obj = querySearchNameByKey(key),
                        list = obj.list,
                        SearchKey = obj.SearchKey;
                    var item = this.filterItemByKeyValue(list, SearchKey, value);
                    var index = list.indexOf(item);
                    el.psel(index);

                } else if (type == 2) {

                    var pics = _that.EquipInfo[key] || [];

                    $("#ideid_" + key).precover();

                    // 给需要绑定值的上传控件绑定对应的内容
                    $("#ideid_" + key).pval(pics.map(function (url) {

                        return {
                            url: url,
                        }
                    }).filter(function (item) {

                        return _.isString(item.url);
                    }));

                } else if (type == 3) {

                    // 给需要绑定值的上传控件绑定对应的内容
                    var pics = _that.EquipInfo[key] || [];

                    $("#ideid_" + key).precover();

                    $("#ideid_" + key).pval(pics.map(function (item) {
                        return {
                            name: item.name,
                            url: item.type == 1 ? item.url : item.key,
                        }
                    }));

                } else if (type == 4) {
                    var date = new Date(value);
                    el.psel({
                        y: date.format('yyyy'),
                        M: date.format('MM'),
                        d: date.format('dd')
                    });

                } else if (type == 5) {

                    var name;

                    try {

                        name = _that.BuildFloorSpaceTree.reduce(function (arr, item) {

                            item.content.forEach(function (item) {
                                arr = arr.concat(item);

                                item.content.forEach(function (item) {
                                    arr = arr.concat(item);
                                })
                            })

                            return arr.concat(item);
                        }, []).filter(function (info) {

                            return (_that.EquipInfo.space_id != '--' && _that.EquipInfo.space_id) ? info.obj_id == _that.EquipInfo.space_id : info.obj_id == _that.EquipInfo.build_id;
                        })[0].obj_name;

                    } catch (error) {
                        name = "";
                    }

                    if (name) {

                        el.psel({
                            itemIndexOrText: name,
                            level: _that.EquipInfo.space_id ? 3 : 1,
                            itemId: _that.EquipInfo.space_id ? _that.EquipInfo.space_id : _that.EquipInfo.build_id,
                            isEvent: false
                        })

                    }
                }

            },
            // 技术信息编辑
            _clickPointChange: function (id, list, value) {
                $("#PI" + id).psel(list.indexOf(value));
            },
            //======================= 单个编辑End  ==========================
            /**
             * 生成转换上传文件或图片的格式
             * @param {any} type 1 图片 2其他格式的附件 
             */
            pvalConvertAttachments: function (type) {

                /**
                 * 返回生成对应的提交属性的Object
                 *  @param {any} arr 上传组件获取的 Array 数组
                 *  @param {any} key 对应的提交的属性
                 *  @param {any} isMore 是否是多文件上传
                 */
                return function (arr, key, isMore) {

                    return arr.map(function (item) {

                        return {
                            path: item.url, //文//件的下载地址， 即网站后台(非java端) 后台返回的下载地址。 必须 *
                            toPro: key, //此文件对应的属性名称 *
                            multiFile: isMore || true, //是否是多附件， 默认true *
                            fileName: item.name, // 文件真实名称 *
                            fileSuffix: item.suffix, //文件后缀,不带点// *
                            isNewFile: (item.isNewFile != void 0) ? item.isNewFile : true, // 是不是新文件， 默认true， 为false时将不进行文件上传 *
                            fileType: type, //文件类型， 1 图片 2 非图片， 暂时只有fm系统会用到； 默认1 /
                        }
                    })
                }
            },
            /**
             * 树状接口通过的属性查询出对应的值
             * 根据传入 key value 值查询对应的树的内容
             */
            filterItemByKeyValue: function (list, key, value) {

                if (!_.isArray(list)) return;

                function fltbyName(con, item) {

                    if (item[key] == value) con = item;

                    return con;

                }

                return list.length ? list.reduce(fltbyName) : {};

            },
            /**
             * 新增部分 转换为可以提交的参数
             */
            convert2Controller: function (item) {

                var req = {
                    equip_id: this.equip_id,
                    info_point_code: item.key,
                    //                  正常文本    安装位置         所属系统//设备类型
                    info_point_value: item.value || item.obj_name || item.name || item.company_name || item.insurer_num || '',
                };

                return req;
            },
            /**
             * 将对应的每个实例进行转换通过提交
             * {
             *      el: '', // dom Jquery 对象
             *      type: '', // dom 结构类型
             *      key: '', //  对应的key 值
             *      list: [], // 下滑栏菜选择需要查询的list
             *      SearchKey: '', //  下滑栏菜单的查询的查询的时候的需要选择的对应的 key 值
             *  }
             */
            getReqByKey: function (item) {
                var el = $((item.idetype ? "#ideid_" : "#addid_") + item.key),
                    type = querycontroTypeByKey([item.key]),
                    key = item.key,
                    list = querySearchNameByKey(item.key).list || [],
                    SearchKey = querySearchNameByKey(item.key).SearchKey || void 0,
                    value,
                    req = {};

                if (type == 0) {
                    // 文本
                    value = el.pval();

                    req = this.convert2Controller({
                        key: key,
                        value: value
                    });

                } else if (type == 1) {

                    // 下拉菜单
                    var obj_name = el.psel().text;

                    var info = this.filterItemByKeyValue(list, SearchKey, obj_name)

                    // key 值需要确定
                    req = this.convert2Controller(Object.assign({}, info, {
                        key: key
                    }));

                } else if (type == 2) {
                    // 图片
                    var attachments = this.pvalConvertAttachments(1)(el.pval(), key);

                    req.attachments = attachments;

                } else if (type == 3) {
                    // 文件
                    var attachments = this.pvalConvertAttachments(1)(el.pval(), key);

                    req.attachments = attachments;
                } else if (type == 4) {
                    // 日期控件
                    value = el.psel().startTime;

                    req = this.convert2Controller({
                        key: key,
                        value: value
                    });
                } else if (type == 5) {


                }

                return req;
            },
            convert2ide: function (item) {
                var req = {};

                req = this.getReqByKey(item);
                type = item.idetype;

                if (!req.info_point_value && req.attachments && !req.attachments.length) {
                    return function () {
                        return new Promise(function (resolve, reject) {
                            resolve();
                        })
                    }
                }

                req.valid_time = (new Date()).format('yyyyMMdd') + '000000';

                // 返回 Promise 对象
                return equipmentMngDeatilController.updateEquipInfo.bind(this, req, (type == 2 || type == 3));
            },
            /**
             * 新建信息 （**多条新建信息同时发送**）
             * arr 需要发送的集合
             * type 0 默认新建 1 属于编辑
             */
            someSend: function (arr, type) {

                var _that = this;

                var result = [];

                function fn() {
                    if (result.length == arr.length) {

                        if (result.filter(function (str) {
                            return str == 'resolve'
                        }).length == arr.length) {

                            // 更新设备信息
                            _that.requeryEquipPublicInfo();

                            $("#equipmentMngpnotice").pshow({
                                text: '添加成功',
                                state: "success"
                            });

                        } else {
                            $("#equipmentMngpnotice").pshow({
                                text: '添加失败',
                                state: "failure"
                            });
                        }
                    }
                }

                // var total = arr.map(function (item) {
                //         item.idetype = type;
                //         return item;
                //     }).map(this.convert2ide)
                //     .forEach(function (item, index) {

                //         return item().then(function () {

                //             result.push('resolve');
                //             fn()

                //         }, function () {

                //             result.push('reject');
                //             fn()
                //         }).catch(function () {

                //             result.push('catch');
                //         })
                //     });

                var total = arr.map(function (item) {
                    item.idetype = type;
                    return item;
                }).map(this.convert2ide);

                var con = function () {
                    // 更新设备信息
                    _that.requeryEquipPublicInfo();

                    $("#equipmentMngpnotice").pshow({
                        text: '添加成功',
                        state: "success"
                    });
                }

                total.reduce(function (a, b) {

                    return function () {

                        return b().then(a);
                    }
                }, con)();

            },
            // 根据key 值查询的对应的下拉菜单的配置信息
            getSettByKey: function (key) {

                // 如果传入的参数是一个对应的数组，则全部进行查询，同时返回的对应的数组
                if (_.isArray(key)) {

                    // 返回对应的数组集合
                    return key.map(function (name) {

                        return Object.assign({}, querySearchNameByKey(name), {
                            key: name,
                        })
                    })

                } else {

                    // 当传入的值的为单个的值的时候，同时也返回的对应的数组
                    return [Object.assign({}, querySearchNameByKey(key), {
                        key: key,
                    })];

                }
            },
            // 添加保险信息
            _clickAddinsurance: function () {

                var insuranceArr = this.getSettByKey(['insurer', 'insurer_num']);

                this.someSend(insuranceArr);
            },
            //添加购买信息
            _clickAddbuy: function () {

                var buyArr = [{
                    key: 'contract_id'
                },
                {
                    key: 'asset_id'
                },
                {
                    key: 'purchase_price'
                }
                ].concat(this.getSettByKey('supplier'));

                this.someSend(buyArr);
            },
            // 添加厂家信息
            _clickAddfactory: function () {

                var factoryArr = [{
                    key: 'product_date'
                },
                {
                    key: 'serial_num'
                },
                {
                    key: 'specification'
                }
                ].concat(this.getSettByKey(['manufacturer', 'brand']));

                this.someSend(factoryArr);
            },
            // 添加运行维保
            _clickAddMaintenance: function () {

                var maintenanceArr = [{
                    key: 'principal'
                },
                {
                    key: 'maintain_id'
                },
                {
                    key: 'start_date'
                },
                {
                    key: 'maintain_deadline'
                },
                {
                    key: 'service_life'
                },
                {
                    key: 'warranty'
                },
                {
                    key: 'maintain_cycle'
                }
                ].concat(this.getSettByKey(['maintainer']));

                this.someSend(maintenanceArr);
            },
            // 添加基础信息
            _clickAddBase: function () {

                var baseArr = [{
                    key: 'equip_local_name'
                }, //设备名称
                {
                    key: 'equip_local_id'
                }, //设备编码
                {
                    key: 'BIMID'
                }, //BIM模型中编码
                {
                    el: $("#addid_position3").psel() ? $("#addid_position3") : (
                        $("#addid_position2").psel() ? $("#addid_position2") : $("#addid_position1")
                    ),
                    type: 5,
                    key: 'position',
                    list: $("#addid_position3").psel() ? Build2.content : (
                        $("#addid_position2").psel() ? this.Build1.content : this.BuildFloorSpaceTree
                    ),
                    SearchKey: 'obj_name',
                }, //安装位置
                {
                    key: 'system_name',
                    list: v.instance.SystemDomain,
                    SearchKey: 'name',
                }, //所属系统
                {
                    key: 'equip_category_name',
                    list: v.instance.SystemDomain,
                    SearchKey: 'name',
                }, //设备类型
                {
                    key: 'length'
                }, //长
                {
                    key: 'width'
                }, //宽
                {
                    key: 'height'
                }, //高
                {
                    key: 'mass'
                }, //重量
                {
                    key: 'material'
                }, //主体材质
                {
                    key: 'dept'
                }, //所属部门
                {
                    key: 'drawing'
                }, //设备图纸
                {
                    key: 'picture'
                }, //设备照片
                {
                    key: 'check_report'
                }, //质检报告
                {
                    key: 'nameplate'
                }, //铭牌照片
                {
                    key: 'archive'
                } //设备文档
                ];

                this.someSend(baseArr);
            },
            /**
             * 验证一个实例中的部分属性是否全部为空
             * obj 需要验证的实例
             * keys 需要验证的属性集合
             * return ture 全部为空 return false 全部不为空
             */
            fev: function (obj, keys) {

                for (var index = 0; index < keys.length; index++) {

                    var value = obj[keys[index]];

                    if (_.isString(value) && value.length && value != "--") {

                        return false;
                        break;
                    } else if (_.isArray(value) && value.length) {

                        return false;
                        break;
                    }
                }

                return true;
            },
            // 数组的获取对应高度
            covertHeight: function (arr, minh, maxh, sh) {
                // 获取总高度
                var totalHeight = $("#verticalAlxescontentb").height() - 50,
                    len = arr.length,
                    ih = 0, //计算后单个高度的距离
                    itemTop = 0;

                // 附加默认值
                minh = minh || 60;
                maxh = maxh || 120;
                sh = sh || 0;

                ih = (totalHeight / len);

                itemTop = ih < minh ? minh : (minh < ih && ih < maxh) ? ih : maxh;

                aa = arr.map(function (item, index) {
                    item.top = index * itemTop + sh;
                    item.totalTop = index * itemTop + sh + (item.marginTop || 0);

                    return item;

                })

                return aa;
            },
            // 信息点查询完之后的转换  与新增页面通过统一的转换方法
            EquipDynamicInfoCovert: function (list) {
                if (_.isArray(list)) {
                    return list.map(function (item, index) {

                        item.isSelected = index == 0;

                        item.info_Points = item.info_Points.map(function (info) {

                            info.isShow = false;

                            /**
                             * type 0 普通字符串 文本框
                             *      1 普通下拉选择框
                             *      2 多选按钮
                             *      3 附件类型
                             *      4 有单位文本框
                             * 根据 data_type 和 cmpt_data 判断显示的类型
                             */
                            if (info.data_type == 'StrArr' && _.isArray(info.cmpt_data) && info.cmpt_data.length) {

                                info.type = 2;
                                // StrArr 将字符串数组修改为多个对应的实体对象
                                info.str_arr_value = info.cmpt_data.filter(function (item) {
                                    return info.str_arr_value.map(function (x) {
                                        return new String(x);
                                    }).indexOf(new String(item.code) != -1)
                                });

                                info.cmpt_data = info.cmpt_data.map(function (item) {
                                    item.isChecked = info.str_arr_value.indexOf(item) != -1;
                                    return item;
                                })

                            } else if (info.data_type == 'Str' && _.isArray(info.cmpt_data) && info.cmpt_data.length) {

                                info.type = 1;
                                // Str 将字符串数组修改为单个个对应的实体对象
                                info.str_value = info.cmpt_data.filter(function (item) {
                                    return new String(item.code) == info.str_value;
                                })[0] || {};
                            } else if (info.data_type == 'Att') {

                                // 附件对应的内容
                                info.type = 3;
                                // 将附件内容全部转换成为对应的Url 值
                                info.att_value = info.att_value.map(function (item) {
                                    item.url = item.type == 1 ? item.url : item.key;
                                    return item;
                                });
                            } else if (info.data_type == 'Str' && info.unit) {
                                // 有单位的文本框
                                info.type = 4;
                            } else {

                                // 普通文本框
                                info.type = 0;
                            }
                            return info;
                        });

                        return item;
                    });
                } else {
                    return [];
                }
            },
            // 创建技术点对应的下拉框方法
            createPointsFn: function (EquipDynamicInfoBak) {

                if (_.isArray(EquipDynamicInfoBak)) {

                    EquipDynamicInfoBak.forEach(function (item, index) {

                        item.forEach(function (info, i) {

                            // 将对应的函数绑定 window 对象上面
                            window['insertPoints_' + index + '_' + i] = createComboxSelFnPoint(info, 'EquipDynamicInfoBak');
                        })
                    })
                }
            },
            requeryEquipDynamicInfo: function () {

                var _that = this;
                // 技术参数赋值 **需要对后台的返回参数的进行转换**
                equipmentMngDeatilController.queryEquipDynamicInfo(_that.equip_id)
                    .then(function (list) {
                        _that.EquipDynamicInfo = _that.convertDynamicInfo(list);

                        // 备份技术参数
                        _that.EquipDynamicInfoBak = JSON.parse(JSON.stringify(_that.EquipDynamicInfo));

                        // _that.createPointsFn(_that.EquipDynamicInfoBak);
                    })
            },
            requeryEquipPublicInfo: function (cb) {

                var _that = this;

                var PromsQueryEquipPublicInfo = equipmentMngDeatilController.queryEquipPublicInfo(_that.equip_id);

                PromsQueryEquipPublicInfo.then(function (info) {

                    info.system = info.system_name;

                    // 附加通用信息
                    _that.EquipInfo = info;

                    // 绑定品牌
                    // // 绑定保险公司对应的品牌
                    var brs = _that.manufacturerList.filter(function (item, index) {

                        return item.company_name == _that.EquipInfo.manufacturer;

                    });
                    _that.brands = brs.length ? brs[0].brands.map(function (i) {

                        return {
                            name: i
                        };
                    }) : [];

                    // 绑定保险单号
                    // // 绑定保险公司对应的品牌
                    var brs = _that.insurerList.filter(function (item, index) {

                        return item.company_name == _that.EquipInfo.insurer;

                    });
                    _that.insurer_infos = brs.length ? brs[0].insurer_info.map(function (i) {

                        return {
                            name: i.insurer_num
                        };
                    }) : [];


                    // 复制一份做编辑处理
                    _that.EquipInfoBak = JSON.parse(JSON.stringify(info));

                    Vue.nextTick(function () {

                        // 对下滑的属性全部做统一处理
                        // recoverSearch(querySearchNameByKey());
                        $(".a-box .ipttext img").each(function (index, item) {

                            $(item).click(function (eventF) {

                                $("#bigImage").attr("src", $(item).attr("src"));
                                $("#globalWindow1").pshow();

                                event.stopPropagation();
                            })
                        })
                    });

                    if (_.isFunction(cb)) cb();
                })
            },
            /**
            * 设备管理-详细页:查询设备名片信息
            */
            queryEquipCardInfo() {
                var _that = this;

                equipmentMngDeatilController.queryEquipCardInfo(_that.equip_id)
                    .then(function (CardInfo) {
                        _that.CardInfo = CardInfo;

                    })
            }
        },
        beforeMount: function () {

            var _that = this;

            _that.queryEquipCardInfo();



            /**
             * 根据设备ID 查询设备管理-详细页:查询设备通用信息
             */
            var PromsQueryEquipPublicInfo = equipmentMngDeatilController.queryEquipPublicInfo(_that.equip_id);

            PromsQueryEquipPublicInfo.then(function (info) {

                info.system = info.system_name;

                // 附加通用信息
                _that.EquipInfo = info;
                // 复制一份做编辑处理
                _that.EquipInfoBak = JSON.parse(JSON.stringify(info));


                // 获取安装位置
                PromsQueryEquipPublicInfo.then(function (info) {

                    /**
                     * 根据建筑ID查询所属的位置
                     * 获取安装位置下拉选项
                     */
                    return equipmentMngDeatilController.queryBuildFloorSpaceTree();

                }).then(function (list) {

                    list = list.filter(function (item) {

                        return item.obj_id == _that.EquipInfo.build_id;

                    });

                    // list = list.length ? list[0].content : [];

                    // 获取建筑下的楼层树
                    _that.BuildFloorSpaceTree = list.map(function (item) {

                        item.cansel = true;

                        item.content = item.content.map(function (info) {

                            info.cansel = false;

                            info.content = info.content.map(function (x) {

                                x.cansel = true;
                                return x;
                            })
                            return info;
                        });
                        return item;
                    });
                })

                // 获取所属系统
                controllerInsert.querySystemForBuild(_that.EquipInfo.build_id)
                    .then(function (list) {
                        _that.SystemDomain = list;
                    })

            })

            /**
             * 查询工单状态下拉菜单
             */
            var proQueryWorkOrderState = equipmentMngDeatilController.queryGeneralDictByKey();
            proQueryWorkOrderState.then(function (list) {

                _that.WorkOrderState = [{
                    code: '',
                    description: '',
                    name: '全部'
                }].concat(list);

                //查询完之后默认查询第一个
                equipmentMngDeatilController.queryEquipRelWorkOrder({
                    order_type: "",
                    equip_id: _that.equip_id,
                }).then(function (list) {

                    _that.EquipRelWorkOrder = list;
                })
            });

            // 获取所有设备
            equipmentMngDeatilController.queryAllEquipCategory()
                .then(function (list) {

                    function disable(item) {
                        var disable = arguments.callee;

                        if (_.isArray(item.content)) {
                            item.disabled = true;
                            item.content = item.content.map(disable);
                        } else {
                            item.disabled = false;
                        }

                        return item;
                    }

                    _that.AllEquipCategory = list.map(disable);
                })
            /**
             * 生产厂家下拉列表
             */
            var proQueryEquipCompanySels = equipmentMngDeatilController.queryEquipCompanySel(2);
            proQueryEquipCompanySels.then(function (list) {
                _that.manufacturerList = list;

                PromsQueryEquipPublicInfo.then(function () {

                    // // 绑定保险公司对应的品牌
                    var brs = _that.manufacturerList.filter(function (item, index) {

                        return item.company_name == _that.EquipInfo.manufacturer;

                    });

                    _that.brands = brs.length ? brs[0].brands.map(function (i) {

                        return {
                            name: i
                        };
                    }) : [];

                })

                $("#addid_brand").pdisable(true);
            })

            /**
             * 供应商下拉列表
             */
            var proQueryEquipCompanySelg = equipmentMngDeatilController.queryEquipCompanySel(1)
            proQueryEquipCompanySelg.then(function (list) {
                _that.supplierList = list;
            })

            /**
             * 维修商名称 下拉列表
             */
            var proQueryEquipCompanySelw = equipmentMngDeatilController.queryEquipCompanySel(3)
            proQueryEquipCompanySelw.then(function (list) {
                _that.maintainerList = list;
            })

            /**
             * 保险公司名称 下拉列表
             */
            var proQueryEquipCompanySelb = equipmentMngDeatilController.queryEquipCompanySel(4)
            proQueryEquipCompanySelb.then(function (list) {
                _that.insurerList = list;

                PromsQueryEquipPublicInfo.then(function () {


                    // // 绑定保险公司对应的品牌
                    var brs = _that.insurerList.filter(function (item, index) {

                        return item.company_name == _that.EquipInfo.insurer;

                    });

                    _that.insurer_infos = brs.length ? brs[0].insurer_info.map(function (i) {

                        return {
                            name: i.insurer_num
                        };
                    }) : [];
                })
            })

            // 全部选项加载完毕
            PromsQueryEquipPublicInfo.then(function () {

                return proQueryWorkOrderState;
            }).then(function () {

                return proQueryWorkOrderState;
            }).then(function () {

                return proQueryEquipCompanySels;
            }).then(function () {

                return proQueryEquipCompanySelg;
            }).then(function () {

                return proQueryEquipCompanySelw;
            }).then(function () {

                return proQueryEquipCompanySelb;
            }).then(function () {

                Vue.nextTick(function () {
                    // 对下滑的属性全部做统一处理
                    // recoverSearch(querySearchNameByKey());
                    $(".a-box .ipttext img").each(function (index, item) {

                        $(item).click(function (eventF) {

                            $("#bigImage").attr("src", $(item).attr("src"));
                            $("#globalWindow1").pshow();

                            event.stopPropagation();
                        })
                    })
                })

            }).catch(function (err) {

                console.log(err);

            })

            // 技术参数赋值 **需要对后台的返回参数的进行转换**
            _that.requeryEquipDynamicInfo();

            this.layer = new layerModel();

            // 选择选项卡
            setTimeout(function () {

                $("#baseTab").psel(_that.baseTab);
            }, 0);


        },
        watch: {
            // 查询设备相关的工单
            WorkOrderCode: function (newVal, oldVal) {

                var _that = this;
                if (newVal != oldVal || newVal == "") {

                    equipmentMngDeatilController.queryEquipRelWorkOrder({
                        order_type: newVal,
                        equip_id: _that.equip_id,
                    }).then(function (list) {

                        _that.EquipRelWorkOrder = list;
                    })
                };
            },
            Build1: function (newVal, oldVal) {

                var _that = this;
                if (newVal != oldVal) {
                    // 清空按钮选项
                    $("#addid_position2").precover();
                    $("#addid_position3").precover();
                    $("#addid_position3").pdisable(true)
                }
            },
            Build2: function (newVal, oldVal) {

                var _that = this;
                if (newVal != oldVal) {
                    $("#addid_position3").precover();
                    $("#addid_position3").pdisable(false)
                }
            },
            brands: function (newVal, oldVal) {

                var _that = this;
                if (newVal != oldVal) {
                    $("#addid_brand").precover();
                    $("#addid_brand").pdisable(false)
                }
            },
            insurer_infos: function (newVal, oldVal) {

                var _that = this;
                if (newVal != oldVal) {
                    $("#addid_insurer_num").precover();
                    $("#addid_insurer_num").pdisable(false)
                }
            },
            AllEquipCategory: function (newVal, oldVal) {

                var _that = this;
                if (newVal != oldVal) {
                    // 新增的下拉菜单清空
                    $("#addid_equip_category_name").precover();
                    $("#addid_equip_category_name").pdisable(false)

                    // 编辑的下拉菜单清空
                    $("#ideid_equip_category_name").precover();
                }
            }
        },
    })
})();