var controllerInsert = {
    querySystemForBuild: function (build_id) {

        return new Promise(function (resolve, reject) {

            pajax.post({
                url: 'restObjectService/querySystemForBuild',
                data: {
                    build_id: build_id
                },
                success: function (data) {
                    resolve(data.data || []);
                },
                error: function () {
                    reject(err);
                },
                complete: function () {

                },
            });
        })

    },
    addEquip: function (argu) {

        return new Promise(function (resolve, reject) {

            var str = JSON.stringify(argu);

            if (argu.attachments.length > 0) {
                bool = true;
            } else if (str.match(/attachments/g).length > 1) {
                bool = true;
            } else {
                bool = false;
            }

            if (!argu.attachments.length) {
                delete argu.attachments;
            } else {

            }

            argu = ['build_name', 'system_name', 'equip_category_name'].reduce(function (con, key) {

                if (con[key]) {
                    delete con[key];
                };

                return con;
            }, argu);

            // 如果有空间ID删除对应的建筑ID  没有空间ID 删除对应的空间ID
            if (argu.hasOwnProperty("space_id") && argu["space_id"]) delete argu["build_id"];
            else delete argu["space_id"];

            pajax[bool ? 'updateWithFile' : 'post']({
                url: 'restEquipService/addEquip',
                data: argu,
                success: function (data) {
                    $("#globalnotice").pshow({
                        text: "添加成功",
                        state: "success"
                    });
                    resolve();
                },
                error: function () {
                    $("#globalnotice").pshow({
                        text: "添加失败",
                        state: "failure"
                    });
                    reject(err);
                },
                complete: function () {

                },
            });
        })
    },
    /**
     * 设备管理-新增页:查询设备动态信息
     */
    queryEquipDynamicInfoForAdd: function (equip_category) {

        return new Promise(function (resolve, reject) {
            pajax.post({
                url: 'restEquipService/queryEquipDynamicInfoForAdd',
                data: {
                    equip_category: equip_category
                },
                success: function (data) {
                    resolve(data.data);
                },
                error: function () {
                    reject(err);
                },
                complete: function () {

                },
            });
        })
    },
    /**
     *设备管理-新增页/编辑页:验证设备编码是否可以使用 
     */
    verifyEquipLocalId: function (argu) {

        return new Promise(function (resolve, reject) {
            pajax.post({
                url: 'restEquipService/verifyEquipLocalId',
                data: argu,
                success: function (res) {
                    resolve(res);
                },
                error: function (err) {
                    reject(err);
                },
                complete: function () {

                },
            });
        })
    },
    /**
     * 设备管理-新增页/编辑页:验证设备BIM编码是否可以使用
     */
    verifyEquipBimId: function (argu) {

        return new Promise(function (resolve, reject) {
            pajax.post({
                url: 'restEquipService/verifyEquipBimId',
                data: argu,
                success: function (res) {
                    resolve(res);
                },
                error: function (err) {
                    reject(err);
                },
                complete: function () {

                },
            });
        })
    },
    addCompanyBrand: function (argu) {

        return new Promise(function (resolve, reject) {
            pajax.post({
                url: 'restEquipCompanyService/addCompanyBrand',
                data: argu,
                success: function (res) {
                    resolve();
                },
                error: function (err) {
                    reject(err);
                },
                complete: function () {

                },
            });
        })
    },
    addCompanyInsurerNum: function (argu) {

        return new Promise(function (resolve, reject) {
            pajax.post({
                url: 'restEquipCompanyService/addCompanyInsurerNum',
                data: argu,
                success: function (res) {
                    resolve();
                },
                error: function (err) {
                    reject(err);
                },
                complete: function () {

                },
            });
        })
    }
}