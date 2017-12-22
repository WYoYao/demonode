$(function () {
    var instance = personInfoModel.instance();
    personController.init();
    $("#workStateDown").psel(0, false);
    $(document).on('click', function () {
        $("#perDetailFloat").phide();
        $("#roleCheckFloat").phide();
    });
});
var workState = [{ name: '在职' }, { name: '离职' }];
var sexArr = [{ name: '男' }, { name: '女' }];
var buttonArr = [{ name: '1号' }, { name: '2号' }, { name: '3号' }, { name: '4号' }, { name: '5号' }, { name: '6号' }, { name: '7号' }, { name: '8号' }, { name: '9号' }];
function showInfoMode() {
    if ($("#perModeChange .infoMode").hasClass("now")) return;
    $("#perModeChange .infoMode").addClass("now");
    $("#perModeChange .picMode").removeClass("now");
    $("#perInfoTable").show();
    $("#perPicTable").hide();
    personController.queryPersonList();

}
function showPicMode() {//显示人员缩略图
    if ($("#perModeChange .picMode").hasClass("now")) return;
    $("#perModeChange .picMode").addClass("now");
    $("#perModeChange .infoMode").removeClass("now");
    $("#perInfoTable").hide();
    $("#perPicTable").show();
    personController.queryPersonWithGroup();
}

function addPersonShow() {//添加人员显示
    var instance = personInfoModel.instance();
    $("#addPersonPage").show();
    instance.selPerson = new personObj();
    instance.idNumberInput = '';

    var allInput = $("#addPersonPage [pertype='personInput']");
    for (var i = 0; i < allInput.length; i++) {
        $(allInput[i]).precover();//恢复默认
    }
    $("#addPersonPage [pertype='defineTagBox']").precover();//恢复默认  
    $("#addPersonPage [pertype='sexCombobox']").psel(0);//性别赋值
    $("#addPersonPage [pertype='posiCombobox']").precover();//职位赋值
    $("#addPersonPage [pertype='uplodImgBox']").precover();//图像恢复
    personController.attachments = [];
    personController.imageChange = false;
    $("#addPersonPage [pertype='personImgBox'] img").attr('src', '/images/person.png');
    var nowDay = new Date();
    $("#addPersonPage [pertype='borthTimeForm']").psel({ y: nowDay.getFullYear(), M: nowDay.getMonth() + 1, d: nowDay.getDate() });//出生年月赋值

}
function getBirthdayFromIdCard(idCard) {
    var birthday = {};
    if (idCard != null && idCard != "") {
        if (idCard.length == 15) {
            birthday.y = "19" + idCard.substring(6, 8);
            birthday.M = idCard.substring(8, 10);
            birthday.d = idCard.substring(10, 12);
        } else if (idCard.length == 18) {
            birthday.y = idCard.substring(6, 10);
            birthday.M = idCard.substring(10, 12);
            birthday.d = idCard.substring(12, 14);
        }
        if (parseInt(birthday.y) > 1899 && parseInt(birthday.y) < 2018 && parseInt(birthday.M) < 13 && parseInt(birthday.d) < 32) {
            birthday.sign = true;
        }
    }
    return birthday;
}


function addPersonHide() {
    $("#perAddDialog").pshow({ title: "确定要离开页面吗？", subtitle: "您编辑的信息尚未保存，离开会使内容丢失" });
}

function perEditClick(event) {//显示 人员编辑
    var instance = personInfoModel.instance();
    $("#perDetailFloat").pshow({ title: '编辑' });
    instance.perCheckSign = false;
    //赋值
    instance.idNumberInput = instance.selPerson.id_number;//身份证赋值
    var allInput = $("#perEditDetail [pertype='personInput']");
    for (var i = 0; i < allInput.length; i++) {
        $(allInput[i]).precover();//恢复默认
    }
    $("#perEditDetail [pertype='defineTagBox']").precover();//清空 
    $("#perEditDetail [pertype='posiCombobox']").pval(instance.selPerson.position);//职位赋值
    $("#perEditDetail [pertype='sexCombobox']").psel(instance.selPerson.gender == 'male' ? 0 : 1);//性别下拉赋值
    $("#perEditDetail [pertype='uplodImgBox']").precover();//图像恢复
    personController.attachments = [];
    personController.imageChange = false;
    if (!!instance.selPerson.id_photo) {
        $("#perEditDetail [pertype='uplodImgBox']").pval([{ name: '', url: instance.selPerson.id_photo }]);//图像赋值
    }
    $("#perEditDetail [pertype='personImgBox'] img").attr('src', !instance.selPerson.head_portrait ? '/images/person.png' : instance.selPerson.head_portrait);

}

