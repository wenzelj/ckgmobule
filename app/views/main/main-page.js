var frames = require("ui/frame");
var view = require("ui/core/view");
var platform = require("platform");
var vmModule = require("./main-view-model");
var utilityModule = require("utils/utils");
var geolocation = require("nativescript-geolocation");
var observable = require("data/observable");
var observableArray = require("data/observable-array");	
var http = require("http");
var fileSystemModule = require("file-system");
var fileName = "persistedFile.json";

var file = fileSystemModule.knownFolders.documents().getFile(fileName);


var twoPaneLayout = Math.min(platform.screen.mainScreen.widthDIPs, platform.screen.mainScreen.heightDIPs) > 600;

var viewModel = new observable.Observable();
var items = new observableArray.ObservableArray();

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

var uniqueId;
// read data from the file
file.readText().then(function(content) {
    var jData = JSON.parse(content);
    if(jData.uniqueId){
        uniqueId = jData.uniqueId
    }
});

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

function clearItems (){
    while(items.length > 0) {
        items.pop();
    }
}

exports.deals = function(args) {
    console.log('launch deals');
    var page = args.object;
    var sender = args.object;
    var parent = sender.parent;
    var lbl = null;
    
    if(uniqueId == undefined){
        var data = {};
        data.uniqueId = guid();
        uniqueId = data.uniqueId;
        file.writeText(JSON.stringify(data));
    }
    
    if (parent) {
         lbl = view.getViewById(parent, "LabelMessage");
        if (lbl) {
            lbl.text = "Loading....." + uniqueId;
        }
    }
    
    
    function assignItems(data){
        if(data.content.toJSON().length > 0){
            clearItems();
            data.content.toJSON().forEach(function(item) {
                items.push(item);
            }, this);
            if(lbl){
                lbl.text = "";
            }
        }
        else{
            if(lbl){
            lbl.text = "Sorry no local deals found";
            }
        }
    }
    geolocation.getCurrentLocation({desiredAccuracy: 3, updateDistance: 10, maximumAge: 20000, timeout: 20000}).
    then(function(possition){
        var pos = JSON.stringify(possition)
        pos.uniqueId = this.uniqueId;
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
