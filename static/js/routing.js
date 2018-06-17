function routeTo(latLng0, latLng1) {
  L.Routing.control({
	    waypoints: [
		        latLng0,
		        latLng1
		      ]
  }).addTo(mymap);
}