function perAddEditSave() {//人员添加保存
    var selPerson = personInfoModel.instance().selPerson;
    if ($("#addPersonPage").is(":visible")) {//添加
        $parent = $("#addPersonPage");
    } else {
        $parent = $("#perEditDetail");
    }
    var allInput = $parent.find("[pertype='personInput']");
    var wrongSign = true;
    for (var i = 0; i < allInput.length; i++) {
        wrongSign = $(allInput[i]).pverifi();
        if (!wrongSign) break;
    }
    if (!wrongSign) {
        return;
    }

    var rolesObj = {};
    for (var i = 0; i < selPerson.role_array.length; i++) {
        var role = selPerson.role_array[i];
        rolesObj[role.role_id] = role.role_name;
    }
    selPerson.roles = rolesObj;//处理角色
    selPerson.position = $parent.find("[pertype='posiCombobox']").pval();
    addTagClick(null, true);

    var uplodImgObj = ($parent.find("[pertype='uplodImgBox']").pval())[0];

    if (!!uplodImgObj && JSON.stringify(uplodImgObj) != '{}') {
        personController.attachments = [{//如果有上传的图片
            path: uplodImgObj.url,
            fileName: uplodImgObj.name,
            toPro: 'id_photo',
            fileSuffix: uplodImgObj.suffix,
            fileType: 1
        }, {
            path: uplodImgObj.url,
            fileName: uplodImgObj.name,
            toPro: 'head_portrait',
            fileSuffix: uplodImgObj.suffix,
            fileType: 1
        }];
    } else {
        personController.attachments = [];
    }

    if ($("#addPersonPage").is(":visible")) {//添加
        personController.addPerson();
    } else {//编辑
        personController.updatePersonById();
    }
}
function perFloatClose() {//回到查看状态
    var instance = personInfoModel.instance();
    if (!instance.perCheckSign && !parent.frameModel.isSelectedPersonInfo) {
        $("#perAddDialog").pshow({ title: "确定要离开页面吗？", subtitle: "您编辑的信息尚未保存，离开会使内容丢失" });
        return false;//不关闭
    } else {
        return true;
    }
}

//控件库事件
function workStateClick(event) {//首页 在职 离职的切换
    var index = event.pEventAttr.index;
    var instance = personInfoModel.instance();
    if (index == 0) {
        instance.workStateSign = true;
        personInfoModel.instance().nowPosition = null;
        $("#positionDown").psel(0, false);
    } else {
        instance.workStateSign = false;
        personInfoModel.instance().nowPosition = null;
        $("#positionDown").psel(0, false);
    }
    if (!$("#perPicTable").is(":visible")) {
        personController.queryPersonList();
    } else {
        personController.queryPersonWithGroup();
    }
}
function posLiClick(item) {//首页 岗位切换
    personInfoModel.instance().nowPosition = (item.pname == '全部') ? null : item.pname;//岗位的赋值
    if (!$("#perPicTable").is(":visible")) {
        personController.queryPersonList();
    } else {
        personController.queryPersonWithGroup();
    }
}

function editSexSel(event) {//添加人员 性别的选择
    var index = event.pEventAttr.index;
    var instance = personInfoModel.instance();
    if (index == 0) {
        instance.selPerson.gender = 'male';
    } else {
        instance.selPerson.gender = 'female';
    }
}

