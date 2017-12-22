var controllerupload = {

}


;
(function () {

    window.yyyyMM2Date = function (month) {
        var arrmonth = Array.prototype.slice.call(month);

        return new Date(arrmonth.splice(0, 4).join('') + '/' + arrmonth.join('') + '/01');
    }

    // 获取每个月的日期 星期
    function getTime(month) {

        // 传入的yyyyMM 转换成时间类型
        month = month ? yyyyMM2Date(month) : void 0;

        var time = month ? month : new Date,
            year = time.getFullYear(),
            month = time.getMonth() + 1,
            startTime = new Date(year + "-" + month + "-01"),
            endTime = new Date(new Date((month == 12 ? year + 1 : year) + "-" + (month == 12 ? 1 : (month + 1)) + "-01") - 86400000);

        var weekEnum = ["日", "一", "二", "三", "四", "五", "六"];

        return _.range(endTime.getDate() - startTime.getDate() + 1).map(function (item, index) {

            var week = weekEnum[new Date(+startTime + index * 24 * 60 * 60 * 1000).getUTCDay()]

                ++index;
            return {
                date: index,
                week: week,
            };
        });
    };

    // Execel 返回格式转换成对应的Object 类型
    function Exe2Data(month, data, cb) {

        // 返回的头和内容
        var tableHead, tableBody;

        // 数据转换开始
        // 去最开始的0
        var arr = data.map(function (item) {
            item.columns.shift()
            return item.columns;
        });

        var DateList = getTime(month),
            dateList = [],
            weekList = [];

        DateList.forEach(function (element) {
            dateList.push(element.date);
            weekList.push(element.week);
        });

        // 绑定给对应的头两行数据
        arr[0] = arr[0].splice(0, 3).concat(weekList);
        arr[1] = arr[1].splice(0, 3).concat(dateList);

        // 分出头的内容
        tableHead = arr.splice(0, 2);

        // 查询所有班次的类型做判断，来判断的内容部分是否有不错误的内容
        querySchedulingConfig(function (list) {

            // 获取所有类型的集合
            var keylist = list.map(function (item) {

                return item.code.toString();
            })

            tableBody = arr.map(function (item, index) {

                return dateList.reduce(function (con, item, index) {

                    // 当返回的长度小于当前的长度的时候的补充空表的部分
                    if (con.length - 3 == index) {

                        con.push('');
                    }
                    return con;
                }, item);
            }).map(function (item) {

                return item.map(function (str, index) {

                    return {
                        str: str,
                        isError: index > 2 ? (str ? keylist.indexOf(str) == -1 : false) : false,
                    }
                })
            });

            cb(tableHead, tableBody, data);
        })

    }

    window.uploadSchedulingFile = function (val, month, cb) {

        pajax.updateWithFile({
            url: 'restSchedulingService/uploadSchedulingFile',
            data: {
                month: month, //月份, 格式：yyyyMM，必须
                attachments: {
                    path: val.url,
                    toPro: 'file',
                    multiFile: false,
                    fileName: val.name,
                    fileSuffix: val.suffix,
                    isNewFile: true,
                    fileType: 2,
                }
            },
            success: function (data) {
                data = data.filter(function (item) {
                    return item.columns.filter(function (code) {
                        return !!code;
                    }).length > 1;
                })

                v.instance.tabledata = JSON.parse(JSON.stringify(data));
                Exe2Data(month, data, cb);
            }
        });
    }

    //排班管理-排班表主页:查询目前排班计划 (web端)
    window.queryMonthSchedulingForWeb = function (month, cb) {

        $("#globalloading").pshow()
        pajax.post({
            url: 'restSchedulingService/queryMonthSchedulingForWeb',
            data: {
                month: month
            },
            success: function (data) {
                if (data.data.length) {
                    Exe2Data(month, data.data, cb);
                } else {
                    cb([], [], data.data);
                }
            },
            complete: function () {
                $("#globalloading").phide()
            },
        });


    }


    // 获取排版设置
    window.querySchedulingConfig = function (cb) {

        $("#globalloading").pshow()
        pajax.post({
            url: 'restSchedulingConfigService/querySchedulingConfig',
            data: {},
            success: function (data) {
                cb(data.data);
            },
            complete: function () {
                $("#globalloading").phide()
            },
        });
    }

    // 排班管理-排班表主页:添加排班信息
    window.saveOrUpdateSchedulingConfig = function (contents, cb) {

        pajax.post({
            url: 'restSchedulingConfigService/saveOrUpdateSchedulingConfig',
            data: {
                scheduling_configs: contents,
            },
            success: function (data) {
                $("#uploadpnotice").pshow({
                    text: '保存成功',
                    state: "success"
                });
                cb(data);
            },
            error: function () {
                $("#uploadpnotice").pshow({
                    text: '保存失败',
                    state: "failure"
                });
            },
            complete: function () {

            },
        });
    }

    window.saveSchedulingPlan = function (argu, cb) {

        $("#globalloading").pshow()
        pajax.post({
            url: 'restSchedulingService/saveSchedulingPlan',
            data: {
                month: v.instance.month,
                contents: argu,
            },
            success: function (data) {
                $("#uploadpnotice").pshow({
                    text: "发布成功！",
                    state: "success"
                });
                Object.prototype.toString.call(cb).slice(8, -1) == 'Function' ? cb(data) : void 0;
            },
            error: function () {
                $("#uploadpnotice").pshow({
                    text: "发布失败！",
                    state: "failure"
                });
            },
            complete() {
                $("#globalloading").phide()
            }
        });

    }

    window.queryPersonList = function () {


        return new Promise(function (resolve, reject) {

            pajax.post({
                url: 'restPersonService/queryPersonList',
                data: {
                    person_status: "1",
                },
                success: function (data) {
                  resolve(data.data);
                },
                error: function (error) {

                    reject(error);
                },
                complete() {
                    
                }
            });

        })

    }

})();