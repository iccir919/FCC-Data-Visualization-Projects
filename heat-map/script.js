document.addEventListener('DOMContentLoaded', () => {
    const datasetURL = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json";
    fetch(datasetURL)
        .then(response => response.json())
        .then(data => console.log(data));
})