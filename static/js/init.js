console.log("Loading webtest...");
const webtestResult = webtest();

if(!webtestResult) console.error("Webtest failed! Response: " + webtestResult);
else console.log("Webtest success!");

var mymap;

var mapnikLayer = L.tileLayer(
	'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
var blackAndWhite = L.tileLayer(
	'http://{s}.www.toolserver.org/tiles/bw-mapnik/{z}/{x}/{y}.png'
);

var watercolorLayer = L.tileLayer(
	'http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg'
);

function initMap() {
  mymap = L.map('mapid').setView([50.104278, 8.675969], 13);

  L.tileLayer(TILE_URLS.default, {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
      '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    id: 'mapbox.streets', layers: [mapnikLayer]
  }).addTo(mymap);

  var baseLayers = {
	      'Mapnik': mapnikLayer,
	      'Black and Whilte': blackAndWhite,
	      'Watercolor': watercolorLayer
  }
  
  var posmarker, poscircle, firstcheck = true;
  function updateLocation(e, map) {
    var radius = e.accuracy / 2;
  
    if(posmarker) map.removeLayer(posmarker);
    posmarker = L.marker(e.latlng, {autoPan: false}).addTo(map);
    posmarker.bindPopup("<b>Dein ungefährer Standort</b>", {autoPan: false}).openPopup();
  
    if(poscircle) map.removeLayer(poscircle);
    poscircle = L.circle(e.latlng, radius).addTo(map);
    
    if(firstcheck) {
      mymap.locate({enableHighAccuracy: true, watch: true, setView: false});
      firstcheck = false;
    }
  }

  function onLocationError(e) {
    alert(e.message);
  }

  var control = L.control.layers(baseLayers)
	control.addTo(mymap)

  function setMarker(e){
      var lat = e.latlng.lat;
      var lng = e.latlng.lng;
      var marker = L.marker([lat, lng]).on('click', () => {
          displayAdd();
          //var msg = document.querySelector("#description").value;
	        //marker.bindPopup(msg).openPopup();
      }).addTo(mymap);
      marker.bindPopup(lat + " " + lng).openPopup();
  }

  mymap.on('click', setMarker);
  mymap.on('locationfound', (e) => {updateLocation(e, mymap);});
  mymap.on('locationerror', onLocationError);
  mymap.locate({enableHighAccuracy: true, watch: false, setView: true, maxZoom: 16});

  navigator.geolocation.getCurrentPosition(position =>  {
    console.log(position);
    populateByTrashcans(Math.floor(position.coords.latitude * 1000)/1000, Math.floor(position.coords.longitude * 1000)/1000, mymap);
  })
}
