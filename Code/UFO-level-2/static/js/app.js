// from data.js
const tableData = data;
const notFound = "No UFO Sightings Matching the Criteria";

function displayTable(rows){
    // Adding tbody into table and referencing tbody as Global variable
    window.tbody = d3.select("table").append("tbody");

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
                let cell = tbody.append("td");
                cell.text(value);
            });
        });
    }
}

function loadDropdowns(){
    // Getting an array of dates in data
    let dateArray = tableData.map(sighting => sighting.datetime);
    dateArray.push("");
    // Converting the array into a set to keep unique city names
    let dateList = d3.set(dateArray).values();
    // Selecting the seclect element and appending option tags
    const selectDate = d3.select("#datetime");
    var options = selectDate.selectAll('option')
                            .data(dateList)
                            .enter()
                            .append('option')
                            .attr("value",(d) => d)
                            .text((d) => d)
                            .property("selected", (d) => d == "" );


    // Getting an array of city names in data
    let cityArray = tableData.map(sighting => sighting.city);
    cityArray.push("");
    // Converting the array into a set to keep unique city names
    let cityList = d3.set(cityArray).values();
    cityList = cityList.sort(d3.ascending);
    // Selecting the seclect element and appending option tags
    const selectCity = d3.select("#city");
    var options = selectCity.selectAll('option')
                            .data(cityList)
                            .enter()
                            .append('option')
                            .attr("value",(c) => c)
                            .text((c) => c)
                            .property("selected", (d) => d == "" );


    // Getting an array of state names in data
    let stateArray = tableData.map(sighting => sighting.state);
    stateArray.push("");
    // Converting the array into a set to keep unique state names
    let stateList = d3.set(stateArray).values();
    stateList = stateList.sort(d3.ascending);
    // Selecting the seclect element and appending option tags
    const selectState = d3.select("#state");
    var options = selectState.selectAll('option')
                            .data(stateList)
                            .enter()
                            .append('option')
                            .attr("value",(s) => s)
                            .text((s) => s)
                            .property("selected", (d) => d == "" );    
                            
    // Getting an array of country names in data
    let countryArray = tableData.map(sighting => sighting.country);
    countryArray.push("");
    // Converting the array into a set to keep unique country names
    let countryList = d3.set(countryArray).values();
    countryList = countryList.sort(d3.ascending);
    // Selecting the seclect element and appending option tags
    const selectCountry = d3.select("#country");
    var options = selectCountry.selectAll('option')
                            .data(countryList)
                            .enter()
                            .append('option')
                            .attr("value",(c) => c)
                            .text((c) => c)
                            .property("selected", (d) => d == "" );    
                            
    // Getting an array of shape names in data
    let shapeArray = tableData.map(sighting => sighting.shape);
    shapeArray.push("");
    // Converting the array into a set to keep unique shape names
    let shapeList = d3.set(shapeArray).values();
    shapeList = shapeList.sort(d3.ascending);
    // Selecting the seclect element and appending option tags
    const selectShape = d3.select("#shape");
    var options = selectShape.selectAll('option')
                            .data(shapeList)
                            .enter()
                            .append('option')
                            .attr("value",(s) => s)
                            .text((s) => s)
                            .property("selected", (d) => d == "" );   
}


// Action to perform on events
function Action(){
    // Prevent the page from refreshing
    d3.event.preventDefault();

    // Get the value of the input elements in the form
    let datetime = d3.select("#datetime").node().value;
    let city = d3.select("#city").node().value;
    let state= d3.select("#state").node().value;
    let country = d3.select("#country").node().value;
    let shape = d3.select("#shape").node().value;


    // Creating an array of data set keys to apply filter
    let filters = [];
    if(datetime !== "") filters.push("datetime");
    if(city !== "") filters.push("city");
    if(state !== "") filters.push("state");
    if(country !== "") filters.push("country");
    if(shape !== "") filters.push("shape");

    let filteredData = [];
    forEach(key in filters) 
        filteredData = filteredData.push(tableData.filter(sightings => sightings.key == key));
    


    // Clearing table before appending filterd data rows
    tbody.remove();

    // Checking if matching rows are found
    if(filteredData.length != 0) {
        displayTable(filteredData);
    }
    else {
        displayTable(notFound);
    }
}

// Display full table on page load
displayTable(tableData);
// Calling loadDropdowns to fill dropdown list on page load
loadDropdowns();

// Select the form and form elements for filter
const form = d3.select("#searchForm");
const submit = d3.select("#filter-btn");


// Calling the Action function on click and form submit events
submit.on("click", Action);
form.on("submit",Action);