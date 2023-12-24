const margin2 = {top: 50, right: 50, bottom: 50, left: 50},
    width2 = 1250 - margin2.left - margin2.right,
    height2 = 200 - margin2.top - margin2.bottom;

var barPadding2 = 1;

var repub2 = true;
 var both2 = false;

const svg2 = d3.select("#v2c")
    .append("svg")
    .attr("width", width2 + margin2.left + margin2.right)
    .attr("height", height2 + margin2.top + margin2.bottom)
    .append("g")
    .attr("transform", `translate(${margin2.left}, ${margin2.top})`);

var g2 = svg2.append("g")
            .attr("transform", "translate(" + 0 + "," + 0 + ")");
    
const y2 = d3.scaleLinear()
    .range([height2, 0])
    .domain([0, 12]);

d3.csv("PresidentialGovtShutdowns.csv", function(d){
    return {
        president: d['President'],
        start: d['Start.String'], //may need to convert to actual date for timeline
        date: new Date(+d['Start.Year'], +d['Start.Month'], +d['Start.Day']),
        year: +d['Start.Year'],
        month: +d['Start.Month'],
        length: +d['Length'],
        party: d['Party'],
        image: d['Image.URL']
    };
}).then(function(data) {
    const years2 = [1973, 1974, 1975, 1976, 1977, 1978, 1979,
                    1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989,
                    1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1989,
                    2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009,
                    2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019,
                    2020, 2021]


    const x2 = d3.scaleBand()
        .range([0, width2])
        .domain(years2)
        .padding(0.2);

    g2.append("g")
        .attr("transform", `translate(0, ${height2})`)
        .call(d3.axisBottom(x2))

    g2.selectAll(".dot")
        .data(data)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 10)
        .attr("cx", function(d) { 
            return x2(d.year) + 5;})
        .attr("cy", function(d) { 
            return y2(d.month);})
        .style("opacity", 0.8)
        .style("stroke", function(d) { return d.party == "Republican" ? 'red' : 'blue'})
        .style("stroke-width", 1.0)
        .style("fill", "#fff")
}) 

d3.select("#v2button")
    .append("button")
    .html("Switch Parties")
    .attr("padding_right", 10)
    .on("click", function(d) {
        g2.selectAll(".dot")
            .style("fill", function(d) {
                if (d.party == "Republican") {
                    return repub2 ? 'white' : 'red'
                } else {
                    return repub2 ? 'blue' : 'white'
                }
            })
        repub2 = repub2 ? false : true
        return;
    })
    .style("margin-left", `20px`)

d3.select("#v2button2")
    .append("button")
    .html("Both Parties")
    .attr("padding_right", 10)
    .on("click", function(d) {
        g2.selectAll(".dot")
            .style("fill", function(d) {
                if (both2) {
                    return "#fff"
                } else {
                    return (d.party == "Republican") ? 'red' : 'blue'
                }
            })   
        both2 = both2 ? false : true             
        return;
    })
    .style("margin-left", `20px`)
    .style("margin-top", `10px`)