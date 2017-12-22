function personInfoModel() { }
personInfoModel.instance = function () {
    if (!personInfoModel._instance) {
        personInfoModel._instance = new Vue({
            el: '#personMoleMange',
            data: {
                allPositions: [],//岗位
                positionList: [],//不包含全部
                allSpeciality: [],//所有专业
                customTags: [],//所有标签
                nowPosition: null,//列表选的岗位
                personList: [],//人员列表
                personGroup: [],//人员缩略图列表
                selPerson: new personObj(),//选中的人员
                clickPrItem: {},
                selPersonCopy: {},//选中人员备份
                perCheckSign: true,//人员管理是查看还是编辑
                workStateSign: true,//列表选的是离职还是在职
                idNumberInput: '',//身份证号的输入

                roleList: [],//角色列表
                funcPackList: [],//权限项列表
                funcListCopy: [],//权限项列表备份
                selRole: {},//选中的角色
                roleCheckSign: true,
                addRoleSign: false,
            },
            methods: {
                personItemClick: function (event, item) {
                    event.stopPropagation();
                    parent.frameModel.isSelectedPersonInfo = false;
                    parent.frameModel.person_password = '';
                    var _this = this;
                    _this.clickPrItem = item;
                    if (!_this.perCheckSign) {//处于编辑状态
                        $("#perSureButton").data('operate', 'itemclick');//数据行点击
                        $("#perDetailFloat").phide();
                        return;
                    }
                    function callback() {
                        $("#perDetailFloat").pshow({ title: '人员详情' });
                        _this.perCheckSign = true;
                    }      
                    personController.queryPersonDetailById(item, callback);
                },
                roleItemClick: function (event, item) {
                    //$("#roleCheckFloat #roleFloatEdit").show();
                    //$("#roleCheckFloat .checkRoleCont").show();//查看隐藏
                    //$("#roleCheckFloat .editRoleCont").hide();//编辑显示
                    event.stopPropagation();
                    var _this = this;
                    _this.clickPrItem = item;
                    if (!_this.roleCheckSign) {//编辑态
                        $("#perSureButton").data('operate', 'itemclick');//数据行点击
                        $("#roleCheckFloat").phide();
                        return;
                    }
                    function callback() {
                        _this.roleCheckSign = true;
                        $("#roleCheckFloat").pshow({ title: '角色详情' });
                    }
                    personController.queryRoleDetailById(item, callback);
                },
                funcItemClick: function (item) {
                    if (item.issel) {
                        item.issel = false;
                    } else {
                        item.issel = true;
                    }
                },
                delRoleClick: function (item, index) {
                    this.selPerson.role_ids.splice(index, 1);
                    this.selPerson.role_array.splice(index, 1);
                },
                delTagClick: function (item, index) {//删除标签
                    this.selPerson.custom_tag.splice(index, 1);
                },
                delSpecialClick: function (item, index) {//删除专业
                    this.selPerson.specialty_name.splice(index, 1);
                    this.selPerson.specialty.splice(index, 1);
                },
            },
            beforeMount: function () {
            },
            watch: {
                idNumberInput: function (value) {
                    var iscard = value.pisCard();//验证是否是身份证号
                    // var reg = /^((1[1-5])|(2[1-3])|(3[1-7])|(4[1-6])|(5[0-4])|(6[1-5])|71|(8[12])|91)\d{4}((19\d{2}(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(19\d{2}(0[13578]|1[02])31)|(19\d{2}02(0[1-9]|1\d|2[0-8]))|(19([13579][26]|[2468][048]|0[48])0229))\d{3}(\d|X|x)?$/;
                    if (!iscard) return;
                    var _this = this;
                    _this.selPerson.id_number = value.ptrimHeadTail();

                    function callback(perRes) {
                        var $parentPage = $("#addPersonPage").is(":visible") ? $("#addPersonPage") : $("#perEditDetail");
                        if (JSON.stringify(perRes) != '{}') {//自动补齐
                            _this.selPerson.name = perRes.name;
                            _this.selPerson.phone_num = perRes.phone_num;
                            _this.selPerson.gender = perRes.gender;
                            $parentPage.find("[inputtype='autoInput']").phideTextTip();//去掉提示
                            $parentPage.find("[pertype='sexCombobox']").psel(_this.selPerson.gender == 'male' ? 0 : 1);//性别下拉赋值
                        }

                        var $timeBox = $parentPage.find("[pertype='borthTimeForm']");
                        var birthObj = getBirthdayFromIdCard(value);
                        if (!birthObj.sign) {
                            var nowDay = new Date();
                            $timeBox.psel({ y: nowDay.getFullYear(), M: nowDay.getMonth() + 1, d: nowDay.getDate() });//出生年月赋值
                            _this.selPerson.birthday = '';
                            return;
                        }
                        _this.selPerson.birthday = birthObj.y + '-' + birthObj.M + '-' + birthObj.d;
                        $timeBox.psel({ y: birthObj.y, M: birthObj.M, d: birthObj.d });//出生年月赋值
                    }
                    if ($("#addPersonPage").is(":visible")) {
                        personController.queryPersonDetailByidNumber(this.selPerson.id_number, callback);
                    } else {
                        callback({});
                    }
                }
            },
            computed: {
                noRoleNum: function () {
                    var noroles = this.personList.filter(function (ele) {
                        return !ele.roles
                    });
                    return noroles.length;
                }
            }
        });
    }
    return personInfoModel._instance;
}

function personObj() {
    var self = this;
    self.person_id = '';
    self.project_id = '';
    self.name = '';
    self.id_number = '';//身份证号
    self.phone_num = '';              //手机号
    self.gender = 'male';              //性别，male-男、female-女,必须
    self.birthday = '';
    self.person_num = '';             //员工编号
    self.position = '';             //岗位
    self.custom_tag = [];       //自定义标签
    self.specialty = [];       //专业编码
    self.specialty_name = [];        //专业编码
    self.id_photo = '';             //证件照片
    self.head_portrait = '';            //系统头像
    self.person_status = '';//是否在职
    self.roles = {};
    self.role_ids = [];
    self.role_array = [];
    self.id_photo_obj = {};
    self.head_portrait_obj = {};
}