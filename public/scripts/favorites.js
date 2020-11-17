function cornerRoomLocation() {
    
    var mymap = L.map('mapid').setView([40.794267, -77.861607], 13);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1Ijoicnlhbm1jZ2x5bm43IiwiYSI6ImNraG05bDQyZDA0ZmEzMW43eHY5MDZ2eHUifQ.2dATeQ55OR1xR3QooQTdYQ'
    }).addTo(mymap);

    var marker = L.marker([40.794267, -77.861607]).addTo(mymap).bindPopup("<b>The Corner Room</b><br>Eat Here.").openPopup();
} 


function fedTapLocation() {
    
    var mymap = L.map('mapid').setView([40.792786, -77.862147], 13);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1Ijoicnlhbm1jZ2x5bm43IiwiYSI6ImNraG05bDQyZDA0ZmEzMW43eHY5MDZ2eHUifQ.2dATeQ55OR1xR3QooQTdYQ'
    }).addTo(mymap);

    var marker = L.marker([40.792786, -77.862147]).addTo(mymap).bindPopup("<b>Federal Taphouse</b><br>Eat Here.").openPopup();

} 


function areULocation() {
    
    var mymap = L.map('mapid').setView([40.798170, -77.855532], 13);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1Ijoicnlhbm1jZ2x5bm43IiwiYSI6ImNraG05bDQyZDA0ZmEzMW43eHY5MDZ2eHUifQ.2dATeQ55OR1xR3QooQTdYQ'
    }).addTo(mymap);

    var marker = L.marker([40.798170, -77.855532]).addTo(mymap).bindPopup("<b>Are U Hungry</b><br>Eat Here.").openPopup();

} 


function jerseyMikeLocation() {
    
    var mymap = L.map('mapid').setView([40.793763, -77.860948], 13);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1Ijoicnlhbm1jZ2x5bm43IiwiYSI6ImNraG05bDQyZDA0ZmEzMW43eHY5MDZ2eHUifQ.2dATeQ55OR1xR3QooQTdYQ'
    }).addTo(mymap);

    var marker = L.marker([40.793763, -77.860948]).addTo(mymap).bindPopup("<b>Jersey Mike's Subs</b><br>Eat Here.").openPopup();
    
} 



  


