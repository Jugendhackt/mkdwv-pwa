
// Settings
const DEBUG        = true;
const MAP_PROVIDER = "leaflet";
const TILE_URLS = {
  "default": "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  "watercolor": "	http://c.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg"
}


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

// Maps
const TRANSLATION_DE = {
  'vending': {
    'excrement_bags': 'Hundekottütenspender',
    'drinks': 'Getränke'
  },
  'amenity': {
    '_': 'Typ',
    'vending_machine': 'Pfandflaschenautomat',
    'waste_basket': 'Mülleimer'
  },
  'payment:none': {
    '_': 'Keine Zahlung',
    'yes': 'Ja',
    'no': 'Nein'
  },
  'fee': {
    '_': 'Kosten',
    'no': 'Nein',
    'yes': 'Ja'
  },
  'highway': {
    '_': 'Bes.Ort',
    'bus_stop': 'Bushaltestelle'
  },
  'indoor': {
    '_': 'Innen',
    'yes': 'Ja',
    'no': 'Nein'
  },
  'waste': {
    '_': 'Müll',
    'trash': 'Müll'
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
    iconUrl: 'static/icons/icon3.svg',

    iconSize:     [32, 32], // size of the icon
    iconAnchor:   [20, 80], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
  });
  return trashIcon;
}

function setMarker(id, map) {
  //console.log(id)
  if(MAP_PROVIDER == "leaflet") {
    const data = getPointData(id);
    var marker = L.marker([data.lat,data.lng], {icon: getTrashMapIcon()}).addTo(map);
		marker.bindPopup(data.content).openPopup();
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
      let subdata = JSON.parse(item.data)
      item.subdata = subdata
      let html = `<b>${item.trashBinID}</b><br>`
      //console.log(subdata)
      //console.log(item)
      var loc = {
        'lat': item.latitude,
        'lng': item.longitude
      }
      if(item.subdata.vending && item.subdata.vending != undefined) {
        html = html + `<b>Typ:</b> ${TRANSLATION_DE.vending[item.subdata.vending]}<br>`
      }
      if(item.subdata["payment:none"] && item.subdata["payment:none"] != undefined) {
        html = html + `<b>${TRANSLATION_DE["payment:none"]["_"]}:</b> ${TRANSLATION_DE["payment:none"][item.subdata["payment:none"]]}<br>`
      }
      //console.log(loc)
      //LOCATIONS[Math.max(Object.keys(LOCATIONS)) + 1]
      loc.content = html
      LOCATIONS.push(loc);
    }
    //console.log(LOCATIONS);
    setMarkersFromLocations(LOCATIONS, map);
  }

  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", reqListener);
  const requestUrl = `${TRASHCANS_ENDPOINT.uri}?position=${lat},${lng}`
  console.log(`Sending request to ${requestUrl}`)
  oReq.open("GET", requestUrl);
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
