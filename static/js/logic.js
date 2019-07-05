// Creating map object
var myMap = L.map("map", {
  center: [41.8781, -87.6298],
  zoom: 10
});

// Adding tile layer to the map
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
maxZoom: 18,
id: "mapbox.streets",
accessToken: API_KEY
}).addTo(myMap);

// add url for json stored in app route /airbnb
var defaultURL = "/airbnb";

d3.json(defaultURL, function(error, response) {

  if (error) {
    console.log("*** Error getting response from " + defaultURL);
  }

  console.log("*** Response received");
  console.log(response);
  var numProperties = Object.keys(response).length;
  console.log("*** Number of properties received: " + numProperties);

  // initialize marker array, marker cluster group
  // var airbnbMarkers = [];
  var markers = L.markerClusterGroup();
  
  // loop through airbnbProperties array
  for (var i = 0; i < response.length; i++) {

    var airbnbProperty = response[i];

    // set location variable for latitude and longtude
    var location = [airbnbProperty.latitude, airbnbProperty.longitude];

    // console.log(location);
    
    if (location) {
      // .push(airbnbMarker)   
      console.log("Adding marker to marker cluster group");
      markers.addLayer(L.marker(location)
      .bindPopup("<h3>" + airbnbProperty.property_type + "<h3><h3>Neighborhood: " + airbnbProperty.neighbourhood + "<h3><h3>Capacity: " + airbnbProperty.accommodates + "<h3><h3>Price: " + airbnbProperty.price));
    }
  }

  // var markerLayer = L.layerGroup(markers);
  console.log("checking for markers");
  console.log(markers);
  // add marker cluster to the map
  myMap.addLayer(markers);

});