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


// Action to perform on events
function Action(){
    // Prevent the page from refreshing
    d3.event.preventDefault();
    // Select the date input element in the form
    const inputDtElement = d3.select("#datetime");
    // Get the value of the input element
    let inputDate = inputDtElement.property("value");
    
    let filteredData = tableData.filter(sightings => sightings.datetime == inputDate);

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

// Select the submit button for filter
const submit = d3.select("#filter-btn");
const form = d3.select("#searchForm");

// Calling the Action function on click and form submit events
submit.on("click", Action);
form.on("submit",Action);