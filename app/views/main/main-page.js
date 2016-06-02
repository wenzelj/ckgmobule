var frames = require("ui/frame");
var platform = require("platform");
var vmModule = require("./main-view-model");
var utilityModule = require("utils/utils");

var twoPaneLayout = Math.min(platform.screen.mainScreen.widthDIPs, platform.screen.mainScreen.heightDIPs) > 600;
function pageLoaded(args) {
    var page = args.object;
    page.bindingContext = vmModule.mainViewModel;
}
exports.pageLoaded = pageLoaded;

exports.website = function() {
    console.log('launch website');
    utilityModule.openUrl("https://www.ckgconsulting.co.za/");
}
exports.facebook = function() {
    console.log('launch facebook');
    utilityModule.openUrl("https://www.facebook.com/people/Gerrie-Kirton/100009234595792");
}

function listViewItemTap(args) {
    if (!twoPaneLayout) {
        frames.topmost().navigate("views/details/details-page");
    }

    vmModule.mainViewModel.set("selectedItem", args.view.bindingContext);
}
exports.listViewItemTap = listViewItemTap;

function enableLocationTap(args) {
    if (!geolocation.isEnabled()) {
        geolocation.enableLocationRequest();
    }
}
exports.enableLocationTap = enableLocationTap;



// var observable = require("data/observable");
// function pageLoaded(args) {
//     var page = args.object;
//     var emptyContext = new observable.Observable();
//     page.bindingContext = emptyContext;
// }
// exports.pageLoaded = pageLoaded;
