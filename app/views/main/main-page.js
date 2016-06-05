var frames = require("ui/frame");
var platform = require("platform");
var vmModule = require("./main-view-model");
var utilityModule = require("utils/utils");
var geolocation = require("nativescript-geolocation");
var observable = require("data/observable");
var observableArray = require("data/observable-array");	
var http = require("http");

var twoPaneLayout = Math.min(platform.screen.mainScreen.widthDIPs, platform.screen.mainScreen.heightDIPs) > 600;

var viewModel = new observable.Observable();
var items = new observableArray.ObservableArray();

function pageLoaded(args) {
    var page = args.object;
    //page.bindingContext = vmModule.mainViewModel;
    viewModel.set("items", items);
    page.bindingContext = viewModel;
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

exports.deals = function(args) {
    console.log('launch deals');
    var page = args.object;
    function assignItems(data){
        if(data.content.toJSON().length > 0)
         // items = new observableArray.ObservableArray();
        data.content.toJSON().forEach(function(item) {
            items.push(item);
        }, this);
    }
    geolocation.getCurrentLocation({desiredAccuracy: 3, updateDistance: 10, maximumAge: 20000, timeout: 20000}).
    then(function(possition){
        var pos = JSON.stringify(possition)
        console.log(pos);
        http.request ({url:"http://ckgapi.azurewebsites.net/api/advert/getPositionAdverts", method:"POST", content: pos}).then(function(result) {
            console.log('Succesfully got data from api');
            assignItems(result)
        }, function(error) {
            console.error(JSON.stringify(error));
        })
        

        // could request all adverts for this location
        myLocation = possition;

    console.log('latitude: ' + possition.latitude);	
    })
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
