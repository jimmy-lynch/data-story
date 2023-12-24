const margin = {top: 50, right: 50, bottom: 50, left: 50},
     width = 800 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

var barPadding = 1;

 var days = true;

const svg = d3.select("#v1c")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

var g = svg.append("g")
            .attr("transform", "translate(" + 0 + "," + 0 + ")");

const y = d3.scaleLinear()
    .range([height, 0])
    .domain([0, 60]);
    
d3.csv("PresidentialGovtShutdowns.csv", function(d){
    return {
        president: d['President'],
        start: d['Start.String'], //may need to convert to actual date for timeline
        date: new Date(+d['Start.Year'], +d['Start.Month'], +d['Start.Day']),
        length: +d['Length'],
        party: d['Party'],
        image: d['Image.URL']
    };
}).then(function(data) {

    groupedData = d3.rollup(data, v => { return {
                                length: d3.sum(v, d => d.length),
                                party: v[0].party,
                                amt: d3.count(v, d => d.length)}},
                            d => d.president);

    const x = d3.scaleBand()
        .range([0, width])
        .domain(groupedData.keys())
        .padding(0.2);

    g.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x));
                
    g.append("g")
        .call(d3.axisLeft(y));

    g.selectAll(".bar")
        .data(groupedData)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d[0]);})
        .attr("y", function(d) { return y(d[1].length);})
        .attr("width", x.bandwidth())
        .attr("height", function (d) { return height - y(d[1].length) })
        .style("opacity", 0.8)
        .style("fill", function(d) { return d[1].party == "Republican" ? 'red' : 'blue'})
        .on("mouseover", function(e, d) {
            return d3.selectAll("rect")
                        .style("opacity", function(d2) {
                            if (d[1].party == d2[1].party) {
                                return 1.0
                            } else {
                                return 0.4
                            }
                        })
        })

    g.selectAll(".bartext")
        .data(groupedData)
        .enter()
        .append("text")
        .attr("class", "bartext")
        .text(function(d) {
            return d[1].length + " days";
        })
        .attr("text-anchor", "middle")
        .attr("x", function(d, i) {
            return x(d[0]) + 39;
        })
       .attr("y", function(d) {
            return y(d[1].length) + 17;
        })
        .attr("font-family", "arial")
       .attr("font-size", "11px")
        .attr("fill", "white");

       g.selectAll(".altbartext")
        .data(groupedData)
        .enter()
        .append("text")
        .attr("class", "altbartext")
        .text(function(d) {
            if (d[1].amt == 1) {
                return d[1].amt + " time";
            } else {
                return d[1].amt + " times";
            }
        })
        .attr("text-anchor", "middle")
        .attr("x", function(d, i) {
            return x(d[0]) + 39;
       })
        .attr("y", function(d) {
            return y(d[1].amt) - 10;
        })
        .attr("font-family", "arial")
       .attr("font-size", "12px")
       .attr("fill", "black")
        .style("opacity", 0.0);
})

d3.select("#v1button")
    .append("button")
    .html("Switch Units")
    .attr("padding_left", 10.0)
    .on("click", function(d) {
        g.selectAll(".bartext")
            .style("opacity", function() {
                return days ? 0.0 : 1.0
            })

        g.selectAll(".altbartext")
            .style("opacity", function() {
                return days ? 1.0 : 0.0
            })

        g.selectAll(".bar")
            .attr("y", function(d) {
                return days ? y(d[1].amt) : y(d[1].length)
            })
            .attr("height", function(d) {
                return days ? height - y(d[1].amt) : height - y(d[1].length)
            })

        days = days ? false : true
        return;
    })
