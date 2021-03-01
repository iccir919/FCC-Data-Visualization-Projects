document.addEventListener('DOMContentLoaded', () => {
    const datasetURL = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json";
    fetch(datasetURL)
        .then(response => response.json())
        .then(data => {
            document.getElementById("base-temp").innerHTML = data.baseTemperature;
            drawHeatMap(data.monthlyVariance)
        });
})

const drawHeatMap = (dataset) => {
    const h = 500;
    const w = 1350;
    const padding = 30;

    const svg = d3.select(".chart-container")
        .append("svg")
        .attr("width", w)
        .attr("height", h)

    const xScale = d3.scaleTime()
        .domain([
            d3.min(dataset, d => new Date(`${d.year}-${d.month}-1`)),
            d3.max(dataset, d => new Date(`${d.year}-${d.month}-1`))
        ])
        .range([padding, w - padding]);

    const xAxis = d3.axisBottom(xScale);

    svg
        .append("g")
        .attr("transform", `translate(0, ${h - padding})`)
        .attr("id", "x-axis")
        .call(xAxis)

    const y = d3.scaleTime()
        .domain([
        ])
        .range();
}
