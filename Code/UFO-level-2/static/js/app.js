// from data.js
const tableData = data;

// Global declaration
const notFound = "No UFO Sightings Matching the Criteria";
const tbody = d3.select("tbody");
const keys = Object.keys(tableData[0]).slice(0,5);


// /////////////////////////////////////////////////////////////////////////////
function displayTable(rows){
    // Adding tbody into table and referencing tbody as Global variable
    // window.tbody = d3.select("table").append("tbody");

    if (rows === notFound){
        tbody.append("tr").append("td")
                                .attr("colspan", 7)
                                .attr("class","notFound")
                                .text(notFound);
    }
    else{
        rows.forEach((UFOsighting) => {
            let row = tbody.append("tr");
            Object.entries(UFOsighting).forEach(([key, value]) => {
                let cell = row.append("td");
                cell.text(value);
            });
        });
    }
}



// /////////////////////////////////////////////////////////////////////////////
function loadDropdowns(){
    
    keys.forEach((key) => {
        // Getting an array of dates in data
        let dataArray = tableData.map(sighting => sighting[`${key}`]);
        // Inserting a blank
        dataArray.push("");
        // Converting the array into a set to keep unique city names
        let dataList = d3.set(dataArray).values();
        // Sorting the list except for the datetime
        if(key!== "datetime") {
            dataList = dataList.sort(d3.ascending);
        }
        
        var options = d3.select(`#${key}`).selectAll('option')
                                .data(dataList)
                                .enter()
                                .append('option')
                                .attr("value",(d) => d)
                                .text((d) => d)
                                .property("selected", (d) => d == "" );
    });
}




// /////////////////////////////////////////////////////////////////////////////
// Action to perform on events
function Action(){
    // Prevent the page from refreshing
    d3.event.preventDefault();

    // Get the value of the input elements in the form
    let inputDate = d3.select("#datetime").node().value;
    let inputCity = d3.select("#city").node().value;
    let inputState = d3.select("#state").node().value;
    let inputCountry = d3.select("#country").node().value;
    let inputShape = d3.select("#shape").node().value;


    // Creating an array of data set keys to apply filter
    let filters = [];

    if(inputDate !== "") filters.datetime = inputDate;
    if(inputCity !== "") filters.city = inputCity;
    if(inputState !== "") filters.state = inputState;
    if(inputCountry !== "") filters.country = inputCountry;
    if(inputShape !== "") filters.shape = inputShape;

    var filteredData = [];
    let i = 0;

    Object.entries(filters).forEach(([key, value]) => {
        if(i == 0) {
            filteredData = tableData;
            i++;
        }
        switch (key) { 
            case "datetime":
                filteredData = filteredData.filter(sightings => sightings.datetime == value);
                break;
            case "city":
                filteredData = filteredData.filter(sightings => sightings.city == value);
                break;
            case "state":
                filteredData = filteredData.filter(sightings => sightings.state == value);
                break;
            case "country":
                filteredData = filteredData.filter(sightings => sightings.country == value);
                break;
            case "shape":
                filteredData = filteredData.filter(sightings => sightings.shape == value);
                break;
            default:
                filteredData = [];   
        }
    });  
    // Clearing table before appending filterd data rows
    tbody.selectAll("tr").remove();

    // Checking if matching rows are found
    if(filteredData.length !== 0) {
        displayTable(filteredData);
    }
    // If there is no filters, loading the full table data
    else if (Object.keys(filters).length === 0) {
        displayTable(tableData);
    }
    else {
        displayTable(notFound);
    }
}

// /////////////////////////////////////////////////////////////////////////////




// Display full table on page load
displayTable(tableData);
// Calling loadDropdowns to fill dropdown list on page load
loadDropdowns();

// Select the form and form elements for filter
const form = d3.select("#searchForm");
const inputs = d3.selectAll(".form-control");

// Calling the Action function on change of inputs and form submit events
form.on("submit",Action);
inputs.on("change",Action);



// /////////////////////////////////////////////////////////////////////////////
// Event handling on clear filter buton click
const clearBtn = d3.select("#clr-btn");
clearBtn.on("click", function() {
    // Prevent the page from refreshing
    d3.event.preventDefault();

    // Clearing table and loading it
    tbody.selectAll("tr").remove();
    displayTable(tableData);

    // Clearing dropdowns by selecting blank item
    keys.forEach((key) => {
        d3.select(`#${key}`).selectAll('option').property("selected", (d) => d == "" );
    });
});

