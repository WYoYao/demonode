var controllerword = {

    queryNounTypeList: function(cb) {
  
        pajax.post({
            url: 'restNounService/queryNounTypeList',
            data: {},
            success: function(data) {
                Object.prototype.toString.call(cb).slice(8, -1) == 'Function' ? cb(data.data) : void 0;
            },
            complete: function() {
           
            },
        });
    },
    queryNounList: function(noun_type, cb) {
        $("#globalloading").pshow()
        pajax.post({
            url: 'restNounService/queryNounList',
            data: { noun_type: noun_type },
            success: function(data) {
                Object.prototype.toString.call(cb).slice(8, -1) == 'Function' ? cb(data.data) : void 0;
            },
            complete: function() {
                $("#globalloading").phide()
            },
        });
    },
    updateNounById: function(argu, cb) {
        pajax.post({
            url: 'restNounService/updateNounById',
            data: argu,
            success: function(data) {
                cb();
                $("#systempnotice").pshow({ text: "修改成功！", state: "success" });
            },
            error: function() {
                $("#systempnotice").pshow({ text: "修改失败！", state: "failure" });
            },
        });
    }

}