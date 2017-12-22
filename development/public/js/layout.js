$(function () {
    //获取用户信息
    $.ajax({
        url: '/userInfo',
        type: 'get',
        data: {},
        success: function (result) {
            initMenu(result);
        },
        error: function (error) {
        },
        complete: function () {
        }
    });

    function initMenu(result) {
        var userInfo = result && result.user ? result.user : {};
        if (userInfo.person_id) {       //个人登录
            frameModel.userInfo = userInfo;
            frameModel.userMenus = ['个人信息', '退出'];
            frameModel.userName = userInfo.name;
            frameModel.projectList = userInfo.project_persons;
            frameModel.selectedProjectId = userInfo.last_project_id && userInfo.last_project_id != '--' ? userInfo.last_project_id : userInfo.project_persons && userInfo.project_persons.length ? userInfo.project_persons[0].project_id : null;
            if (frameModel.selectedProjectId) {
                var projects = frameModel.userInfo.project_persons;
                for (var i = 0; i < projects.length; i++) {
                    if (projects[i].project_id == frameModel.selectedProjectId) {
                        frameModel.head = projects[i].head_portrait;
                        break;
                    }
                }
                if (i < projects.length) {
                    setTimeout(function () {
                        $('#combobox1').psel(i, false);
                    }, 0);
                }
            }
            if (frameModel.selectedProjectId && frameModel.selectedProjectId == userInfo.last_project_id) {
                getControlRequireList();
            }
            if (frameModel.selectedProjectId != userInfo.last_project_id) {
                var paramObj = {last_project_id: frameModel.selectedProjectId}
                setUserInfo(paramObj, true);
            }
            for (var i = 0; i < frameModel.projectList.length; i++) {
                var project = frameModel.projectList[i];
                if (project.project_id == frameModel.selectedProjectId) {
                    frameModel.selectedProject = project;
                    setMenuItems(project);
                    break;
                }
            }

        } else {        //企业登陆
            frameModel.userMenus = ['修改密码', '退出'];
            frameModel.userName = userInfo.company_name;
            frameModel.companyInfo.customer_id = userInfo.customer_id;
            frameModel.projectList = [{project_local_name: userInfo.project_local_name}];
            setTimeout(function () {
                $('#combobox1').psel(0, false);
            }, 0);

            frameModel.companyInfo.project_id = userInfo.project_id;
            frameModel.companyInfo.project_local_name = userInfo.project_local_name;
            frameModel.companyInfo.last_project_id = userInfo.last_project_id;
            frameModel.companyInfo.system_code = userInfo.system_code;
            frameModel.companyInfo.image_secret = userInfo.image_secret;
            frameModel.companyInfo.tool_type = userInfo.tool_type;
            frameModel.companyInfo.username = userInfo.__userName;       //账号
            frameModel.companyInfo.password = userInfo.__userPass;       //密码
            frameModel.menuItems = [{
                name: '',
                menu: [{
                    id: '1001',
                    name: '人员管理',
                    url: '/person'
                }]
            }]

        }

        new Vue({
            el: '#div1',
            data: frameModel
        });

        if (frameModel.menuItems.length) {
            Vue.nextTick(function () {
                $('#pfnor').psel({groupIndex: 0, itemIndex: 0});
            });
        }

    }

    /*$(document).click(function (event) {
     var tg = event.target;
     if (!$(tg).hasClass('log-in-win') && !$(tg).parents('.log-in-win').length) {
     frameModel.person_password='';//弹窗关闭
     }
     });*/
    /*$(".card-image>.image-cover").click(function () {
     $(this).prev().click()
     })*/
});
function fileSelect(dom, event) {
    $(dom).prev().find("input").click();
    /*$("#projectImg" + frameModel.imageIndex).pval([{
     url: frameModel.projectList.head_portrait,
     name: "systemPhoto" + frameModel.imageIndex,
     suffix: "png",
     isNewFile: true
     }]);*/
    // changeProjectImg();
    // uploadedProjectImg();

}
var frameModel = {
    //projectMngText: '项目管理',
    userMenus: [],
    head: '',       //头像地址
    userName: '',
    projectList: [],        //项目列表
    menuItems: [],       //菜单列表
    userInfo: {},
    controlRequireCodes: ['obj_first_photo', 'obj_first_sign', 'matter_end_scan'],
    controlRequireList: [],      //管控需求列表（工单流转的控制模块）
    selectedMenu: {},       //选择的菜单
    isSelectedPersonInfo: false,        //是否选中'人员信息'用户菜单

    person_password: '',//关闭弹窗用
    companyInfo: {
        isOldPasswd: 2,//是否为原密码
        formatCode: 2,//新密码格式
        newPassWord: '',//记录新密码
        ifSame: 2,//两次密码验证相同与否
    },//公司信息
    sendBtn: false,//发送按钮
    tips: "",//手机提示信息
    imagePostObj: {},//上传图片的信息
    imageIndex: null,//索引
    photoProjectId: '',//项目id
};

