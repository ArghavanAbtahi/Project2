var defaultURL = "/airbnb";

// adding svg elements for scatter plot
var scatterSVGWidth = 960;
var scatterSVGHeight = 500;

var scatterMargin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var scatterWidth = scatterSVGWidth - scatterMargin.left - scatterMargin.right;
var scatterHeight = scatterSVGHeight - scatterMargin.top - scatterMargin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var scatterSVG = d3.select("#scatter")
  .append("svg")
  .attr("width", scatterSVGWidth)
  .attr("height", scatterSVGHeight);

var scatterGroup = scatterSVG.append("g")
  .attr("transform", `translate(${scatterMargin.left}, ${scatterMargin.top})`);

d3.json(defaultURL, function(error, response) {

    if (error) {
        console.log("*** Error getting response from " + defaultURL);
    }

    console.log("*** Response received");
    console.log(response);
    var numProperties = Object.keys(response).length;
    console.log("*** Number of properties received: " + numProperties);

    response.forEach(function(i) {
        i.accommodates = +i.accommodates;
        i.price = +i.price;
        i.rating = +i.rating;
        i.number_of_reviews = +i.number_of_reviews;
    });
    console.log(response[0]);
    console.log("*** Highest price received: " + d3.max(response, i => i.price));
    
    // Create scale functions
    var xScatterScale = d3.scaleLinear()
    .domain([0, d3.max(response, i => i.price)])
    .range([0, scatterWidth]);

    var yScatterScale = d3.scaleLinear()
        .domain([0, d3.max(response, i => i.number_of_reviews)])
        .range([scatterHeight, 0]);

    // Create axis functions
    var scatterBottomAxis = d3.axisBottom(xScatterScale);
    var scatterLeftAxis = d3.axisLeft(yScatterScale);

    scatterGroup.append("g").attr("transform", `translate(0, ${scatterHeight})`).call(scatterBottomAxis);
    scatterGroup.append("g").call(scatterLeftAxis);

        // Create circles
    var circles = scatterGroup.selectAll("circle")
    .data(response)
    .enter()
    .append("circle")
    .attr("cx", i => xScatterScale(i.price))
    .attr("cy", i => yScatterScale(i.number_of_reviews))
    .attr("r", "10")
    .attr("fill", "salmon")
    .attr("opacity", ".7");

    // Initialize tooltip
    var scatterTooltip = d3.tip()
    .attr("class", "d3-tip")
    .offset([80, -60])
    .html(function(i) {
        return (`${i.property_type}<br>Price: ${i.price}<br> Number of reviews: ${i.number_of_reviews}`);
    });

    // Call tooltip
    scatterGroup.call(scatterTooltip);

    // Display and hide the tooltip on hover
    circles.on("mouseover", function(response) {
        scatterTooltip.show(response, this);
    })
        // hover
        .on("mouseout", function(response, index) {
        scatterTooltip.hide(response);
        });

    scatterGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 10 - scatterMargin.left + 40)
    .attr("x", 10 - (scatterHeight / 2))
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("Property capacity");

    scatterGroup.append("text")
    .attr("transform", `translate(${scatterWidth / 2}, ${scatterHeight + scatterMargin.top + 30})`)
    .attr("class", "axisText")
    .text("Number of reviews");

});
