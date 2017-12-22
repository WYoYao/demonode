v.pushComponent({
    name: 'word',
    data: {
        nounTypeList: [],
        enumList: {

        },
        showlist: [],
        wordInfo: {},
        isIDE: false,
    },
    methods: {
        _queryDeatil: function (item) {

            var _that = this,
                noun_type = item.noun_type;

            _that.nounTypeList = _that.nounTypeList.map(function (info) {

                info.isSelecd = info.noun_type == noun_type;
                return info;
            })

            // 有的情况下不再执行查询
            if (_that.enumList[noun_type].length) {

                _that.showlist = _that.enumList[noun_type];
            } else {

                controllerword.queryNounList(noun_type, function (arr) {

                    _that.enumList[noun_type] = arr;
                    _that.showlist = _that.enumList[noun_type];
                })
            }
        },
        _changeCustomerUse: function (item, index) {

            var _that = this;

            _that.hideFloatWindow();

            item.customer_use = !item.customer_use;

            this.showlist[index] = item;

            var req = {
                "dict_id": item.dict_id, //名词主键id,必须
                "customer_use": item.customer_use, //是否使用该项
                "customer_name": item.customer_name //本地名称
            };

            controllerword.updateNounById(req, function () { })
        },
        _ideitem: function (item, index) {
            var _that = this;

            this.wordInfo = Object.assign({}, item);
            this.wordInfo.index = index;

            _that.isIDE = true;
            $("#floatWindow").pshow();

        },
        saveWordInfo: function () {

            var _that = this;

            if (!$("#ide_customer_names").pverifi()) {
                return;
            }

            this.showlist[this.wordInfo.index].customer_name = this.wordInfo.customer_name;
            this.showlist[this.wordInfo.index].customer_use = this.wordInfo.customer_use;

            var req = {
                "dict_id": this.wordInfo.dict_id, //名词主键id,必须
                "customer_use": this.wordInfo.customer_use, //是否使用该项
                "customer_name": this.wordInfo.customer_name //本地名称
            };

            controllerword.updateNounById(req, function () {
                _that.hideFloatWindow();
            })
        },
        hideFloatWindow: function () {
            var _that = this;
            $("#floatWindow").phide();
            setTimeout(() => {
                _that.isIDE = false;
            }, 500);
        }

    },
    beforeMount: function () {
        var _that = this;
        controllerword.queryNounTypeList(function (arr) {
            // 赋值类型列表
            _that.nounTypeList = arr;

            // 赋值列表类型
            arr.map(function (item) {

                return item.noun_type;
            }).reduce(function (con, key) {

                con[key] = [];
                return con;
            }, _that.enumList);


            setTimeout(() => {
                $(".word .left .title").eq(0).click();
            }, 0);

        });
    },
});

$(function () {
    $(document).on("click", function () {
        $("#floatWindow").phide();
        setTimeout(() => {
            v.instance.isIDE = false;
        }, 500);
    });

    $("#floatWindow").click(function (event) {
        event.stopPropagation();
    });
})