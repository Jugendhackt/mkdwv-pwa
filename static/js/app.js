
// Settings
const DEBUG        = true;
const MAP_PROVIDER = "leaflet";


const BASE_URL = "http://151.216.10.34:8080"
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
    'uri': `${BASE_URL}/trashcans`
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



/*
let LOCATIONS = {
  1: {
    'title': 'Museum für Kommunikation',
    'lat': 50.104278,
    'lng': 8.675969
  },
  2: {
    'title': 'Dönerboot',
    'lat': 50.106136,
    'lng': 8.678191
  }
};
*/

let LOCATIONS = [];

////console.log(LOCATIONS);



function webtest() {
  return navigator.onLine;
}


function getPointData(id) {
  let success = false;
  return LOCATIONS[id];
}


////console.log(getPointData(1));
////console.log(getPointData(0));

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
  //console.log(id)
  if(MAP_PROVIDER == "leaflet") {
    const data = getPointData(id);
    var marker = L.marker([data.lat,data.lng]).addTo(map);
		marker.bindPopup("<b>" + data.title + "</b>").openPopup();
  }
}

function setMarkersFromLocations(locations, map) {
  Object.keys(locations).forEach(function(key) {
    if (key % 15 === 0) {
      console.log(key);
    }
    //debugger;
    setMarker(key, map);
  });
}

function populateByTrashcans(lat, lng, map) {
  function reqListener () {
    //console.log(this.responseText);
    const respText = this.responseText
    const json = JSON.parse(respText);
    //console.log(json);
    for(var item of json) {
      //console.log(item)
      var loc = {
        'title': item.trashBinID,
        'lat': item.latitude,
        'lng': item.longitude
      }
      //console.log(loc)
      //LOCATIONS[Math.max(Object.keys(LOCATIONS)) + 1]
      LOCATIONS.push(loc);
    }
    //console.log(LOCATIONS);
    setMarkersFromLocations(LOCATIONS, map);
  }

  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", reqListener);
  oReq.open("GET", `${TRASHCANS_ENDPOINT.uri}?position=${lat},${lng}`);
  oReq.send();
}




debugSequence();







// DEBUG LOGGER
function debugSequence() {
  if(DEBUG) {
    // Log endpoints
    //console.log(`Upload endpoint:`);
    //console.log(UPLOAD_ENDPOINT);
    //console.log(`Trashcans endpoint:`);
    //console.log(TRASHCANS_ENDPOINT);
    //console.log(`Trash endpoint:`);
    //console.log(TRASH_ENDPOINT);
  }
}
