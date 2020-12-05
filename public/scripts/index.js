/*CSS dom manipulation */
/*Functions */
/* Set dark mode class and store value */
$(document).ready(function($) {
   var dark = localStorage.getItem('dark');
   if (dark) 
        $('header').addClass(dark);
       $(".darkmode").click(function() {
       $("header").addClass("darkClass");
       localStorage.setItem('dark', 'darkClass');
   });

   $(".normalmode").click(function() {
   $("header").removeClass("darkClass");
   localStorage.setItem('dark', null);
   });
});

/*Loading image */

function loadingIMG() {
  document.getElementById("loadingImg").style.visibility = "visible";
}

function getLocation() {
  if (navigator.geolocation) {
     loadingIMG();
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

function getAreaCode() {
  loadingIMG();
  var clientKey = 'Cxns3Zxbg6HNrtYqhCs5fjNRd7ar5YpUZQmHJzjyC7po1BBFK0uKTa3bd3W7NY8R';
  var zipcode = document.getElementById('zipcodeInput').value;
  var rootURL = 'https://cors-anywhere.herokuapp.com/https://www.zipcodeapi.com/rest/' + clientKey + '/info.json/' + zipcode + '/degrees';

  $.ajax({
     url: rootURL,
     method: `GET`,
     success: successZipcode
  });

}

/*The function is accessing the objects attributes*/
function successZipcode(data) {
  var latitude = data.lat;
  sessionStorage.setItem("latitude", latitude);
  var longitude = data.lng;
  sessionStorage.setItem("longitude", longitude);
  /*DOM manipulation */
  document.getElementById("demo").innerHTML = "lat" + latitude + "long" + longitude;
  window.location.replace("restaurants.html");
}