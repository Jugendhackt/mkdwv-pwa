// Settings
const MAP_PROVIDER = "leaflet";
const TILE_URLS = {
  "default": "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  "watercolor": "http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg",
  "googlesat": "http://mt.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
  "googlehybrid": "http://mt.google.com/vt/lyrs=y&x={x}&y={y}&z={z}",
  "googleroadmap": "http://mt.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
  "googleroads": "http://mt.google.com/vt/lyrs=h&x={x}&y={y}&z={z}",
  "googleterrain": "http://mt.google.com/vt/lyrs=p&x={x}&y={y}&z={z}",
  "googlealteredroad": "http://mt.google.com/vt/lyrs=r&x={x}&y={y}&z={z}",
  "googleterrainonly": "http://mt.google.com/vt/lyrs=t&x={x}&y={y}&z={z}"
}


const BASE_URL = "https://kfdw.herokuapp.com"
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
		'_': 'Typ',
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
    'trash': 'Mülleimer',
    'dog_excrement': 'Hundekot'
  },
  'distance': {
    '_': 'Entfernung'
  },
  'level': {
    '_': 'Level'
  },
  'tourism': {
    '_': 'Tourismus',
    'information': 'Information'
  },
  'lastcheck': {
    '_': 'Letzte Überprüfung'
  },
  'tunnel': {
    '_': 'Tunnel',
    'yes': 'Ja',
    'no': 'Nein'
  },
  'operator': {
    '_': 'Betreiber'
  },
  'name': {
    '_': 'Titel'
  }
};

const UPLOAD_ENDPOINT    = ENDPOINTS.trash_upload; // Upload endpoint
const TRASHCANS_ENDPOINT = ENDPOINTS.trashcans_fetch; // Trashcans endpoint
const TRASH_ENDPOINT     = ENDPOINTS.trash_fetch; // Trash endpoint

//array of {title,lat,lng} elements
let LOCATIONS = [];


function webtest() {
  return navigator.onLine;
}


function getPointData(id) {
  let success = false;
  return LOCATIONS[id];
}

//console.log(getPointData(1));
//console.log(getPointData(0));

var trashcanIcon = L.icon({
  iconUrl: 'static/icons/icon3.svg',

  iconSize:     [32, 32], // size of the icon
  iconAnchor:   [16, 16], // point of the icon which will correspond to marker's location
  popupAnchor:  [0, -18] // point from which the popup should open relative to the iconAnchor
});

var trashcanSIcon = L.icon(Object.assign({}, trashcanIcon.options, {
	shadowUrl: 'static/icons/trashcan_shadow.png',
	shadowAnchor: [64, 64]
}));

function setMarker(id, map) {
  if(MAP_PROVIDER == "leaflet") {
    const data = getPointData(id);
    var marker = L.marker([data.lat,data.lng], {icon: trashcanIcon}).addTo(map);
		var popup = marker.bindPopup(data.content);
		popup.on("popupopen", () => {marker.setIcon(trashcanSIcon)})
		popup.on("popupclose", () => {marker.setIcon(trashcanIcon)})
		popup.openPopup();
  }
}

  //new function should print the coordinates, ... more likely	
  function shownearestTrashcan(){
    var test = Object.keys(LOCATIONS).map(function(key){
      return [Number(key), LOCATIONS[key]];
  }); 
  console.log(test);
  test.toString()	  
  document.getElementById("search-output").innerHTML = test[0];
 } 
	  


function setMarkersFromLocations(locations, map) {
  Object.keys(locations).forEach(function(key) {
    if (key % 15 === 0) {
      console.log(key);
    }
    setMarker(key, map);
  });
}
function populateByTrashcans(lat, lng, map) {
  function reqListener (respText) {
    const json = JSON.parse(respText);
    for(var item of json) {
      let subdata = JSON.parse(item.data)
      item.subdata = subdata
      let html = `<b>ID:</b> ${item.trashBinID}<br>`
      var loc = {
        'lat': item.latitude,
        'lng': item.longitude
      }
      if(item.distance_in_m) {
        const newDistance = (Math.round(item.distance_in_m * 10)/10).toString().replace('.', ',')
        html += `<b>${TRANSLATION_DE.distance["_"]}:</b> <b>${newDistance} m</b>`
	html += `<br> <button type="button" onclick="shownearestTrashcan()" id="show_nearest_trashcan">Anzeigen</button>  <button>Route berechnen</button> <br>`     
      }	
      var tags = ["vending", "payment:none","fee","highway","indoor","waste","_lastcheck","_level","tourism","tunnel","_operator","_name"];

      for(var tag of tags) {
        let numerical = tag.charAt(0)=='_'
				if(numerical) tag = tag.substr(1);
        if(item.subdata[tag]) {
          html += `<b>${TRANSLATION_DE[tag]["_"]}:</b> `;
					if(numerical)
            html += `${item.subdata[tag]}<br>`;
					else if(TRANSLATION_DE[tag])
            html += `${TRANSLATION_DE[tag][item.subdata[tag]]}<br>`;
          else
            html += `${item.subdata[tag]}<br>`;

        }
      }
      loc.content = html
      LOCATIONS.push(loc);
    }
    document.getElementById("search-output").innerHTML = JSON.stringify(LOCATIONS, null, 4);
      setMarkersFromLocations(LOCATIONS, map);
  }

  	  
  document.getElementsByClassName("loader")[0].style.display = "block";
  function stopLoading(){document.getElementsByClassName("loader")[0].style.display = "none";}
  var req = new XMLHttpRequest();
  const requestUrl = `${TRASHCANS_ENDPOINT.uri}?position=${lat},${lng}`;
  console.log(`Sending request to ${requestUrl}`)
  req.open("GET", requestUrl, true);
  req.onload = () => {reqListener(req.responseText);stopLoading();};
  req.onerror = () => {console.error(req.statusText);stopLoading();};
  req.send();
} 
