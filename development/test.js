//循环解析参数，以便深层次的逐一上传文件
function parseAttachment(dataParamArr) {
    // 保存自身的方法用于递归
    parseAttachment = arguments.callee;

    //循环修改数组对象
    dataParamArr.forEach(function (currDataParam) {

        // 过滤掉正则 和 基本类型
        var keys = Object.keys(currDataParam).filter(function (key) {

            var type = Object.prototype.toString.call(currDataParam[key]).slice(8, -1);
            return (type == 'Object' || type == 'Array') && currDataParam.hasOwnProperty(key);
        })

        for (var proName in keys) {

            var proValue = currDataParam[proName];
            //  上传类型字段执行上传
            if (proName == pconst.attachments) {
                var attachments = proValue instanceof Array == true ? proValue : [proValue];
                fileCount += attachments.length;

                for (var y = 0; y < attachments.length; y++) {
                    var currAttachment = attachments[y];
                    var oldResource = _this.path.basename(currAttachment.path);

                    //替换后面的?ft=1
                    oldResource = /(\?ft)=\d{1}$/g.test(oldResource) ? oldResource.replace(/(\?ft)=\d{1}$/g, '') : oldResource;

                    currAttachment.path = oldResource;
                    // 判断是否是新文件
                    if (currAttachment.isNewFile == true) {
                        var tempName = currAttachment.path;
                        var basePath = _this.path.join(_this.fileOper.uploadPath, tempName);
                        if (!_this.fs.existsSync(basePath)) {
                            console.error('文件' + basePath + '不存在');
                            isValidError = true;
                            return _this.responseTool.sendServerException(res);
                        }

                        var time = new Date().getTime();
                        var randomStr = (Math.random() + '').substr(2);
                        var key = time + randomStr;
                        key = key.substr(0, 30);
                        var middle = 30 - key.length;
                        for (var i = 0; i < middle; i++) {
                            key += '1';
                        }
                        key += (currAttachment.fileName || '') + '.' + (currAttachment.fileSuffix || '');

                        var uploadInfo = {
                            systemCode: systemCode,
                            secret: secret,
                            path: basePath,
                            fileName: currAttachment.fileName,
                            fileSuffix: currAttachment.fileSuffix,
                            key: key,
                            fileType: currAttachment.fileType
                        };

                        (function (attachment, oldAttachment, oldDataParam, _key) {
                            var uploadObjParam = {
                                data: attachment,
                                fn: pconst.requestType.pupload
                            };
                            startSendBefore.call(_this, req, _this.requestTypes.upload, uploadObjParam, null, function (uploadErr, uploadResult) {
                                if (isValidError || isUploadError) return;

                                if (uploadErr) {
                                    pLogger.error('文件上传失败：' + (uploadErr.stack || JSON.stringify(uploadErr)));
                                    isUploadError = true;
                                    return _this.responseTool.sendServerException(res);
                                }
                                ++alreadyFileCount;

                                var fileInfos = uploadResult || [];
                                var newProName = oldAttachment.toPro;
                                if (oldAttachment.multiFile == true) {
                                    if (oldDataParam[newProName] == null) oldDataParam[newProName] = [];
                                    oldDataParam[newProName].push(_key);
                                    // 20170911 修改请求参数中的值修改的上传中的key值  leo
                                    // oldDataParam[newProName].push((fileInfos[0] || {}).id || '');
                                } else
                                    oldDataParam[newProName] = _key;

                                if (fileCount == alreadyFileCount) _sendStart();
                            });
                        })(uploadInfo, currAttachment, currDataParam, key);
                    } else {
                        ++alreadyFileCount;
                        var ooldPath = psecret.parser(currAttachment.path);
                        var newProName = currAttachment.toPro;
                        if (currAttachment.multiFile == true) {
                            if (currDataParam[newProName] == null) currDataParam[newProName] = [];
                            currDataParam[newProName].push(ooldPath);
                        } else currDataParam[newProName] = ooldPath;
                    }
                }
                // 删除原有的 attachments
                delete currDataParam[proName];
                continue;
            }

            // Obejct进行递归
            if (Object.prototype.toString.call(proValue).slice(8, -1) == 'Obejct') {
                parseAttachment([proValue]);
                continue;
            }
            // Array 进行递归
            if (Object.prototype.toString.call(proValue).slice(8, -1) == 'Array') {
                parseAttachment(proValue);
                continue;
            }
        }
    })
};