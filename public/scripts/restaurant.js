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
            
               L.polygon([
                  [51.509, -0.08],
                  [51.503, -0.06],
                  [51.51, -0.047]
               ]).addTo(mymap).bindPopup("I am a polygon.");
            
            
               var popup = L.popup();
            
               function onMapClick(e) {
                  popup
                     .setLatLng(e.latlng)
                     .setContent("You clicked the map at " + e.latlng.toString())
                     .openOn(mymap);
               }
            
               mymap.on('click', onMapClick);           
});

function getRestaurant(){
   var clientKey = 'afa7fba6d4bd0a50844c37bbac688903';
   var zipcode = document.getElementById('zipcodeInput').value;
   var rootURL = 'https://cors-anywhere.herokuapp.com/https://www.zipcodeapi.com/rest/' + clientKey + '/info.json/' + zipcode + '/degrees';

   $.ajax({
     url: rootURL,
     method: `GET`,
     dataType: "json",
     headers: { "User-key": clientKey },
     success: successRestaurant
  });
}

/*the function is accessing the objects attributes*/
function successRestaurant(data) {
   /* Add for loop for locations */
}
               