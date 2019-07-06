var defaultURL = "/airbnb";

// adding svg elements for scatter plot
var scatterSVGWidth = 1000;
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

// adding svg elements for scatter plot
var scatter2SVGWidth = 1000;
var scatter2SVGHeight = 500;

var scatter2Margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var scatter2Width = scatter2SVGWidth - scatter2Margin.left - scatter2Margin.right;
var scatter2Height = scatter2SVGHeight - scatter2Margin.top - scatter2Margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var scatter2SVG = d3.select("#scatter2")
  .append("svg")
  .attr("width", scatter2SVGWidth)
  .attr("height", scatter2SVGHeight);

var scatter2Group = scatter2SVG.append("g")
  .attr("transform", `translate(${scatter2Margin.left}, ${scatter2Margin.top})`);


// JSON FUNCTION
// Calling json to create charts

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
    .attr("r", "5")
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
    .text("Price");

    scatterGroup.append("text")
    .attr("transform", `translate(${scatterWidth / 2}, ${scatterHeight + scatterMargin.top + 30})`)
    .attr("class", "axisText")
    .text("Number of reviews");

    // *** SCATTER 2
    // Create scale functions
    var xscatter2Scale = d3.scaleLinear()
    .domain([0, d3.max(response, i => i.price)])
    .range([0, scatter2Width]);

    var yscatter2Scale = d3.scaleLinear()
        .domain([0, d3.max(response, i => i.accommodates)])
        .range([scatter2Height, 0]);

    // Create axis functions
    var scatter2BottomAxis = d3.axisBottom(xscatter2Scale);
    var scatter2LeftAxis = d3.axisLeft(yscatter2Scale);

    scatter2Group.append("g").attr("transform", `translate(0, ${scatter2Height})`).call(scatter2BottomAxis);
    scatter2Group.append("g").call(scatter2LeftAxis);

        // Create circles
    var circles = scatter2Group.selectAll("circle")
    .data(response)
    .enter()
    .append("circle")
    .attr("cx", i => xscatter2Scale(i.price))
    .attr("cy", i => yscatter2Scale(i.accommodates))
    .attr("r", "5")
    .attr("fill", "salmon")
    .attr("opacity", ".7");

    // Initialize tooltip
    var scatter2Tooltip = d3.tip()
    .attr("class", "d3-tip")
    .offset([80, -60])
    .html(function(i) {
        return (`${i.property_type}<br>Price: ${i.price}<br> Capacity: ${i.accommodates}`);
    });

    // Call tooltip
    scatter2Group.call(scatter2Tooltip);

    // Display and hide the tooltip on hover
    circles.on("mouseover", function(response) {
        scatter2Tooltip.show(response, this);
    })
        // hover
        .on("mouseout", function(response, index) {
        scatter2Tooltip.hide(response);
        });

    scatter2Group.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 10 - scatter2Margin.left + 40)
    .attr("x", 10 - (scatter2Height / 2))
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("Price");

    scatter2Group.append("text")
    .attr("transform", `translate(${scatter2Width / 2}, ${scatter2Height + scatter2Margin.top + 30})`)
    .attr("class", "axisText")
    .text("Property capacity");

});
