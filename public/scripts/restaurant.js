var latitude = sessionStorage.getItem("latitude");
var longitude = sessionStorage.getItem("longitude");
var restName = "restuarantname"; /* example name */
var restID = 12; /* example ID */

$(document).ready(function () {
   
               var mymap = L.map('mapid').setView([latitude, longitude], 13);

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
            
               L.circle([latitude, longitude], 1000, {
                  color: 'red',
                  fillColor: '#f03',
                  fillOpacity: 0.5
               }).addTo(mymap).bindPopup("Set Range");
                      
               /*function addMarker(){
                  L.marker([40.792786, -77.862147]).addTo(mymap).bindPopup("<h4>Test</h4>");
               }*/
});

/* Get restauarant using zomato */
function getRestaurant(){
   var clientKey = 'afa7fba6d4bd0a50844c37bbac688903';
   //var rootURL = 'https://developers.zomato.com/api/v2.1/search?lat=' + latitude + '&lon=' + longitude + '&radius=300';
   var rootURL = 'https://developers.zomato.com/api/v2.1/search?lat=40.7934&lon=-77.8600&radius=300';
   $.ajax({
      method: "GET",
      url: rootURL,
      headers: {
        "user-key": clientKey,
        "content-type": "application/json"
      },
      success: successRestaurant
  });
}

/*the function is accessing the restuarant objects attributes*/
function successRestaurant(data) {
   /* Add for loop for locations */
   document.getElementById("demo").innerHTML = data.restaurants.length + '<br>'; //length of restuarants found
   document.getElementById("demo").innerHTML += data.restaurants[1].restaurant.name + '<br>'; // get rest name
   document.getElementById("demo").innerHTML += data.restaurants[1].restaurant.location.address + '<br>'; // get rest address
   document.getElementById("demo").innerHTML += data.restaurants[1].restaurant.location.latitude + '<br>'; // get rest lat
   document.getElementById("demo").innerHTML += data.restaurants[1].restaurant.location.longitude + '<br>'; // get rest long
}