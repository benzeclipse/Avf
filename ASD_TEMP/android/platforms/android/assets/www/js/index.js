/*
Banchop Ben Kangdouangnhot
Term 1310
Class AVF
*/

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
        
       // $.getJSON(url, function(data){...});
       
    }
        
    
};

/*  $(".instagram").instagram({
        userId: 'USER-ID',
        accessToken: 'ACCESS-TOKEN'
    });
 */   

  
$(function() {
	var tag = "WRX";
	var url = "https://api.instagram.com/v1/tags/" + tag + 
		"/media/recent?callback=?&amp;client_id=3e73c63dfc2940588f99fbf372e319a8;min_id=10";
	$.getJSON(url, pics);
});


var pics = function(info){

	alert("Pictures loading");
	console.log(info);

	$("#msg").html("<h2>Instagram findings:</h2>");

	$.each(info.data, function(index, photo){
		var pic = "<li><img src='" + photo.images.standard_resolution.url + "' alt='" + photo.user.id
		+ "' /><h4>" + photo.user.full_name + ", <em>(" + photo.user.username +")</em></h4></li>";
		$("#data-output").append(pic);
	});
	
};



/*
$(function() {

    $.ajax({
        type: "GET",
        dataType: "jsonp",
        cache: false,
        url: "https://api.instagram.com/v1/users/[userid]/media/recent/?access_token=[access_token]",
        success: function(data) {

            for (var i = 0; i < 6; i++) {
        $(".instagram").append("<div class='instagram-placeholder'>
        <a target='_blank' href='" + data.data[i].link +"'><img class='instagram-image' src='" + data.data[i].images.thumbnail.url +"' /></a></div>");   
                }     
                            
        }
    });
});
*/






