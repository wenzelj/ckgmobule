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
// items.push(new ViewModelItem("http://mysmarthome.cloudapp.net/images/CKGLogo.jpg", "http://mysmarthome.cloudapp.net/images/vouchers/voucher1.png"));
// items.push(new ViewModelItem("http://mysmarthome.cloudapp.net/images/image1.jpg", "http://mysmarthome.cloudapp.net/images/vouchers/voucher1.png"));
// items.push(new ViewModelItem("http://mysmarthome.cloudapp.net/images/image2.jpg", "http://mysmarthome.cloudapp.net/images/vouchers/voucher3.jpg"));

function assignItems(data){
    data.forEach(function(item) {
        items.push(new ViewModelItem(item.longitude, item.latitude, item.image, item.voucher, item.startdate, item.enddate, item.name))
    }, this);
}

  http.getJSON("http://ckgapi.azurewebsites.net/api/advert/getAdverts").then(function(result) {
        console.log('Succesfully got data from api');
         assignItems(result)
    }, function(error) {
        console.error(JSON.stringify(error));
    })

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

geolocation.getCurrentLocation({desiredAccuracy: 3, updateDistance: 10, maximumAge: 20000, timeout: 20000}).
then(function(possition){

	// could request all adverts for this location
	myLocation = possition;

  console.log('latitude: ' + possition.latitude);	
})
exports.mainViewModel = new observable.Observable();
exports.mainViewModel.set("items", items);
exports.mainViewModel.set("myLocation", myLocation);