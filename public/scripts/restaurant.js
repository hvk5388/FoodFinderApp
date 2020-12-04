/*Variables*/
/*Client side javascript*/
var latitude = parseFloat(sessionStorage.getItem("latitude"));
var longitude = parseFloat(sessionStorage.getItem("longitude"));
var restName = "restuarantname"; /*Example name used for favorite api in progress*/
var restID = 12; /*Example ID used for favorite api in progress*/
var mymap;

$(document).ready(function () {

	mymap = L.map('mapid').setView([latitude, longitude], 12);

	L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		attribution: 'FoodFinder',
		id: 'mapbox/streets-v11',
		tileSize: 512,
		zoomOffset: -1
	}).addTo(mymap);

	L.marker([latitude, longitude]).addTo(mymap).bindPopup("<h4>Current Location</h4>").openPopup();

	L.circle([latitude, longitude], 9000, {
		color: 'red',
		fillColor: '#f03',
		fillOpacity: 0.5
	}).addTo(mymap);

	getLocationIDs();

});

/*CSS DOM manipulation*/
/*Functions*/
function darkMode() {
	document.getElementById('MenuHeader').style.backgroundColor = "grey";
	document.getElementById('darkButton').style.visibility = "hidden";
}

function lightMode() {
	document.getElementById('MenuHeader').style.backgroundColor = "lightcoral";
	document.getElementById('darkButton').style.visibility = "visible";
}

/*Get location information using Zomato*/
/*Syntax*/
function getLocationIDs() {
	let clientKey = 'afa7fba6d4bd0a50844c37bbac688903';
	let rootURL = 'https://developers.zomato.com/api/v2.1/geocode?';
	let lati = parseFloat(latitude);
	let long = parseFloat(longitude);

	/*jQuery*/
	$.ajax({
		type: 'GET',
		url: rootURL,
		headers: {
			"user-key": clientKey,
			"content-type": "application/json"
		},
		/*Object use*/
		data: {
			lat: lati.toFixed(2),
			lon: long.toFixed(2)
		},

		success: getGeocode
	});
}

var entityType;
var entityID;
/* Get entity_type, entity_id, and city_id from get request */
function getGeocode(data){
	entityType = data.location.entity_type;
	entityID = data.location.entity_id;
	let cityID = data.location.city_id;
	//alert("loading");
	getCuisines(cityID);
	getRestaurant(entityType,entityID);
}

/* Find restuarants given entity_type and entity_id */
function getRestaurant(){
	let clientKey = 'afa7fba6d4bd0a50844c37bbac688903';
	let rootURL = 'https://developers.zomato.com/api/v2.1/search?';
	let entID = parseInt(entityID);
		/*jQuery*/
		$.ajax({
			type: 'GET',
			url: rootURL,
			headers: {
				"user-key": clientKey,
				"content-type": "application/json"
			},
			/*Object use*/
			data: {
				"entity_id": entID,
				"entity_type": entityType
			},
	
			success: successRestaurant
		});
}

/*The function is accessing the restuarant objects attributes and adding to map*/
function successRestaurant(data) {
	/*Multiple line comments*/
	/*Add for loop for locations*/
	/*Loops and arrays*/
	for (i = 0; i < data.restaurants.length; i++) {
		let restLat = data.restaurants[i].restaurant.location.latitude; // restuarant latitude
		let restLong = data.restaurants[i].restaurant.location.longitude; // restuarant longitude
		let restApName = data.restaurants[i].restaurant.name; // restuarant name
		let restMenu = data.restaurants[i].restaurant.menu_url; // restuarant menu url
		let restID = data.restaurants[i].restaurant.R.res_id; // restuarant ID
		L.marker([restLat, restLong]).addTo(mymap)
			.bindPopup("<p>" + restApName + "</p><form action='http://localhost:3000/favorite' method='POST'>" +
				"<input type='hidden' name='id' value=" + restID + ">" +
				"<input type='hidden' name='latitude' value=" + restLat + ">" +
				"<input type='hidden' name='longitude' value=" + restLong + ">" +
				"<input type='hidden' name='restuarant' value=" + restApName + ">" +
				"<button type='submit' class='favoriteBtn'>Favorite</button></form><button class='favoriteBtn' onclick='window.location.href=`" +
				restMenu + "`'" + "'>Menu</button>");
	}
}

