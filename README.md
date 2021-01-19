# Plot.ly Homework - Belly Button Biodiversity
## By Jose Luis T Duarte A.

![](Images/bacteria.jpg)

I built an interactive dashboard to explore the [Belly Button Biodiversity dataset](http://robdunnlab.com/projects/belly-button-biodiversity/), which catalogs the microbes that colonize human navels.

The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

## Step 1: Plotly

1. I Used the D3 library to read in `samples.json`.

2. I Created a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual and I used:

* `sample_values` as the values for the bar chart.

* `otu_ids` as the labels for the bar chart.

* `otu_labels` as the hovertext for the chart.

  ![](Images/hw01.png)

3. I Created a bubble chart that displays each sample, and used

* `otu_ids` for the x values.

* `sample_values` for the y values.

* `sample_values` for the marker size.

* `otu_ids` for the marker colors.

* `otu_labels` for the text values.

![](Images/bubble_chart.png)

4. I Displayed the sample metadata, i.e., an individual's demographic information.

5. I Displayed each key-value pair from the metadata JSON object somewhere on the page.

![](Images/hw03.png)

6. I Updated all of the plots any time that a new sample is selected.

## Bonus Challenge Assignment


*  I Adapted the Gauge Chart from <https://plot.ly/javascript/gauge-charts/> to plot the weekly washing frequency of the individual.

* I had to modify the example gauge code to account for values ranging from 0 through 9, then:

* I Updated the chart whenever a new sample is selected.

![](Images/gauge.png)



- - -

© 2021 Jose Luis Duarte A.
