/*路由控制的实现*/
function controller() {
    this.tool = require('common/tool');
    this.path = require('path');
    this.restClient = require('common/restClient');
    this.responseTool = require('common/responseTool');
    this.tool2 = require('demoData/tool');
};

controller.prototype.rootReq = function (req, res, next) {
    var _this = this;
};

controller.prototype.getUserInfo = function (req, res, next) {
    var _this = this;
    return function (req, res, next) {
        var user = _this.tool.getUserInfo(req);
        res.send({user: user});
    };
}

controller.prototype.previewWorkOrderDraft = function (req, res, next) {
    var _this = this;
    return function (req, res, next) {
        var obj = req.query;
        var include = obj.order_id && obj.matters && obj.matters.length && obj.matters[0].desc_photos && obj.matters[0].desc_photos.length ? true : false;
        if (include) {
            //obj.matters[0].attachments = [];
            for (var i = 0; i < obj.matters[0].desc_photos.length; i++) {
                var oldResource = _this.path.basename(obj.matters[0].desc_photos[i]);
                var pwIndex = oldResource.indexOf('?');
                if (pwIndex > -1)
                    oldResource = oldResource.substring(0, pwIndex);
                var ooldPath = psecret.parser(oldResource);
                obj.matters[0].desc_photos[i] = ooldPath;
            }
        }
        var fn = 'restMyWorkOrderService/previewWorkOrder';
        if (typeof pconst == 'object')
            obj = JSON.parse(JSON.stringify(obj).replace(new RegExp('"' + pconst.emptyReplaceStr + '"', "g"), '""'));

        _this.restClient.request.sendPost({
            url: _config.serviceUrl,
            criteria: obj,
            fn: fn,
            isParserResult: true,
            call: function (err, result) {
                if (err) {
                    console.error('获取' + fn + '的数据err：' + (err.stack || JSON.stringify(err)));
                    return _this.responseTool.sendServerException(res);
                }
                var clientResult = _this.tool2.parseResult(result, fn, null);
                if (!clientResult)
                    return _this.responseTool.sendServerException(res, '请检查' + pconst.mapFileName + '文件是否有' + fn + '请求的配置');
                _this.responseTool.sendSuccess(res, clientResult);
            }
        });
    };
}

controller.prototype.publishWorkOrder = function (req, res, next) {
    var _this = this;
    return function (req, res, next) {
        var obj = req.body.wo_body;
        var include = obj.matters && obj.matters.length && obj.matters[0].attachments && obj.matters[0].attachments.length ? true : false;
        if (include) {
            //obj.matters[0].attachments = [];
            if (!obj.matters[0].desc_photos) obj.matters[0].desc_photos = [];
            for (var i = 0; i < obj.matters[0].attachments.length; i++) {
                var oldResource = _this.path.basename(obj.matters[0].attachments[i].path);
                var pwIndex = oldResource.indexOf('?');
                if (pwIndex > -1)
                    oldResource = oldResource.substring(0, pwIndex);
                var ooldPath = psecret.parser(oldResource);
                obj.matters[0].desc_photos[i] = ooldPath;
            }
        }
        var fn = 'restMyWorkOrderService/publishWorkOrder';
        if (typeof pconst == 'object')
            obj = JSON.parse(JSON.stringify(obj).replace(new RegExp('"' + pconst.emptyReplaceStr + '"', "g"), '""'));

        var objParam = {
            order_id: req.body.order_id,
            wo_body: obj,
            user_id: req.body.user_id,
            project_id: req.body.project_id
        }
        _this.restClient.request.sendPost({
            url: _config.serviceUrl,
            criteria: objParam,
            fn: fn,
            isParserResult: true,
            call: function (err, result) {
                if (err) {
                    console.error('获取' + fn + '的数据err：' + (err.stack || JSON.stringify(err)));
                    return _this.responseTool.sendServerException(res);
                }
                var clientResult = _this.tool2.parseResult(result, fn, null);
                if (!clientResult)
                    return _this.responseTool.sendServerException(res, '请检查' + pconst.mapFileName + '文件是否有' + fn + '请求的配置');
                _this.responseTool.sendSuccess(res, clientResult);
            }
        });
    };
}

