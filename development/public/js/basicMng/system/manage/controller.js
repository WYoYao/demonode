var controllermanage = {
    queryCustomerById: function(cb) {

        $("#globalloading").pshow()
        pajax.post({
            url: 'restCustomerService/queryCustomerById',
            data: {},
            success: function(data) {
                Object.prototype.toString.call(cb).slice(8, -1) == 'Function' ? cb(data || new Customer()) : void 0;
            },
            complete: function() {
                $("#globalloading").phide()
            },
        });
    }
}