function setUserInfo(obj, isSelProject) {
    $.ajax({
        url: '/setUser',
        type: 'get',
        data: obj,
        success: function (result) {
            if (isSelProject) {
                getControlRequireList();

                pajax.update({
                    url: 'restUserService/savePersonUseProject',
                    data: {},
                    success: function (result) {
                    },
                    error: function (err) {
                    },
                    complete: function () {
                    }
                });
            }
        },
        error: function (error) {
        },
        complete: function () {
        }
    });
}

//选择项目
function selProject(model, event) {
    //event.stopPropagation();
    if (frameModel.companyInfo.customer_id || model.project_id == frameModel.selectedProjectId) return;
    frameModel.selectedProject = model;
    frameModel.selectedProjectId = model.project_id;
    setMenuItems(model);

    var paramObj = {last_project_id: frameModel.selectedProjectId}
    setUserInfo(paramObj, true);

    //菜单默认选中
    if (frameModel.selectedMenu && frameModel.selectedMenu.id) {
        if (frameModel.menuItems.length) {
            Vue.nextTick(function () {
                $('#pfnor').psel({groupIndex: 0, itemIndex: 0});
            });
        }

    }
    //修改用户头像
    frameModel.head = model.head_portrait;
}

//选择菜单
function selMenu(model) {
    console.log(JSON.stringify(model));
    frameModel.selectedMenu = JSON.parse(JSON.stringify(model));
}

