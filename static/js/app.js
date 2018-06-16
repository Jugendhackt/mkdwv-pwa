
// Settings
const DEBUG        = true;
const MAP_PROVIDER = "leaflet";


const BASE_URL = "http://151.216.10.86:8080"
const ENDPOINTS = {
  'trash_upload': {
    'method': 'POST',
    'uri': `${BASE_URL}/trash`
  },
  'trash_fetch': {
    'method': 'GET',
    'uri': `${BASE_URL}/trash`
  },
  'trashcans_fetch': {
    'method': 'GET',
    'uri': `${BASE_URL}/trash`
  }
};

// Endpoint list
/*
let UPLOAD_ENDPOINT = {}
let TRASHCANS_ENDPOINT = {}
let TRASH_ENDPOINT = {}
*/

const UPLOAD_ENDPOINT    = ENDPOINTS.trash_upload; // Upload endpoint
const TRASHCANS_ENDPOINT = ENDPOINTS.trashcans_fetch; // Trashcans endpoint
const TRASH_ENDPOINT     = ENDPOINTS.trash_fetch; // Trash endpoint




const LOCATIONS = {
  '1': {
    'title': 'Museum für Kommunikation',
    'lat': 50.104278,
    'lng': 8.675969
  },
  '2': {
    'title': 'Dönerboot',
    'lat': 50.106136,
    'lng': 8.678191
  }
};


console.log(LOCATIONS);



function webtest() {
  return navigator.onLine;
}


function getPointData(id) {
  let success = false;
  return LOCATIONS[id.toString()];
}


console.log(getPointData(1));
console.log(getPointData(0));

function getTrashMapIcon() {
  var trashIcon = L.icon({
    iconUrl: 'static/icons/trash.png',

    iconSize:     [32, 32], // size of the icon
    iconAnchor:   [-20, 67], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
  });
  return trashIcon;
}

function setMarker(id, map) {
  if(MAP_PROVIDER == "leaflet") {
    const data = getPointData(id);
    var marker = L.marker([data.lat,data.lng], {icon: getTrashMapIcon()}).addTo(map);
		marker.bindPopup("<b>" + data.title + "</b>").openPopup();
  }
}

function setMarkersFromLocations(map) {
  Object.keys(LOCATIONS).forEach(function(key) {
    setMarker(key, map);
  });
}

function getTrashcans(lat, long) {

}




debugSequence();







// DEBUG LOGGER
function debugSequence() {
  if(DEBUG) {
    // Log endpoints
    console.log(`Upload endpoint:`);
    console.log(UPLOAD_ENDPOINT);
    console.log(`Trashcans endpoint:`);
    console.log(TRASHCANS_ENDPOINT);
    console.log(`Trash endpoint:`);
    console.log(TRASH_ENDPOINT);
  }
}
