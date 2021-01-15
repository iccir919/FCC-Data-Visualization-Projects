document.addEventListener('DOMContentLoaded', () => {
    fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json')
    .then(response => response.json())
    .then(data => drawScatterGraph(data))
});

const drawScatterGraph = (dataset) => {
    console.log(dataset);

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
            new Date(`January 1, ${d3.min((dataset.map((d) => d["Year"]))) - 1} 00:00:00`),
            new Date(`January 1, ${d3.max((dataset.map((d) => d["Year"])))} 00:00:00`)
        ])
        .range([padding, w - padding])

    const yScale = d3
        .scaleLinear()
        .domain([d3.max(dataset.map(d => d["Seconds"])), d3.min(dataset.map(d => d["Seconds"]))])
        .range([h - padding, padding])

    const yAxis = d3.axisLeft(yScale).tickFormat( (d) => formatDuration(d) );
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
        .attr("id", "y-axis")

    console.log(xScale(1995))

    svg.selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("cy", d => yScale(d["Seconds"]))
        .attr("cx", d => xScale( new Date(`January 1, ${d["Year"]} 00:00:00`) ))
        .attr("r", 5)
        .attr("class", "dot")
        .attr("data-xvalue", d => new Date(`January 1, ${d["Year"]} 00:00:00`))
        .attr("data-yvalue", d => d["Seconds"])
        .attr("fill", "black")
}

const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;

    return `${zeroPad(minutes)}:${zeroPad(seconds)}`
}

const zeroPad = (value) => {
    if (value < 10) return `0${value}`;
    else return value;
}