controller.prototype.setUserInfo = function (req, res, next) {
    var _this = this;
    return function (req, res, next) {
        var last_project_id = req.query.last_project_id;
        var name = req.query.name;
        var id_number = req.query.id_number;
        var phone_num = req.query.phone_num;
        var gender = req.query.gender;
        var birthday = req.query.birthday;
        var head_portrait = req.query.head_portrait;
        var projectIndex = req.query.projectIndex;
        var project_persons = req.query.project_persons;

        var user = _this.tool.getUserInfo(req);
        if (last_project_id) user.last_project_id = last_project_id;
        if (name) user.name = name;
        if (id_number) user.id_number = id_number;
        if (phone_num) user.phone_num = phone_num;
        if (gender) user.gender = gender;
        if (birthday) user.birthday = birthday;
        if (head_portrait) {
            user.project_persons[projectIndex].head_portrait = head_portrait;
        }
        if (project_persons) user.project_persons = project_persons;

        _this.tool.storeUserInfo(req, res, user);
        res.send({user: user});
    };
}

controller.prototype.homepage = function (req, res, next) {
    return function (req, res, next) {
        res.render('./pages/basicMng/homepage/index', {host: commonLibUrl});
    };
}

controller.prototype.personManage = function (req, res, next) {
    return function (req, res, next) {
        res.render('./pages/basicMng/person/index', {host: commonLibUrl});
    };
}

controller.prototype.systemManage = function (req, res, next) {
    return function (req, res, next) {
        res.render('./pages/basicMng/system/index', {host: commonLibUrl});
    };
}

controller.prototype.scheduleManage = function (req, res, next) {
    var _this = this;
    return function (req, res, next) {
        var serviceUrl = _config.serviceUrl,
            user = _this.tool.getUserInfo(req),
            customer_id = user.person_id,
            project_id = user.last_project_id;

        res.render('./pages/basicMng/schedule/index', {
            host: commonLibUrl,
            serviceUrl: serviceUrl,
            customer_id: customer_id,
            project_id: project_id
        });
    };
}

controller.prototype.equipmentMng = function (req, res, next) {
    var _this = this;
    return function (req, res, next) {

        // 获取用户信息
        var user = _this.tool.getUserInfo(req),
            tool_type = "Web",
        // 过滤成当前的项目
            filter = user.project_persons.filter(function (item) {
                return item.project_id == user.last_project_id;
            });

        // 获取获取当前的工具类型
        if (filter.length) {
            tool_type = filter[0]["tool_type"] == 'Revit' ? "Revit" : "Web";
        }

        res.render('./pages/equipmentSpace/equipmentMng/index', {host: commonLibUrl, tool_type: tool_type});
    };
}

controller.prototype.spaceMng = function (req, res, next) {
    var _this = this;
    return function (req, res, next) {
        // 获取用户信息
        var user = _this.tool.getUserInfo(req),
            tool_type = "Web",
        // 过滤成当前的项目
            filter = user.project_persons.filter(function (item) {
                return item.project_id == user.last_project_id;
            });

        // 获取获取当前的工具类型
        if (filter.length) {
            tool_type = filter[0]["tool_type"] == 'Revit' ? "Revit" : "Web";
        }
        res.render('./pages/equipmentSpace/spaceMng/index', {host: commonLibUrl, tool_type: tool_type});
    };
}

controller.prototype.equipmentAddress = function (req, res, next) {
    return function (req, res, next) {
        res.render('./pages/equipmentSpace/equipmentAddress/index', {host: commonLibUrl});
    };
}

controller.prototype.printCard = function (req, res, next) {
    return function (req, res, next) {
        res.render('./pages/equipmentSpace/printCard/index', {host: commonLibUrl});
    };
}

controller.prototype.workOrderConfig = function (req, res, next) {
    return function (req, res, next) {
        res.render('./pages/workOrder/workOrderConfig/index', {host: commonLibUrl});
    };
}

controller.prototype.myWorkOrder = function (req, res, next) {
    return function (req, res, next) {
        res.render('./pages/workOrder/myWorkOrder/index', {host: commonLibUrl});
    };
}

controller.prototype.planMonitor = function (req, res, next) {
    return function (req, res, next) {
        res.render('./pages/workOrder/planMonitor/index', {host: commonLibUrl});
    };
}

controller.prototype.workOrderMng = function (req, res, next) {
    return function (req, res, next) {
        res.render('./pages/workOrder/workOrderMng/index', {host: commonLibUrl});
    };
}

controller.prototype.SOP = function (req, res, next) {
    return function (req, res, next) {
        res.render('./pages/workOrder/SOP/index', {host: commonLibUrl});
    };
}

module.exports = new controller();