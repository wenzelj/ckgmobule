var observable = require("data/observable");
var observableArray = require("data/observable-array");
var geolocation = require("nativescript-geolocation");
//var location = require("location");

var ViewModelItem = (function () {
    function ViewModelItem(src, voucher) {
        this.src = src;
        this.voucher = voucher; 
    }
    return ViewModelItem;
}());
exports.ViewModelItem = ViewModelItem;
var items = new observableArray.ObservableArray();
items.push(new ViewModelItem("http://mysmarthome.cloudapp.net/images/CKGLogo.jpg", "http://mysmarthome.cloudapp.net/images/vouchers/voucher1.png"));
items.push(new ViewModelItem("http://mysmarthome.cloudapp.net/images/image1.jpg", "http://mysmarthome.cloudapp.net/images/vouchers/voucher1.png"));
items.push(new ViewModelItem("http://mysmarthome.cloudapp.net/images/image2.jpg", "http://mysmarthome.cloudapp.net/images/vouchers/voucher3.jpg"));

for (var i = 0; i < 20; i++) {
    //items.push(new ViewModelItem("Item " + i, "This is the item with number " + i + "."));
}
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