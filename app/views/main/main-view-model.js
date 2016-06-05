var observable = require("data/observable");
var observableArray = require("data/observable-array");
var geolocation = require("nativescript-geolocation");	
var http = require("http");

//var location = require("location");

var ViewModelItem = (function () {
    function ViewModelItem(longitude, latitude, image,voucher,startdate, enddate, name) {
        this.voucher = voucher; 
        this.longitude = longitude; 
        this.latitude = latitude;
        this.image = image
        this.startdate = startdate;
        this.enddate = enddate; 
        this.name = name;
    }
    return ViewModelItem;
}());
exports.ViewModelItem = ViewModelItem;
var items = new observableArray.ObservableArray();

// function assignItems(data){
//     if(data.content.toJSON().length > 0)
//     data.content.toJSON().forEach(function(item) {
//         console.log(item);
//         items.push(new ViewModelItem(item.longitude, item.latitude, item.image, item.voucher, item.startdate, item.enddate, item.name))
//         console.log(item.name);
//     }, this);
// }



// http.fetch("http://ckgapi.azurewebsites.net/api/advert/getAdverts", {
//     method: "GET"
// })
// .then(function(response) {
//     console.log('fetch data success');
//     assignItems(response);
// }, function(error) {
//     console.log(JSON.stringify(error));
// });


// for (var i = 0; i < 20; i++) {
//     //items.push(new ViewModelItem("Item " + i, "This is the item with number " + i + "."));
// }
var myLocation = new observable.Observable();
//var myLocation;
//console.log(geolocation);

// var getDeals = function (){
//     geolocation.getCurrentLocation({desiredAccuracy: 3, updateDistance: 10, maximumAge: 20000, timeout: 20000}).
//     then(function(possition){
//         var pos = JSON.stringify(possition)
//         console.log(pos);
//         http.request ({url:"http://ckgapi.azurewebsites.net/api/advert/getPositionAdverts", method:"POST", content: pos}).then(function(result) {
//             console.log('Succesfully got data from api');
//             assignItems(result)
//         }, function(error) {
//             console.error(JSON.stringify(error));
//         })
        
//         //   http.getJSON("http://ckgapi.azurewebsites.net/api/advert/getAdverts").then(function(result) {
//         //     console.log('Succesfully got data from api');
//         //      assignItems(result)
//         // }, function(error) {
//         //     console.error(JSON.stringify(error));
//         // })

//         // could request all adverts for this location
//         myLocation = possition;

//     console.log('latitude: ' + possition.latitude);	
//     })
// }


exports.mainViewModel = new observable.Observable();
exports.mainViewModel.set("items", items);
exports.mainViewModel.set("myLocation", myLocation);
