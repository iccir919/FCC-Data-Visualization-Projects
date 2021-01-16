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
        .range([h - padding, padding / 2])

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

    svg.selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("cy", d => yScale(d["Seconds"]))
        .attr("cx", d => xScale( new Date(`January 1, ${d["Year"]} 00:00:00`) ))
        .attr("r", 6)
        .attr("class", "dot")
        .attr("data-xvalue", d => new Date(`January 1, ${d["Year"]} 00:00:00`))
        .attr("data-yvalue", d => {
            const minutes = d["Time"].split(":")[0];
            const seconds = d["Time"].split(":")[1];

            return new Date(`2020-02-02 00:${minutes}:${seconds}`)
        })
        .attr("fill", (d) => {
            if(d["Doping"].length > 0) return "SteelBlue"
            else return "Orange"
        })
        .attr("data-legend", (d) => {
            if (d["Doping"].length > 0) return "Riders with doping allegations";
            else return "No doping allegations";
        })
        .style("stroke-width", 1)
        .style("stroke", "Black")

    const legend = svg
        .append("g")
        .attr("id", "legend")    

    legend
        .append("rect")
        .attr("x", w - padding)
        .attr("y", h / 2 - 30)
        .attr("height", 15)
        .attr("width", 15)
        .style("fill", "SteelBlue")
    legend
        .append("rect")
        .attr("x", w - padding)
        .attr("y", h / 2 - 60)
        .attr("height", 15)
        .attr("width", 15)
        .style("fill", "Orange")
    legend
        .append("text")
        .attr("x", w - padding - 130)
        .attr("y", h / 2 - 50)
        .text("No doping allegations")
        .style("font-size", "13px")
        .attr("alignment-baseline","bottom")
        .attr("text-align", "left")

    legend
        .append("text")
        .attr("x", w - padding - 180)
        .attr("y", h / 2 - 23)
        .text("Riders with doping allegations")
        .style("font-size", "13px")
        .attr("alignment-baseline","middle")
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

