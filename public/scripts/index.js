
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