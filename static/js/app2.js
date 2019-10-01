// Variables
var button = d3.select("#filterb");
var input1 = d3.select("#datetime");
var input2 = d3.select("#city");
var table = d3.select("table");
var resetb = d3.select("#resetb");
var columns = ["datetime", "city", "state", "country", "shape", "durationMinutes", "comments"]

var populate = (dataInput) => {

  dataInput.forEach(ufo_sightings => {
    var row = table.append("tr");
    columns.forEach(column => row.append("td").text(ufo_sightings[column])
    )
  });
}

//Create table
populate(data);

// Filter by attribute
button.on("click", () => {
  d3.event.preventDefault();
  var inputDate = input1.property("value").trim();
  var inputCity = input2.property("value").toLowerCase().trim();
  // Filters
  var filterDate = data.filter(data => data.datetime === inputDate);
  console.log(filterDate)
  var filterCity = data.filter(data => data.city === inputCity);
  console.log(filterCity)
  var filterData = data.filter(data => data.datetime === inputDate && data.city === inputCity);
  console.log(filterData)

  // Apply filters
  table.html("");

  let response = {
    filterData, filterCity, filterDate
  }

  if (response.filterData.length !== 0) {
    populate(filterData);
  }
    else if (response.filterData.length === 0 && ((response.filterCity.length !== 0 || response.filterDate.length !== 0))){
      populate(filterCity) || populate(filterDate);
  
    }
    //Cover loose ends
    else {
      table.append("tr").append("td").text("No results found!"); 
    }
})

//Reset and remove filters
resetb.on("click", () => {
  table.html("");
  populate(data)
  console.log("Table reset")
})