function addPerRole(item) {//添加人员 添加角色
    var instance = personInfoModel.instance();
    var index = instance.selPerson.role_ids.indexOf(item.role_id);
    if (index > -1) return;
    instance.selPerson.role_ids.push(item.role_id);
    instance.selPerson.role_array.push(item);
}
function addSpecialClick(item) {//添加人员 添加专业
    var instance = personInfoModel.instance();
    var index = instance.selPerson.specialty.indexOf(item.code);
    if (index > -1) return;
    instance.selPerson.specialty.push(item.code);
    instance.selPerson.specialty_name.push(item);
}
function addTagClick(event, param) {//添加人员 添加标签
    var instance = personInfoModel.instance();
    var $thisWrap = $("#addPersonPage");
    if (!$("#addPersonPage").is(":visible")) {//添加
        $thisWrap = $("#perEditDetail");
    }
    var thistag = $thisWrap.find("[pertype='defineTagBox']").pval();
    if (!thistag) return;
    var index = instance.selPerson.custom_tag.indexOf(thistag);
    if (index > -1) {
        !param && $("#globalnotice").pshow({ text: "不能重复添加标签！", state: "failure" });
        return;
    }
    instance.selPerson.custom_tag.push(thistag);
    !param && $thisWrap.find("[pertype='defineTagBox']").precover();//清空 
}
function imageSuccess(event) {//上传图片
    personController.imageChange = true;
    var instance = personInfoModel.instance();
    var $thisWrap = $("#addPersonPage");
    if (!$("#addPersonPage").is(":visible")) {//添加
        $thisWrap = $("#perEditDetail");
    }
    var imgArr = $thisWrap.find("[pertype='uplodImgBox']").pval();
    $thisWrap.find("[pertype='personImgBox'] img").attr('src', imgArr[0].url);
}
function imageClear(event) {
    personController.imageChange = true;
    var $thisWrap = $("#addPersonPage");
    if (!$("#addPersonPage").is(":visible")) {//添加
        $thisWrap = $("#perEditDetail");
    }
    $thisWrap.find("[pertype='personImgBox'] img").attr('src', '/images/person.png');
}

//角色管理
function roleManageShow() {//角色管理显示
    $("#perManagePage").hide();
    $("#roleManagePage").show();
}
function roleManageHide() {
    var instance = personInfoModel.instance();
    if (!instance.roleCheckSign) {//编辑态
        $("#perSureButton").data('operate', 'rolehide');//数据行点击
        $("#roleCheckFloat").phide();
        return;
    }
    $("#perManagePage").show();
    $("#roleManagePage").hide();
}
function addRoleShow() {//角色添加显示
    //还原
    var instance = personInfoModel.instance();
    instance.funcPackList = JSON.parse(JSON.stringify(instance.funcListCopy));
    $("#addRoleInput").precover();
    instance.addRoleSign = true;
}
function addRoleHide() {//角色添加
    $("#perAddDialog").pshow({ title: "确定要离开页面吗？", subtitle: "您编辑的信息尚未保存，离开会使内容丢失" });
}
function confirmSure() {//关闭
    var instance = personInfoModel.instance();
    $("#perAddDialog").phide();
    var operSign = $("#perSureButton").data('operate');
    if (instance.addRoleSign) {//添加角色
        instance.addRoleSign = false;
    }
    if (!instance.roleCheckSign) {//编辑角色
        if (operSign == 'itemclick') {//如果是角色行点击
            function callback() {
                instance.roleCheckSign = true;
                $("#roleCheckFloat").pshow({ title: '角色详情' });
            }
            personController.queryRoleDetailById(instance.clickPrItem, callback);
        } else {
            if (operSign == 'rolehide') {//如果是角色的退出
                $("#perManagePage").show();
                $("#roleManagePage").hide();
            }
            instance.roleCheckSign = true;
            $("#roleCheckFloat").phide({ isEvent: false });
        }
    }
    if ($("#addPersonPage").is(":visible")) {//添加人员
        $("#addPersonPage").hide();
    }
    if (!instance.perCheckSign) {//编辑人员
        if (operSign == 'itemclick') {//如果是人员行点击
            instance.selPerson = new personObj();
            function callback2() {
                instance.perCheckSign = true;
                $("#perDetailFloat").pshow({ title: '人员详情' });
            }
            personController.queryPersonDetailById(instance.clickPrItem, callback2);
        } else {//如果是普通的确认关闭
            instance.perCheckSign = true;
            $("#perDetailFloat").phide({ isEvent: false });
            //instance.selPerson = JSON.parse(JSON.stringify(instance.selPersonCopy));//还原
        }
    }
    $("#perSureButton").data('operate', '');
}
function confirmCancel() {
    $("#perAddDialog").phide();
    $("#perSureButton").data('operate', '');
}

