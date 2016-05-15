var vmModule = require("../main/main-view-model");
function pageNavigatedTo(args) {
    var page = args.object;
    page.bindingContext = vmModule.mainViewModel.get("selectedItem");
}
exports.pageNavigatedTo = pageNavigatedTo;
