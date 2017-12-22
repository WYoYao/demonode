// 上传进度
var scheduleUploadSuccessfull = function () {

    var arr = $("#upload").pval();
    arr = arr.concat($("#upload1").pval());
    if (!arr.length) return;

    var val = $("#upload").pval()[0] || $("#upload1").pval()[0];

    if (/[(|)|\s]+/.test(val.name)) {
        $("#uploadpnotice").pshow({
            text: '上传文件名中不能有空格括号等字符',
            state: "failure"
        });
        $("#upload").precover();
        $("#upload1").precover()
        return;
    }

    if ($("#upload1").pval().length) {
        v.instance.state = 1;
    }

    v.instance.onPage = 'show';

    var uploadScheduling = new Promise(function (resolve) {
        uploadSchedulingFile(val, v.instance.month, function (tableHead, tableBody, data) {

            // 绑定的头部内容和发布的内容
            v.instance.tableHead = tableHead;
            resolve(tableBody);
        })
    })

    var SchedulingForWeb = new Promise(function (resolve) {

        queryMonthSchedulingForWeb(v.instance.selectmonth, function (tableHead, tableBody, data) {

            resolve(tableBody);
        })

    });

    var argums = {};

    // 合并两个对象
    function ext(data) {
        // argums[key] = data;
        // if (Object.keys(argums).length != 2) return;

        // if (!argums['SchedulingForWeb'].length) {

        //     v.instance.tableBody = argums['uploadScheduling'];
        //     return;
        // }

        var res = {
            nameList: [],
            phoneList: [],
        };

        queryPersonList().then(function (list) {

            list.reduce(function (con, item) {

                con.nameList.push(item.name);
                con.phoneList.push(item.phone_num);
                return con;
            }, res);

            data.forEach(function (item) {

                // 获取每行的任务
                var info = item[0],
                    name = item[0].str,
                    tel = item[1].str;

                if (!/^1[3|4|5|7|8][0-9]{9}$/.test(tel)) {
                    info.isErrorWord = '此电话号码无效！'
                }

                if (res.phoneList.indexOf(tel) == -1) {
                    info.isErrorWord = '此用户当前尚未被录入系统！'
                }
            });

            v.instance.tableBody = data;

        })
    }

    // 下载文档中的进度查询
    // SchedulingForWeb.then(function (tbody) {
    //     ext('SchedulingForWeb', tbody);

    //     $("#upload").precover();
    // });

    // 上传文档的班次查询
    uploadScheduling.then(function (tbody) {
        ext(tbody);
    });

    $("#upload1").precover();

}

// 修改上传的日期控件
var changeMonth = function (data) {

    // // 获取当前时间点
    // var nwdate = new Date();
    // // 后面一个月
    // var eddate = +(new Date(+nwdate + 1 * 30 * 24 * 60 * 60 * 1000).format("yyyyMM"));
    // // 前面6个月
    // var stdate = +(new Date(+nwdate - 6 * 30 * 24 * 60 * 60 * 1000).format("yyyyMM"));
    // // 当前选中的时间
    // var dateIndex = +(new Date($("#" + v.instance.monthId + "").psel().startTime).format("yyyyMM"));

    // if (dateIndex < stdate || dateIndex > eddate) {

    //     // $("#uploadpnotice").pshow({
    //     //     text: "当前日期节点无效",
    //     //     state: "failure"
    //     // });

    //     v.instance.noData = true;

    //     $("#upload").precover();

    //     // $("#" + v.instance.monthId + "").psel({
    //     //     y: +nwdate.format("yyyy"),
    //     //     M: +nwdate.format("MM")
    //     // })

    //     // $("#" + v.instance.getMonthId + "").psel({
    //     //     y: +nwdate.format("yyyy"),
    //     //     M: +nwdate.format("MM")
    //     // })

    //     // changeSelectMonth();
    //     return;
    // }
    // v.instance.noData = false;

    var res = $(`#${v.instance.monthId}`).psel().startTime.replace(/\-/, '');

    if (res != v.instance.month) {

        $("#upload").precover();
        $("#upload1").precover();

        v.instance.month = res;

        var date = yyyyMM2Date(v.instance.month);

        $(`#${v.instance.getMonthId}`).psel({
            y: date.format('yyyy'),
            M: date.format('MM'),
        })
    }

}

// 修改展示的日期控件
var changeSelectMonth = function () {

    v.instance.selectmonth = $("#" + v.instance.getMonthId + "").psel().startTime.replace(/\-/, '');

    var date = yyyyMM2Date(v.instance.selectmonth);

    $(`#${v.instance.monthId}`).psel({
        y: date.format('yyyy'),
        M: date.format('MM'),
    })

    // 获取当前时间点
    var nwdate = new Date();
    // 后面一个月
    var eddate = +(new Date(+nwdate + 1 * 30 * 24 * 60 * 60 * 1000).format("yyyyMM"));
    // 前面6个月
    var stdate = +(new Date(+nwdate - 6 * 30 * 24 * 60 * 60 * 1000).format("yyyyMM"));
    // 当前选中的时间
    var dateIndex = +(new Date($("#" + v.instance.getMonthId + "").psel().startTime).format("yyyyMM"));
    // 验证时间
    v.instance.noData = dateIndex < stdate || dateIndex > eddate;
    // 验证时间不通过直接的放弃查询
    if (v.instance.noData) {
        v.instance.state = 1;
        v.instance.onPage = 'upload';
        return;
    }

    queryMonthSchedulingForWeb(v.instance.selectmonth, function (tableHead, tableBody, data) {

        if (tableHead.length && tableBody.length) {
            v.instance.onPage = 'show';
            v.instance.tableHead = tableHead;
            v.instance.tableBody = tableBody;

            v.instance.state = 2;
        } else {
            v.instance.state = 1;
            v.instance.onPage = 'upload';
        }
    })
}