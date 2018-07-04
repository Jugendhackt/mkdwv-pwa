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
		popup.on("popupopen", () => {marker.setIcon(trashcanSIcon)});
		popup.on("popupclose", () => {marker.setIcon(trashcanIcon)});
		popup.openPopup();
  }
}

function setMarkersFromLocations(locations, map) {
  Object.keys(locations).forEach(function(key) {
    if (key % 15 === 0) {
      console.log(key);
    }
    setMarker(key, map);
  });
}

function generateContent(item) {
  let html = `<b>ID:</b> ${item.trashBinID}<br>`;
  if(item.distance_in_m) {
    const newDistance = (Math.round(item.distance_in_m * 10)/10).toString().replace('.', ',');
    html += `<b>${TRANSLATION_DE.distance["_"]}:</b> <b>${newDistance} m</b>`;
  }	
  var tags = ["vending", "payment:none","fee","highway","indoor","waste","_lastcheck","_level","tourism","tunnel","_operator","_name"];

  for(var tag of tags) {
    let numerical = tag.charAt(0)=='_';
		if(numerical) tag = tag.substr(1);
    if(item.subdata[tag]) {
      html += `<br><b>${TRANSLATION_DE[tag]["_"]}:</b> `;
			if(numerical)
        html += `${item.subdata[tag]}`;
			else if(TRANSLATION_DE[tag])
        html += `${TRANSLATION_DE[tag][item.subdata[tag]]}`;
      else
        html += `${item.subdata[tag]}`;

    }
  }
	html += `<br><button type="button" onclick="" id="show_nearest_trashcan">Anzeigen</button>  <button>Route berechnen</button>`;
  return html;
}

function populateByTrashcans(lat, lng, map) {
  function reqListener (respText) {
    const json = JSON.parse(respText);
    for(var item of json) {
      let subdata = JSON.parse(item.data);
      item.subdata = subdata;
      var loc = {
        'lat': item.latitude,
        'lng': item.longitude,
        content: generateContent(item)
      }
      loc.content = html;
      LOCATIONS.push(loc);
    }
    document.getElementById("search-output").innerHTML = JSON.stringify(LOCATIONS, null, 4);
      setMarkersFromLocations(LOCATIONS, map);
  }

  	  
  document.getElementsByClassName("loader")[0].style.display = "block";
  function stopLoading(){document.getElementsByClassName("loader")[0].style.display = "none";}
  var req = new XMLHttpRequest();
  const requestUrl = `${TRASHCANS_ENDPOINT.uri}?position=${lat},${lng}`;
  console.log(`Sending request to ${requestUrl}`);
  req.open("GET", requestUrl, true);
  req.onload = () => {reqListener(req.responseText);stopLoading();};
  req.onerror = () => {console.error(req.statusText);stopLoading();};
  req.send();
} 
