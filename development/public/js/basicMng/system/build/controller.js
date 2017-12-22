var controllerbuild = {
    queryBuildList: function (cb) {

        $("#globalloading").pshow()
        pajax.post({
            url: 'restCustomerService/queryBuildList',
            data: {},
            success: function (data) {
                Object.prototype.toString.call(cb).slice(8, -1) == 'Function' ? cb(data.data) : void 0;
            },
            complete: function () {
                $("#globalloading").phide()
            },
        });

    },
    queryBuildInfo: function (argu, cb) {

        $("#globalloading").pshow();
        pajax.post({
            url: 'restCustomerService/queryBuildInfo',
            data: argu,
            success: function (data) {

                // 判断如果建筑信息的中没有返回建筑模型字段，则赋一个空值。
                if (!_.isArray(data.consum_model)) {

                    data.consum_model = [];
                }

                Object.prototype.toString.call(cb).slice(8, -1) == 'Function' ? cb(data) : void 0;
            },
            complete: function () {
                $("#globalloading").phide()
            },
        });
    },
    // 验证本地建筑编码
    verifyBuildingLocalId: function (argu, cb) {

        pajax.post({
            url: 'restCustomerService/verifyBuildingLocalId',
            data: argu,
            success: function (data) {

                Object.prototype.toString.call(cb).slice(8, -1) == 'Function' ? cb(data) : void 0;
            },
            error: function () {

            }
        });

    },
    updateBuildInfo: function (argu, cb) {

        // 循环将修改的参数数字参数修改为字符串
        for (var key in argu) {
            if (argu.hasOwnProperty(key)) {
                var element = argu[key];

                if (Object.prototype.toString.call(element).slice(8, -1) == "Number") {
                    argu[key] = element.toString();
                }
            }
        };

        if (argu["info_point_code"] == "build_local_id") {

            this.verifyBuildingLocalId({
                "build_id": v.instance.BuildInfo.build_code,                 //建筑id，编辑时必须
                "build_local_id": argu.info_point_value             //建筑本地编码，必须,
            }, function (data) {

                // 验证成功后提交
                if (data.can_use) {

                    pajax.post({
                        url: 'restCustomerService/updateBuildInfo',
                        data: argu,
                        success: function (data) {
                            $("#systempnotice").pshow({
                                text: "修改成功！",
                                state: "success"
                            });
                            Object.prototype.toString.call(cb).slice(8, -1) == 'Function' ? cb(data) : void 0;
                        },
                        error: function () {
                            $("#systempnotice").pshow({
                                text: "修改失败！",
                                state: "failure"
                            });
                        }
                    });
                } else {

                    $("#systempnotice").pshow({
                        text: "建筑体本地编码与现有建筑体本地编码重复",
                        state: "failure"
                    });

                }

            })
        } else {

            pajax.post({
                url: 'restCustomerService/updateBuildInfo',
                data: argu,
                success: function (data) {
                    $("#systempnotice").pshow({
                        text: "修改成功！",
                        state: "success"
                    });
                    Object.prototype.toString.call(cb).slice(8, -1) == 'Function' ? cb(data) : void 0;
                },
                error: function () {
                    $("#systempnotice").pshow({
                        text: "修改失败！",
                        state: "failure"
                    });
                }
            });

        }
    },
    // 修改建筑体信息
    updateBuildInfoFile: function (argu, cb) {

        pajax.updateWithFile({
            url: 'restCustomerService/updateBuildInfo',
            data: argu,
            success: function (data) {
                $("#systempnotice").pshow({
                    text: "修改成功！",
                    state: "success"
                });
                Object.prototype.toString.call(cb).slice(8, -1) == 'Function' ? cb(data) : void 0;
            },
            error: function () {
                $("#systempnotice").pshow({
                    text: "修改失败！",
                    state: "failure"
                });
            }
        });
    },
    //查询方位信息
    queryAllDirectionCode: function (cb) {
        pajax.post({
            url: 'restDictService/queryAllDirectionCode',
            data: {},
            success: function (data) {
                Object.prototype.toString.call(cb).slice(8, -1) == 'Function' ? cb(data.data) : void 0;
            },
            error: function () {

            }
        });
    },
    queryAllBuildingCode: function (cb) {


        pajax.post({
            url: 'restDictService/queryAllBuildingCode',
            data: {},
            success: function (data) {
                Object.prototype.toString.call(cb).slice(8, -1) == 'Function' ? cb(data.data) : void 0;
            },
            error: function () {

            }
        });
    },
    queryBuildInfoPointHis: function (info_point_code, cb) {

        pajax.post({
            url: 'restCustomerService/queryBuildInfoPointHis',
            data: {
                info_point_code: info_point_code,
                build_code: v.instance.BuildInfo.build_code
            },
            success: function (data) {
                function convert(str) {

                    var str = new Object(str).toString();

                    if (!_.isString(str) && /^\d{14}$/.test(str)) throw new Error('arguments must be a String of "yyyyMMddhhmmss"');



                    var y = str.slice(0, 4);
                    var M = str.slice(4, 6);
                    var d = str.slice(6, 8);
                    var h = str.slice(8, 10);
                    var m = str.slice(10, 12);
                    var s = str.slice(12, 14);

                    return new Date(`${y}/${M}/${d} ${h}:${m}:${s}`);
                };
                var arr = _.isArray(data.data) ? data.data.map(function (item) {

                    item.date = convert(item.date);

                    item.value = item.name != "--" ? item.name : item.value;

                    return item;
                }) : [];
                Object.prototype.toString.call(cb).slice(8, -1) == 'Function' ? cb(arr.slice(0, 3)) : void 0;
            },
            error: function () {

            }
        });
    },

}