// from data.js
const tableData = data;

const notFound = "No UFO Sightings Matching the Criteria";
let tbody = d3.select('tbody');

function displayTable(rows){
    // Checking if any data rows to be displayed and Displays no matches
    if (rows === notFound){
        tbody.append("tr").append("td")
                                .attr("colspan", 7)
                                .attr("class","notFound")
                                .text(notFound);
    }
    // Displays the table with given data rows
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


// Action to perform on events
function Action(){
    // Prevent the page from refreshing
    d3.event.preventDefault();

    // Get the value of the input element in the form
    let inputDate = d3.select("#datetime").property("value");
	
	// Filter data on matching date
    let filteredData = tableData.filter(sightings => sightings.datetime == inputDate);

    // Clearing table before appending filterd data rows
	tbody.selectAll("tr").remove();

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
