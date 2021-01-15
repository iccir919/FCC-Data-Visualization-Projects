document.addEventListener('DOMContentLoaded', () => {
    fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json')
    .then(response => response.json())
    .then(data => drawScatterChart(data))
});

const drawScatterChart = (data) => {
    const w = 1000;
    const h = 600;

    const svg = d3
        .select(".graph-container")
        .append("svg")
        .attr("width", w)
        .attr("height", h)
}