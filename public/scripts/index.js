
function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
      
    } else { 
       document.getElementById("demo").innerHTML = "Geolocation is not supported by this browser.";
    }
 }
  
function showPosition(position) {
    var latitude = position.coords.latitude;
    sessionStorage.setItem("latitude", latitude);
    var longitude = position.coords.longitude;
    sessionStorage.setItem("longitude", longitude);
    document.getElementById("demo").innerHTML = "lat" + latitude + "long" + longitude;
    window.location.replace("restaurants.html");
 }

function getAreaCode(){
    var clientKey = 'dG5biqhcgn4pndgo9lgglAGtiO67KCVJQqAQaXPR4WA0Lo08KEKc3k47w83TAxta';
    var zipcode = document.getElementById('zipcodeInput').value;
    var rootURL = 'https://cors-anywhere.herokuapp.com/https://www.zipcodeapi.com/rest/' + clientKey + '/info.json/' + zipcode + '/degrees';

    $.ajax({
		url: rootURL,
		method: `GET`,
		success: successZipcode
	});

 }

/*the function is accessing the objects attributes*/
function successZipcode(data) {
    var latitude = data.lat;
    sessionStorage.setItem("latitude", latitude);
    var longitude = data.lng;
    sessionStorage.setItem("longitude", longitude);
	document.getElementById("demo").innerHTML = "lat" + latitude + "long" + longitude;
    window.location.replace("restaurants.html");
}