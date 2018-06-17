console.log("Loading webtest...");
const webtestResult = webtest();

if(!webtestResult) {
  console.error("Webtest failed! Response: " + webtestResult);
} else console.log("Webtest success!");

var mymap;

function updateLocation(e, map) {
  var radius = e.accuracy / 2;

  L.marker(e.latlng).addTo(map)
    .bindPopup("Standort auf " + Math.round(radius*10)/10 + "m genau").openPopup();

  L.circle(e.latlng, radius).addTo(map);
}

function initMap() {
  mymap = L.map('mapid').setView([50.104278, 8.675969], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
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

  L.Routing.control({
	    waypoints: [
		        L.latLng(57.74, 11.94),
		        L.latLng(57.6792, 11.949)
		      ]
  }).addTo(mymap);

navigator.geolocation.getCurrentPosition(position =>  {
  console.log(position);
  populateByTrashcans(position.coords.latitude, position.coords.longitude, mymap);
})
}

