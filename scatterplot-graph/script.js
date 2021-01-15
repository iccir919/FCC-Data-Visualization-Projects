document.addEventListener('DOMContentLoaded', () => {
    fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json')
    .then(response => response.json())
    .then(data => drawScatterChart(data))
});

const drawScatterChart = (data) => {
    console.log(data);

    const w = 1000;
    const h = 600;
    const padding = 60;

    const svg = d3
        .select(".graph-container")
        .append("svg")
        .attr("width", w)
        .attr("height", h)

    const xScale = d3
        .scaleTime()
        .domain([
            new Date(`January 1, ${d3.min((data.map((d) => d["Year"])))} 00:00:00`),
            new Date(`January 1, ${d3.max((data.map((d) => d["Year"])))} 00:00:00`)
        ])
        .range([padding, w - padding])

    const durations = data.map( d => moment.duration(`00:${d["Time"]}`)._milliseconds );
    console.log(durations)
    const yScale = d3
        .scaleLinear()
        .domain([d3.min(durations), d3.max(durations)])
        .range([h - padding, padding])

    console.log(yScale(132900000))

    const yAxis = d3.axisLeft(yScale).tickFormat(d => moment.unix(d / 1000).format("mm:ss") );
    const xAxis = d3.axisBottom(xScale);

    svg
        .append("g")
        .attr("transform", `translate(0, ${h - padding})`)
        .call(xAxis)
        .attr("id", "x-axis")

    svg
        .append("g")
        .attr("transform", `translate(${padding}, 0)`)
        .call(yAxis)
        
    
}