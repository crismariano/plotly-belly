// Use d3.json() to fetch data from JSON file
// Incoming data is iternally referred to as incomingData

d3.json("data/samples.json").then(function(incomingData) {
    console.log(incomingData);

    // Grab values from the samples.json object to built the horizontal Bar Chart
    var dataSamples = incomingData.samples;
    //console.log(dataSamples);
    var dataOtuID = dataSamples.map(obj => obj.otu_ids);
    //console.log(dataOtuID);
    sliceOtuID = dataOtuID.slice(0, 10);
    console.log(sliceOtuID);

    var sampleValues = dataSamples.map(obj => obj.sample_values);
    //console.log(sampleValues);

    // Trace for Bar Chart
    var trace1 = {
        x: sampleValues,
        y: dataOtuID,
        type: "bar",
        orientation: "h"
    };
    // Create data for Bar Chart
    var data = [trace1];

    // Create the layout for Bar Chart
    var layout = {
        title: "Belly Button Bar Chart"
    }
    // Create default plot
    Plotly.newPlot("plot", data, layout);
});
