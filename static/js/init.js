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


mapnikLayer = L.tileLayer(
	    'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
	    {attribution: attribution}
)
var blackAndWhite = L.tileLayer(
	    'http://{s}.www.toolserver.org/tiles/bw-mapnik/{z}/{x}/{y}.png',
	    {attribution: attribution}
)
var clouds = L.tileLayer('http://{s}.tile.openweathermap.org/map/clouds/{z}/{x}/{y}.png', {
	    attribution: 'Map data &copy; <a href="http://openweathermap.org">OpenWeatherMap</a>',
	    opacity: 0.5
})


function initMap() {
  mymap = L.map('mapid').setView([50.104278, 8.675969], 13);

  L.tileLayer(TILE_URLS.default, {
    maxZoom: 18,
    attribution: 'Implementation: <a href="https://github.com/jens1o">jens1o</a> | Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
      '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    id: 'mapbox.streets', layers: [mapnikLayer, clouds]
  }).addTo(mymap);

  var baseLayers = {
	      'Mapnik': mapnikLayer,
	      'Black and Whilte': blackAndWhite
  }

  var overlayLayers = {
	      'Clouds': clouds
  }


  function onLocationError(e) {
    alert(e.message);
  }

  var control = L.control.selectLayers(baseLayers, overlayLayers)
	control.addTo(map)

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
  mymap.locate({setView: true, maxZoom: 16});

  navigator.geolocation.getCurrentPosition(position =>  {
    console.log(position);
    populateByTrashcans(Math.floor(position.coords.latitude * 1000)/1000, Math.floor(position.coords.longitude * 1000)/1000, mymap);
  })
}
