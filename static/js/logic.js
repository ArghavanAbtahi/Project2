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

console.log("showing response");
console.log(response);
console.log("Response contains ${len(response)} items.");
// set variable to hold all properties in response.data
// var airbnbProperties = response.data;

// initialize marker cluster group
var airbnbMarkers = [];

// loop through airbnbProperties array
for (var i = 0; i < response.length; i++) {

  var airbnbProperty = response[i];

  // set location variable for latitude and longtude
  var location = [airbnbProperty.latitude, airbnbProperty.longitude];

  console.log("Never underestimate a console.log()")
  console.log(location);
  
  if (location) {
    
    var airbnbMarker = L.marker(location)
      .bindPopup("<h3>" + airbnbProperty.property_type + "<h3><h3>Capacity: " + airbnbProperty.accomodates + "<h3><h3>Price: " + airbnbProperty.price + "<h3><h3>Rating: " + airbnbProperty.rating);
    
    console.log("pushing:");
    console.log(airbnbMarker); 
    airbnbMarkers.push(airbnbMarker);
  }
}

var markerLayer = L.layerGroup(airbnbMarkers);
console.log("checking for markers");
console.log(airbnbMarkers);
// add marker cluster to the map
myMap.addLayer(markerLayer);

});