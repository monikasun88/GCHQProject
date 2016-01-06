var nCellR = 25;
var nCellC = 25;

var rectSVG = d3.select("#viz")
  .append("svg")
  .attr("width", 25*nCellC)
  .attr("height", 25*nCellR);

var toggleColor = (function(color){

  var currentColor = color;
  return function(){

        currentColor = currentColor == "white" ? "black" : "white";
        d3.select(this).style("fill", currentColor);
    }
})();

var xCell = 0;
var yCell = 0;
var color = "white";

for (var x=0; x<nCellC; x++) {
  for (var y=0; y<nCellR; y++) {
    rectSVG.append("rect")
      .attr("x", 25*x)
      .attr("y", 25*y)
      .attr("width", 25)
      .attr("height", 25)
      .style("fill", color)
      .style("stroke", "black")
      .on("click", toggleColor.bind(color))
    }
};
