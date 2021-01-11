document.addEventListener('DOMContentLoaded', function(){
    const datasetURL = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json';
    fetch(datasetURL)
        .then(function(response) {
            response.json()
                .then(function(json){
                    drawBarChart(json);
                });
        });
});

function drawBarChart(json) {

    const w = 1000;
    const h = 500;
    const padding = 60;

    const dataset = json.data;

    const svg = d3
        .select(".chart-container")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    const div = d3
        .select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 0)
        .attr("id", "tooltip")

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(dataset, (d) => d[1])])
        .range([h - padding, padding])

    const xScale = d3.scaleTime()
        .domain([
            d3.min(dataset, (d) => new Date(d[0])),
            d3.max(dataset, (d) => new Date(d[0])),
        ])
        .range([padding, w - padding]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    svg.append("g")
        .attr(
            "transform",
            `translate(0,${h - padding})`
        )
        .call(xAxis)
        .attr("id", "x-axis");
    
    svg.append("g")
        .attr(
            "transform", 
            `translate(${padding}, 0)`)
        .call(yAxis)
        .attr("id", "y-axis");

    svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("data-date", (d) => d[0])
        .attr("data-gdp", (d) => d[1])
        .attr("x", (d, i) => ((w - (padding * 2)) / dataset.length) * i)
        .attr("y", (d) => yScale(d[1]))
        .attr("height", (d) => h - padding - yScale(d[1]))
        .attr("width", () => ((w - (padding * 2)) / dataset.length) - .75)
        .attr("transform", `translate(${padding},0)`)
        .attr("fill", "DarkSeaGreen")
        .on("mouseover", (event, d) => {
            const date = new Date(d[0]);
            div
                .transition()
                .duration(200)
                .style("opacity", .9)
            div
                .html(`${date.getFullYear()} Q${quarterOfTheYear(date)} <br> ${formatAmount(d[1])}`)
                .style("left", (event.pageX) + "px")
                .style("top", (event.pageY - 28) + "px")
                .attr("data-date", d[0])
        })
        .on("mouseout", () => {
            div
                .transition()
                .duration(500)
                .style("opacity", 0)
        })

}

function quarterOfTheYear(date) {
    const month = date.getMonth() + 1;
    return (Math.ceil(month / 3));
}

function formatAmount(amount) {
    return `$${amount.toLocaleString()} Billion`
}