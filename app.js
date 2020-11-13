// Use d3.json() to fetch data from JSON file
// Incoming data is iternally referred to as incomingData

function buildPlot() {
    d3.json("data/samples.json").then(function(bellyData) {
        //console.log(bellyData);
        // Grab values from the samples.json object to built the horizontal Bar Chart
        var ids = bellyData.samples[0].otu_ids;
        //console.log(ids);
        var sampleValues = bellyData.samples[0].sample_values.slice(0, 10).reverse();
        //console.log(sampleValues);
        var labels = bellyData.samples[0].otu_labels;
        //console.log(labels);
        // Top 10 otu_ids for plotting
        var slicedID = ids.slice(0, 10).reverse();
        //console.log(slicedID);
        var idLabel = slicedID.map(d => "OTU " + d)
        //console.log(idLabel); 
        // Top 10 otu_labels for hovetext for chart
        var sampleLabel = labels.slice(0, 10);
        //console.log(sampleLabel);
    
        // Trace for Bar Chart
        var trace = {
            x: sampleValues,
            y: idLabel,
            text: sampleLabel,
            type: "bar",
            orientation: "h"
        };
        // Create data for Bar Chart
        var data = [trace];
    
        // Create the layout for Bar Chart
        var layout = {
            title: "Top 10 OTUs in Individual",
            yaxis: {
                tickmode: "linear"
            },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 30
            }
        };
        // Create default plot
        Plotly.newPlot("bar", data, layout);
    
        // Bubble Plot Chart
        var trace1 = {
            x: bellyData.samples[0].otu_ids,
            y: bellyData.samples[0].sample_values,
            mode: "markers",
            marker: {
                size: bellyData.samples[0].sample_values,
                color: bellyData.samples[0].otu_ids
            },
            text: bellyData.samples[0].otu_labels
        };
    
        // Bubble data plot
        var data1 = [trace1];
    
        // Bubble Layout
        var layout1 = {
            xaxis: { title: "OTU ID" },
            height: 600,
            width: 1000
        };
    
        // Bubble Plot
        Plotly.newPlot("bubble", data1, layout1);
    });
}
buildPlot()