function discardPerson() {//离职员工
    $("#discardPerDialog").pshow({ title: "确定要离职此员工吗？", subtitle: "离职后该员工不可再通过手机号登录平台进行操作" });
}
function regainPerson() {//复职员工
    $("#regainPerDialog").pshow({ title: "确定要复职此员工吗？", subtitle: "复职后该员工可通过手机号登录平台进行操作" });
}
function confirmDisCancel() {//离职取消
    $("#discardPerDialog").phide();
}
function confirmDisSure() {
    $("#discardPerDialog").phide();
    personController.discardPersonById();
}
function confirmRegCancel() {//复职
    $("#regainPerDialog").phide();
}
function confirmRegSure() {
    $("#regainPerDialog").phide();
    personController.regainPersonById();
}
function roleEditClick(event) {//显示 角色编辑
    var instance = personInfoModel.instance();
    $("#roleCheckFloat").pshow({ title: '编辑' });
    instance.roleCheckSign = false;
    //赋值
    // $("#editRoleInput").precover();
    Vue.nextTick(function () {
        $("#editRoleInput").pval(instance.selRole.role_name);
    });
    instance.funcPackList = JSON.parse(JSON.stringify(instance.funcPacksCopy));//还原
}

function roleAddEditSave() {//角色添加保存   
    var funcIds = [];
    var funcNames = [];
    var funcPack = []
    var instance = personInfoModel.instance();
    if (instance.addRoleSign) {//添加
        var $roleInput = $("#addRoleInput");
    } else {
        var $roleInput = $("#editRoleInput");
    }
    var roleName = $roleInput.pval();
    if (!$roleInput.pverifi()) {//角色名不能为空
        return;
    }
    instance.funcPackList.forEach(function (ele) {
        ele.issel && (true, funcIds.push(ele.func_pack_id)) && (true, funcNames.push(ele.func_pack_name)) && (true, funcPack.push(ele));
    });
    if (funcIds.length == 0) {
        $("#globalnotice").pshow({ text: "权限项不能为空！", state: "failure" });
        return;
    }
    if (instance.addRoleSign) {//添加
        personController.addRole(roleName, funcIds);
    } else {//编辑
        function callback() {
            var resRole = instance.roleList.filter(function (ele) {
                return ele.role_id == instance.selRole.role_id;
            });
            resRole[0].role_name = roleName;//保存信息
            resRole[0].func_pack_ids = funcIds;
            resRole[0].func_pack_names = funcNames;
            instance.selRole.role_name = roleName;//保存信息
            instance.selRole.func_pack_list = funcPack;
            instance.funcPacksCopy = JSON.parse(JSON.stringify(instance.funcPackList));//备份
        }
        personController.updateRoleById(roleName, funcIds, callback);
    }
}
function roleFloatClose() {//回到查看状态
    var instance = personInfoModel.instance();
    if (!instance.roleCheckSign) {//编辑的关闭
        $("#perAddDialog").pshow({ title: "确定要离开页面吗？", subtitle: "您编辑的信息尚未保存，离开会使内容丢失" });
        return false;
    } else {//查看的关闭
        return true;
    }
}
function perFloatHide() {
    $("#perDetailFloat").phide();
}
function eventStop(event) {
    event.stopPropagation();
}

function hidePerDetailFloat() {
    $("#perDetailFloat").phide();
}