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
        .attr("transform", 
        `translate(${padding}, 0)`)
        .call(yAxis)
        .attr("id", "y-axis");

    svg.selectAll("rec")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("class", "bar")
}