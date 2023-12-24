const margin2b = {top: 50, right: 50, bottom: 50, left: 50},
    width2b = 1250 - margin2b.left - margin2b.right,
    height2b = 200 - margin2b.top - margin2b.bottom;

var repub2b = true;
var both2b = false;

const svg2b = d3.select("#v2bc")
    .append("svg")
    .attr("width", width2b + margin2b.left + margin2b.right)
    .attr("height", height2b + margin2b.top + margin2b.bottom)
    .append("g")
    .attr("transform", `translate(${margin2b.left}, ${margin2b.top})`);

var g2b = svg2b.append("g")
        .attr("transform", "translate(" + 0 + "," + 0 + ")");
    
const y2b = d3.scaleLinear()
    .range([height2b, 0])
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
    const years2b = [1790, 1791, 1792, 1793, 1794, 1795, 1796, 1797, 1798, 1799,
                   1800, 1801, 1802, 1803, 1804, 1805, 1806, 1807, 1808, 1809, 
                   1810, 1811, 1812, 1813, 1814, 1815, 1816, 1817, 1818, 1819, 
                   1820, 1821, 1822, 1823, 1824, 1825, 1826, 1827, 1828, 1829, 
                   1830, 1831, 1832, 1833, 1834, 1835, 1836, 1837, 1838, 1839, 
                   1840, 1841, 1842, 1843, 1844, 1845, 1846, 1847, 1848, 1849, 
                   1850, 1851, 1852, 1853, 1854, 1855, 1856, 1857, 1858, 1859, 
                   1860, 1861, 1862, 1863, 1864, 1865, 1866, 1867, 1868, 1869, 
                   1870, 1871, 1872, 1873, 1874, 1875, 1876, 1877, 1878, 1879, 
                   1880, 1881, 1882, 1883, 1884, 1885, 1886, 1887, 1888, 1889, 
                   1890, 1891, 1892, 1893, 1894, 1895, 1896, 1897, 1898, 1899, 
                   1900, 1901, 1902, 1903, 1904, 1905, 1906, 1907, 1908, 1909, 
                   1910, 1911, 1912, 1913, 1914, 1915, 1916, 1917, 1918, 1919, 
                   1920, 1921, 1922, 1923, 1924, 1925, 1926, 1927, 1928, 1929, 
                   1930, 1931, 1932, 1933, 1934, 1935, 1936, 1937, 1938, 1939, 
                   1940, 1941, 1942, 1943, 1944, 1945, 1946, 1947, 1948, 1949, 
                   1950, 1951, 1952, 1953, 1954, 1955, 1956, 1957, 1958, 1959, 
                   1960, 1961, 1962, 1963, 1964, 1965, 1966, 1967, 1968, 1969,
                   1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979,
                   1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989,
                   1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1989,
                   2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009,
                   2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019,
                   2020, 2021]


    const x2b = d3.scaleBand()
        .range([0, width2b])
        .domain(years2b)
        .padding(0.2);

    g2b.append("g")
        .attr("transform", `translate(0, ${height2b})`)
        .call(d3.axisBottom(x2b))

    g2b.selectAll(".dot")
        .data(data)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 10)
        .attr("cx", function(d) { 
            return x2b(d.year) + 5;})
        .attr("cy", function(d) { 
            return y2b(d.month);})
        .style("opacity", 0.8)
        .style("stroke", function(d) { return d.party == "Republican" ? 'red' : 'blue'})
        .style("stroke-width", 1.0)
        .style("fill", "#fff")
}) 

d3.select("#v2bbutton")
    .append("button")
    .html("Switch Parties")
    .attr("padding_right", 10)
    .on("click", function(d) {
        g2b.selectAll(".dot")
            .style("fill", function(d) {
                if (d.party == "Republican") {
                    return repub2b ? 'white' : 'red'
                } else {
                    return repub2b ? 'blue' : 'white'
                }
             })
         repub2b = repub2b ? false : true
        return;
    })
    .style("margin-left", `20px`)

d3.select("#v2bbutton2")
    .append("button")
    .html("Both Parties")
    .attr("padding_right", 10)
    .on("click", function(d) {
        g2b.selectAll(".dot")
            .style("fill", function(d) {
                if (both2b) {
                    return "#fff"
                } else {
                    return (d.party == "Republican") ? 'red' : 'blue'
                }
            })  
        both2b = both2b ? false : true             
        return;
    })
    .style("margin-left", `20px`)
    .style("margin-top", `10px`)