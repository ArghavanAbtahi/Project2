// Creating map object
var myMap = L.map("map", {
  center: [41.8781, -87.6298],
  zoom: 12
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

d3.json(defaultURL, function(response) {

// set variable to hold all properties in response.data
var airbnbProperties = response.data.air;

// initialize marker cluster group
var airbnbMarkers = L.markerClusterGroup();

// loop through airbnbProperties array
for (var i = 0; i < airbnbProperties.length; i++) {

  var airbnbProperty = airbnbProperties[i];

  // set location variable for latitude and longtude
  var location = [airbnbProperty.latitude, airbnbProperty.longitude];

  if (location) {
    airbnbMarkers.addLayer(L.marker(location)
      .bindPopup("<h3>" + airbnbProperty.property_type + "<h3><h3>Capacity: " + airbnbProperty.accomodates + "<h3><h3>Price: " + airbnbProperty.price + "<h3><h3>Rating: " + airbnbProperty.rating));
  }
}

// add marker cluster to the map
myMap.addLayer(airbnbMarkers);

});