//获取管控需求列表
function getControlRequireList() {
    pajax.post({
        url: 'restGeneralDictService/queryGeneralDictByKey',
        data: {
            dict_type: 'wo_control_require'
        },
        success: function (result) {
            var data = result && result.data ? result.data : [];
            for (var i = 0; i < data.length; i++) {
                var code = data[i].code;
                var codes = frameModel.controlRequireCodes;
                data[i].index = code == codes[0] ? 0 : code == codes[1] ? 1 : 2;
            }
            data.sort(compare('index'));
            frameModel.controlRequireList = data;
        },
        error: function (err) {
        },
        complete: function (err) {
        },
    });
}
//比较方法，用于排序
function compare(property) {
    return function (a, b) {
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
    }
}
function setMenuItems(project) {
    var func_packs = project.func_packs;

    var menuItems = []

    var menu1 = [];
    if (func_packs.indexOf('1001') > -1) {
        menu1.push({
            id: '1001',
            name: '人员管理',
            url: '/person',
            icon: '../images/menu/person.png'
        });
    }
    if (func_packs.indexOf('1010') > -1) {
        menu1.push({
            id: '1010',
            name: '排班管理',
            url: '/schedule',
            icon: '../images/menu/schedule.png'
        });
    }

    if (menu1.length) {
        menuItems.push({
            name: '',
            menu: menu1
        });
    }

    var menu2 = [];
    if (func_packs.indexOf('1002') > -1) {
        menu2.push({
            id: '1002',
            name: '设备管理',
            url: '/equipmentMng',
            icon: '../images/menu/equipmentMng.png'
        });
    }
    if (func_packs.indexOf('1003') > -1) {
        menu2.push({
            id: '1003',
            name: '房间管理',
            url: '/spaceMng',
            icon: '../images/menu/spaceMng.png'
        });
    }
    if (func_packs.indexOf('1004') > -1) {
        menu2.push({
            id: '1004',
            name: '设备通讯录',
            url: '/equipmentAddress',
            icon: '../images/menu/equipmentAddress.png'
        });
    }
    if (func_packs.indexOf('1005') > -1) {
        menu2.push({
            id: '1005',
            name: '打印设备房间名片',
            url: '/printCard',
            icon: '../images/menu/printCard.png'
        });
    }

    if (menu2.length) {
        menuItems.push({
            name: '设备空间',
            menu: menu2
        });
    }

    var menu3 = [];
    if (func_packs.indexOf('1008') > -1) {
        menu3.push({
            id: '1008',
            name: '分配工单处理职责',
            url: '/workOrderConfig',
            icon: '../images/menu/workOrderConfig.png'
        });
    }
    if (func_packs.indexOf('1006') > -1) {
        menu3.push({
            id: '1006',
            name: '我的工单',
            url: '/myWorkOrder',
            icon: '../images/menu/myWorkOrder.png'
        });
    }
    if (func_packs.indexOf('1009') > -1) {
        menu3.push({
            id: '1009',
            name: '计划监控',
            url: '/planMonitor',
            icon: '../images/menu/planMonitor.png'
        });
    }
    if (func_packs.indexOf('1007') > -1) {
        menu3.push({
            id: '1007',
            name: '工单管理',
            url: '/workOrderMng',
            icon: '../images/menu/workOrderMng.png'
        });
    }
    if (func_packs.indexOf('1011') > -1) {
        var userId = frameModel.userInfo.person_id;
        var projectId = frameModel.selectedProjectId;
        menu3.push({
            id: '1011',
            name: '标准操作知识库',
            url: 'http://127.0.0.1:9060/?userId=' + userId + '&projectId=' + projectId,
            icon: '../images/menu/sop.png'
        });
    }

    if (menu3.length) {
        menuItems.push({
            name: '工单',
            menu: menu3
        });
    }

    frameModel.menuItems = menuItems;
}
//编辑
function editableMode(dom, pro) {
    var value = $(dom).prev().text();
    $(dom).parent().hide().next().show().find(".transfer-input").val(value);
    if (pro == 'gender') {
        var sex = frameModel.userInfo.gender;
        if (sex == 'male') {
            $("#sex-male-radio").psel(true);
        } else {
            $("#sex-female-radio").psel(true);
        }
    }
    if (pro == 'phone_num') {
        if (s) {
            clearInterval(s);
            // second = 60;
        }
        $("#verifycode").val('')//验证码清空
        $("#phoneNumber").pval(value);
        $("#phoneNumber").find("input").removeClass("input-error");
        $("#phoneNumber").find(".error-tip").hide();
        verifyAble(null, value);
        $(".send-code-countdown>span:first-of-type").show().next().hide()
        $(".send-code-countdown>span:first-of-type").next().find("b").text("60");
    }
    if (pro == 'id_number') {
        $("#idNumber").pval(value);
        $("#idNumber").find("input").removeClass("input-error");
        $("#idNumber").find(".error-tip").hide();
    }
    /*// var verify = $(dom).parent().parent().attr("class");
     if (verify == "phone-div") {
     $(dom).parent().next().find(".send-code-countdown span:first-of-type").css({
     "color": "#02a9d1"
     })
     }*/
}
//取消编辑
function uneditableMode(dom, save) {
    $(dom).parents(".able-edit").hide().prev().show();
    $(dom).siblings(".error-id-span").hide();
}
function removeIllegalString(dom, value) {
    var len = value.length;
    /*var space=value[len-1].pisSpace();
     var ch=value[len-1].pisChinese();
     var enN=value[len-1].pisNumberAlph();
     if(space || !ch && !enN){
     var value1=value.substring(0,len-1)
     $(".name-input").val(value1)
     }*/
    var strArr = value.split("");
    for (var i = 0; i < strArr.length; i++) {
        var space = strArr[i].pisSpace();
        var ch = strArr[i].pisChinese();
        var enN = strArr[i].pisNumberAlph();
        if (space || !ch && !enN) {
            strArr.splice(i, 1);
            i = i - 1;
            // strArr=strArrNew;
            // var value1=value.substring(0,i) + value.substring(i+1)

        }
    }
    var newVal = strArr.join("");
    $(".name-input").val(newVal)
}
//保存编辑
function saveEdit(dom, pro) {
    var newValue;
    newValue = $(dom).parent().siblings(".transfer-input").val();
    if (pro == 'name') {
        var strArr = newValue.split("");
        for (var i = 0; i < strArr.length; i++) {
            var space = strArr[i].pisSpace();
            var ch = strArr[i].pisChinese();
            var enN = strArr[i].pisNumberAlph();
            if (space || !ch && !enN) {
                strArr.splice(i, 1);
                i = i - 1;
                // var value1=newValue.substring(0,i) + value.substring(i+1)
                // $(".name-input").val(value1)
            }
        }
        var newVal = strArr.join("");
        newValue = newVal;
    }
    if (pro == 'id_number') {
        newValue = $("#idNumber").pval();
    }
    if (pro == "gender") {
        if ($("#sex-male-radio").psel()) {//男
            newValue = "male";
        }
        if ($("#sex-female-radio").psel()) {
            newValue = "female";
        }
        if (!$("#sex-male-radio").psel() && !$("#sex-female-radio").psel()) {
            return;
        }
    }
    var newValue1 = newValue.replace(/\s+/g, '');
    if (!Boolean(newValue1)) {
        $("#globalnotice").pshow({text: "请确认填写项正确！", state: "failure"});
        return;
    }
    if (newValue1) {
        var poObj = {
            person_id: frameModel.userInfo.person_id,
        };
        if (pro == 'id_number') {
            var idyes = $("#idNumber").pverifi();
            var err = $("#idNumber").find(".error-tip").is(":visible");
            if (idyes) {
                var birthdayStr = getBirthdayFromIdCard(newValue);
                if (birthdayStr !== false) {
                    poObj.birthday = birthdayStr
                } else {
                    poObj.birthday = ''
                    return false;
                }
                $("#birthday").text(poObj.birthday)
            } else {
                return false;
            }
        }
        poObj[pro] = newValue1;
        updatePersonById(dom, newValue1, poObj, pro)
    }
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
        if (parseInt(birthday.y) > 1799 && parseInt(birthday.M) > 0 && parseInt(birthday.d) > 0 && parseInt(birthday.M) < 13 && parseInt(birthday.d) < 32) {
            if (parseInt(birthday.M) == 2 && parseInt(birthday.d) > 29) {
                $("#globalnotice").pshow({text: "身份证号填写有误！", state: "failure"});
                return false;
            }
            var birthdaystr = birthday.y + '.' + birthday.M + '.' + birthday.d;
            return birthdaystr;
        } else {
            $("#globalnotice").pshow({text: "身份证号填写有误！", state: "failure"});
            return false;
        }
    }

}
//日期格式
function ymd(date) {
    var year_moth_day = date.substring(0, 4) + "-" + date.substring(4, 6) + "-" + date.substring(6);
    return year_moth_day;
}
//根据id编辑人员信息
function updatePersonById(dom, newValue, postObj, pro) {
    $('#globalloading').pshow();
    pajax.update({
        url: 'restUserService/updatePersonById',
        data: postObj,
        success: function (result) {
            var notice = result && result[0] ? result[0] : '';
            if (notice != '') {
                $("#globalnotice").pshow({text: notice, state: "failure"});
                return;
            }
            frameModel.userInfo[pro] = newValue;
            if (newValue === 'female') {
                newValue = "女"
            } else if (newValue === 'male') {
                newValue = "男"
            }
            $("#globalnotice").pshow({text: '修改成功', state: "success"});
            $(dom).parents(".able-edit").prev().find("div").text(newValue);
            $(dom).parents(".able-edit").hide().prev().show();
            if (postObj.name) frameModel.userName = postObj.name;
            setUserInfo(postObj);
            if (frameModel.selectedMenu && frameModel.selectedMenu.id == '1001') {
                $('iframe')[0].contentWindow.personController.queryPersonList();
            }
        },
        error: function (err) {
            $("#globalnotice").pshow({text: '保存失败', state: "failure"});
        },
        complete: function () {
            $('#globalloading').phide();
        }
    });
}
//验证手机号
function verifyAble(dom, value, blur) {
    // var reg = /^1[3|4|5|7|8][0-9]{9}$/; //手机号码
    // if (value.length == 11) {
    var phonif = value.pisMobile();
    if (phonif) {
        frameModel.sendBtn = true;
        frameModel.tips = "";
    } else {
        frameModel.sendBtn = false;
        if (blur) {
            frameModel.tips = "手机号格式不正确！";
        } else {
            frameModel.tips = "";
        }
    }
    /*if (reg.test(value)) {
     frameModel.sendBtn = true;
     frameModel.tips = "";
     } else {
     frameModel.sendBtn = false;
     if (blur) {
     frameModel.tips = "手机号格式不正确！";
     } else {
     frameModel.tips = "";
     }
     }*/
}
//手机号保存修改
function savePhoneEdit(dom, pro) {
    var newValue;
    newValue = $(dom).parent().siblings().find("#phone-number").val();
    var code1 = $("#verifycode").val()
    code2 = code1.replace(/\s+/g, '');
    if (code2 == "") {
        frameModel.tips = "验证码不能为空！";
        // $("#globalnotice").pshow({text: '请填写验证码！', state: "failure"});
        return false;
    } else {
        frameModel.tips = "";
    }
    pajax.update({
        url: 'restUserService/updatePersonPhone',
        data: {
            person_id: frameModel.userInfo.person_id,
            phone_num: newValue,
            verify_code: code1
        },
        success: function (res) {
            console.log(res);
            var notice = res && res[0] ? res[0] : ''
            if (notice != '') {
                $("#globalnotice").pshow({text: notice, state: "failure"});
                return;
            }

            frameModel.userInfo[pro] = newValue;
            $("#globalnotice").pshow({text: '手机修改成功', state: "success"});
            $(dom).parents(".able-edit").hide().prev().show();
            setUserInfo({phone_num: newValue});
            if (frameModel.selectedMenu && frameModel.selectedMenu.id == '1001') {
                $('iframe')[0].contentWindow.personController.queryPersonList();
            }
        },
        error: function (error) {
            $("#globalnotice").pshow({text: "手机修改失败！", state: "failure"})
        },
        complete: function () {
        }
    });
}
var s;
// var second;
//发送验证码
function sendCode(dom) {
    var second = 60;
    //发送验证码
    pajax.novalidGet({
        url: 'restUserService/smsSendCode',
        data: {
            phone_num: $('#phone-number').val()
        },
        success: function (res) {
            console.log(res);
        },
        error: function (error) {
            $("#globalnotice").pshow({text: "验证码发送失败！", state: "failure"})
        },
        complete: function () {
        }
    });
    $(dom).hide().next().show();

    var color = $(dom).css("color");
    if (color == "rgb(2, 169, 209)") {
        s = setInterval(function () {
            if (second > 0) {
                second--;
            }
            $(dom).hide().next().show().find("b").text(second);
            if (second == 0) {
                clearInterval(s);
                $(dom).show().next().hide();
            }
        }, 1000);
    }
};
//关闭弹窗
function closePersonPassword() {
    frameModel.person_password = '';
    frameModel.tips = '';
    $(".unable-edit").each(function () {
        $(this).show().next().hide();
    });

    clearPanel();

}
//验证原密码
function testVerificationCode(dom, value) {
    var value1 = value.replace(/\s+/g, '');
    if (value1 != '') {
        // $('#globalloading').pshow();
        pajax.post({
            url: 'restCustomerService/verifyCustomerPasswd',
            type: 'post',
            data: {
                custom_id: frameModel.companyInfo.customer_id,
                old_passwd: value
            },
            success: function (result) {
                frameModel.companyInfo.isOldPasswd = result && result[0] ? result[0].is_passwd : 2;//2为初始态
            },
            error: function (error) {
                $("#globalnotice").pshow({text: '验证原密码失败', state: "failure"});
            },
            complete: function () {
                // $('#globalloading').phide();
            }
        });
    } else {
        frameModel.companyInfo.isOldPasswd = 1;//为空状态
    }

}
//验证新密码格式
function testCodeformat(dom, value) {
    if (value.replace(/\s+/g, '') == '') {
        frameModel.companyInfo.formatCode = 1;
        return;
    }
    if (value.indexOf(' ') != -1 || value.length < 6) {
        frameModel.companyInfo.formatCode = false;
    } else {
        frameModel.companyInfo.formatCode = true;
        frameModel.companyInfo.newPassWord = value;
    }
}
//验证两次密码是否相同
function twoIfSame(dom, value) {
    if (value.replace(/\s+/g, '') == '') {
        frameModel.companyInfo.ifSame = 1;
        return;
    }
    frameModel.companyInfo.ifSame = value === frameModel.companyInfo.newPassWord;
}
//保存修改密码
function saveEditPassWord() {
    if (frameModel.companyInfo.isOldPasswd === true && frameModel.companyInfo.formatCode === true && frameModel.companyInfo.ifSame === true && frameModel.companyInfo.newPassWord) {
        $('#globalloading').pshow();
        var obj = {
            customer_id: frameModel.companyInfo.customer_id,                //客户id，必须
            old_passwd: frameModel.companyInfo.password,                  //旧密码，必须
            new_passwd: frameModel.companyInfo.newPassWord                 //新密码，必须
        };
        console.log(obj);
        pajax.update({
            url: 'restCustomerService/updateCustomerPasswd',
            data: obj,
            success: function (result) {
                closePersonPassword();
                logQuit();
            },
            error: function (err) {
                $("#globalnotice").pshow({text: '修改密码失败', state: "failure"});
            },
            complete: function () {
                $('#globalloading').phide();
            }
        });

    }
    // $('#globalloading').phide();

}
//清空密码面板
function clearPanel() {
    $(".person-edit-tab-white .input-div").each(function () {
        $(this).children("input").val('');
    });
    frameModel.companyInfo = {//公司信息  以下值，2-为初始态，1-为为空状态，true-为请求后可用状态，false-为请求后不可用状态
        isOldPasswd: 2,//是否为原密码
        formatCode: 2,//新密码格式
        newPassWord: '',//记录新密码
        ifSame: 2//两次密码验证相同与否
    }
    frameModel.imagePostObj = {};
    frameModel.imageIndex = null;
    frameModel.photoProjectId = '';
    frameModel.tips = '';//手机号报错
    $("#verifycode").val('')//验证码清空
}
//退出
function logQuit() {
    pajax.update({
        url: 'restUserService/logout',
        data: {},
        success: function (result) {
            pajax.loginOut();
        },
        error: function (err) {
        },
        complete: function () {
        }
    });
}
function clickUser() {
    queryPersonLoginInfo(model);
}
function selUserMenu(model) {
    $('.log-in-win').removeClass("interim");
    frameModel.person_password = model;
    if (model == '个人信息') {
        frameModel.isSelectedPersonInfo = true;
        for (var i = 0; i < frameModel.projectList.length; i++) {
            $("#projectImg" + i).pval([{
                url: frameModel.projectList[i].head_portrait,
                name: "systemPhoto" + i,
                suffix: "png",
                isNewFile: true
            }]);
        }
        if (frameModel.selectedMenu && frameModel.selectedMenu.id == '1001') {
            $('iframe')[0].contentWindow.hidePerDetailFloat();
            $('iframe')[0].contentWindow.personInfoModel.instance().perCheckSign = true;
        }
    } else if (model == '修改密码') {
    } else {
        logQuit();
    }
}
function spreadUserMenu() {
    console.log(1);
}
function changeProjectImg(event) {
    //对应正在进行修改图片的数据索引
    frameModel.imageIndex = event._currentTarget.id.replace(/projectImg/, '');
    frameModel.photoProjectId = frameModel.userInfo.project_persons[frameModel.imageIndex].project_id;
}
function updateImage(postObj) {
    $('#globalloading').pshow();
    var head_portrait = postObj.attachments[0].path;
    pajax.updateWithFile({
        url: 'restUserService/updatePersonById',
        data: postObj,
        success: function (result) {
            $("#globalnotice").pshow({text: '图片上传保存成功', state: "success"});
            var obj = {
                head_portrait: head_portrait,
                projectIndex: frameModel.imageIndex
            }
            setUserInfo(obj);
            if (frameModel.photoProjectId == frameModel.selectedProjectId) {
                frameModel.head = head_portrait;
            }
            $("#projectImg" + frameModel.imageIndex).precover()
            $("#projectImg" + frameModel.imageIndex).pval([{
                url: head_portrait,
                name: "systemPhoto" + frameModel.imageIndex,
                suffix: "png",
                isNewFile: true
            }]);
            frameModel.projectList[frameModel.imageIndex].head_portrait = head_portrait;

        },
        error: function (err) {
            $("#globalnotice").pshow({text: '图片上传保存失败', state: "failure"});
        },
        complete: function () {
            $('#globalloading').phide();
        }
    });
}
function uploadedProjectImg(model) {//上传图片
    if (model && JSON.stringify(model) != '{}') {
        //上传图片应该传的参数
        frameModel.imagePostObj = {
            person_id: frameModel.userInfo.person_id,
            project_id: frameModel.photoProjectId,
            attachments: [{
                path: model.showUrl,
                toPro: 'head_portrait',
                fileType: 1,
                fileName: model.name,
                isNewFile: true,
                fileSuffix: model.suffix
            }]
        };
        updateImage(frameModel.imagePostObj);
    }
}
function queryPersonLoginInfo(model) {
    pajax.post({
        url: 'restUserService/queryPersonLoginInfo',
        data: {
            user_id: frameModel.userInfo.person_id
        },
        success: function (result) {
            var data = result ? result : {};
            setUserInfo(data);
        },
        error: function (err) {
        },
        complete: function () {
        }
    });
}
