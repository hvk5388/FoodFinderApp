var latitude = parseFloat(sessionStorage.getItem("latitude"));
var longitude = parseFloat(sessionStorage.getItem("longitude"));
var restName = "restuarantname"; /* example name */
var restID = 12; /* example ID */
var mymap;
//var rootURL = 'https://developers.zomato.com/api/v2.1/search?lat=' + latitude + '&lon=' + longitude + '&radius=300';
//var rootURL = 'https://developers.zomato.com/api/v2.1/search?lat=' + String(latitude) + '&lon=' + String(longitude) + '&radius=300';
$(document).ready(function () {
   
               mymap = L.map('mapid').setView([latitude, longitude], 12);

               L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
                  maxZoom: 18,
                  attribution: 'FoodFinder',
                  id: 'mapbox/streets-v11',
                  tileSize: 512,
                  zoomOffset: -1
               }).addTo(mymap);
            
               L.marker([latitude, longitude]).addTo(mymap)
                  .bindPopup("<h4>Current Location</h4><form action='http://localhost:3000/favorite' method='POST'>" +
                  "<input type='hidden' name='id' value=" + restID + ">" +
                  "<input type='hidden' name='latitude' value=" + latitude + ">" +
                  "<input type='hidden' name='longitude' value=" + longitude + ">" +
                  "<input type='hidden' name='restuarant' value=" + restName + ">" +
                  "<button type='submit' class='favoriteBtn'>Favorite</button></form>").openPopup();
            
               L.circle([latitude, longitude], 9000, {
                  color: 'red',
                  fillColor: '#f03',
                  fillOpacity: 0.5
               }).addTo(mymap).bindPopup("Set Range");
               
               getRestaurant();
                                 
});

/*function addMarker(){
   L.marker([40.792786, -77.862147]).addTo(mymap).bindPopup("<h4>Test</h4>");
}*/

/* Get restauarant using zomato */
function getRestaurant(){
   var clientKey = 'afa7fba6d4bd0a50844c37bbac688903';
   //var rootURL;
   //rootURL = 'https://developers.zomato.com/api/v2.1/search?lat=' + lat + '&lon=' + long + '&radius=300';
   //alert(rootURL);
   //alert(typeof latitude);
   var rootURL = 'https://developers.zomato.com/api/v2.1/search?';
   var lati = 40.792786;
   var long = -77.862147;
   //alert(typeof latitude);
   alert(rootURL + ' lat: ' + latitude + ' lon: ' + longitude);
   $.ajax({
      type: 'GET',
      url: rootURL,
      headers: {
        "user-key": clientKey,
        "content-type": "application/json"
      },
      data: {
         lat: lati,
         lon: long,
         radius: 300
         //entity_id: 150421,
         //entity_type: "subzone"
      },
      
      success: successRestaurant
  });
}

/*the function is accessing the restuarant objects attributes*/
function successRestaurant(data) {
   /* Add for loop for locations */
   //var restLat = data.restaurants[1].restaurant.location.latitude;
   //var restLong = data.restaurants[1].restaurant.location.longitude;
   //var restApName = data.restaurants[1].restaurant.name;
   //document.getElementById("demo").innerHTML = data.restaurants.length + '<br>'; //length of restuarants found
   //document.getElementById("demo").innerHTML += data.restaurants[1].restaurant.name + '<br>'; // get rest name
   //document.getElementById("demo").innerHTML += data.restaurants[1].restaurant.location.address + '<br>'; // get rest address
   //document.getElementById("demo").innerHTML += data.restaurants[1].restaurant.location.latitude + '<br>'; // get rest lat
   //document.getElementById("demo").innerHTML += data.restaurants[1].restaurant.location.longitude + '<br>'; // get rest long
   //L.marker([40.792786, -77.862147]).addTo(mymap).bindPopup("<h4> Test " + restApName + "</h4>" + "<p>" + latitude + "</p>" + "<p>" + longitude + "</p>");
   //L.marker([restLat, restLong]).addTo(mymap).bindPopup("<h4>" + restApName +"</h4>");
   for (i = 0; i < data.restaurants.length; i++) {
      let restLat = data.restaurants[i].restaurant.location.latitude;
      let restLong = data.restaurants[i].restaurant.location.longitude;
      let restApName = data.restaurants[i].restaurant.name;
      let restMenu = data.restaurants[i].restaurant.menu_url;
      L.marker([restLat, restLong]).addTo(mymap).bindPopup("<p>" + restApName + "</p>" + "<br>" + "<button class='favoriteBtn' onclick='window.location.href=`" + restMenu + "`'" + "'>Menu</button>");
    } 
}