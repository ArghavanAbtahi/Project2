function createMap(airbnbMarkers) {

  // Create the tile layer that will be the background of our map
  var streetMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });

  // Create a baseMaps object to hold the lightmap layer
  var baseMaps = {
    "Street Map": streetMap
  };

  // Create an overlayMaps object to hold the bikeStations layer
  var overlayMaps = {
    "Airbnb Markers": airbnbMarkers
  };

  // Create the map object with options
  var map = L.map("map", {
    center: [41.8781, -87.6298],
    zoom: 12,
    layers: [streetMap, airbnbMarkers]
  });


  // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);
}
// add url for json stored in app route /airbnb
var defaultURL = "/airbnb";

function createMarkers(response) {
  
  // set variable to hold all properties in response.data
  var airbnbProperties = response.data.air;

  // initialize marker cluster group
  var airbnbMarkers = [];

  // loop through airbnbProperties array 
  for (var i = 0; i < airbnbProperties.length; i++) {
    
    var airbnbProperty = airbnbProperties[i];
    
    // set location variable for latitude and longtude
    var location = [airbnbProperty.latitude, airbnbProperty.longitude];

    if (location) {
      var airbnbMarker = L.marker(location)
        .bindPopup("<h3>" + airbnbProperty.property_type + "<h3><h3>Capacity: " + airbnbProperty.accomodates + "<h3><h3>Price: " + airbnbProperty.price + "<h3><h3>Rating: " + airbnbProperty.rating);
      
      // Add the marker to the airbnbMarkers array
      airbnbMarkers.push(airbnbMarker);
    }
  }

  // add marker cluster to the map
  createMap(L.layerGroup(airbnbMarkers));
  
}

d3.json(defaultURL, createMarkers);