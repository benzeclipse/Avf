/*
 Banchop Ben Kangdouanghot
 TERM 1310
 AFW
 */




//GOOGLE MAPS
function geoLocate() {
    var output = document.getElementById("output");
    
    if (!navigator.geolocation){
        output.innerHTML = "<p>Geolocation is not available at this time.</p>";
        return;
    }
    
    function success(position) {
        var latitude  = position.coords.latitude;
        var longitude = position.coords.longitude;
        
        output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';
        
        var mapImg = new Image();
        mapImg.src = "http://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";
        
        output.appendChild(mapImg);
    };
    
    function error() {
        output.innerHTML = "Not able to retrieve your current location, please try again later";
    };
    
    output.innerHTML = "<p>Locating…</p>";
    
    navigator.geolocation.getCurrentPosition(success, error);
}




//NATIVE FEATURES
var pictureSource,
destinationType,
runAcc,
runBrowser,
options,
connectionCheck;
// device APIs are available
function onDeviceReady() {
    
    var options = function () {
        pictureSource=navigator.camera.PictureSourceType.CAMERA;
        destinationType=navigator.camera.DestinationType.FILE_URI;};
    
    $("#accelerometer").on("pageinit", runAcc);
    $("#browser").on("pageinit", runBrowser);
    $('#connection').on("pageinit", connectionCheck);
}

// Wait for device API libraries to load
document.addEventListener("deviceready",onDeviceReady,false);





//CAMERA
function cameraSuccess(imageData) {
    
    console.log(imageData);

}

function cameraFail(message) {
    alert('Error: ' + message);
}

function accessCamera() {

    navigator.camera.getPicture(cameraSuccess, cameraFail, {
                                quality: 50
                                });
}






//ACCELEROMETER
function onSuccess(acceleration) {
    alert('Accelerometer has loaded!');
    alert('Acceleration X: ' + acceleration.x + '\n' +
          'Acceleration Y: ' + acceleration.y + '\n' +
          'Acceleration Z: ' + acceleration.z + '\n' +
          'Timestamp: '      + acceleration.timestamp + '\n');
}

function onError() {
    alert('onError!');
}

var runAcc = function(){
    navigator.accelerometer.getCurrentAcceleration(onSuccess, onError);
};






//IN APP BROWSER
var iAppRef = null;

function iAppLoadStop(event) {
    alert(event.type + ' - ' + event.url);
}

function iAppLoadError(event) {
    alert(event.type + ' - ' + event.message);
}

function iAppClose(event) {
    alert(event.type);
    iAppRef.removeEventListener('loadstart', iAppLoadStart);
    iAppRef.removeEventListener('loadstop', iAppLoadStop);
    iAppRef.removeEventListener('loaderror', iAppLoadError);
    iAppRef.removeEventListener('exit', iAppClose);
}

var runBrowser = function(){
    iAppRef = window.open('http://instagram.com/developer/', '_blank', 'location=yes');
    iAppRef.addEventListener('loadstart', iAppLoadStart);
    iAppRef.addEventListener('loadstop', iAppLoadStop);
    iAppRef.removeEventListener('loaderror', iAppLoadError);
    iAppRef.addEventListener('exit', iAppClose);
};







//CONNECTION
var Connection;
function connectionCheck() {
    var connectType = navigator.connection.type;
    var states = {};
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.NONE]     = 'No network connection';
    
    alert('Connection type: ' + states[connectType]);
}





//INSTAGRAM
$('#instagram').on('pageinit', function() {
                   
                   var tag = "wrx",
                   
                   url ="https://api.instagram.com/v1/tags/" + tag + "/media/recent?callback=?&amp;client_id=dd55a33c284e4d99b2f703f3e2bdaf53",
                   
                   
                   screenOutput = function(info){
                   
                   
                   console.log(info);
                   
                   
                   $("#data-msg").html("<h2>Instagram results:</h2>");
                   
                   
                   $.each(info.data, function(index, photo) {
                          
                          var pic = "<figure><img src='" + photo.images.standard_resolution.url + "'alt='" + photo.user.id + "' />" + "<h3>" + "<figcaption>" + photo.user.full_name  + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + photo.likes.count + "&nbsp;" + "&hearts;" + "'s" + "</figcaption>" + " </h3>" + "</figure>";
                          $("#data-output").append(pic);
                          });
                   };
                   $.getJSON(url, screenOutput);
                   
                   
});





