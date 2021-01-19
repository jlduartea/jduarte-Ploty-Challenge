function buildPanel(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // console.log(metadata)
    // Filtering the data for the object with the choose sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    
    // console.log(result)
    // Use d3 to select the panel div from the HTML
    // to put the data that are in ""result" variable
    var Panel = d3.select("#sample-metadata");
    
    // Refresh the Panel Data Section in the HTML, to
    // show just the data of the Subject that was choose
    Panel.html("");
    
    // Populate with all the Fields and Values in the Panel Section
    // for the Subject that was choose
    Object.entries(result).forEach(([key, value]) => {
      Panel.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

    //BONUS SECTION
    // Call the function to build the Gauge Chart
    buildGauge(result.wfreq);
  });
}

function buildCharts(sample) {
  d3.json("samples.json").then((data) => {
    var samples = data.samples;
    var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    var otu_ids = result.otu_ids;
    var otu_labels = result.otu_labels;
    var sample_values = result.sample_values;

    // Create Bubble Chart
    var bubbleLayout = {
      title: "Bacteria Per Sample",
      margin: { t: 0 },
      hovermode: "closest",
      xaxis: { title: "OTU ID" },
      margin: { t: 30}
    };
    var bubbleData = [
      {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: "markers",
        marker: {
          size: sample_values,
          color: otu_ids,
          colorscale: "Earth"
        }
      }
    ];
    // Display Bubble Chart
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);

    // Create Bar Chart
    var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
    var barData = [
      {
        y: yticks,
        x: sample_values.slice(0, 10).reverse(),
        text: otu_labels.slice(0, 10).reverse(),
        type: "bar",
        orientation: "h",
      }
    ];
    var barLayout = {
      title: "Top 10 Bacteria Samples",
      margin: { t: 30, l: 150 }
    };
    // Display Bar Chart
    Plotly.newPlot("bar", barData, barLayout);
  });
}

function init() {
  // Keep a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of names from "Samples.json" to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first Data Sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildPanel(firstSample);
  });
}

function optionChanged(newSample) {
  // Getting new data each time a new sample is selected
  buildCharts(newSample);
  buildPanel(newSample);
}

// Initialize the dashboard
init();
