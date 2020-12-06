
$(document).ready(function () {
	/* Set dark mode class and store value */
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
	
	getFavorites();
	
});

/* Get favorite restuarants from array in /RestFavorites */
function getFavorites() {
	let rootURL = '../RestFavorites';

	/*jQuery*/
	$.ajax({
		type: 'GET',
		url: rootURL,

		success: getFav
	});
}

/* Populate favorites table */
function getFav(data) {

	if(data.length != 0){
		$('#errorFav').remove();
		document.getElementById("AddedFavorites").innerHTML = "<tr><th>Restaurant Name</th><th>Liked</th><th>Location</th></tr>";	
	}
	
	for (i = 0; i < data.length; i++) {
		let lati = data[i].latitude;
		let long = data[i].longitude;
		let name = data[i].restuarant;
		let menu = data[i].menu;
		let address = data[i].address;
		let id = data[i].id;
	
		document.getElementById("AddedFavorites").innerHTML += 
        "<td>" + name + "</td>" +
        '<td><span id="heart" class="material-icons" onclick="delFavorite(\'' + id + '\')">favorite</span></form></td>' +
        "<td><ul id='locationTagBox'><li>" + address + "</li></ul></td>" +
		'<td class="buttons" onclick="showRestuarant(\'' + lati + '\',\'' + long + '\',\'' + name + '\',\'' + menu + '\')">Eat Here</td></tr>';
	}
	
}

/* delete favorite given id */
function delFavorite(restID){
	let id = parseInt(restID);
	let rootURL = '../favorite/' + id;

	/*jQuery*/
	$.ajax({
		type: 'DELETE',
		url: rootURL,

		success: delFav
	});
}

function delFav(data){
	alert(data);
	location.reload();
}

var mymap;
/* Show restuarant and view point on map */
function showRestuarant(lat,lon,restName,restMenu){
	/* if the map is already initialized clear it */
	if (mymap != undefined){
		mymap.off();
		mymap.remove();
	}
	mymap = L.map('mapid').setView([lat, lon], 13);

	L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
		attribution: 'LeafLet',
		maxZoom: 18,
		id: 'mapbox/streets-v11',
		tileSize: 512,
		zoomOffset: -1,
		accessToken: 'pk.eyJ1Ijoicnlhbm1jZ2x5bm43IiwiYSI6ImNraG05bDQyZDA0ZmEzMW43eHY5MDZ2eHUifQ.2dATeQ55OR1xR3QooQTdYQ'
	}).addTo(mymap);

	L.marker([lat, lon]).addTo(mymap).bindPopup("<p id='restName'>" + restName + "</p><br><button class= 'menuBtn' onclick='window.location.href=`" +
	restMenu + "`'" + "'>Menu</button>").openPopup();

}

