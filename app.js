function buildPlot(id) {

    //Use D3 to fetch data from json file
    d3.json("data/samples.json").then (data => {
            
        var ids = data.samples[0].otu_ids;
        var sampleValues =  data.samples[0].sample_values.slice(0,10).reverse();
        var labels =  data.samples[0].otu_labels.slice(0,10);
            
        // Top 10 otu ids for bar chart 
        var OTU_top = ( data.samples[0].otu_ids.slice(0, 10)).reverse();
    
        // Labels for y axis for bar chart
        var otuid = OTU_top.map(d => "OTU " + d);
        console.log(`OTU IDS: ${otuid}`)
    
        // Create labels
        var labels =  data.samples[0].otu_labels.slice(0,10);
        console.log(`OTU_labels: ${labels}`)
        var trace = {
            x: sampleValues,
            y: otuid,
            text: labels,
            type:"bar",
            orientation: "h",
        };
        
        // Create Bar data
        var data1 = [trace];
    
        // Create Bar Layout
        var layout = {
            title: "Top 10 OTU",
            yaxis:{
                tickmode:"linear",
            },
        };
    
        // Create horizontal bar chart
        Plotly.newPlot("bar", data1, layout);

        // Bubble Chart Trace
        var trace1 = {
            x: data.samples[0].otu_ids,
            y: data.samples[0].sample_values,
            mode: "markers",
            marker: {
                size: data.samples[0].sample_values,
                color: data.samples[0].otu_ids
            },
            text:  data.samples[0].otu_labels
        };

        // Bubble Data
        var data2 = [trace1];
    
        // Bubble Chart Layout
        var layout_2 = {
            xaxis:{title: "OTU ID"},
            height: 600,
            width: 1000
        };
    
        // create the bubble plot
        Plotly.newPlot("bubble", data2, layout_2);         
    });
}  
    
// Demographic Data
function getDemoInfo(id) {
    // read the json file to get data
    d3.json("data/samples.json").then((data)=> {

    // Metadata
        var metadata = data.metadata;
        //console.log(metadata)
    
        // Filter Metadata by id
        var metaID = metadata.filter(meta => meta.id.toString() === id)[0];
        
        var sampleMetadata = d3.select("#sample-metadata");
            
         // Clear html
        sampleMetadata.html("");
    
        // Append data
        Object.entries(metaID).forEach((key) => {   
            sampleMetadata.append("h5").text(key[0] + ": " + key[1] + "\n");    
        });
    });
}
// On change to the DOM
function optionChanged(id) {
    buildPlot(id);
    getDemoInfo(id);
}
    
// Function called by DOM changes
function init() {
    // select dropdown menu 
    var dropdown = d3.select("#selDataset");
    
    d3.json("data/samples.json").then((data)=> {        
        console.log(data)
    
        // Append data
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });
    
        // Update Plot
        buildPlot(data.names[0]);
        getDemoInfo(data.names[0]);
    });
}
  
init();