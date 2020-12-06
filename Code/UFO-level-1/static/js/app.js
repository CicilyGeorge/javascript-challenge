// from data.js
const tableData = data;


function displayTable(rows){
    // Adding tbody into table and referencing tbody as Global variable
    window.tbody = d3.select("table").append("tbody");
    console.log("tbody");
    rows.forEach((UFOsighting) => {
        let row = tbody.append("tr");
        Object.entries(UFOsighting).forEach(([key, value]) => {
            let cell = tbody.append("td");
            cell.text(value);
        });
    });
}

// Display full table on page load
displayTable(tableData);

// Select the submit button for filter
const submit = d3.select("#filter-btn");

// Event handling on click event
submit.on("click", function(){
    // Prevent the page from refreshing
    d3.event.preventDefault();
    // Select the date input element in the form
    const inputDtElement = d3.select("#datetime");
    // Get the value of the input element
    let inputDate = inputDtElement.property("value");
    
    let filteredData = tableData.filter(sightings => sightings.datetime == inputDate);

    tbody.remove();
    displayTable(filteredData);
})
 