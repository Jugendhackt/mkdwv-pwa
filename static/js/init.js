console.log("Loading webtest...");
const webtestResult = webtest();

if(!webtestResult) {
  console.error("Webtest failed! Response: " + webtestResult);
} else console.log("Webtest success!");

var mymap;

function updateLocation(e, map) {
  var radius = e.accuracy / 2;

  L.marker(e.latlng).addTo(map)
    .bindPopup("<b>Dein ungefährer Standort</b>").openPopup();

  L.circle(e.latlng, radius).addTo(map);
}

function initMap() {
  mymap = L.map('mapid').setView([50.104278, 8.675969], 13);

  L.tileLayer(TILE_URLS.default, {
    maxZoom: 18,
    attribution: 'Implementation: <a href="https://github.com/jens1o">jens1o</a> | Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
      '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    id: 'mapbox.streets'
  }).addTo(mymap);

  function onLocationError(e) {
    alert(e.message);
  }


  function editmarker(){
        displayAdd();
        var msg = document.querySelector("#description").value;
	  markerbindPopup(msg).openPopup;
	//markerybindPopup(textfeld.getText, lat + " " + lng );
  }
      function setMarker(e){
      var lat = e.latlng.lat;
      var lng = e.latlng.lng;
       var marker = L.marker([lat, lng]).on('click', editmarker).addTo(mymap);
       marker.bindPopup(lat + " " + lng).openPopup();
       marker;
  }



  mymap.on('click', setMarker);
  mymap.on('locationfound', (e) => {updateLocation(e, mymap);});
  mymap.on('locationerror', onLocationError);
  mymap.locate({setView: true, maxZoom: 16});

navigator.geolocation.getCurrentPosition(position =>  {
  console.log(position);
  populateByTrashcans(Math.floor(position.coords.latitude * 1000)/1000, Math.floor(position.coords.longitude * 1000)/1000, mymap);
})
}
