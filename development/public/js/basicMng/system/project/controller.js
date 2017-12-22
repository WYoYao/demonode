var controllerproject = {
    queryProjectInfo: function(cb) {

        $("#globalloading").pshow()
        pajax.post({
            url: 'restCustomerService/queryProjectInfo',
            data: {},
            success: function(data) {
                Object.prototype.toString.call(cb).slice(8, -1) == 'Function' ? cb(data) : void 0;
            },
            complete: function() {
                $("#globalloading").phide()
            },
        });

    },
    queryProjectInfoPointHis: function(info_point_code, cb) {


        pajax.post({
            url: 'restCustomerService/queryProjectInfoPointHis',
            data: { info_point_code: info_point_code },
            success: function(data) {
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
                var arr = _.isArray(data.data) ? data.data.map(function(item) {

                    item.date = convert(item.date);
                    item.value=item.name!="--"?item.name:item.value;

                    return item;
                }).slice(0,3) : [];
                Object.prototype.toString.call(cb).slice(8, -1) == 'Function' ? cb(arr) : void 0;
            },
            complete: function() {

            },
        });

    },
    updateProjectInfo: function(res, cb) {


        // console.log(`测试数据后面需删除Start`);
        // setTimeout(function() {
        //     $("#systempnotice").pshow({ text: "修改成功！", state: "success" });
        //     Object.prototype.toString.call(cb).slice(8, -1) == 'Function' ? cb() : void 0;

        // })
        // console.log(`测试数据后面需删除End`);
        // return;


        pajax.post({
            url: 'restCustomerService/updateProjectInfo',
            data: res,
            success: function(data) {
                if (!Object.keys(data).length) {
                    cb();
                    $("#systempnotice").pshow({ text: "修改成功！", state: "success" });
                }
            },
            error: function() {
                $("#systempnotice").pshow({ text: "修改失败！", state: "failure" });
            },
            complete: function() {},
        });

    }
}