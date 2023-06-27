function buildMetadata(sample) {
  //Access the website and use d3 to operate on the data
  let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
  // Use the list of sample names to populate the select options
  d3.json(url).then((data) => {
    // Filter the data for the object with the desired sample number (the id)
    let metadata = data.metadata;
    let filteredArray = metadata.filter(sampleObj => sampleObj.id == sample);
    let result = filteredArray[0]

    //Select the panel with id of "#sample-metadata"
    let panel = d3.select("#sample-metadata");

    //Clear existing metadata - use ".html("")"
    panel.html("");

    //Append new tags for each key-value in the metadata
    for (key in result) {
      panel.append("h6").text(`${key.toUpperCase()}: ${result[key]}`);
    };


  });
}

function buildCharts(sample) {
  // Access the website and use .then to operate on the data
  let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
  d3.json(url).then((data) => {
    let metadata = data.metadata;
    let filteredArray = metadata.filter(sampleObj => sampleObj.id == sample);
    let result = filteredArray[0]
    let wfreq = result.wfreq
    //Filter the data for the object with the desired sample number (the id)
    let samples = data.samples;
    let sampleArray = samples.filter(sampleObj => sampleObj.id == sample);
    let sampleresult = sampleArray[0]
    let otu_ids = sampleresult.otu_ids
    let otu_labels = sampleresult.otu_labels
    let sample_values = sampleresult.sample_values

    // //Build a Horizontal Bar Chart
    // Trace1 for the OTU found in Individual
    let trace1 = {
      x: sample_values.slice(0, 10).reverse(),
      //reversedData.map(object => object.sample_values),
      y: otu_ids.slice(0, 10).reverse().map(object => `OTU ${object}`),               //reversedData.map(object => object.otu_id),
      text: otu_labels.slice(0, 10).reverse(),                  // reversedData.map(object => object.otu_labels),
      name: "otu",
      type: "bar",
      orientation: "h",
      marker: {color:"darkblue"}

    };

    // Data array
    // `data` has already been defined, so we must choose a new name here:
    let traceData = [trace1];

    // Apply a title to the layout
    let layout = {
      title: "Top 10 OTU found in Individual",
      margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 100
      }
    };

    // Render the plot to the div tag with id "plot"
    // Note that we use `traceData` here, not `data`
    Plotly.newPlot("bar", traceData, layout);

  //Build the Bubble Chart

    var bubble1 = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      marker: {
        size: sample_values,
        color: otu_ids,
        colorscale: "Bluered"

      }
    };

    var data = [bubble1];

    var bubblelayout = {
      title: 'Bacteria Culture per Sample',
      showlegend: false,
      xaxis: {
        title: {
          text: 'OTU ID',
          font: {
            size: 18,
           
          }
        },
      },
    };

    Plotly.newPlot('bubble', data, bubblelayout);

    var data = [
      {
        type: "indicator",
        mode: "gauge+number",
        value: wfreq,
        title: { text: "Belly Button Wash Frequency", font: { size: 24 } },
      
        gauge: {
          axis: { range: [null, 10], tickwidth: 1, tickcolor: "darkblue" },
          bar: { color: "darkblue" },
          bgcolor: "white",
          borderwidth: 2,
          bordercolor: "gray",
          steps: [
            { range: [0, 10], color: "cyan" },
           
          ],
         
        }
      }
    ];

    var gaugelayout = {
      width: 500,
      height: 400,
      margin: { t: 25, r: 25, l: 25, b: 25 },
      paper_bgcolor: "lavender",
      font: { color: "darkblue", family: "Arial" }
    };

    Plotly.newPlot('gauge', data, gaugelayout);


  });

}

function init() {
  // Get the reference to the dropdown menu
  let selector = d3.select("#selDataset");

  let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
  // Use the list of sample names to populate the select options
  d3.json(url).then((data) => {

    // Do this by pulling the array associated with "names"
    let idNames = data.names;

    // Loop through the names append to the dropdown menu
    for (let i = 0; i < idNames.length; i++) {
      selector.append("option").text(idNames[i]).property("value", idNames[i]);
    };

    // Use the first sample from the list to build the initial plots
    let firstSample = idNames[0]

    buildCharts(firstSample);
    buildMetadata(firstSample);
  });

}

function optionChanged(newSample) {
  // Change your data and update the plots/ metadata when newSample is selected from the dropdown
  buildCharts(newSample);
  buildMetadata(newSample);

}


//Initialize the dashboards
init();