/* Get request for cuisines given city ID */
function getCuisines(city_ID){
	let clientKey = 'afa7fba6d4bd0a50844c37bbac688903';
	let rootURL = 'https://developers.zomato.com/api/v2.1/cuisines?';
	let cityID = city_ID;

		/*jQuery*/
		$.ajax({
			type: 'GET',
			url: rootURL,
			headers: {
				"user-key": clientKey,
				"content-type": "application/json"
			},
			/*Object use*/
			data: {
				"city_id": cityID
			},
	
			success: successCuisines
		});
}

var cuisineIDArray = [];
/*Get cuisines to populate checkboxes*/
function successCuisines(data) {
	for (i = 0; i < data.cuisines.length; i++) {
		let cuisineID = data.cuisines[i].cuisine.cuisine_id;
		let cuisineName = data.cuisines[i].cuisine.cuisine_name;
		document.getElementById("options").innerHTML += '<hr><input type="checkbox" id="' + 
		cuisineID + '" name=' + cuisineName + ' value="' + 
		cuisineID + '"><label for='+ cuisineID + '>'+
		cuisineName +'</label><br>';
		let idString = cuisineID.toString();
		cuisineIDArray.push(idString);
	}
}

var searchCuisine = [];
/*When search button is pressed after chk checkboxes, find which ones got checked*/
function checkboxIfChk(){
	var chkArray = cuisineIDArray;
	
	/*Loop to add checked Chkboxes to array*/
	for (i = 0; i < chkArray.length; i++) {
		let chkCuisine = document.getElementById(chkArray[i]);
		if (chkCuisine.checked == true){
			searchCuisine.push(chkArray[i]);
		}
	}

	/* Remove all markers beside current location */
	$(".leaflet-marker-icon").remove();
	$(".leaflet-popup").remove();
	$(".leaflet-pane.leaflet-shadow-pane").remove();
	L.marker([latitude, longitude]).addTo(mymap).bindPopup("<h4>Current Location</h4>").openPopup();

	getCuisineSearch(searchCuisine);
}

/* Get cuisine IDs from checkboxs from function checkboxIfChk */
function getCuisineSearch(cuisineIDs){
	let clientKey = 'afa7fba6d4bd0a50844c37bbac688903';
	let rootURL = 'https://developers.zomato.com/api/v2.1/search?';
	let entID = parseInt(entityID);
	let cuisineList = cuisineIDs.toString();
		//alert(typeof(entType) + " " + typeof(entID));
		/*jQuery*/
		$.ajax({
			type: 'GET',
			url: rootURL,
			headers: {
				"user-key": clientKey,
				"content-type": "application/json"
			},
			/*Object use*/
			data: {
				"entity_id": entID,
				"entity_type": entityType,
				cuisines: cuisineList
			},
	
			success: successRestaurant
		});
}

/*The function is accessing the restuarant objects attributes and adding to map*/
function successRestaurant(data) {
	/*Multiple line comments*/
	/*Add for loop for locations*/
	/*Loops and arrays*/
	for (i = 0; i < data.restaurants.length; i++) {
		let restLat = data.restaurants[i].restaurant.location.latitude;
		let restLong = data.restaurants[i].restaurant.location.longitude;
		let restApName = data.restaurants[i].restaurant.name;
		let restMenu = data.restaurants[i].restaurant.menu_url;
		let restID = data.restaurants[i].restaurant.R.res_id;
		L.marker([restLat, restLong]).addTo(mymap)
			.bindPopup("<p>" + restApName + "</p><form action='http://localhost:3000/favorite' method='POST'>" +
				"<input type='hidden' name='id' value=" + restID + ">" +
				"<input type='hidden' name='latitude' value=" + restLat + ">" +
				"<input type='hidden' name='longitude' value=" + restLong + ">" +
				"<input type='hidden' name='restuarant' value=" + restApName + ">" +
				"<button type='submit' class='favoriteBtn'>Favorite</button></form><button class='favoriteBtn' onclick='window.location.href=`" +
				restMenu + "`'" + "'>Menu</button>");
	}
}