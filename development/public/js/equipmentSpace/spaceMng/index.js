$(function () {
    $("#spaceMoleMange").show();
    var instance = spaceInfoModel.instance();
    spaceInfoController.init();

    spceBindClick();

    $(document).on("click", function () {
        floatTipHide();
    });
});
