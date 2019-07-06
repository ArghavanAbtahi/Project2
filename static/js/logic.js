// Creating map object
var myMap = L.map("map", {
  center: [41.8781, -87.6298],
  zoom: 11,
});

// Adding tile layer to the map
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

var dark = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.dark",
  accessToken: API_KEY
});

var streets = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
});

// Adding markers to show major tourist attractions

var touristAttractions = [
  {
    name: "Millennium Park",
    location: [41.8826, -87.6226]
  },
  {
    name: "Willis Tower",
    location: [41.8789, -87.6359]
  },
  {
    name: "Navy Pier",
    location: [41.8917, -87.6043]
  },
  {
    name: "Wrigley Field",
    location: [41.9484, -87.6553]
  },
  {
    name: "Art Institute of Chicago",
    location: [41.8796, -87.6237]
  },
  {
    name: "Lincoln Park",
    location: [41.9255, -87.6488]
  }
];

//Add the attraction markers to a new layer group
var attractionLayer = L.layerGroup(touristAttractions);

var overlayMaps = {
  Attractions: attractionLayer
};

var baseMaps = {
  Dark: dark,
  Streets: streets
};


// Loop through the attractions array and create one marker for each object
for (var i = 0; i < touristAttractions.length; i++) {
  L.circle(touristAttractions[i].location, {
    fillOpacity: 0.8,
    color: "purple",
    fillColor: "purple",
    radius: 110
  }).bindPopup("<h1>" + touristAttractions[i].name + "</h1>").addTo(myMap);
}

// Add the layer control to the map
L.control.layers(baseMaps, overlayMaps).addTo(myMap);


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