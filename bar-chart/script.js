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
    const h = 375;

    const dataset = json.data;

    const svg = d3
        .select(".chart-container")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(dataset, (d) => d[1])])
        .range([h, 0])

    svg.selectAll("rec")
        .data(dataset)
        .enter()
        .append("rect")
}